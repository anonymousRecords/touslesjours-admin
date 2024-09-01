'use client';
import React, { useState } from 'react';

import { addReservation, deleteReservation, updateReservation } from '../../../api/reservation';
import { Reservation } from '../../../types/types';
import AddReservationModal from './AddReservationModal';
import ReservationCalendar from './ReservationCalendar';
import ReservationList from './ReservationList';
import ViewSelector from './ViewSelector';

export type NewReservation = Reservation;

interface ReservationPageProps {
  reservations: Reservation[];
}

export default function ReservationClient({
  reservations: initialReservations,
}: ReservationPageProps) {
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddReservation = async (newReservation: Omit<Reservation, 'id'>) => {
    const result = await addReservation(newReservation);
    if (result) {
      setReservations([...reservations, result]);
    } else {
      alert('예약 추가에 실패했습니다.');
    }
  };

  const handleUpdateReservation = async (updatedReservation: Reservation) => {
    const { id, ...updateData } = updatedReservation;
    await updateReservation(id, updateData);
    const updatedReservations = reservations.map((r) =>
      r.id === id ? { ...r, ...updateData } : r,
    );
    setReservations(updatedReservations);
  };

  const handleDeleteReservation = async (id: string) => {
    const success = await deleteReservation(id);
    if (success) {
      setReservations(reservations.filter((r) => r.id !== id));
    } else {
      alert('예약 삭제에 실패했습니다.');
    }
  };

  return (
    <section className="mx-auto mt-6 max-w-7xl">
      <ViewSelector
        currentView={view}
        onViewChange={(newView) => setView(newView as 'calendar' | 'list')}
      />
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        추가하기
      </button>
      {view === 'calendar' ? (
        <ReservationCalendar reservations={reservations} />
      ) : (
        <ReservationList
          reservations={reservations}
          onUpdate={handleUpdateReservation}
          onDelete={handleDeleteReservation}
        />
      )}
      {isAddModalOpen && (
        <AddReservationModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddReservation}
        />
      )}
    </section>
  );
}
