# 📱투두윗(todowith) – 사진 인증 기반 투두 App

> Expo 기반으로 개발되었으며, 라이트/다크 모드를 지원하고 있습니다.

---

## 🚀 주요 기능

- [x] 할 일 작성, 체크, 삭제
- [x] 오늘 할 일만 보기
- [x] 사진 인증 기능 (카메라 연동)
- [x] 라이트/다크 모드 자동 지원
- [x] 상태 저장은 `zustand`로 관리

---

## 🛠️ 기술 스택

| 항목 | 기술 |
|------|------|
| 플랫폼 | Expo (React Native 0.79) |
| 라우팅 | expo-router |
| 상태 관리 | zustand |
| UI 스타일링 | 기본 StyleSheet API |
| 다크모드 | `useColorScheme()` + 커스텀 ThemeContext |


---

## 📁 폴더 구조

```
todowith-app/
├── app/
│ ├── index.tsx # TodoScreen
│ ├── camera.tsx # CameraScreen
│ └── _layout.tsx # 공통 레이아웃
│
├── components/
│ ├── features/ # 페이지별 UI
│ │ ├── TodoScreen.tsx
│ │ └── CameraScreen.tsx
│ └── ui/ # 재사용 UI 컴포넌트
│ ├── Button.tsx
│ ├── TextField.tsx
│ ├── Header.tsx
│ └── ScreenContainer.tsx
│
├── lib/
│ ├── store/ # zustand 상태관리
│ │ └── todo.ts
│ └── ThemeContext.tsx # 다크/라이트 테마 컨텍스트
│
├── hooks/ # 커스텀 훅
│ └── useKeyboardVisible.ts
│
├── constants/
│ └── index.ts # 색상, 크기 등 상수
│
├── assets/ # 아이콘, 이미지 등
│
├── app.json # Expo 설정
├── babel.config.js # Babel 설정
├── tsconfig.json # TypeScript 설정
└── README.md
```

---

## 🎨 다크모드 적용 방식

- `react-native`의 `useColorScheme()`으로 시스템 테마 감지
- `ThemeContext`를 통해 라이트/다크 테마 전역 전달
- `useTheme()` 훅으로 스타일에 접근

```tsx
const theme = useTheme()
<Text style={{ color: theme.text }}>Hello!</Text>
<View style={{ backgroundColor: theme.background }} />
```
---

## ✅ 실행 방법

```bash
npm install
npm run start
Expo Go 앱으로 QR 코드 스캔 시, 실제 디바이스에서 테스트 가능
```

---

## 📌 향후 계획

- [ ] 인증 사진 타임스탬프 삽입
- [ ] 완료 내역 히스토리 페이지
- [ ] 스터디/그룹 기능 연동 (MVP 이후)
- [ ] Supabase 연동으로 백업 지원

---

## 👤 만든이
* @yeinn 곰구마
