// Info : 해당 달의 주말을 배열로 만들어주는 함수
// 예를 들어 24년 4월이면 '6, 7, 13, 14, 20, 21, 27, 28'이 주말에 해당한다.
// 따라서 weekendCounter(4)는 [
//   { date: 6, person: ['', ''] },
//   { date: 7, person: ['', ''] },
//   { date: 13, person: ['', ''] },
//   { date: 14, person: ['', ''] },
//   { date: 20, person: ['', ''] },
//   { date: 21, person: ['', ''] },
//   { date: 27, person: ['', ''] },
//   { date: 28, person: ['', ''] }
// ] 을 반환한다.

import { WeekendArray } from "@/data/type";

export const weekendArrayGenerator = (month: number): WeekendArray[] => {
  const date = new Date();
  date.setMonth(month);
  date.setDate(0);
  const lastDay = date.getDate();
  let count = 0;
  const weekendArray: WeekendArray[] = [];
  for (let i = 1; i <= lastDay; i++) {
    date.setDate(i);
    if (date.getDay() === 0 || date.getDay() === 6) {
      count++;
      weekendArray.push({ date: i, person: ['', ''] });
    }
  }
  return weekendArray;
};
