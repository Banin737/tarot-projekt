import Link from "next/link";
import { cookies } from "next/headers";
import { SECTION_CONFIG } from "@/lib/constants/sections";
import { translate } from "@/lib/i18n/resources";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/lib/i18n/config";

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as SupportedLocale;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Tarot Quest — {translate(locale, "ui.exploreSections")}
        </h1>
        <p className="text-sm text-slate-300">
          Выбирайте тематический раздел, отвечайте на уточняющие вопросы и получайте объяснимые интерпретации.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {SECTION_CONFIG.map((section) => (
          <article
            key={section.id}
            className="rounded-xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-purple-950/50"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{translate(locale, section.titleKey)}</h2>
              <span className="text-xs uppercase text-purple-300">
                {section.subcategories.length} сценариев
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {section.subcategories.map((subcategory) => (
                <li key={subcategory.id} className="rounded-lg border border-white/5 bg-slate-800/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{translate(locale, subcategory.titleKey)}</p>
                      <p className="text-xs text-slate-400">{translate(locale, subcategory.descriptionKey)}</p>
                    </div>
                    <Link
                      className="rounded-full bg-purple-600 px-4 py-1 text-xs font-semibold uppercase text-white"
                      href={`/sections/${section.slug}/${subcategory.slug}`}
                    >
                      {translate(locale, "ui.viewSubcategories")}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}

