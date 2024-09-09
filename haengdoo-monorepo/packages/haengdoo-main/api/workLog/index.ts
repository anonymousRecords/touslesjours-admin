"use server";

import { WorkLog } from "../../types/types";
import { createClient } from "../../utils/supabase/server";

export const getWorkLogs = async (
  userId: number,
  startDate: string,
  endDate: string
): Promise<WorkLog[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("work_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching work logs:", error);
    return [];
  }

  return data as WorkLog[];
};

export const addWorkLog = async (
  workLog: Omit<WorkLog, "id" | "created_at" | "updated_at">
): Promise<WorkLog | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("work_logs")
    .insert(workLog)
    .select()
    .single();

  if (error) {
    console.error("Error adding work log:", error);
    return null;
  }

  return data as WorkLog;
};

export const updateWorkLog = async (
  id: number,
  workLog: Partial<WorkLog>
): Promise<WorkLog | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("work_logs")
    .update(workLog)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating work log:", error);
    return null;
  }

  return data as WorkLog;
};

export const deleteWorkLog = async (id: number): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase.from("work_logs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting work log:", error);
    return false;
  }

  return true;
};

export const getShiftTimes = (
  shift: string
): { startTime: string; endTime: string } => {
  const shiftTimes = {
    "평일 오전": { startTime: "07:00", endTime: "12:00" },
    "평일 미들": { startTime: "12:00", endTime: "18:00" },
    "평일 마감": { startTime: "18:00", endTime: "22:00" },
    "주말 오전": { startTime: "07:00", endTime: "12:00" },
    "주말 미들": { startTime: "12:00", endTime: "18:00" },
    "주말 마감": { startTime: "18:00", endTime: "22:00" },
  };

  return (
    shiftTimes[shift as keyof typeof shiftTimes] || {
      startTime: "",
      endTime: "",
    }
  );
};
