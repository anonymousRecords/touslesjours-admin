"use server";

import { createClient } from 'core/src/supabase/server';
import { SandwichSchedule } from "../../types/types";

export const getSandwichSchedulesByPeriod = async (
  period: string
): Promise<SandwichSchedule[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("sandwich_schedule")
    .select("*")
    .eq("period", period);

  if (error) {
    console.error("Error fetching sandwich schedules:", error);
    return [];
  }

  return data || [];
};

export const getSandwichScheduleByDate = async (
  date: string
): Promise<SandwichSchedule[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("sandwich_schedule")
    .select("*")
    .eq("date", date);

  if (error) {
    console.error("Error fetching sandwich schedule:", error);
    return [];
  }

  return data || [];
};

export const upsertSandwichSchedule = async (
  newSandwichSchedule: SandwichSchedule
): Promise<void> => {
  const supabase = createClient();
  const { date, days, sandwich_type: sandwichType } = newSandwichSchedule;

  if (!date || !days || !sandwichType) {
    console.error("Missing required fields for upsert");
    return;
  }

  const { error } = await supabase.from("sandwich_schedule").upsert({
    ...newSandwichSchedule,
    id: `${date}${sandwichType}`,
  });

  if (error) {
    console.error("Error upserting sandwich schedule:", error);
  }
};

export const deleteSandwichSchedule = async (date: string): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("sandwich_schedule")
    .delete()
    .eq("date", date);

  if (error) {
    console.error("Error deleting sandwich schedule:", error);
  }
};
