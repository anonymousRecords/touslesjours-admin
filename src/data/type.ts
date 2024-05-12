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

export const personList = [
  { id: 0, name: '1번 뚜둥이', color: '#F59696' },
  { id: 1, name: '2번 뚜둥이', color: '#FFD88C' },
  { id: 2, name: '3번 뚜둥이', color: '#A8F1E4' },
];
