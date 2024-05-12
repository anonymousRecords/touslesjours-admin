export const getMonthlyWorkScheduleData = (workScheduleData, targetMonth) => {
  const monthlyWorkScheduleData = workScheduleData.filter((schedule) => {
    const scheduleMonth = new Date(schedule.date).getMonth() + 1;
    return scheduleMonth === targetMonth;
  });

  return monthlyWorkScheduleData;
};
