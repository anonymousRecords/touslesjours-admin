import { getMonth } from 'date-fns';
import { AssignedWorkers } from '@/data/type';

export const getMonthlyWorkScheduleData = (
  workScheduleData: AssignedWorkers[],
  targetMonth: number,
): AssignedWorkers[] => {
  const monthlyWorkScheduleData = workScheduleData.filter((schedule) => {
    if (!schedule.date) {
      return false;
    }

    return getMonth(schedule.date) + 1 === targetMonth;
  });

  return monthlyWorkScheduleData;
};
