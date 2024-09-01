// 과거 날짜인지 확인하는 함수
export const isPastDate = (selectedDate: Date): boolean => {
  const currentDate = new Date();
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // 오늘 날짜의 0시 0분 0초

  // 선택한 날짜가 오늘보다 이전인지 확인
  return selectedDate < today;
};
