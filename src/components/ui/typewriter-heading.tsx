"use client";

import { useState, useEffect } from "react";

interface TypewriterHeadingProps {
  phrases: string[];
}

type TypewriterPhase = "typing" | "deleting";

export function TypewriterHeading({ phrases }: TypewriterHeadingProps) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<TypewriterPhase>("typing");

  useEffect(() => {
    const current = phrases[phraseIdx];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 75);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), 2400);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, 38);
        return () => clearTimeout(t);
      } else {
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, phraseIdx, phrases]);

  return (
    <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight leading-[1.2] text-foreground min-h-[2.4em]">
      <span>{displayed}</span>
      <span className="inline-block w-[2px] h-[0.85em] bg-foreground/60 ml-1 align-[-0.1em] rounded-sm animate-blink" />
    </h1>
  );
}
