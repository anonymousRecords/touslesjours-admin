'use client';
import { addDays, format, startOfWeek } from 'date-fns';
import { useState, useEffect } from 'react';
import { SandwichTable } from '@/components/SandwichTable';

export default function SandwichPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekArray, setWeekArray] = useState<string[]>([]);

  useEffect(() => {
    const updateWeekArray = () => {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // 월요일 시작
      const newWeekArray = Array(7)
        .fill(null)
        .map((_, index) => format(addDays(start, index), 'yyyy-MM-dd'));
      setWeekArray(newWeekArray);
    };
    updateWeekArray();
  }, [currentDate]);

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? addDays(currentDate, -7) : addDays(currentDate, 7);
    setCurrentDate(newDate);
  };

  return (
    <main className="flex flex-col gap-10 items-center justify-center flex-1 p-4">
      <div className="flex gap-5">
        <button onClick={() => handleWeekChange('prev')}>이전</button>
        <button onClick={() => handleWeekChange('next')}>다음</button>
      </div>

      <SandwichTable weekArray={weekArray} />
    </main>
  );
}
