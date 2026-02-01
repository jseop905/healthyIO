# HealthyIO - PoC 개발 진행 프로세스

백엔드 없이 프론트엔드 단독으로 전체 플로우를 구현하는 PoC 버전.
Mock 데이터 기반 분석 + AsyncStorage 로컬 저장으로 동작한다.

---

## Phase 1: 프로젝트 초기 세팅 ✅

### 체크리스트

- [x] Expo + TypeScript 템플릿으로 프로젝트 생성
- [x] Expo Router 설정 (파일 기반 라우팅)
- [x] 디렉토리 구조 생성 (`src/components`, `src/features`, `src/lib`, `src/types`)
- [x] `axios`, `@tanstack/react-query`, `zod` 설치
- [x] `expo-camera`, `expo-image-picker` 설치
- [x] Axios instance, QueryClientProvider 설정
- [x] 앱 빌드 및 실행 확인

---

## Phase 1.5: Git 연동 ✅

### 체크리스트

- [x] GitHub 원격 저장소 생성 및 연결
- [x] 브랜치 전략 결정 (main + feature 브랜치)
- [x] 초기 커밋 및 push

---

## Phase 2: 내비게이션 및 화면 뼈대 ✅

### 체크리스트

- [x] Expo Router 탭 레이아웃 구성
- [x] 분석 리스트 탭 (홈), 촬영 탭 라우트 생성
- [x] 분석 상세 / 이미지 확인 화면 라우트 생성
- [x] 탭 간 이동, 화면 간 네비게이션 동작 확인

---

## Phase 3: 촬영 기능 구현 ✅

### 체크리스트

- [x] 카메라 권한 요청 로직 구현
- [x] 카메라 촬영 / 갤러리 이미지 선택 기능 구현
- [x] 이미지 확인 화면 - 미리보기, 재촬영 버튼
- [x] 이미지 확인 화면 - 분석 요청 버튼 (UI만)
- [ ] 실기기에서 카메라/갤러리 동작 확인

---

## Phase 4: Mock 분석 + 로컬 저장 ✅

> **PoC 핵심 Phase.** 백엔드 API 대신 Mock 데이터와 AsyncStorage로 전체 플로우를 연결한다.

### 체크리스트

**데이터 모델 & 스키마**
- [x] 분석 결과 Zod 스키마 정의 (Bristol Scale Type, 색상, 요약, 권장사항)
- [x] TypeScript 타입 추출 (`z.infer`)

**Mock 분석 서비스**
- [x] Mock 분석 함수 구현 (랜덤 Bristol Type 1~7 + 고정 결과 반환)
- [x] 분석 요청 시 로딩 딜레이 시뮬레이션 (1~2초)

**AsyncStorage 저장**
- [x] `@react-native-async-storage/async-storage` 설치
- [x] 분석 결과 저장 함수 구현 (id, 날짜, 이미지 URI, 분석 결과)
- [x] 분석 결과 리스트 조회 함수 구현 (날짜순 정렬)
- [x] 분석 결과 상세 조회 함수 구현 (id 기반)

**React Query 훅**
- [x] `useSubmitAnalysis` 훅 작성 (Mock 분석 → AsyncStorage 저장)
- [x] `useAnalysisList` 훅 작성 (AsyncStorage 조회)
- [x] `useAnalysisDetail` 훅 작성 (AsyncStorage 조회)

### 완료 기준

이미지 확인 화면에서 분석 요청 → Mock 결과 생성 → AsyncStorage에 저장 → 조회 가능.

### 재개 시 확인

- Zod 스키마가 정의되어 있는가? → 없으면 처음부터
- AsyncStorage가 설치되어 있는가? → `npx expo install`
- Mock 분석 함수가 동작하는가?
- 저장/조회가 정상 동작하는가?

---

## Phase 5: 화면 완성 ✅

### 선행 조건

- [x] Phase 4 Mock 분석 + 로컬 저장 완료

### 체크리스트

**이미지 확인 화면**
- [x] 분석 요청 버튼 → `useSubmitAnalysis` 연동
- [x] 분석 중 로딩 상태 표시
- [x] 분석 완료 시 결과 화면으로 이동

**분석 리스트 화면 (홈)**
- [x] `useAnalysisList` 연동 (날짜순 정렬)
- [x] 리스트 항목 터치 시 상세 화면 이동
- [x] 빈 상태(empty state) 처리

**분석 상세 화면**
- [x] `useAnalysisDetail` 연동
- [x] Bristol Stool Scale 결과 표시
- [x] 촬영 이미지 표시
- [x] 색상, 건강 상태 요약, 개선 권장사항 표시

**전체 플로우 테스트**
- [ ] 촬영 → 분석 요청 → 리스트 확인 → 상세 보기 동작 확인

### 완료 기준

전체 유저 플로우가 Mock 데이터 기반으로 끊김 없이 동작한다.

### 재개 시 확인

- 분석 요청이 동작하는가? → mutation 훅 연결 확인
- 리스트에 데이터가 표시되는가? → query 훅 확인
- 전체 플로우가 끊기는 지점이 있는가?

---

## Phase 6: 마무리 및 PoC QA

### 체크리스트

**UI/UX**
- [x] 로딩 / 에러 / 빈 상태 UI 통일
- [x] 기본 스타일링 정리
- [x] 화면 전환 애니메이션 적용

**실기기 테스트**
- [ ] iOS 실기기 테스트
- [ ] Android 실기기 테스트
- [ ] 카메라 권한 거부 시 처리
- [ ] AsyncStorage 데이터 영속성 확인

**배포 준비 (선택)**
- [ ] EAS Build 설정
- [ ] 내부 테스트 배포 (TestFlight / Internal Track)

### 완료 기준

PoC 전체 플로우가 실기기에서 안정적으로 동작한다.

---

## 진행 순서 요약

```
Phase 1   프로젝트 세팅              ✅ 완료
  ↓
Phase 1.5 Git 연동                   ✅ 완료
  ↓
Phase 2   내비게이션 & 화면 뼈대      ✅ 완료
  ↓
Phase 3   촬영 기능                   ✅ 완료 (실기기 확인 남음)
  ↓
Phase 4   Mock 분석 + 로컬 저장       ✅ 완료
  ↓
Phase 5   화면 완성                   ✅ 완료 (전체 플로우 테스트 남음)
  ↓
Phase 6   마무리 & PoC QA             ← 현재 진행 대상
```

모든 Phase가 백엔드 없이 프론트엔드 단독으로 진행 가능하다.
추후 백엔드 완성 시 Phase 4의 Mock 서비스를 실제 API 호출로 교체하면 된다.

---

## PoC → 정식 전환 시 변경 사항

| 영역 | PoC (현재) | 정식 버전 |
| --- | --- | --- |
| AI 분석 | Mock 데이터 (랜덤 결과) | 백엔드 FastAPI → AI 모델 |
| 데이터 저장 | AsyncStorage (로컬) | 백엔드 DB |
| 이미지 저장 | 로컬 파일 URI | 클라우드/NAS |
| 인증 | 없음 | 소셜 로그인 |
