// Info : 해당 달의 주말을 배열로 만들어주는 함수
// 예를 들어 24년 4월이면 '6, 7, 13, 14, 20, 21, 27, 28'이 주말에 해당한다.
// 따라서 weekendCounter(4)는 [
//   { date: 24-04-06, person: ['', ''] },
//   { date: 24-04-07, person: ['', ''] },
//   { date: 24-04-13, person: ['', ''] },
//   { date: 24-04-14, person: ['', ''] },
//   { date: 24-04-20, person: ['', ''] },
//   { date: 24-04-21, person: ['', ''] },
//   { date: 24-04-27, person: ['', ''] },
//   { date: 24-04-28, person: ['', ''] }
// ] 을 반환한다.

import { WeekendArray } from '@/data/type';

export const generateMonthlyWeekendArray = (year: number, month: number): WeekendArray[] => {
  const date = new Date(year, month - 1, 1); 
  const lastDay = new Date(year, month, 0).getDate(); 
  const weekendArray: WeekendArray[] = [];

  for (let i = 1; i <= lastDay; i++) {
    date.setDate(i);
    if (date.getDay() === 0 || date.getDay() === 6) {
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      weekendArray.push({ date: formattedDate, person: ['', ''] });
    }
  }

  return weekendArray;
};
