# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

연애 티어리스트 (Love Tier List) - A gamified couples' mutual evaluation and relationship improvement platform.

## Architecture

This is a monorepo containing:

### Backend (`backend/`)
- **Framework**: NestJS 10.x with TypeScript 5.x
- **Database**: Supabase (PostgreSQL 15) via TypeORM 0.3.x
- **Authentication**: Passport.js + JWT strategy
- **Validation**: nestjs-decorators-plus
- **Hosting**: Railway

Module structure:


- `modules/auth/` - Authentication and JWT handling
- `modules/users/` - User management
- `modules/couples/` - Couple pairing and management
- `modules/quests/` - Quest creation, assignment, and completion
- `modules/cards/` - Praise and penalty card system
- `modules/ratings/` - Tier system and rating calculations
- `common/` - Shared utilities, guards, decorators
- `config/` - Environment and app configuration
- `database/` - TypeORM migrations and seeds

### Frontend (`frontend/`)
- **Framework**: Next.js 14 with App Router
- **UI**: shadcn/ui components with Tailwind CSS
- **State Management**: React Query (server state) + Zustand (client state)
- **Charts**: Recharts for statistics visualization
- **Hosting**: Vercel

Directory structure:
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utilities, API clients, hooks
- `types/` - TypeScript type definitions

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

### Backend
```bash
cd backend
npm install
npm run start:dev      # Start development server
npm run build          # Build for production
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run migration:generate  # Generate TypeORM migration
npm run migration:run       # Run pending migrations
```

### Frontend
```bash
cd frontend
npm install
npm run dev            # Start Next.js dev server
npm run build          # Build for production
npm run lint           # Run ESLint
npm run test           # Run tests
```