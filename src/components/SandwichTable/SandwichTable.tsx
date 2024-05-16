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

const SandwichTable = ({ weekeArray }: SandwichTableProps) => {
  // Dropdown 데이터를 관리하는 useState
  const [dropdownData, setDropdownData] = useState<string[][]>(
    Array.from({ length: sandwichColumns.length }, () =>
      Array.from({ length: sandwichRows.length }, () => ''),
    ),
  );

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
          const formattedData: string[][] = [[], [], [], [], [], [], [], [], [], [], []];

          // formattedData에 데이터 추가
          sandwichData.forEach((item: SandwichData) => {
            // 요일과 샌드위치 종류를 숫자로 매핑
            const rowIndex = sandwichRows.indexOf(item.days);
            const columnIndex = sandwichColumns.indexOf(item.sandwich_type);

            // period가 일치하는 데이터만 가져오기
            formattedData[columnIndex][rowIndex] = item.dropdown_data;
          });

          setDropdownData(formattedData);
          console.log('formattedData', formattedData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSandwichData();
  }, []);

  const handleDropDownChange = async (
    columnIndex: number,
    rowIndex: number,
    colorIndex: number,
  ) => {
    const id = Math.floor(Math.random() * 100000000);
    const date = weekeArray[rowIndex];
    const colorName = colorsContent[colorIndex];
    const sandwichType = sandwichColumns[columnIndex];
    console.log('colorName', colorName);
    try {
      // 기존 데이터 가져오기
      const { data: existingData, error: existingError } = await supabase
        .from('sandwich_schedule')
        .select('*')
        .eq('date', date)
        .eq('sandwich_type', sandwichType);

      if (existingError) {
        throw existingError;
      }

      console.log('existingData', existingData);

      // 업데이트
      if (existingData && existingData.length > 0) {
        const period = `${weekeArray[0]} ~ ${weekeArray[6]}`;
        const date = weekeArray[rowIndex];
        const days = sandwichRows[rowIndex];
        const sandwichType = sandwichColumns[columnIndex];

        console.log('id', id);
        console.log('period', period);
        console.log('date', date);
        console.log('days', days);
        console.log('sandwichType', sandwichType);

        const { data: updatedData, error: updatedError } = await supabase
          .from('sandwich_schedule')
          .update({ dropdown_data: colorName })
          .eq('date', date)
          .eq('sandwich_type', sandwichType);

        if (updatedError) {
          throw updatedError;
        }

        const { data } = await supabase.from('sandwich_schedule').select('*');

        // setDropdownData(updatedData);

        const formattedData: string[][] = [[], [], [], [], [], [], [], [], [], [], []];

        data?.forEach((item: SandwichData) => {
          // 요일과 샌드위치 종류를 숫자로 매핑
          const rowIndex = sandwichRows.indexOf(item.days);
          const columnIndex = sandwichColumns.indexOf(item.sandwich_type);

          // period가 일치하는 데이터만 가져오기
          formattedData[columnIndex][rowIndex] = item.dropdown_data;
        });

        console.log({ updated: updatedData, data, formattedData });

        setDropdownData(formattedData);

        // console.log('Data updated successfully:', updatedData);
      } else {
        const period = `${weekeArray[0]} ~ ${weekeArray[6]}`;
        const date = weekeArray[rowIndex];
        const days = sandwichRows[rowIndex];
        const sandwichType = sandwichColumns[columnIndex];

        const { data: insertedData, error: insertedError } = await supabase
          .from('sandwich_schedule')
          .insert({
            id: id,
            period: period,
            date: date,
            days: days,
            sandwich_type: sandwichType,
            dropdown_data: colorName,
          });

        if (insertedError) {
          throw insertedError;
        }

        const { data } = await supabase.from('sandwich_schedule').select('*');

        const formattedData: string[][] = [[], [], [], [], [], [], [], [], [], [], []];

        data?.forEach((item: SandwichData) => {
          // 요일과 샌드위치 종류를 숫자로 매핑
          const rowIndex = sandwichRows.indexOf(item.days);
          const columnIndex = sandwichColumns.indexOf(item.sandwich_type);

          // period가 일치하는 데이터만 가져오기
          formattedData[columnIndex][rowIndex] = item.dropdown_data;
        });

        setDropdownData(formattedData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
                    // console.log('index', index)
                    // setButtonNumber(index);
                    // console.log('buttonNumber', buttonNumber);
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
