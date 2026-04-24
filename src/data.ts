import { Project, WorkLog, ContactInfo } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'user-onboarding-optimization',
    title: '사용자 온보딩 최적화',
    summary: '초기 이탈률 40%를 15%로 감소시킨 온보딩 여정 재설계 프로젝트',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    problem: [],
    hypothesis: [],
    decisionExecution: [],
    result: [],
    insight: [],
    externalLinks: [],
    published: true,
  },
  {
    id: '2',
    slug: 'data-driven-backlog-management',
    title: '데이터 기반 백로그 우선순위 시스템',
    summary: '직관 중심의 의사결정에서 데이터 기반의 구조적 협업 방식으로 전환',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    problem: [],
    hypothesis: [],
    decisionExecution: [],
    result: [],
    insight: [],
    externalLinks: [],
    published: true,
  },
];

export const INITIAL_LOGS: WorkLog[] = [
  {
    id: '1',
    slug: 'pm-note-01',
    title: '실패한 기능을 폐기하며 배운 것들',
    date: '2024.03.15',
    tags: ['의사결정', '회고'],
    excerpt: '반년 동안 준비한 기능을 런칭 2주 만에 폐기하기로 결정했습니다. 그 과정에서의 고통과 배움에 대하여.',
    content: `
# 실패한 기능을 폐기하며 배운 것들

우리는 때로 매몰 비용의 오류에 빠집니다. 특히 팀이 반년 넘게 고생해서 만든 기능이라면 더더욱 그렇습니다. 하지만 데이터는 냉혹했습니다. 

## 왜 우리는 멈춰야 했는가
1. 사용자의 핵심 문제와 어긋난 기능 정의
2. 복잡한 UI로 인한 높은 인지 부하
3. 가설 검증 없이 커져버린 스코프

## 결정의 순간
저는 팀원들을 설득해야 했습니다. "지금 멈추는 것이 더 큰 손실을 막는 유일한 방법입니다."

## 얻은 교훈
작게 시작하세요. 그리고 더 일찍 실패하세요.
    `,
    published: true,
  },
  {
    id: '2',
    slug: 'ux-psychology-for-pm',
    title: 'PM이 알아야 할 최소한의 심리학',
    date: '2024.02.20',
    tags: ['UX', '인사이트'],
    excerpt: '사용자의 행동 뒤에 숨겨진 인간의 본성을 이해하면 제품의 인터페이스가 달라집니다.',
    content: `
# PM이 알아야 할 최소한의 심리학

제품은 결국 사람이 사용합니다. 힉의 법칙(Hick's Law)부터 피츠의 법칙까지, 실무에서 바로 써먹는 심리학 원칙들을 정리했습니다.

... (중략) ...
    `,
    published: true,
  },
];

export const INITIAL_CONTACT: ContactInfo = {
  email: 'pm.example@gmail.com',
  ctaText: '연락하기',
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Medium', url: 'https://medium.com' },
  ],
};
