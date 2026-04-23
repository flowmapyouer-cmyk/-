import { Project, WorkLog, ContactInfo } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'user-onboarding-optimization',
    title: '사용자 온보딩 최적화',
    summary: '초기 이탈률 40%를 15%로 감소시킨 온보딩 여정 재설계 프로젝트',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    images: [],
    problem: '신규 사용자의 40%가 첫 로그인 후 5분 이내에 이탈하고 있었습니다.',
    hypothesis: '복잡한 설정 과정을 뒤로 미루고, 즉각적인 가치 체험(Aha Moment)을 선행하면 유지율이 상승할 것이다.',
    decision: '필수 입력을 7개에서 2개로 줄이고 나머지는 사용 중에 입력받도록 전환했습니다.',
    execution: 'A/B 테스트를 통해 단계별 전환율을 측정하며 최적의 흐름을 도출했습니다.',
    result: '첫 주 유지율이 기존 대비 2.5배 상승했으며, 유료 전환율이 8% 개선되었습니다.',
    insight: '사용자는 완벽한 설정보다 빠른 성과를 원합니다. 신뢰는 행동 이후에 생깁니다.',
    published: true,
  },
  {
    id: '2',
    slug: 'data-driven-backlog-management',
    title: '데이터 기반 백로그 우선순위 시스템',
    summary: '직관 중심의 의사결정에서 데이터 기반의 구조적 협업 방식으로 전환',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    images: [],
    problem: '부서별 이해관계 충돌로 인한 개발 우선순위 산정 지연과 제품 로드맵 혼선.',
    hypothesis: '정량적 비즈니스 가치와 정성적 사용자 영향력을 점수화한 RICE 모델을 도입하면 합의 속도가 빨라질 것이다.',
    decision: '전사 공유 백로그 시트를 도입하고, 모든 태스크에 데이터 근거를 필수화했습니다.',
    execution: '3개월간 모든 유관 부서와의 주간 싱크 미팅을 통해 시스템을 안착시켰습니다.',
    result: '의사결정 리드타임 50% 단축, 분기 로드맵 달성률 20% 상승.',
    insight: '프로세스는 투명할수록 힘을 가집니다. 데이터는 설득의 도구가 아니라 합의의 거울입니다.',
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
