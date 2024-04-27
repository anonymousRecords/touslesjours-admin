export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type WeekendArray = {
  date: number;
  person: string[];
};

export type AssignedWorkers = {
  date: number;
  workers: string[];
};

export const personList = [
  { id: 0, name: '1번 뚜둥이' },
  { id: 1, name: '2번 뚜둥이' },
  { id: 2, name: '3번 뚜둥이' },
];
