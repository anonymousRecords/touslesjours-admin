import { useEffect, useState } from 'react';
import { sandwichColumns, sandwichRows } from '@/constants';
import { SandwichData } from '@/data/type';
import { supabase } from '@/supabase/supabase';
import { makeTable } from '@/util/makeTable';

export function useGetSanwichData(weekArray: string[]) {
  const [dropdownData, setDropdownData] = useState(
    makeTable(sandwichColumns.length, sandwichRows.length, { initialValue: '' }),
  );

  const onDropdownChange = (data: SandwichData[]) => {
    setDropdownData(formatSandwichData(data));
  };

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

  return { dropdownData, onDropdownChange };
}
