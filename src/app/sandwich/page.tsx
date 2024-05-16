'use client';
import { addDays, format, startOfWeek } from 'date-fns';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SandwichTable } from '@/components/SandwichTable';

export default function SandwichPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monday = startOfWeek(currentDate);

  const weekArray = Array(7)
    .fill(null)
    .map((_, index) => format(addDays(monday, index), 'yyyy-MM-dd'));

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? addDays(currentDate, -7) : addDays(currentDate, 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen ">
      <Navbar />
      <main className="flex flex-col gap-10 items-center justify-center flex-1 p-4">
        <div>
          <button onClick={() => handleWeekChange('prev')}>이전</button>
          <button onClick={() => handleWeekChange('next')}>다음</button>
        </div>
        <SandwichTable weekeArray={weekArray} />
      </main>
    </div>
  );
}
