import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/lib/i18n/config";
import { LocaleSwitcher } from "@/components/locale-switcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarot Quest",
  description: "Explainable tarot spreads with game economy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as SupportedLocale;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}>
        <I18nProvider locale={locale}>
          <div className="min-h-screen">
            <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
              <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-semibold text-purple-200 hover:text-purple-100">
                  Tarot Quest
                </Link>
                <LocaleSwitcher />
              </div>
            </header>
            <div className="pb-16">{children}</div>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
