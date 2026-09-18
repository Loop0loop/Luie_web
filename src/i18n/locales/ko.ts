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
