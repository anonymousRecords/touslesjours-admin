'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import {
  deleteSandwichSchedule,
  getSandwichScheduleByDate,
  getSandwichSchedulesByPeriod,
  upsertSandwichSchedule,
} from '@/apis/sandwich';
import { colorsContent, sandwichColumns, sandwichRows } from '@/constants';
import { Tables } from '@/data/supabase';
import { useGetSanwichData } from '@/hooks/useGetSandwichData';
import { Dropdown } from '../../../../components/Dropdown';

interface SandwichTableProps {
  weekArray: string[];
}

const SandwichTable = ({ weekArray }: SandwichTableProps) => {
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const { dropdownData, onDropdownChange } = useGetSanwichData(weekArray);
  const todayDate = format(new Date(), 'yyyy-MM-dd');
  const period = `${weekArray[0]} ~ ${weekArray[6]}`;

  const handleDropDownChange = async (
    columnIndex: number,
    rowIndex: number,
    colorIndex: string,
  ) => {
    const date = weekArray[rowIndex];
    const sandwichType = sandwichColumns[columnIndex];

    await upsertSandwichSchedule({
      id: date + sandwichType,
      period: period,
      date: date,
      days: sandwichRows[rowIndex],
      sandwich_type: sandwichType,
      dropdown_data: colorsContent[colorIndex],
    });

    const existingData = await getSandwichSchedulesByPeriod(period);
    onDropdownChange(existingData);
  };

  const handleDeleteAllData = async (date: string | null) => {
    if (date == null) {
      return;
    }

    await deleteSandwichSchedule(date);

    const existingData = await getSandwichSchedulesByPeriod(period);
    onDropdownChange(existingData);
  };

  // 모두 채우기 기능
  // 1. 모두 채우기 버튼을 클릭하면 전 날 데이터를 가져와서 새로운 데이터로 삽입
  // 2. 전 날 데이터가 없을 경우 아무것도 하지 않음
  // 3. 전 날 데이터가 있을 경우 샌드위치 종류에 따라 다음 날 데이터를 채움 (주 -> 녹 / 녹 -> 흰 / 흰 -> 주 / 기타 -> 기타)

  const handleFillAllData = async (date: string | null) => {
    if (date == null || activeDay == null) {
      return;
    }

    const previousDate = format(new Date(date).valueOf() - 1000 * 60 * 60 * 24, 'yyyy-MM-dd');
    const previousData = await getSandwichScheduleByDate(previousDate);

    if (previousData == null) {
      return;
    }

    if (previousData.length > 0) {
      const newData: Array<Tables<'sandwich_schedule'>> = previousData.map((item) => {
        const nextDropdownData =
          item.dropdown_data == null
            ? '기타'
            : { 주: '녹', 녹: '흰', 흰: '주' }[item.dropdown_data] ?? '기타';

        return {
          ...item,
          id: activeDay + item.sandwich_type,
          sandwich_type: item.sandwich_type,
          period: `${weekArray[0]} ~ ${weekArray[6]}`,
          date: activeDay,
          days: format(activeDay, 'E', { locale: ko }),
          dropdown_data: nextDropdownData,
        };
      });

      for (const item of newData) {
        await upsertSandwichSchedule(item);
      }

      const existingData = await getSandwichSchedulesByPeriod(period);
      onDropdownChange(existingData);
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
