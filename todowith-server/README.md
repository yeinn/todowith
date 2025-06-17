# TodoWith Server

TodoWith 앱의 백엔드 API 서버입니다. NestJS와 Supabase를 사용하여 익명 사용자 기반의 할일 관리 시스템을 제공합니다.

## 🚀 기술 스택

- **Framework**: NestJS (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Package Manager**: npm

## 📋 주요 기능

### 1. 익명 사용자 관리
- 앱 최초 실행 시 자동으로 `user_code` 생성 (예: `user_ABC123`)
- 중복 방지를 위한 자동 재생성 로직
- 로컬 저장을 위한 복구 코드 제공(예정)

### 2. 할일 관리 (CRUD)
- 할일 목록 조회: `GET /todos?userCode=user_ABC123`
- 할일 생성: `POST /todos`
- 할일 수정: `PATCH /todos/:id`
- 할일 삭제: `DELETE /todos/:id`

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
NODE_ENV=development
```

### 3. 서버 실행
```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run start:prod
```

## 📡 API 엔드포인트

### 사용자 관리
- `POST /users/register` - 새 익명 사용자 생성
- `GET /users/code/:userCode` - user_code로 사용자 조회

### 할일 관리
- `GET /todos?userCode=user_ABC123` - 사용자의 할일 목록 조회
- `POST /todos` - 새 할일 생성
  ```json
  {
    "userCode": "user_ABC123",
    "text": "새로운 할일입니다."
  }
  ```
- `PATCH /todos/:id` - 할일 수정
  ```json
  {
    "text": "수정된 할일",
    "completed": true
  }
  ```
- `DELETE /todos/:id` - 할일 삭제

## 🏗️ 프로젝트 구조

```
todowith-server/
├── src/
│   ├── users/              # 사용자 관리
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── todos/              # 할일 관리
│   │   ├── interfaces/
│   │   │   └── todo.interface.ts
│   │   ├── todos.controller.ts
│   │   ├── todos.service.ts
│   │   └── todos.module.ts
│   ├── supabase/           # Supabase 연동
│   │   └── supabase.service.ts
│   ├── app.module.ts       # 메인 모듈
│   └── main.ts            # 애플리케이션 진입점
├── .env.local             # 환경 변수
└── package.json
```

## 🚧 개발 예정 기능

- [ ] 사진 인증 모듈
- [ ] 그룹 생성 및 참여
- [ ] 공유 기능 (카카오톡, 이미지 저장)
- [ ] 누적 공부시간 저장

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
