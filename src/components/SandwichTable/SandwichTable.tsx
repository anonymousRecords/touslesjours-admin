'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { sandwichRows, sandwichColumns } from '@/data/type';
import { supabase } from '@/supabase/supabase';
import { weekdayFromNumber } from '@/util/weekdayFromNumber';
import { Dropdown } from '../Dropdown';

type SandwichData = {
  id: string;
  period: string;
  date: string;
  days: string;
  sandwich_type: string;
  dropdown_data: string;
};

// const colors = [
//   { id: 0, name: '주', color: '#FF8C06' },
//   { id: 1, name: '녹', color: '#18CE61' },
//   { id: 2, name: '흰', color: '#FFFFFF' },
// ];

const colorsContent = ['주', '녹', '흰'];

interface SandwichTableProps {
  weekArray: string[];
}

function makeTable<T>(col: number, row: number, { initialValue }: { initialValue: T }) {
  return Array.from({ length: col }, () => Array.from({ length: row }, () => initialValue));
}

const SandwichTable = ({ weekArray }: SandwichTableProps) => {
  // Dropdown 데이터를 관리하는 useState
  const [dropdownData, setDropdownData] = useState(
    makeTable(sandwichColumns.length, sandwichRows.length, { initialValue: '' }),
  );

  const formatSandwichData = (sandwichData: SandwichData[]): string[][] => {
    const formattedData = makeTable(sandwichColumns.length, sandwichRows.length, {
      initialValue: '',
    });

    sandwichData?.forEach((item) => {
      // 요일과 샌드위치 종류를 숫자로 매핑
      const rowIndex = sandwichRows.indexOf(item.days);
      const columnIndex = sandwichColumns.indexOf(item.sandwich_type);

      // period가 일치하는 데이터만 가져오기
      formattedData[columnIndex][rowIndex] = item.dropdown_data;
    });

    return formattedData;
  };

  // const handleChange = async (columnIndex: number, rowIndex: number, colorIndex: number) => {
  // 1. 기존 데이터 가져오기 (id를 가지고!)
  // 2. upsert를 통해 db 업데이트
  // 3. dropdownData sync
  // };

  const handleDropDownChange = async (
    columnIndex: number,
    rowIndex: number,
    colorIndex: number,
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
      setDropdownData(formatSandwichData(data as SandwichData[]));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 초기 데이터 가져오기
  useEffect(() => {
    const period = `${weekArray[0]} ~ ${weekArray[6]}`;
    const fetchSandwichData = async () => {
      try {
        const { data: sandwichData, error: sandwichError } = await supabase
          .from('sandwich_schedule')
          .select('*')
          .eq('period', period);

        if (sandwichError) {
          throw sandwichError;
        }
        setDropdownData(formatSandwichData(sandwichData as SandwichData[]));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSandwichData();
  }, [weekArray]);

  // 오늘 날짜 구하기
  const todayDate = format(new Date(), 'yyyy-MM-dd');

  // 모두 지우기 기능
  // 1. 날짜(th)을 클릭하면 해당 날짜에 해당하는 Dropdown border 색상이 변경
  // 2. 모두 지우기 버튼을 클릭하면 supabase에서 해당 날짜의 데이터를 모두 삭제

  const handleDeleteAllData = async (date: string | undefined) => {
    const period = `${weekArray[0]} ~ ${weekArray[6]}`;
    if (date === undefined) {
      return;
    }
    try {
      await supabase.from('sandwich_schedule').delete().eq('date', date);

      const { data } = await supabase.from('sandwich_schedule').select('*').eq('period', period);
      setDropdownData(formatSandwichData(data as SandwichData[]));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 활성화 날짜
  const [activeDay, setActiveDay] = useState<string>();
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

    console.log({ previousData });

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
            nextDropdownData = '주';
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
      console.log({ newData });

      // 새로운 데이터를 DB에 삽입
      await supabase.from('sandwich_schedule').upsert(newData);

      // 업데이트된 데이터 불러오기
      const { data } = await supabase.from('sandwich_schedule').select('*').eq('period', period);
      setDropdownData(formatSandwichData(data as SandwichData[]));
    }
  };

  return (
    <div>
      <div>
        <div className="flex gap-5">
          <button
            onClick={() => {
              handleFillAllData(activeDay);
            }}
          >
            모두 채우기
          </button>
          <button
            onClick={() => {
              handleDeleteAllData(activeDay);
            }}
          >
            모두 지우기
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
                className="text-xs font-extralight"
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
                <td key={rowIndex}>
                  <Dropdown
                    buttonContent={dropdownData[columnIndex][rowIndex]}
                    dropdownContent={colorsContent}
                    onSelect={(index: number) => {
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
