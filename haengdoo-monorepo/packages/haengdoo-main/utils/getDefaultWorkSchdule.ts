import { format } from 'date-fns';

import { personList } from '../constants';
import { WeekendArray, WorkSchedule } from '../types/types';
import { getWeekendsInMonth } from './getWeekendsInMonth';

export function getDefaultWorkSchedule(year: number, month: number) {
  const weekends = getWeekendsInMonth(year, month);

  const weekendArray: WeekendArray[] = weekends.map((date) => {
    return { date: format(date, 'yyyy-MM-dd'), person: ['', ''] };
  });

  const workers: Array<Omit<WorkSchedule, 'id'>> = [];
  let luckyPersonId = 0;

  // 주말에 대해 반복
  for (let i = 0; i < weekendArray.length; i++) {
    const date = weekendArray[i].date;
    const worker1 = personList[luckyPersonId % personList.length].name;
    luckyPersonId++;
    const worker2 = personList[luckyPersonId % personList.length].name;
    luckyPersonId++;
    workers.push({
      date,
      workers: [worker1, worker2],
    });
  }
  return workers;
}
