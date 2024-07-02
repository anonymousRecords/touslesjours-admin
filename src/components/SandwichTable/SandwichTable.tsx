'use client';

import { format } from 'date-fns';
import { useState } from 'react';
import { colorsContent, sandwichColumns, sandwichRows } from '@/constants';
import { SandwichData } from '@/data/type';
import { useGetSanwichData } from '@/hooks/useGetSandwichData';
import { supabase } from '@/supabase/supabase';
import { weekdayFromNumber } from '@/util/weekdayFromNumber';
import { Dropdown } from '../Dropdown';

interface SandwichTableProps {
  weekArray: string[];
}

const SandwichTable = ({ weekArray }: SandwichTableProps) => {
  // Dropdown 데이터를 관리하는 useState
  const { dropdownData, onDropdownChange } = useGetSanwichData(weekArray);

  const handleDropDownChange = async (
    columnIndex: number,
    rowIndex: number,
    colorIndex: string,
  ) => {
    const date = weekArray[rowIndex];
    const colorName = colorsContent[colorIndex];
    const sandwichType = sandwichColumns[columnIndex];
    const period = `${weekArray[0]} ~ ${weekArray[6]}`;
    const days = sandwichRows[rowIndex];
    const id = date + sandwichType;

    try {
      const { data: existingData } = await supabase
        .from('sandwich_schedule')
        .select('*')
        .eq('date', date)
        .eq('sandwich_type', sandwichType);

      await supabase.from('sandwich_schedule').upsert({
        id: (existingData ?? []).length > 0 ? existingData?.[0].id : id,
        period: period,
        date: date,
        days: days,
        sandwich_type: sandwichType,
        dropdown_data: colorName,
      });

      const { data } = await supabase.from('sandwich_schedule').select('*').eq('period', period);
      onDropdownChange(data as SandwichData[]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 오늘 날짜 구하기
  const todayDate = format(new Date(), 'yyyy-MM-dd');

  // 모두 지우기 기능
  // 1. 모두 지우기 버튼을 클릭하면 supabase에서 해당 날짜의 데이터를 모두 삭제

  const handleDeleteAllData = async (date: string | undefined) => {
    const period = `${weekArray[0]} ~ ${weekArray[6]}`;
    if (date === undefined) {
      return;
    }
    try {
      await supabase.from('sandwich_schedule').delete().eq('date', date);

      const { data } = await supabase.from('sandwich_schedule').select('*').eq('period', period);
      onDropdownChange(data as SandwichData[]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 활성화 날짜
  const [activeDay, setActiveDay] = useState<string>();

  // 모두 채우기 기능
  // 1. 모두 채우기 버튼을 클릭하면 전 날 데이터를 가져와서 새로운 데이터로 삽입
  // 2. 전 날 데이터가 없을 경우 아무것도 하지 않음
  // 3. 전 날 데이터가 있을 경우 샌드위치 종류에 따라 다음 날 데이터를 채움 (주 -> 녹 / 녹 -> 흰 / 흰 -> 주 / 기타 -> 기타)

  const handleFillAllData = async (date: string | undefined) => {
    const period = `${weekArray[0]} ~ ${weekArray[6]}`;
    if (date === undefined) {
      return;
    }

    // 전 날 데이터 가져오기
    const previousDateIndex = weekArray.indexOf(date as string) - 1;
    const previousDate = previousDateIndex >= 0 ? weekArray[previousDateIndex] : undefined;
    const { data: previousData } = previousDate
      ? await supabase.from('sandwich_schedule').select('*').eq('date', previousDate)
      : { data: [] };

    if (previousData === null) {
      return;
    }

    // 모두 채우기
    if (previousData.length > 0) {
      // 전 날 데이터가 존재할 때만 처리
      const newData = previousData?.map((item: SandwichData) => {
        let nextDropdownData: string;
        switch (item.dropdown_data) {
          case '주':
            nextDropdownData = '녹';
            break;
          case '녹':
            nextDropdownData = '흰';
            break;
          case '흰':
            nextDropdownData = '주';
            break;
          default:
            nextDropdownData = '기타';
            break;
        }
        return {
          ...item,
          id: activeDay + item.sandwich_type,
          period: `${weekArray[0]} ~ ${weekArray[6]}`,
          date: activeDay as string,
          days: weekdayFromNumber(previousDateIndex + 1),
          dropdown_data: nextDropdownData,
        };
      });

      // 새로운 데이터를 DB에 삽입
      await supabase.from('sandwich_schedule').upsert(newData);

      // 업데이트된 데이터 불러오기
      const { data } = await supabase.from('sandwich_schedule').select('*').eq('period', period);
      onDropdownChange(data as SandwichData[]);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <div className="flex gap-5">
          <button
            className="bg-[#0C4630] text-white font-semibold px-3 py-1 rounded-md"
            onClick={() => {
              handleFillAllData(activeDay);
            }}
          >
            모두 채우기 (+)
          </button>
          <button
            className="bg-[#0C4630] text-white font-semibold px-3 py-1 rounded-md"
            onClick={() => {
              handleDeleteAllData(activeDay);
            }}
          >
            모두 지우기 (-)
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {/* 1행: 요일 */}
            <th></th>
            {sandwichRows.map((row, index) => (
              <th key={index}>{row}</th>
            ))}
          </tr>
          <tr>
            {/* 날짜 */}
            <th></th>
            {weekArray.map((week, index) => (
              <th
                key={index}
                onClick={() => {
                  setActiveDay(week);
                }}
                className="text-lg font-extralight cursor-pointer"
              >
                {week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 1열: 샌드위치 종류 & 색상 스티커 */}
          {sandwichColumns.map((column, columnIndex) => (
            <tr key={columnIndex}>
              <td>{column}</td>
              {/* 나머지 칸들은 Dropdown으로 채워지도록 */}
              {sandwichRows.map((row, rowIndex) => (
                <td key={rowIndex} className="text-center">
                  <Dropdown
                    buttonContent={dropdownData[columnIndex][rowIndex]}
                    dropdownContent={colorsContent}
                    onSelect={(index: string) => {
                      handleDropDownChange(columnIndex, rowIndex, index);
                    }}
                    isToday={weekArray[rowIndex] === todayDate}
                    isActive={weekArray[rowIndex] === activeDay}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SandwichTable;
