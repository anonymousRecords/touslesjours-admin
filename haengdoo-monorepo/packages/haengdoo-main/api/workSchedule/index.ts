"use server";

import { createClient } from 'core/src/supabase/server';
import { WorkSchedule } from "../../types/types";

export const getWorkSchedules = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("work_schedule").select("*");

  if (data == null) {
    return [];
  }

  return data;
};

export const upsertWorkSchedule = async (newWorkSchedule: WorkSchedule) => {
  const supabase = createClient();
  await supabase.from("work_schedule").upsert(newWorkSchedule);
};

export const insertWorkSchedule = async (
  workSchedule: Omit<WorkSchedule, "id">
): Promise<WorkSchedule> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("work_schedules")
    .insert([workSchedule])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
