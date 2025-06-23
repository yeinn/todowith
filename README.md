# 📝 TodoWith 프로젝트 소개


`투두윗(todowith)`는 **할 일 관리와 타임스탬프 사진 인증을 결합**한 미니멀 투두 앱입니다. 
자기계발, 스터디, 루틴 관리 등 인증이 필요한 사용자에게 동기부여가 되는 기록을 제공합니다.

---

## 📁 프로젝트 구조

```
todowith/
├── todowith-app/     # Expo 기반 모바일 앱 (사진 인증 + 투두 관리)
├── todowith-server/  # NestJS 기반 백엔드 서버 (익명 사용자 및 데이터 관리)
└── README.md          # 최상위 프로젝트 설명
```

---

## 📱 todowith-app

> Expo + React Native로 구현된 사진 인증 기반 투두 앱입니다.

### 주요 기능

* 투두 등록, 체크, 삭제
* 오늘 할 일만 필터링
* 카메라로 사진 인증
* 다크/라이트 모드 자동 지원
* 상태 관리: `zustand`

### 기술 스택

* 플랫폼: Expo (React Native)
* 라우팅: expo-router
* 상태 관리: zustand
* 스타일링: 기본 StyleSheet API
* 다크모드: `useColorScheme()` + ThemeContext

---

## 🖥️ todowith-server

> NestJS와 Supabase로 구성된 백엔드 API 서버입니다.

### 주요 기능

* 익명 사용자 등록 및 관리
* 할일 CRUD API
* 사진 인증 업로드 및 기록 관리
* Supabase Storage 및 PostgreSQL 연동

### 기술 스택

* 프레임워크: NestJS
* 데이터베이스: Supabase (PostgreSQL)
* 저장소: Supabase Storage
* 언어: TypeScript

---

## ▶️ 실행 방법

### 📱 todowith-app 실행

```bash
cd todowith-app
npm install
npm run start
```

> Expo Go 앱으로 QR코드 스캔하여 테스트 가능

### 🖥️ todowith-server 실행

```bash
cd todowith-server
npm install
# .env.local 파일 작성 필요
npm run start:dev
```

---

## 🔧 향후 개발 계획

* 인증 사진에 타임스탬프 삽입
* 히스토리(완료 내역) 화면 추가
* 그룹/스터디 기능 (MVP 이후)
* Supabase 연동 강화
* 공유 기능 (이미지 저장, 카카오 공유 등)
* 누적 공부 시간 통계

---

## 👤 만든이

* @yeinn 곰구마
* @suhwoo 

---

## 📜 라이선스

MIT License
