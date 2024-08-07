import { useEffect, useState } from 'react';
import { getSandwichSchedulesByPeriod } from '@/apis/sandwich';
import { sandwichColumns, sandwichRows } from '@/constants';
import { Tables } from '@/data/supabase';
import { makeTable } from '@/util/makeTable';

export function useGetSanwichData(weekArray: string[]) {
  const [dropdownData, setDropdownData] = useState<Array<Array<string | null>>>(
    makeTable(sandwichColumns.length, sandwichRows.length, { initialValue: '' }),
  );

  const onDropdownChange = (data: Array<Tables<'sandwich_schedule'>>) => {
    setDropdownData(formatSandwichData(data));
  };

  const formatSandwichData = (sandwichData: Array<Tables<'sandwich_schedule'>>) => {
    const formattedData = makeTable<(typeof sandwichData)[number]['dropdown_data']>(
      sandwichColumns.length,
      sandwichRows.length,
      {
        initialValue: '',
      },
    );

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
      const existingData = await getSandwichSchedulesByPeriod(period);
      setDropdownData(formatSandwichData(existingData));
    };

    fetchSandwichData();
  }, [weekArray]);

  return { dropdownData, onDropdownChange };
}
