# 목적

1. 기능 요구사항 문서를 기반으로 한 테스트 시나리오 설계를 수행해본다.
    1. 테스트 시나리오 설계를 기반으로 부족하거나 문제있는 요구사항에 대한 수정 혹은 보완을 경험
    2. 요구사항 문서를 기반으로 한 리액트 컴포넌트 구조 설계 및 상태관리에 대한 설계를 경험
    3. 요구사항에 부합하는 합당한 라이브러리를 선택하여 구현하는 방법을 터득한다
2. 유닛 테스트 작성
    1. 각 요구사항에 대한 유닛 테스트 구현 경험
    2. 요구사항 별 중복/반복 되는 로직에 대한 최적화 작업
    3. 구조화를 통한 유닛 테스트의 depth 구현
    4. API 호출을 mocking 하여 엣지 케이스에 대한 테스트 수행
    5. Jest 사용에 익숙
        1. jest.fn 사용을 통한 모의 호출 테스트
        2. fakeTimer 사용을 통한 모의 타이머 적용
        3. 스냅샷 촬영을 통한 스냅샷 테스팅 구현
    6. React Testing Library 사용에 익숙
        1. Component rendering 결과를 검증하는 방법을 이해하고 적용
        2. fireEvent, userEvent 와 같은 사용자 인터렉션을 이용한 테스트 작성
    7. 설정과 해지의 올바른 적용
    8. 의존성 없는 테스트를 구현했는지에 대한 검토

# Figma 디자인 파일 (샘플)

[Figma링크](https://www.figma.com/file/ateg4fsntwNtv55P7VVwkz/%EC%A0%9C%ED%92%88-%EC%83%81%EC%84%B8-%ED%8E%98%EC%9D%B4%EC%A7%80?type=design&node-id=0%3A1&mode=design&t=k9R9a6DPoZsFpKKj-1)

# 요구사항

이커머스 메인 화면 구성

## 상단바 메뉴버튼

- 클릭 시 사이드바 표시 (자유 과제)
    - 사이드바 구현은 자유입니다.
    - *css animation 등 기존 프로덕트에서 사용되는 사이드바를 어떻게 구현할지에 대해서 고민해보는 과제입니다.*

## 장바구니 버튼

- 장바구니로 이동
    - `/cart`
    - 장바구니 화면 구현할 필요 없습니다.
    - route 이동만 검증

## 내 정보 버튼

- 내 정보 페이지로 이동
    - `/mypage`
    - 내 정보 화면 구현할 필요 없습니다.
    - route 이동만 검증

## 검색 버튼

- placeholder 텍스트: **`Search`**
- 검색어 입력 시 input 내 검색어 입력
- 검색어 1글자 이상 입력 시 (공백 포함) 우측 X 버튼 표시
- 우측 X 버튼 선택 시 입력된 검색어 모두 제거
- 검색어 입력상태에서 키보드 enter / 검색 누를 경우 검색 결과 화면으로 이동
    - (검색결과 화면 구현 필요 없습니다)
    - `/search?q={검색어}`
    - route 이동만 검증

## 상단 배너

- API 호출 결과의 배너를 카테고리 밑에 보여줍니다.
- 배너 클릭 시 API response의 url로 이동합니다.
    - 해당 url의 페이지를 구현할 필요는 없습니다.
    - route 이동만 검증
- API
    - url: `/api/ad-banner`
    - param:  없음
    - response:

    ```
    {
      result: 'OK' | 'ERROR'
      message?: string // error 시 error message
      data?: {
        imageSrc: string, // 이미지 주소
        url: string // 배너 클릭시 이동할 주소
      }
    }
    ```

    - Sample response
    
    ```
    // 성공 시
    {
      result: 'OK',
      data: {
        imageSrc: '/banners/favor-electronic.png',
        url: '/electronic?order=favor'
      }
    }
    
    // 실패 시
    {
      result: 'ERROR',
      message: '서버가 응답하지 않습니다. 잠시후 다시 시도해 주세요'
    }
    ```

    - ***pages/api 에 해당 API가 기본적으로 구현되어 있습니다***
        - 이를 기반으로 컴포넌트를 구현하면 됩니다.

## 타임 딜

- 시간 제한 이 걸려있는 할인 제품들을 보여줍니다.
- 시간이 끝날 경우 타임딜의 항목들은 disable 처리됩니다. (자유 구현)
- 타임딜 항목 클릭 시 해당 아이템의 제품 페이지로 이동합니다.
  - `/product/{id}`
- 타임딜 항목의 할인율은 discount / price * 100  으로 표시합니다.
- API
  - url: `/api/timedeal`
  - param:  없음
  - response:

  ```
  {
    result: 'OK' | 'ERROR'
    message?: string // error 시 error message
    data?: {
      items: Array<Product>
      dealEnded: Date
    }
  }
  ```

  - Sample response

  ```tsx
  // 성공 시
  {
    result: 'OK',
    data: {
      items: [
        { productId: '12345', name: '옷', price: 30000, discount: 3000 },
        { productId: '12345', name: '이어폰', price: 100000, discount: 25000 },
        { productId: '12345', name: '노트북', price: 1000000, discount: 250000 }
      ],
      dealEnded: Wed Sep 20 2023 12:00:00 GMT+0900 (Korean Standard Time)
    }
  }

  // 실패 시
  {
    result: 'ERROR',
    message: '서버가 응답하지 않습니다. 잠시후 다시 시도해 주세요'
  }
  ```

- ***pages/api 에 해당 API가 기본적으로 구현되어 있습니다***
  - 이를 기반으로 컴포넌트를 구현하면 됩니다.

## 추천 제품들

- API 호출 결과의 제품 목록을 보여줍니다.
- 제품 클릭 시 해당 제품 세부 페이지로 이동합니다.
  - `/product/{id}`
  - 세부페이지는 이번 과제 구현사항이 아닙니다.
- API
  - url: `/api/recommended`
  - param:  없음
  - response:

  ```
  {
    result: 'OK' | 'ERROR'
    message?: string // error 시 error message
    data?: {
      productList: Array<Product>
    }
  }
  ```

  - Sample response

  ```tsx
  // 성공 시
  {
    result: 'OK',
    data: {
      productList: [
        { productId: '12345', name: '옷', price: 30000, discount: 3000 },
        { productId: '12345', name: '이어폰', price: 100000, discount: 25000 },
        { productId: '12345', name: '노트북', price: 1000000, discount: 250000 }
      ],
    }
  }
    
  // 실패 시
  {
    result: 'ERROR',
    message: '서버가 응답하지 않습니다. 잠시후 다시 시도해 주세요'
  }
  ```

- ***pages/api 에 해당 API가 기본적으로 구현되어 있습니다***
  - 이를 기반으로 컴포넌트를 구현하면 됩니다.
