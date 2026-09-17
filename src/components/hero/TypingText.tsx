import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { cn } from "../../lib/cn";

type TypingTextProps = {
  phrases: string[];
  className?: string;
};

const TYPE_DELAY_MS = 60;
const ERASE_DELAY_MS = 28;
const HOLD_FULL_MS = 2200;
const HOLD_EMPTY_MS = 500;
const INITIAL_DELAY_MS = 900;

/**
 * 문구를 타이핑하는 회전 자막. 문구가 하나면 한 번 타이핑하고 멈춘다(캐럿만 깜빡임).
 * 동작 감소 설정에서는 첫 문구를 고정 표시한다.
 */
export function TypingText({ phrases, className }: TypingTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState(reducedMotion ? (phrases[0] ?? "") : "");

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0] ?? "");
      return;
    }

    setText("");
    let phraseIndex = 0;
    let length = 0;
    let erasing = false;
    let timer = 0;

    const tick = () => {
      const phrase = phrases[phraseIndex];
      if (phrase === undefined) return;

      if (!erasing) {
        length += 1;
        setText(phrase.slice(0, length));
        if (length >= phrase.length) {
          // 문구가 하나면 지우지 않고 완성된 문장을 유지한다.
          if (phrases.length === 1) return;
          erasing = true;
          timer = window.setTimeout(tick, HOLD_FULL_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_DELAY_MS + Math.random() * 50);
        return;
      }

      length -= 1;
      setText(phrase.slice(0, length));
      if (length <= 0) {
        erasing = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(tick, HOLD_EMPTY_MS);
        return;
      }
      timer = window.setTimeout(tick, ERASE_DELAY_MS);
    };

    timer = window.setTimeout(tick, INITIAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [phrases, reducedMotion]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[0.18em] animate-caret bg-accent"
      />
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
