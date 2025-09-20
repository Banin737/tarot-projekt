import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SECTION_CONFIG } from "@/lib/constants/sections";
import { translate } from "@/lib/i18n/resources";

const DEFAULT_LOCALE = "ru";

type PageProps = {
  params: Promise<{ section: string }>;
};

export default async function SectionPage({ params }: PageProps) {
  const { section: sectionSlug } = await params;
  const section = SECTION_CONFIG.find((item) => item.slug === sectionSlug);
  if (!section) {
    notFound();
  }

  const locale = (cookies().get("locale")?.value ?? DEFAULT_LOCALE) as "ru" | "en";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2 border-b border-white/5 pb-4">
        <h1 className="text-2xl font-semibold">{translate(locale, section.titleKey)}</h1>
        <p className="text-sm text-slate-300">
          {translate(locale, "ui.startQuestionnaire")}
        </p>
      </header>
      <section className="space-y-4">
        {section.subcategories.map((subcategory) => (
          <article key={subcategory.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold">
              {translate(locale, subcategory.titleKey)}
            </h2>
            <p className="text-sm text-slate-400">
              {translate(locale, subcategory.descriptionKey)}
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href={`/sections/${section.slug}/${subcategory.slug}`}
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white"
              >
                {translate(locale, "ui.beginSpread")}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
