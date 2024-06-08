'use client';

import { useEffect, useState } from 'react';
import { sandwichRows, sandwichColumns } from '@/data/type';
import { supabase } from '@/supabase/supabase';
import { Dropdown } from '../Dropdown';

type SandwichData = {
  id: number;
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
  weekeArray: string[];
}

function makeTable<T>(col: number, row: number, { initialValue }: { initialValue: T }) {
  return Array.from({ length: col }, () => Array.from({ length: row }, () => initialValue));
}

const SandwichTable = ({ weekeArray }: SandwichTableProps) => {
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
    const id = Math.floor(Math.random() * 100000000);
    const date = weekeArray[rowIndex];
    const colorName = colorsContent[colorIndex];
    const sandwichType = sandwichColumns[columnIndex];
    const period = `${weekeArray[0]} ~ ${weekeArray[6]}`;
    const days = sandwichRows[rowIndex];

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

      const { data } = await supabase.from('sandwich_schedule').select('*');
      setDropdownData(formatSandwichData(data as SandwichData[]));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchSandwichData = async () => {
      try {
        const { data: sandwichData, error: sandwichError } = await supabase
          .from('sandwich_schedule')
          .select('*');

        if (sandwichError) {
          throw sandwichError;
        }

        // 데이터가 있을 때만 상태 업데이트
        if (sandwichData && sandwichData.length > 0) {
          setDropdownData(formatSandwichData(sandwichData as SandwichData[]));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSandwichData();
  }, []);

  return (
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
          <th></th>
          {weekeArray.map((week, index) => (
            <th key={index} className="text-xs font-extralight">
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
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SandwichTable;
