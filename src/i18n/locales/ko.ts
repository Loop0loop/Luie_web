/**
 * 한국어 사전 — i18n의 원본. Dictionary 타입은 이 파일의 shape에서 파생되므로
 * 키를 추가하면 en/ja에서 컴파일 에러로 누락을 잡을 수 있다.
 * 배열(typingPhrases)은 모듈 상수라 참조가 고정되어 TypingText 재시작 문제가 없다.
 */
const ko = {
  meta: {
    title: "Luie — 웹소설 작가를 위한 집필 워크스페이스",
    description:
      "원고, 세계관, 스냅샷, 내보내기를 하나의 흐름으로. 웹소설 작가를 위한 워드프로세서 Luie.",
  },
  nav: {
    menuAria: "주요 메뉴",
    features: "기능",
    layouts: "레이아웃",
    canvas: "캔버스 · 그래프",
    faq: "Q&A",
  },
  actions: {
    download: "다운로드",
    explore: "Luie 살펴보기",
  },
  hero: {
    ariaLabel: "Luie 소개",
    headline: "이야기를 시작해보세요",
    typingPhrases: ["새로운 집필을 시작해보세요."],
    sub: "macOS · Windows 무료 — 원고는 언제나 내 컴퓨터에",
    scroll: "Scroll",
  },
  sections: {
    features: {
      title: "Luie의 기능들",
      hint: "UI와 기능을 번호로 소개합니다",
    },
    layouts: {
      title: "4가지 레이아웃",
      hint: "기본 · 구글 독스 · 스크리브너 · 에디터",
    },
    canvas: {
      title: "캔버스 & 그래프",
      hint: "마크업 에디터 캔버스와 세계관 그래프",
    },
    more: {
      title: "그 밖의 기능들",
      hint: "메모리 엔진 · 스냅샷 · 내보내기 · AI · 스마트 링크",
    },
    faq: {
      title: "Q&A · 커뮤니티",
      hint: "자주 묻는 질문과 소통 채널",
    },
  },
  /** 02 기능 쇼케이스 — 실제 Luie renderer UI를 서빙하는 카드 덱. */
  showcase: {
    overline: "Luie의 기능들",
    badge: "실제 Luie 화면",
    tabs: {
      snapshot: "스냅샷",
      smartLink: "스마트 링크",
      research: "자료",
      storyline: "스토리 라인",
    },
    sub: {
      snapshot:
        "언제든 돌아가는 원고. 저장 시점으로 되돌리고, 변경된 문장을 한눈에 비교합니다.",
      smartLink:
        "캐릭터 · 사건 · 세력 · 용어가 원고 안에서 살아 움직입니다. 밑줄 친 고유명사에 올려보세요.",
      research:
        "캐릭터, 사건, 세력 — 세계관 자료가 언제나 손끝에 있습니다.",
      storyline: "사건의 흐름을 한 장으로. 스토리 라인은 곧 만나요.",
    },
    snapshot: {
      panelTitle: "스냅샷",
      autoSave: "자동 저장",
      manualSave: "수동 저장",
      time2h: "2시간 전",
      time3d: "3일 전",
    },
    smartLink: {
      hint: "밑줄 친 고유명사에 마우스를 올려보세요 — 실제 에디터의 스마트 링크입니다.",
    },
    research: {
      tabs: {
        character: "캐릭터",
        event: "사건",
        faction: "세력",
      },
      groups: {
        character: "등장 인물",
        event: "사건 기록",
        faction: "세력",
      },
      noDescription: "설명이 없습니다",
    },
    storyline: {
      comingSoon: "스토리 라인은 준비 중입니다",
    },
  },
  brand: {
    homeAria: "Luie 홈으로 이동",
  },
  theme: {
    toLight: "라이트 테마로 전환",
    toDark: "다크 테마로 전환",
  },
  lang: {
    selectAria: "언어 선택",
  },
};

export type Dictionary = typeof ko;
export default ko;
