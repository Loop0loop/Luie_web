import type { Metadata } from "next";
import { Inter, Nanum_Myeongjo } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/dictionary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luie — 작가를 위한 워드프로세서",
  description: "작가의 흐름을 방해하지 않는 워드프로세서, Luie.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }, { lang: "ja" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning className="scroll-smooth snap-y snap-mandatory">
      <body className={`${inter.variable} ${nanumMyeongjo.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header dictionary={dictionary.header} />
          {children}
          <Footer dictionary={dictionary.footer} lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
