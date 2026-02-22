import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface DownloadProps {
  dictionary: {
    titleStart: string;
    titleEnd: string;
    description: string;
    cta: string;
    subtext: string;
  };
}

export function DownloadSection({ dictionary }: DownloadProps) {
  return (
    <section className="container py-24 lg:py-32">
      <ScrollReveal
        direction="scale"
        duration={0.5}
        className="relative overflow-hidden rounded-2xl bg-zinc-950 px-6 py-24 shadow-xl sm:px-24 xl:py-32 border border-black/10 dark:border-white/10"
      >
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-zinc-800/40 via-zinc-950/0 to-zinc-950/0"></div>
        
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl text-balance">
            {dictionary.titleStart}
            <br />
            {dictionary.titleEnd}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-zinc-400 text-balance">
            {dictionary.description}
          </p>
          <div className="mt-10 flex gap-x-6">
            <Button
              size="lg"
              className="bg-zinc-50 text-zinc-950 hover:bg-zinc-200 h-11 px-8 text-sm font-medium rounded-xl transition-colors duration-200"
            >
              <Download className="mr-2 h-4 w-4" />
              {dictionary.cta}
            </Button>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            {dictionary.subtext}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
