"use server";

import { createClient } from 'core/src/supabase/server';
import { User } from "../../types/types";

export const getUsers = async (): Promise<User[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("users").select("id, username");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data || [];
};
