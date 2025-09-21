"use client";

import { createContext, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, type SupportedLocale } from "./config";
import { translate } from "./resources";

type I18nContextValue = {
  locale: SupportedLocale;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  t: (key: string) => translate(DEFAULT_LOCALE, key),
});

export const I18nProvider = ({
  locale = DEFAULT_LOCALE,
  children,
}: {
  locale?: SupportedLocale;
  children: React.ReactNode;
}) => {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key: string) => translate(locale, key),
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);
