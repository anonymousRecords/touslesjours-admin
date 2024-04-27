// Info : 해당 달에 주말이 며칠 있는지 카운트하는 함수
export const weekendCounter = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  date.setDate(0);
  const lastDay = date.getDate();
  let count = 0;
  for (let i = 1; i <= lastDay; i++) {
    date.setDate(i);
    if (date.getDay() === 0 || date.getDay() === 6) {
      count++;
    }
  }
  return count;
};
