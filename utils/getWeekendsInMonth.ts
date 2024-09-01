import { eachDayOfInterval, endOfMonth, isWeekend, startOfMonth } from 'date-fns';

export function getWeekendsInMonth(year: number, month: number) {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(startDate);

  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const weekends = daysInMonth.filter((day) => isWeekend(day));

  return weekends;
}
