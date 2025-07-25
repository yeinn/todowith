# TodoWith Server

TodoWith 앱의 백엔드 API 서버입니다. NestJS와 Supabase를 사용하여 익명 사용자 기반의 할일 관리 시스템을 제공합니다.

## 🚀 기술 스택

- **Framework**: NestJS (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Language**: TypeScript
- **Package Manager**: npm

## 📋 주요 기능

### 1. 익명 사용자 관리
- 앱 최초 실행 시 자동으로 `user_code` 생성 (예: `user_ABC123`)
- 중복 방지를 위한 자동 재생성 로직
- 로컬 저장을 위한 복구 코드 제공 (예정)

### 2. 할일 관리 (CRUD)
- 할일 목록 조회: `GET /todos?userCode=user_ABC123`
- 할일 생성: `POST /todos`
- 할일 수정: `PATCH /todos/:id`
- 할일 삭제: `DELETE /todos/:id`

### 3. 사진 인증
- 카메라로 촬영한 인증 사진 업로드
- 서버 시간 기준 타임스탬프 저장
- Supabase Storage를 통한 이미지 저장

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
  ```json
  
  // 응답
  {
      "id": "uuid-format-id",
      "user_code": "user_ABC123",
      "created_at": "2025-06-16T..."
  }
  ```


### 할일 관리
- `GET /todos?userCode=user_ABC123` - 사용자의 할일 목록 조회
  ```json

  // 응답
  [
    {
      "id": "uuid-format-id",
      "user_id": "user-uuid",
      "text": "할일 내용",
      "completed": false,
      "created_at": "2025-06-16T...",
      "updated_at": "2025-06-16T..."
    }
  ]
  ```

- `POST /todos` - 새 할일 생성
  ```json
  // 요청
  {
    "userCode": "user_ABC123",
    "text": "새로운 할일입니다."
  }
  
  // 응답
  {
    "id": "uuid-format-id",
    "user_id": "user-uuid",
    "text": "새로운 할일입니다.",
    "completed": false,
    "created_at": "2025-06-16T...",
    "updated_at": "2025-06-16T..."
  }
  ```

- `PATCH /todos/:id` - 할일 수정
  ```json
  // 요청
  {
    "text": "수정된 할일",
    "completed": true
  }
  
  // 응답
  {
    "id": "uuid-format-id",
    "user_id": "user-uuid",
    "text": "수정된 할일",
    "completed": true,
    "created_at": "2025-06-16T...",
    "updated_at": "2025-06-16T..."
  }
  ```

- `DELETE /todos/:id` - 할일 삭제
  ```json
  // 응답: 200 OK (성공적으로 삭제됨)
  ```

### 사진 인증
- `POST /verifications/upload` - 인증 사진 업로드
  ```json
  // 요청 (multipart/form-data)
  Form Data:
  - image: [파일]
  - userCode: "user_ABC123"
  
  // 응답
  {
    "id": "uuid-format-id",
    "user_id": "user-uuid",
    "image_url": "https://supabase.co/storage/v1/object/public/verifications/user_ABC123_1234567890.jpg",
    "verified_at": "2025-06-17T..."
  }
  ```

- `GET /verifications?userCode=user_ABC123` - 전체 인증 기록 조회
  ```json
  [
    {
      "id": "uuid-format-id",
      "user_id": "user-uuid",
      "image_url": "https://supabase.co/storage/v1/object/public/verifications/user_ABC123_1234567890.jpg",
      "verified_at": "2025-06-17T..."
    }
  ]
  ```

- `GET /verifications/today?userCode=user_ABC123` - 오늘 인증 기록 조회
  ```json
  [
    {
      "id": "uuid-format-id",
      "user_id": "user-uuid",
      "image_url": "https://supabase.co/storage/v1/object/public/verifications/user_ABC123_1234567890.jpg",
      "verified_at": "2025-06-17T..."
    }
  ]
  ```

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
│   ├── verifications/      # 사진 인증
│   │   ├── interfaces/
│   │   │   └── verification.interface.ts
│   │   ├── verifications.controller.ts
│   │   ├── verifications.service.ts
│   │   └── verifications.module.ts
│   ├── supabase/           # Supabase 연동
│   │   └── supabase.service.ts
│   ├── app.module.ts       # 메인 모듈
│   └── main.ts            # 애플리케이션 진입점
├── .env.local             # 환경 변수
└── package.json
```

## 🚧 개발 예정 기능

- [ ] 그룹 생성 및 참여
- [ ] 공유 기능 (카카오톡, 이미지 저장)
- [ ] 누적 공부시간 저장

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
