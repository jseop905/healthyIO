import { BristolTypeInfo } from '@/src/types/analysis';

export const bristolInfo: Record<number, BristolTypeInfo> = {
  1: {
    type: 1,
    name: '단단한 덩어리',
    description: '견과류처럼 단단하고 분리된 덩어리',
    characteristics: ['심한 변비', '수분 섭취 부족', '식이섬유 부족'],
  },
  2: {
    type: 2,
    name: '덩어리진 소시지',
    description: '소시지 모양이지만 울퉁불퉁한 덩어리',
    characteristics: ['경미한 변비', '장 통과 시간 느림', '수분 보충 필요'],
  },
  3: {
    type: 3,
    name: '갈라진 소시지',
    description: '소시지 모양에 표면 갈라짐',
    characteristics: ['정상 범위', '약간의 수분 부족 가능'],
  },
  4: {
    type: 4,
    name: '부드러운 소시지',
    description: '부드럽고 매끈한 소시지 또는 뱀 모양',
    characteristics: ['이상적인 상태', '충분한 수분과 식이섬유'],
  },
  5: {
    type: 5,
    name: '부드러운 덩어리',
    description: '가장자리가 명확한 부드러운 덩어리',
    characteristics: ['식이섬유 약간 부족', '정상에 가까움'],
  },
  6: {
    type: 6,
    name: '흐물흐물',
    description: '가장자리가 불규칙한 흐물흐물한 형태',
    characteristics: ['경미한 설사', '스트레스 또는 식이 문제 가능'],
  },
  7: {
    type: 7,
    name: '수양성',
    description: '고형분 없이 완전히 액체 상태',
    characteristics: ['설사', '감염 가능성', '수분 보충 필수'],
  },
};
