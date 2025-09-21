"use client";

import { useState, useTransition } from "react";
import { setLocale } from "@/app/actions/set-locale";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/i18n/config";
import { useTranslation } from "@/lib/i18n";

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  ru: "Русский",
  en: "English",
};

export const LocaleSwitcher = () => {
  const { locale } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<SupportedLocale>(locale);

  const handleSelect = (next: SupportedLocale) => {
    if (next === selected || isPending) {
      return;
    }
    setSelected(next);
    startTransition(async () => {
      try {
        await setLocale(next);
      } catch (error) {
        console.error("setLocale.error", error);
        setSelected(locale);
      }
    });
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-2 py-1 text-xs text-slate-200">
      {SUPPORTED_LOCALES.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleSelect(value)}
          className={`rounded-full px-3 py-1 transition-colors ${
            selected === value ? "bg-purple-600 text-white" : "text-slate-300 hover:text-white"
          } ${isPending && selected === value ? "opacity-70" : ""}`}
          aria-pressed={selected === value}
        >
          {LOCALE_LABELS[value]}
        </button>
      ))}
    </div>
  );
};
