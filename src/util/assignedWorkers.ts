// Info: 주말 배열에 작업자 할당하기
import { personList } from "@/constants";
import { AssignedWorkers, WeekendArray } from "@/data/type";

export const assignWorkers = (weekendArray: WeekendArray[]): AssignedWorkers[] => {
  const workers: AssignedWorkers[] = [];
  let luckyPersonId = 0;

  // 주말에 대해 반복
  for (let i = 0; i < weekendArray.length; i++) {
    const date = weekendArray[i].date;
    const worker1 = personList[luckyPersonId % personList.length].name;
    luckyPersonId++;
    const worker2 = personList[luckyPersonId % personList.length].name;
    luckyPersonId++;
    workers.push({ date, workers: [worker1, worker2] });
  }
  return workers;
};
