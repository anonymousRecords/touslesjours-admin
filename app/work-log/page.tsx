import { Suspense } from 'react';
import WorkLogClient from './components/WorkLogClient';

export default async function WorkLogPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">근무 기록</h1>
      <h3 className="text-sm mb-6">근무 기록을 남기고 확인할 수 있어요</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <WorkLogClient />
      </Suspense>
    </div>
  );
}
