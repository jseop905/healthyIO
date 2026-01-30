import { Analysis } from '@/src/types/analysis';

export const mockAnalyses: Analysis[] = [
  {
    id: '1',
    imageUri: 'https://picsum.photos/seed/stool1/400/300',
    bristolType: 4,
    characteristics: ['이상적인 상태', '충분한 수분과 식이섬유'],
    createdAt: '2025-01-28T09:30:00Z',
  },
  {
    id: '2',
    imageUri: 'https://picsum.photos/seed/stool2/400/300',
    bristolType: 3,
    characteristics: ['정상 범위', '약간의 수분 부족 가능'],
    memo: '아침 식사 후',
    createdAt: '2025-01-27T14:15:00Z',
  },
  {
    id: '3',
    imageUri: 'https://picsum.photos/seed/stool3/400/300',
    bristolType: 6,
    characteristics: ['경미한 설사', '스트레스 또는 식이 문제 가능'],
    memo: '매운 음식 섭취 후',
    createdAt: '2025-01-26T08:00:00Z',
  },
  {
    id: '4',
    imageUri: 'https://picsum.photos/seed/stool4/400/300',
    bristolType: 2,
    characteristics: ['경미한 변비', '장 통과 시간 느림', '수분 보충 필요'],
    createdAt: '2025-01-25T11:45:00Z',
  },
];
