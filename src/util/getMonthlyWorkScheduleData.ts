import { AssignedWorkers } from '@/data/type';
import { getMonth } from 'date-fns';
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
