'use server';

import { TablesInsert, TablesUpdate } from '@/data/supabase';
import { createClient } from '@/utils/supabase/server';

export const getSandwichSchedulesByPeriod = async (period: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('sandwich_schedule').select('*').eq('period', period);

  if (data == null) {
    return [];
  }

  return data;
};

export const getSandwichScheduleByDate = async (date: string) => {
  const supabase = createClient();
  const { data } = await supabase.from('sandwich_schedule').select('*').eq('date', date);

  if (data == null) {
    return [];
  }

  return data;
};

export const upsertSandwichSchedule = async (
  newSandwichSchedule: TablesUpdate<'sandwich_schedule'> | TablesInsert<'sandwich_schedule'>,
) => {
  const supabase = createClient();
  const { date, days, sandwich_type: sandwichType } = newSandwichSchedule;

  if (date == null || days == null || sandwichType == null) {
    return;
  }

  await supabase.from('sandwich_schedule').upsert({
    ...newSandwichSchedule,
    id: date + sandwichType,
    days: days,
    sandwich_type: newSandwichSchedule.sandwich_type!,
  });
};

export const deleteSandwichSchedule = async (date: string) => {
  const supabase = createClient();
  await supabase.from('sandwich_schedule').delete().eq('date', date);
};
