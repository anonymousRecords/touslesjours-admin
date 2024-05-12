// 주말인지 확인하는 함수
export const isWeekend = (selectedDate: Date): boolean => {
  return selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
};
