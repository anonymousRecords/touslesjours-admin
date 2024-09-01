import { Suspense } from 'react';
import ColdPlateClient from './components/ColdPlateClient';

export default async function WorkLogPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">냉판</h1>
      <h3 className="text-sm mb-6">냉판 담당자를 확인할 수 있어요</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ColdPlateClient />
      </Suspense>
    </div>
  );
}
