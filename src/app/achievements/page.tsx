import { ACHIEVEMENTS } from "@/lib/constants/achievements";
import { cookies } from "next/headers";
import { translate } from "@/lib/i18n/resources";

const DEFAULT_LOCALE = "ru";
type Locale = "ru" | "en";

export default async function AchievementsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value ?? DEFAULT_LOCALE) as Locale;

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{translate(locale, "ui.achievements.title")}</h1>
        <p className="text-sm text-slate-300">{translate(locale, "ui.achievements.subtitle")}</p>
      </header>
      <section className="space-y-4">
        {ACHIEVEMENTS.map((achievement) => (
          <article key={achievement.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{translate(locale, achievement.nameKey)}</h2>
              <span className="text-xs text-purple-200">
                {achievement.threshold} · +{achievement.reward}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{translate(locale, achievement.descriptionKey)}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
