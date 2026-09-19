import type { Dictionary } from "./ko";

/** 日本語辞書 — 初稿翻訳、後ほど調整予定。 */
const ja: Dictionary = {
  meta: {
    title: "Luie — ウェブ小説作家のための執筆ワークスペース",
    description:
      "原稿、世界観、スナップショット、書き出しをひとつの流れで。ウェブ小説作家のためのワープロ Luie。",
  },
  nav: {
    menuAria: "メインメニュー",
    features: "機能",
    layouts: "レイアウト",
    canvas: "キャンバス・グラフ",
    faq: "Q&A",
  },
  actions: {
    download: "ダウンロード",
    explore: "Luieを詳しく見る",
  },
  hero: {
    ariaLabel: "Luieの紹介",
    headline: "物語をはじめよう",
    typingPhrases: ["新しい執筆をはじめてみましょう。"],
    sub: "macOS・Windows無料 — 原稿はいつでも自分のパソコンに",
    scroll: "Scroll",
  },
  sections: {
    features: {
      title: "Luieの機能",
      hint: "UIと機能を番号で紹介します",
    },
    layouts: {
      title: "4つのレイアウト",
      hint: "基本・Googleドキュメント・Scrivener・エディター",
    },
    canvas: {
      title: "キャンバス&グラフ",
      hint: "マークアップエディタのキャンバスと世界観グラフ",
    },
    more: {
      title: "そのほかの機能",
      hint: "メモリエンジン・スナップショット・書き出し・AI・スマートリンク",
    },
    faq: {
      title: "Q&A・コミュニティ",
      hint: "よくある質問と交流チャンネル",
    },
  },
  /** 02 機能ショーケース — 実際のLuie renderer UIをサービするカードデッキ。 */
  showcase: {
    overline: "Luieの機能",
    badge: "実際のLuie画面",
    tabs: {
      snapshot: "スナップショット",
      smartLink: "スマートリンク",
      research: "資料",
      storyline: "ストーリーライン",
    },
    sub: {
      snapshot:
        "いつでも戻れる原稿。保存時点に巻き戻し、変更された文をひと目で比較できます。",
      smartLink:
        "キャラクター・イベント・勢力・用語が原稿の中で生きて動きます。下線の固有名詞にホバーしてみてください。",
      research:
        "キャラクター、イベント、勢力 — 世界観の資料がいつも手元に。",
      storyline: "事件の流れを一枚に。ストーリーラインは近日公開。",
    },
    snapshot: {
      panelTitle: "スナップショット",
      autoSave: "自動保存",
      manualSave: "手動保存",
      time2h: "2時間前",
      time3d: "3日前",
    },
    smartLink: {
      hint: "下線の固有名詞にマウスを合わせてみてください — 実際のエディタのスマートリンクです。",
    },
    research: {
      tabs: {
        character: "キャラクター",
        event: "イベント",
        faction: "勢力",
      },
      groups: {
        character: "登場人物",
        event: "イベント記録",
        faction: "勢力",
      },
      noDescription: "説明がありません",
    },
    storyline: {
      comingSoon: "ストーリーラインは準備中です",
    },
  },
  brand: {
    homeAria: "Luieホームへ移動",
  },
  theme: {
    toLight: "ライトテーマに切り替え",
    toDark: "ダークテーマに切り替え",
  },
  lang: {
    selectAria: "言語を選択",
  },
};

export default ja;
