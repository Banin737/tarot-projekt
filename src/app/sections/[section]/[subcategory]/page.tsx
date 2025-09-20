import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SECTION_CONFIG } from "@/lib/constants/sections";
import { translate } from "@/lib/i18n/resources";

const DEFAULT_LOCALE = "ru";
type Locale = "ru" | "en";

type PageProps = {
  params: Promise<{ section: string; subcategory: string }>;
};

export default async function SubcategoryPage({ params }: PageProps) {
  const { section: sectionSlug, subcategory: subcategorySlug } = await params;
  const section = SECTION_CONFIG.find((item) => item.slug === sectionSlug);
  const subcategory = section?.subcategories.find((item) => item.slug === subcategorySlug);
  if (!section || !subcategory) {
    notFound();
  }

  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as Locale;
  const templateKey = subcategory.templateId.split("_")[0] ?? "triadInsight";

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase text-slate-400">{translate(locale, section.titleKey)}</p>
        <h1 className="text-2xl font-semibold">{translate(locale, subcategory.titleKey)}</h1>
        <p className="text-sm text-slate-300">{translate(locale, subcategory.descriptionKey)}</p>
      </header>
      <section className="rounded-xl border border-white/10 bg-slate-900/70 p-6">
        <h2 className="text-lg font-semibold text-purple-200">
          {translate(locale, `templates.${templateKey}.title`)}
        </h2>
        <p className="text-sm text-slate-300">
          {translate(locale, `templates.${templateKey}.description`)}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/questionnaires/${section.slug}/${subcategory.slug}`}
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white"
          >
            {translate(locale, "ui.startQuestionnaire")}
          </Link>
        </div>
      </section>
    </main>
  );
}
