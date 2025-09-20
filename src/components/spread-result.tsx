"use client";

import { useEffect, useState } from "react";
import type { InterpretResponse } from "@/lib/validation";
import { translate } from "@/lib/i18n/resources";
import { useTranslation } from "@/lib/i18n";

type Locale = "ru" | "en";

type TabKey = "meaning" | "advice" | "factors";

type SpreadResultProps = {
  sessionId: string;
};

export const SpreadResult = ({ sessionId }: SpreadResultProps) => {
  const { locale } = useTranslation();
  const [data, setData] = useState<InterpretResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("meaning");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/interpret", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, locale }),
        });
        if (!response.ok) {
          throw new Error("interpret.failed");
        }
        const json = (await response.json()) as InterpretResponse;
        setData(json);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Не удалось получить интерпретацию");
      }
    };

    void load();
  }, [locale, sessionId]);

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (!data) {
    return <p className="text-sm text-slate-300">Загружаем интерпретацию...</p>;
  }

  const currentLocale = (locale ?? "ru") as Locale;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-400">{data.outlook.toUpperCase()}</p>
            <h2 className="text-xl font-semibold">{data.summary}</h2>
          </div>
          <span className="text-2xl font-bold text-purple-300">{data.totalScore.toFixed(2)}</span>
        </div>
        <p className="mt-3 text-sm text-slate-300">{data.advice}</p>
      </div>
      <div>
        <div className="flex gap-3 border-b border-white/10 pb-2">
          <button
            type="button"
            className={`text-sm ${tab === "meaning" ? "font-semibold text-purple-300" : "text-slate-300"}`}
            onClick={() => setTab("meaning")}
          >
            {translate(currentLocale, "ui.meaningTab")}
          </button>
          <button
            type="button"
            className={`text-sm ${tab === "advice" ? "font-semibold text-purple-300" : "text-slate-300"}`}
            onClick={() => setTab("advice")}
          >
            {translate(currentLocale, "ui.adviceTab")}
          </button>
          <button
            type="button"
            className={`text-sm ${tab === "factors" ? "font-semibold text-purple-300" : "text-slate-300"}`}
            onClick={() => setTab("factors")}
          >
            {translate(currentLocale, "ui.factorsTab")}
          </button>
        </div>
        {tab === "meaning" ? (
          <ul className="mt-4 space-y-3">
            {data.cards.map((card) => (
              <li key={card.cardId} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{card.cardName}</h3>
                  <span className="text-sm text-purple-200">{card.polarityScore.toFixed(2)}</span>
                </div>
                <p className="text-sm text-slate-200">{card.meaning}</p>
                {card.notes ? <p className="text-xs text-slate-400">{card.notes}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "advice" ? (
          <ul className="mt-4 space-y-3">
            {data.cards.map((card) => (
              <li key={card.cardId} className="rounded-lg border border-purple-500/20 bg-purple-950/30 p-4">
                <h3 className="text-sm font-semibold text-purple-100">{card.cardName}</h3>
                <p className="text-sm text-purple-100/80">{card.advice}</p>
              </li>
            ))}
          </ul>
        ) : null}
        {tab === "factors" ? (
          <ul className="mt-4 space-y-3">
            {data.topFactors.map((factor, index) => (
              <li key={`${factor.cardId}-${index}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/60 p-3">
                <span className="text-sm text-slate-200">
                  {factor.cardId} · {factor.label}
                </span>
                <span className="text-sm font-semibold text-purple-200">{factor.value.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
