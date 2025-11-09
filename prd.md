
> 커플을 위한 상호 평가 및 관계 개선 플랫폼

## 📋 프로젝트 개요

연애 티어리스트는 게이미피케이션을 통해 연인 간의 관계를 개선하고 서로의 노력을 가시화하는 웹 애플리케이션입니다.

### 핵심 기능

- 🎯 **티어 시스템**: S~F 등급으로 현재 관계 기여도 시각화
- 💌 **칭찬/벌점 카드**: 직접적 표현이 어려운 피드백을 카드 형태로 전달
- 🎮 **퀘스트 시스템**: 서로가 원하는 것을 명확하게 요청하고 보상 획득
- 📊 **통계 대시보드**: 관계의 히스토리를 데이터로 분석
- ⏱️ **실시간 알림**: Supabase Realtime으로 즉각적인 피드백

## 🛠️ 기술 스택

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **ORM**: TypeORM 0.3.x
- **Database**: Supabase (PostgreSQL 15)
- **Validation**:  [nestjs-decorators-plus](https://www.npmjs.com/package/nestjs-decorators-plus)
- **Authentication**: Passport.js + JWT

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: React Query + Zustand
- **Charts**: Recharts

### Infrastructure
- **Backend Hosting**: Railway 
- **Frontend Hosting**: Vercel
- **Database**: Supabase
- **CI/CD**: GitHub Actions

자세한 기술 스택은 [TECH_STACK.md](./TECH_STACK.md)를 참고하세요.

## 📁 프로젝트 구조

```
couple-tier-list/
├── backend/                    # NestJS 백엔드
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── common/            # 공통 모듈
│   │   ├── config/            # 설정 파일
│   │   ├── modules/           # 기능별 모듈
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── couples/
│   │   │   ├── quests/
│   │   │   ├── cards/
│   │   │   └── ratings/
│   │   └── database/          # 마이그레이션
│   ├── test/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/               # App Router
│   │   ├── components/        # 재사용 컴포넌트
│   │   ├── lib/               # 유틸리티
│   │   └── types/             # 타입 정의
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```
