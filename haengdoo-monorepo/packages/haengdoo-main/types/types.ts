import { sandwichColumns } from '../constants';

export type WeekendArray = {
  date: string;
  person: string[];
};

export type WorkSchedule = {
  id: number;
  date: string;
  workers: string[];
};

export type SandwichSchedule = {
  id: string;
  days: string;
  sandwich_type: string;
  date: string;
  dropdown_data: string;
  period: string;
};

export type SandwichType = (typeof sandwichColumns)[number];

export interface User {
  id: number;
  username: string;
}

export interface WorkLog {
  id: number;
  user_id: number;
  date: string;
  shift: string;
  start_time: string;
  end_time: string;
  hours: number;
  created_at: string;
  updated_at: string;
}

export interface UserShift {
  id: number;
  user_id: number;
  shift: string;
}

export type UsersByShift = Record<string, User[]>;

export interface SelectedShift {
  shift: string;
  userId: number;
  username: string;
}

export type Reservation = {
  id: string;
  payment_status: '완결' | '미결';
  preparation_status: '준비 예정' | '준비 완료';
  product: string;
  reservation_date: string;
  customer_name: string;
  customer_phone: string;
  notes: string;
};
