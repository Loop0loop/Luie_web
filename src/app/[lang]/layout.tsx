import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { getDictionary } from "@/lib/dictionary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luie - Build Faster",
  description: "The ultimate PC application for developers.",
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
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header dictionary={dictionary.header} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
