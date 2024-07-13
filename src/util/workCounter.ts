import { AssignedWorkers } from '@/data/type';

// 주말 배열에서 특정 담당자의 언급 횟수를 카운트하는 함수
const getMetionCount = (personName: string, assignedWorkers: AssignedWorkers[]): number => {
  const mentionCount = assignedWorkers.reduce((acc, assignedWork) => {
    if (assignedWork.workers == null) {
      return acc;
    }

    return acc + assignedWork.workers.filter((worker) => worker === personName).length;
  }, 0);

  return mentionCount;
};

export default getMetionCount;
