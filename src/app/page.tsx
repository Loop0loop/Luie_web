import { Hero } from "@/components/layout/hero";
import { Features } from "@/components/layout/features";
import { DownloadSection } from "@/components/layout/download";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <DownloadSection />
    </main>
  );
}
