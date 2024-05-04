import { AssignedWorkers } from '@/data/type';

// 주말 배열에서 특정 담당자의 언급 횟수를 카운트하는 함수
const mentionCounter = (personName: string, assignedWorkers: AssignedWorkers[]): number => {
  let mentionCount = 0;

  // 주말 배열을 순회하면서 특정 담당자의 언급 횟수를 카운트
  for (const assingedWorkds of assignedWorkers) {
    const workers = assingedWorkds.workers;
    // workers 배열에서 "일번사람"이 언급된 횟수를 카운트
    mentionCount += workers.filter(worker => worker === personName).length;
  }

  return mentionCount;
};

export default mentionCounter;