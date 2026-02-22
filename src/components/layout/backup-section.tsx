"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackupSectionProps {
  dictionary: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
}

export function BackupSection({ dictionary }: BackupSectionProps) {
  return (
    <section
      id="backup"
      className="min-h-screen flex items-center py-20 relative overflow-hidden bg-[hsl(0,0%,100%)] dark:bg-[hsl(240,3%,9%)]"
    >
      {/* Very subtle warm tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(180,170,155,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="container px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          {/* Icon — glass */}
          <div
            className="w-16 h-16 rounded-3xl mb-8 flex items-center justify-center
              bg-white/60 dark:bg-white/[0.06]
              backdrop-blur-xl
              border border-black/[0.06] dark:border-white/[0.1]
              shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <ShieldCheck className="w-8 h-8 text-foreground/55" />
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35 mb-3">
            {dictionary.eyebrow}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {dictionary.title}
          </h2>

          <p className="text-muted-foreground leading-loose mb-10 max-w-lg text-base">
            {dictionary.description}
          </p>

          <Button
            variant="ghost"
            className="gap-2 rounded-2xl text-foreground/60 hover:text-foreground
              bg-foreground/[0.04] dark:bg-white/[0.05]
              backdrop-blur-xl
              border border-foreground/[0.08] dark:border-white/[0.08]
              hover:bg-foreground/[0.07] dark:hover:bg-white/[0.1]
              transition-all duration-300 font-medium"
          >
            {dictionary.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
