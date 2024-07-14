import { getMonth } from 'date-fns';
import { WorkSchedule } from '@/data/type';

export const getMonthlyWorkSchedules = (
  workSchedules: WorkSchedule[],
  targetMonth: number,
): WorkSchedule[] => {
  const monthlyWorkSchedules = workSchedules.filter((schedule) => {
    if (!schedule.date) {
      return false;
    }

    return getMonth(schedule.date) + 1 === targetMonth;
  });

  return monthlyWorkSchedules;
};
