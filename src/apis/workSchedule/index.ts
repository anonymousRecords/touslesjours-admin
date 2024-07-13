'use server';

import { TablesInsert, TablesUpdate } from '@/data/supabase';
import { createClient } from '@/util/supabase/server';

export const getWorkSchedules = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('work_schedule').select('*');

  if (data == null) {
    return [];
  }

  return data;
};

export const upsertWorkSchedule = async (
  newWorkSchedule: TablesUpdate<'work_schedule'> | TablesInsert<'work_schedule'>,
) => {
  const supabase = createClient();
  await supabase.from('work_schedule').upsert(newWorkSchedule);
};

export const insertWorkSchedule = async (newWorkSchedule: TablesInsert<'work_schedule'>) => {
  const supabase = createClient();
  await supabase.from('work_schedule').insert(newWorkSchedule);
};
