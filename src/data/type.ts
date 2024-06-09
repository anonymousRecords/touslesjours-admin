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

export type SandwichData = {
  id: string;
  period: string;
  date: string;
  days: string;
  sandwich_type: string;
  dropdown_data: string;
};