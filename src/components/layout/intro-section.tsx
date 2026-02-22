"use client";

import { motion } from "framer-motion";

interface IntroSectionProps {
  dictionary: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
  };
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function IntroSection({ dictionary }: IntroSectionProps) {
  return (
    <section
      id="intro"
      className="min-h-screen flex items-center py-20 bg-[hsl(0,0%,100%)] dark:bg-[hsl(240,3%,9%)]"
    >
      <div className="container px-6 w-full">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35">
              {dictionary.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight whitespace-pre-line text-foreground">
              {dictionary.title}
            </h2>
            <p className="text-muted-foreground leading-loose whitespace-pre-line text-base">
              {dictionary.description}
            </p>
          </motion.div>

          {/* Editor mockup — glass card */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              className="rounded-3xl overflow-hidden
                bg-white/80 dark:bg-white/[0.04]
                backdrop-blur-2xl
                border border-black/[0.06] dark:border-white/[0.07]
                shadow-[0_8px_48px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.4)]"
              role="img"
              aria-label={dictionary.imageAlt}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3.5 border-b border-black/[0.04] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-rose-300/60" />
                <span className="w-3 h-3 rounded-full bg-amber-300/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-300/60" />
                <span className="ml-auto text-[11px] text-muted-foreground/35 font-mono">
                  novel-chapter-01.luie
                </span>
              </div>

              {/* Editor layout */}
              <div className="grid grid-cols-[88px_1fr] divide-x divide-black/[0.04] dark:divide-white/[0.05] min-h-[300px]">
                {/* Sidebar */}
                <div className="bg-black/[0.01] dark:bg-white/[0.015] p-3 flex flex-col gap-1.5">
                  {["1장", "2장", "3장", "4장"].map((ch, i) => (
                    <div
                      key={ch}
                      className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                        i === 0
                          ? "bg-foreground/[0.07] text-foreground/65"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      {ch}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-7 space-y-3">
                  <div className="text-xs font-medium text-muted-foreground/30 mb-5 font-serif">
                    1장. 시작
                  </div>
                  {[76, 100, 88, 60, 0, 92, 100, 74, 52].map((w, i) =>
                    w === 0 ? (
                      <div key={i} className="h-3" />
                    ) : (
                      <div
                        key={i}
                        className="h-2.5 rounded-full bg-foreground/[0.055]"
                        style={{ width: `${w}%` }}
                      />
                    )
                  )}
                  {/* Cursor blink */}
                  <div className="flex items-center gap-0.5 mt-1">
                    <div
                      className="h-2.5 rounded-full bg-foreground/[0.055]"
                      style={{ width: "30%" }}
                    />
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1.1 }}
                      className="w-0.5 h-4 bg-foreground/35 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
