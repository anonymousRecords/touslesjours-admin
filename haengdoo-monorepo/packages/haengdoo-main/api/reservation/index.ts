'use server';

import { createClient } from 'core/src/supabase/server';
import { Reservation } from '../../types/types';

// 모든 예약 가져오기
export const getReservations = async (): Promise<Reservation[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('reservation_date', { ascending: true });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return data || [];
};

// 특정 예약 가져오기
export const getReservation = async (id: string): Promise<Reservation | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('reservations').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching reservation:', error);
    return null;
  }

  return data;
};

// 새 예약 추가하기
export const addReservation = async (
  reservation: Omit<Reservation, 'id'>,
): Promise<Reservation | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('reservations').insert(reservation).select().single();

  if (error) {
    console.error('Error adding reservation:', error);
    return null;
  }

  return data;
};

// 예약 수정하기
export const updateReservation = async (
  id: string,
  reservation: Partial<Omit<Reservation, 'id' | 'created_at' | 'updated_at'>>,
): Promise<Reservation | null> => {
  const supabase = createClient();
  console.log('Updating reservation with ID:', id);
  console.log('Update data:', reservation);
  const { data, error } = await supabase
    .from('reservations')
    .update(reservation)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating reservation:', error);
    return null;
  }

  return data;
};

// 예약 삭제하기
export const deleteReservation = async (id: string): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase.from('reservations').delete().eq('id', id);

  if (error) {
    console.error('Error deleting reservation:', error);
    return false;
  }

  return true;
};
