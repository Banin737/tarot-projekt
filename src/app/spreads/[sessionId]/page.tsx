import { cookies } from "next/headers";
import { translate } from "@/lib/i18n/resources";
import { SpreadResult } from "@/components/spread-result";

const DEFAULT_LOCALE = "ru";
type Locale = "ru" | "en";

type PageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SpreadPage({ params }: PageProps) {
  const { sessionId } = await params;
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as Locale;

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-purple-200">{translate(locale, "ui.spread.title")}</h1>
        <p className="text-sm text-slate-300">{translate(locale, "ui.spread.subtitle")}</p>
      </header>
      <SpreadResult sessionId={sessionId} />
    </main>
  );
}
