import React, { Suspense } from 'react';
import SandwichClient from './components/SandwichClient';

async function Reservation() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">샌드위치</h1>
      <h3 className="text-sm mb-6">샌드위치 스티커를 확인할 수 있어요</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <SandwichClient />
      </Suspense>
    </div>
  );
}

export default Reservation;
