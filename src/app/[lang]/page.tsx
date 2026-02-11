import { Hero } from "@/components/layout/hero";
import { Features } from "@/components/layout/features";
import { DownloadSection } from "@/components/layout/download";
import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex min-h-screen flex-col">
      <Hero dictionary={dictionary.hero} />
      <Features dictionary={dictionary.features} />
      <DownloadSection dictionary={dictionary.download} />
    </main>
  );
}
