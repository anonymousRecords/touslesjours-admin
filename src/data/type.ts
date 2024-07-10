import { sandwichColumns } from '../constants';

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type WeekendArray = {
  date: string;
  person: string[];
};

export type AssignedWorkers = {
  date: string;
  workers: string[];
};

export type SandwichType = (typeof sandwichColumns)[number];
