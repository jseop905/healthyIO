# HealthyIO - Project Document

## Overview

건강 관련 Input/Output 기반 분석 앱. 1차 MVP는 **배변 분석** 기능에 집중한다.
사용자가 배변을 촬영하면 AI가 변의 상태를 분석해 결과를 제공한다.

## MVP Scope

### 화면 구성

| #   | 화면        | 설명                            | 우선순위    |
| --- | ----------- | ------------------------------- | ----------- |
| 1   | 사진 촬영   | 카메라로 배변 촬영, 갤러리 선택 | P0          |
| 2   | 분석 리스트 | 요청/결과 목록 (날짜순)         | P0          |
| 3   | 분석 상세   | 개별 분석 결과 상세 보기        | P0          |
| 4   | 로그인      | 소셜 로그인 등                  | P2 (후순위) |

### 분석 결과 항목 (안)

- Bristol Stool Scale 분류 (Type 1~7): 백엔드 파이썬 분석

나머지 분석 항목은 미정

- 색상
- 추정 건강 상태 요약
- 개선 권장 사항

## Tech Stack

| 영역                  | 기술                                  |
| --------------------- | ------------------------------------- |
| Framework             | React Native + Expo                   |
| State / Data Fetching | TanStack React Query                  |
| HTTP Client           | Axios                                 |
| Schema Validation     | Zod                                   |
| Navigation            | Expo Router                           |
| Camera                | expo-camera / expo-image-picker       |
| AI 분석               | (미정) 외부 API (OpenAI Vision 등)    |
| Backend               | Python + FastAPI                      |
| Auth                  | (미정, 후순위)                        |
| Storage               | (미정)                                |

## 결정 사항

| #   | 항목          | 결정                                                       |
| --- | ------------- | ---------------------------------------------------------- |
| 1   | Navigation    | **Expo Router** - Expo 공식 권장, 파일 기반 라우팅         |
| 2   | Backend       | 백엔드 팀에서 구성 (Python + FastAPI)                      |
| 3   | AI 분석 방식  | 백엔드 경유 - 프론트엔드에서 FastAPI 호출                  |
| 4   | 인증          | MVP에서 제외                                               |
| 5   | 오프라인 지원 | 불필요 (서버 기반, 추후 로그인 도입 예정)                  |
| 6   | 다국어        | 한국어 전용 (추후 확장)                                    |

## 미결 사항

| #   | 항목        | 내용                                                         |
| --- | ----------- | ------------------------------------------------------------ |
| 1   | 이미지 저장 | 클라우드 or NAS - 비용 절감 방안 검토 필요 (백엔드 팀 협의) |
| 2   | 분석 항목   | 색상, 건강 상태 요약, 개선 권장 사항 - 범위 확정 필요       |

## 디렉토리 구조 (안)

Feature-Sliced Design 기반 구조를 사용한다.

```
src/
  app/              # Expo Router 파일 기반 라우팅
  components/       # 공용 UI 컴포넌트
  features/
    analysis/       # 분석 관련 (리스트, 상세, API 호출)
    camera/         # 촬영 관련
    auth/           # 인증 (후순위)
  lib/              # axios instance, query client 설정
  types/            # Zod schema & TypeScript 타입
```

## User Flow (MVP)

MVP에서는 분석 리스트가 홈 화면이다. 추후 대시보드로 전환 예정.
하단 탭 내비게이션에 촬영 버튼을 배치한다.

```
앱 실행 → 분석 리스트(홈) → 촬영 버튼(하단 탭) → 카메라/갤러리
  → 이미지 확인 → 분석 요청 → 로딩 → 결과 표시
  → 리스트에 저장 → 상세 보기 가능
```

## TODO

### 프론트엔드

- [ ] Expo 프로젝트 초기 세팅 (Expo Router, TypeScript)
- [ ] 공통 설정: Axios instance, React Query client, Zod 스키마
- [ ] 하단 탭 내비게이션 구성 (리스트 탭, 촬영 탭)
- [ ] 사진 촬영 화면 (expo-camera / expo-image-picker)
- [ ] 이미지 확인 및 분석 요청 화면
- [ ] 분석 리스트 화면 (홈)
- [ ] 분석 상세 화면

### 백엔드 (백엔드 팀)

- [ ] FastAPI 프로젝트 세팅
- [ ] 이미지 업로드 API
- [ ] Bristol Stool Scale 분석 API (AI 연동)
- [ ] 분석 결과 조회 API (리스트 / 상세)
- [ ] 이미지 저장 방식 결정 및 구현

### 협의 필요

- [ ] API 스펙 정의 (프론트-백엔드 인터페이스)
- [ ] 분석 결과 항목 최종 확정
- [ ] 이미지 저장소 결정
