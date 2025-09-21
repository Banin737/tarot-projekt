import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/lib/i18n/config";
import { SECTION_CONFIG } from "@/lib/constants/sections";
import { QUESTIONNAIRES } from "@/lib/constants/questionnaires";
import { translate } from "@/lib/i18n/resources";
import { QuestionnaireForm } from "@/components/questionnaire-form";

type PageProps = {
  params: Promise<{ section: string; subcategory: string }>;
};

export default async function QuestionnairePage({ params }: PageProps) {
  const { section: sectionSlug, subcategory: subcategorySlug } = await params;
  const section = SECTION_CONFIG.find((item) => item.slug === sectionSlug);
  const subcategory = section?.subcategories.find((item) => item.slug === subcategorySlug);

  if (!section || !subcategory) {
    notFound();
  }

  const fields = QUESTIONNAIRES[subcategory.questionnaireId];
  if (!fields) {
    notFound();
  }

  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as SupportedLocale;

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2 border-b border-white/5 pb-4">
        <p className="text-xs uppercase text-slate-400">{translate(locale, section.titleKey)}</p>
        <h1 className="text-2xl font-semibold">{translate(locale, subcategory.titleKey)}</h1>
        <p className="text-sm text-slate-300">{translate(locale, `questionnaires.${subcategory.id}.description`)}</p>
      </header>
      <QuestionnaireForm templateId={subcategory.templateId} fields={fields} />
    </main>
  );
}
