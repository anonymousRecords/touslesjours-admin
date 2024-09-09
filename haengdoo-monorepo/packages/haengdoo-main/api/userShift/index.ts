"use server";

import { createClient } from 'core/src/supabase/server';
import { UsersByShift, UserShift } from "../../types/types";

export const getUsersByShift = async (): Promise<UsersByShift> => {
  const supabase = createClient();

  const { data: userShifts, error: userShiftsError } = await supabase
    .from("user_shifts")
    .select("*")
    .order("shift");

  if (userShiftsError) {
    console.error("Error fetching user shifts:", userShiftsError);
    return {};
  }

  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, username");

  if (usersError) {
    console.error("Error fetching users:", usersError);
    return {};
  }

  const userMap = new Map(users.map((user) => [user.id, user]));

  const usersByShift: UsersByShift = {};

  userShifts.forEach((userShift: UserShift) => {
    if (!usersByShift[userShift.shift]) {
      usersByShift[userShift.shift] = [];
    }
    const user = userMap.get(userShift.user_id);
    if (user) {
      usersByShift[userShift.shift].push(user);
    }
  });

  return usersByShift;
};
