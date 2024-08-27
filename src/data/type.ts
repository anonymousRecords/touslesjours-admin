import { sandwichColumns } from '../constants';
import { Tables } from './supabase';

export type WeekendArray = {
  date: string;
  person: string[];
};

export type WorkSchedule = Tables<'work_schedule'>;

export type SandwichType = (typeof sandwichColumns)[number];