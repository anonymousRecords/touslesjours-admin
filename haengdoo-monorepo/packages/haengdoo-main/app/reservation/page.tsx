import React, { Suspense } from 'react';
import { getReservations } from '../../api/reservation';
import ReservationClient from './components/ReservationClient';

async function Reservation() {
  const reservations = await getReservations();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">예약</h1>
      <h3 className="text-sm mb-6">예약을 확인할 수 있어요</h3>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationClient reservations={reservations} />
      </Suspense>
    </div>
  );
}

export default Reservation;
