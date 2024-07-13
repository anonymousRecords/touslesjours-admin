import { sandwichColumns } from '../constants';
import { Tables } from './supabase';

export type WeekendArray = {
  date: string;
  person: string[];
};

export type AssignedWorkers = Tables<'work_schedule'>;
// export type AssignedWorkers = {
//   date: string;
//   workers: string[];
// };

export type SandwichType = (typeof sandwichColumns)[number];
