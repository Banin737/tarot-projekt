import { ARTIFACTS } from "@/lib/constants/artifacts";
import { cookies } from "next/headers";
import { translate } from "@/lib/i18n/resources";

const DEFAULT_LOCALE = "ru";
type Locale = "ru" | "en";

export default async function ArtifactsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as Locale;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{translate(locale, "ui.artifacts.title")}</h1>
        <p className="text-sm text-slate-300">{translate(locale, "ui.artifacts.subtitle")}</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {ARTIFACTS.map((artifact) => (
          <article key={artifact.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{translate(locale, artifact.nameKey)}</h2>
              <span className="text-xs uppercase text-purple-300">{artifact.category}</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{translate(locale, artifact.descriptionKey)}</p>
            <p className="mt-4 text-xs text-slate-400">Base cost: {artifact.baseCost}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
