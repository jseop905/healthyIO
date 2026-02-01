# HealthyIO - 1차 설계 문서

## 1. 프로젝트 개요

**HealthyIO**는 대변 사진을 촬영하면 Bristol Stool Scale 기준으로 분석해주는 모바일 건강 관리 앱이다.

현재는 **PoC(Proof of Concept)** 단계로, 백엔드 없이 프론트엔드 단독으로 전체 플로우를 구현한다.
AI 분석은 Mock 데이터로 대체하고, 저장소는 AsyncStorage(로컬)를 사용한다.

### 핵심 유저 플로우

```
카메라 촬영/갤러리 선택
  → 이미지 확인
  → 분석 요청 (Mock)
  → 결과 저장 (AsyncStorage)
  → 분석 리스트에서 확인
  → 상세 보기
```

### 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React Native (Expo SDK 54) |
| 언어 | TypeScript (strict mode) |
| 라우팅 | Expo Router v6 (파일 기반) |
| 서버 상태 관리 | TanStack React Query v5 |
| HTTP 클라이언트 | Axios (PoC에서는 미사용, 정식 버전 대비) |
| 런타임 검증 | Zod v4 |
| 로컬 저장 | AsyncStorage |
| 카메라/갤러리 | expo-camera, expo-image-picker |

---

## 2. 디렉터리 구조

```
healthyIO/
├── app/                    # 화면 (Expo Router 파일 기반 라우팅)
│   ├── _layout.tsx         # 루트 레이아웃 (providers, 네비게이션 스택)
│   ├── +html.tsx           # 웹 전용 HTML 설정
│   ├── +not-found.tsx      # 404 화면
│   ├── confirm-image.tsx   # 이미지 확인 + 분석 요청 화면
│   ├── (tabs)/             # 탭 네비게이션 그룹
│   │   ├── _layout.tsx     # 탭 레이아웃 (탭 바 설정)
│   │   ├── index.tsx       # 분석 리스트 화면 (홈)
│   │   └── camera.tsx      # 촬영/갤러리 선택 화면
│   └── analysis/
│       └── [id].tsx        # 분석 상세 화면 (동적 라우트)
│
├── components/             # 공용 UI 컴포넌트
│   ├── Themed.tsx          # 테마 적용 Text, View 래퍼
│   ├── Button.tsx          # 공용 버튼 (variant/size 시스템)
│   ├── Card.tsx            # 카드 컨테이너
│   ├── BristolBadge.tsx    # Bristol Type 뱃지
│   ├── EmptyState.tsx      # 빈 상태 표시
│   ├── ErrorState.tsx      # 에러 상태 표시
│   ├── LoadingSpinner.tsx  # 로딩 스피너
│   ├── ExternalLink.tsx    # 외부 링크 (웹브라우저 연동)
│   ├── StyledText.tsx      # 모노스페이스 텍스트
│   ├── EditScreenInfo.tsx  # Expo 기본 템플릿 (미사용)
│   ├── useColorScheme.ts   # 시스템 다크모드 감지
│   └── useClientOnlyValue.ts # 웹/네이티브 분기 유틸
│
├── constants/              # 디자인 토큰
│   ├── Colors.ts           # 색상 팔레트 (light/dark + Bristol 색상)
│   └── Tokens.ts           # Spacing, Typography, BorderRadius, Shadows
│
├── src/                    # 비즈니스 로직
│   ├── types/
│   │   └── analysis.ts     # Zod 스키마 + TypeScript 타입
│   ├── data/
│   │   ├── bristolInfo.ts  # Bristol Stool Scale 1~7 정보 사전
│   │   └── mockAnalyses.ts # 초기 목업 데이터 (개발용)
│   ├── features/analysis/
│   │   ├── mockAnalysisService.ts  # Mock AI 분석 함수
│   │   ├── analysisStorage.ts      # AsyncStorage CRUD
│   │   └── hooks.ts                # React Query 훅 (mutation + query)
│   └── lib/
│       ├── axios.ts        # Axios 인스턴스 (정식 버전 대비)
│       └── queryClient.ts  # React Query 클라이언트 설정
│
├── assets/                 # 정적 리소스
│   ├── fonts/              # SpaceMono 폰트
│   └── images/             # 앱 아이콘, 스플래시
│
├── docs/                   # 문서
│   ├── PROCESS.md          # 개발 진행 프로세스 & 체크리스트
│   ├── PROJECT.md          # 프로젝트 기획
│   ├── COMMIT_CONVENTION.md # 커밋 컨벤션
│   └── ARCHITECTURE.md     # 설계 문서 (이 파일)
│
├── app.json                # Expo 앱 설정
├── tsconfig.json           # TypeScript 설정
└── package.json            # 의존성 관리
```

---

## 3. 라우팅 구조

Expo Router는 `app/` 디렉터리의 파일 구조가 곧 URL 경로가 된다.

```
경로                        파일                          설명
/                          app/(tabs)/index.tsx          분석 리스트 (홈 탭)
/(tabs)/camera             app/(tabs)/camera.tsx         촬영 탭
/confirm-image?uri=...     app/confirm-image.tsx         이미지 확인 (스택)
/analysis/[id]             app/analysis/[id].tsx         분석 상세 (스택)
```

### 네비게이션 계층

```
RootLayout (app/_layout.tsx)          ← Stack Navigator
├── (tabs) (_layout.tsx)              ← Tab Navigator
│   ├── index       분석 리스트
│   └── camera      촬영
├── confirm-image   이미지 확인        ← 스택으로 push
└── analysis/[id]   분석 상세          ← 스택으로 push
```

- **탭 간 이동**: 하단 탭 바로 전환
- **탭 → 스택 화면**: `router.push()`로 위에 쌓임 (뒤로 가기 가능)
- **화면 전환 애니메이션**: iOS는 `slide_from_right`, Android는 `fade`

---

## 4. 레이아웃 & Provider 구조

`app/_layout.tsx`가 앱 전체를 감싸는 최상위 레이아웃이다.

```
RootLayout
└── RootLayoutNav
    └── QueryClientProvider          ← React Query
        └── ThemeProvider            ← 다크모드 테마
            └── Stack Navigator      ← 화면 스택
```

- **QueryClientProvider**: 모든 화면에서 React Query 훅 사용 가능
- **ThemeProvider**: 시스템 설정에 따라 light/dark 테마 자동 전환
- **SplashScreen**: 폰트 로딩 완료 전까지 스플래시 유지

---

## 5. 데이터 모델

### Analysis (분석 결과)

```typescript
{
  id: string;              // 고유 ID (timestamp + random)
  imageUri: string;        // 촬영/선택한 이미지 로컬 경로
  bristolType: number;     // Bristol Stool Scale 1~7
  characteristics: string[]; // 특징 배열 (예: ["이상적인 상태", "충분한 수분"])
  memo?: string;           // 사용자 메모 (선택)
  createdAt: string;       // ISO 8601 날짜
}
```

Zod 스키마(`src/types/analysis.ts`)로 정의하고 `z.infer`로 TypeScript 타입을 추출한다.
AsyncStorage에서 데이터를 읽을 때 Zod로 런타임 검증을 수행한다.

### BristolTypeInfo (Bristol 유형 정보)

```typescript
{
  type: number;             // 1~7
  name: string;             // "부드러운 소시지" 등
  description: string;      // 설명
  characteristics: string[]; // 해당 유형의 특징
}
```

`src/data/bristolInfo.ts`에 7가지 유형 정보가 정적 데이터로 정의되어 있다.

---

## 6. 데이터 흐름

### 분석 요청 플로우

```
[카메라/갤러리] → imageUri 획득
       ↓
[confirm-image] → "분석 요청" 버튼 클릭
       ↓
useSubmitAnalysis (mutation)
       ↓
mockAnalysisService.analyzeImage(imageUri)
  - 1~2초 딜레이 시뮬레이션
  - 랜덤 Bristol Type 1~7 생성
  - bristolInfo에서 특징 매핑
  - Analysis 객체 반환
       ↓
analysisStorage.saveAnalysis(analysis)
  - AsyncStorage에 JSON 배열로 저장
  - 새 항목을 배열 맨 앞에 추가
       ↓
queryClient.invalidateQueries → 리스트 자동 갱신
       ↓
router.replace('/(tabs)') → 홈으로 이동
```

### 데이터 조회 플로우

```
[홈 화면] → useAnalysisList()
       ↓
analysisStorage.getAnalysisList()
  - AsyncStorage에서 JSON 읽기
  - Zod 스키마로 검증
  - 날짜 내림차순 정렬
       ↓
FlatList로 렌더링

[상세 화면] → useAnalysisDetail(id)
       ↓
analysisStorage.getAnalysisById(id)
  - 전체 리스트에서 id로 검색
```

---

## 7. 주요 파일별 설명

### 화면 (app/)

| 파일 | 역할 |
|------|------|
| `_layout.tsx` | 루트 레이아웃. QueryClientProvider, ThemeProvider, Stack Navigator 설정. 폰트 로딩 및 스플래시 관리 |
| `(tabs)/_layout.tsx` | 탭 레이아웃. "분석 리스트"와 "촬영" 두 개 탭 정의 |
| `(tabs)/index.tsx` | 홈 화면. 분석 결과 리스트를 FlatList로 표시. 빈 상태/로딩/에러 처리 |
| `(tabs)/camera.tsx` | 촬영 화면. 카메라 촬영 또는 갤러리 선택 버튼 제공. 권한 요청 처리 |
| `confirm-image.tsx` | 이미지 확인 화면. 미리보기 + 재촬영/분석 요청 버튼. 분석 중 로딩 표시 |
| `analysis/[id].tsx` | 분석 상세 화면. Bristol 유형, 특징, 메모, 촬영 이미지 표시 |
| `+not-found.tsx` | 404 페이지 |
| `+html.tsx` | 웹 빌드 시 HTML 템플릿 (다크모드 배경 깜빡임 방지) |

### 컴포넌트 (components/)

| 파일 | 역할 |
|------|------|
| `Themed.tsx` | `Text`, `View`를 래핑하여 light/dark 테마 색상 자동 적용. `useThemeColor` 훅 제공 |
| `Button.tsx` | 공용 버튼. `variant`(primary/secondary/outline), `size`(sm/md/lg), `loading`, `disabled` 지원 |
| `Card.tsx` | 카드 UI. 테마 배경색 + 보더 + 그림자. `onPress` 전달 시 터치 가능 |
| `BristolBadge.tsx` | Bristol Type 번호를 색상 뱃지로 표시 (Type 1~7 각각 고유 색상) |
| `EmptyState.tsx` | 데이터가 없을 때 표시. 아이콘 + 제목 + 설명 + 액션 버튼 |
| `ErrorState.tsx` | 에러 발생 시 표시. 아이콘 + 제목 + 설명 + "다시 시도" 버튼 |
| `LoadingSpinner.tsx` | 로딩 스피너. `fullScreen` 옵션으로 전체 화면 중앙 배치 가능 |

### 디자인 토큰 (constants/)

| 파일 | 역할 |
|------|------|
| `Colors.ts` | light/dark 모드 색상 정의. Bristol Type 1~7 전용 색상 포함 |
| `Tokens.ts` | `Spacing`(xs~xxl), `Typography`(heading1~caption), `BorderRadius`, `Shadows` 정의. 모든 컴포넌트가 이 토큰을 참조 |

### 비즈니스 로직 (src/)

| 파일 | 역할 |
|------|------|
| `types/analysis.ts` | `Analysis`, `BristolTypeInfo` Zod 스키마 + 타입 정의 |
| `data/bristolInfo.ts` | Bristol Stool Scale 7단계 정보 사전 (이름, 설명, 특징) |
| `data/mockAnalyses.ts` | 개발/테스트용 샘플 분석 데이터 4건 |
| `features/analysis/mockAnalysisService.ts` | Mock AI 분석 함수. 1~2초 딜레이 후 랜덤 Bristol Type 반환 |
| `features/analysis/analysisStorage.ts` | AsyncStorage 기반 CRUD. 저장/리스트조회/ID조회 함수 |
| `features/analysis/hooks.ts` | React Query 훅 3개: `useSubmitAnalysis`(mutation), `useAnalysisList`(query), `useAnalysisDetail`(query) |
| `lib/queryClient.ts` | React Query 클라이언트 설정 (retry: 2, staleTime: 5분) |
| `lib/axios.ts` | Axios 인스턴스 (PoC에서는 미사용, 정식 버전에서 API 호출용) |

---

## 8. 상태 관리 전략

| 종류 | 방식 | 사용처 |
|------|------|--------|
| 서버/영속 상태 | React Query + AsyncStorage | 분석 결과 리스트, 상세 데이터 |
| UI 로컬 상태 | React useState | 로딩 플래그, 권한 거부 상태 |
| 테마 상태 | React Navigation ThemeProvider | 시스템 다크모드 연동 |

React Query가 캐싱, 재요청, 무효화를 관리하므로 별도 전역 상태 라이브러리(Redux 등)는 사용하지 않는다.

### 캐시 무효화 흐름

```
useSubmitAnalysis → onSuccess
  → queryClient.invalidateQueries(['analyses'])
  → useAnalysisList 자동 재조회
  → 홈 화면 리스트 갱신
```

---

## 9. 테마 시스템

### 색상

`Colors.ts`에 `light`/`dark` 두 팔레트를 정의한다. `Themed.tsx`의 `useThemeColor` 훅이 현재 시스템 테마에 맞는 색상을 반환한다.

```
light                     dark
─────                     ─────
text: #000                text: #fff
textSecondary: #666       textSecondary: #aaa
background: #fff          background: #000
card: #f5f5f5             card: #1c1c1e
border: #e0e0e0           border: #333
tint: #2f95dc             tint: #fff
```

Bristol Type 색상(1~7)은 light/dark 공통이다.

### 디자인 토큰

모든 컴포넌트에서 하드코딩 대신 `Tokens.ts`의 값을 사용한다:

- **Spacing**: `xs(4)` `sm(8)` `md(16)` `lg(24)` `xl(32)` `xxl(48)`
- **Typography**: `heading1(28)` ~ `caption(12)` (fontSize + fontWeight + lineHeight 세트)
- **BorderRadius**: `sm(4)` `md(8)` `lg(12)` `xl(16)` `full(9999)`
- **Shadows**: iOS는 shadowOffset/Opacity, Android는 elevation 사용 (Platform.select)

---

## 10. PoC → 정식 버전 전환 시 변경 사항

| 영역 | PoC (현재) | 정식 버전 |
|------|-----------|-----------|
| AI 분석 | `mockAnalysisService.ts` (랜덤 결과) | 백엔드 FastAPI → AI 모델 호출 |
| 데이터 저장 | AsyncStorage (로컬 JSON) | 백엔드 DB (API 호출) |
| 이미지 저장 | 로컬 파일 URI | 클라우드 스토리지 / NAS |
| 인증 | 없음 | 소셜 로그인 |
| HTTP 통신 | 미사용 | `src/lib/axios.ts` 인스턴스 활용 |

전환 시 주요 변경 포인트:
1. `mockAnalysisService.ts` → 실제 API 호출 서비스로 교체
2. `analysisStorage.ts` → API 기반 CRUD로 교체
3. `hooks.ts`의 `mutationFn`/`queryFn`만 교체하면 화면 코드는 변경 불필요
