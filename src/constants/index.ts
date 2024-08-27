type NavigationItems = {
  name: string;
  label: string;
  href: string;
};

export const navigationItems: NavigationItems[] = [
  {
    name: 'home',
    label: '홈',
    href: '/',
  },
  {
    name: 'workschedule',
    label: '근무표',
    href: '/workschedule',
  },
  {
    name: 'reservation',
    label: '예약',
    href: '/reservation',
  },
  {
    name: 'cold-plate',
    label: '냉판',
    href: '/coldplate',
  },
  {
    name: 'sandwich',
    label: '샌드위치 스티커',
    href: '/sandwich',
  },
];

export const colorsContent = ['주', '녹', '흰', '기타'];

export const personList = [
  { id: 0, name: '1번 뚜둥이', color: '#F59696' },
  { id: 1, name: '2번 뚜둥이', color: '#FFD88C' },
  { id: 2, name: '3번 뚜둥이', color: '#A8F1E4' },
];

export const sandwichColumns = [
  'BELT',
  'VELT',
  '에그 쉬림프',
  '통밀',
  '아삭',
  '튜나',
  '매콤치킨랩',
  '반숙란',
  '리코타',
  '쉬림프에그',
  '고단백',
] as const;

export const sandwichRows = ['월', '화', '수', '목', '금', '토', '일'];
