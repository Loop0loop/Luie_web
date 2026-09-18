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
