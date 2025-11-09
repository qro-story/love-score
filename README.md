# 연애 티어리스트 (Love Tier List)

커플을 위한 상호 평가 및 관계 개선 플랫폼

## 프로젝트 구조

```
love-score/
├── backend/          # NestJS 백엔드
├── frontend/         # Next.js 프론트엔드
├── prd.md           # 프로젝트 요구사항 문서
└── CLAUDE.md        # 개발 가이드
```

## 시작하기

### 백엔드 설정

```bash
cd backend
npm install
cp .env.example .env
# .env 파일을 실제 값으로 수정
npm run start:dev
```

### 프론트엔드 설정

```bash
cd frontend
npm install
cp .env.example .env.local
# .env.local 파일을 실제 값으로 수정
npm run dev
```

## 기술 스택

- **Backend**: NestJS 11.x, TypeORM, PostgreSQL (Supabase)
- **Frontend**: Next.js 14, React Query, Zustand, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + Passport.js

자세한 내용은 [CLAUDE.md](./CLAUDE.md)를 참고하세요.
