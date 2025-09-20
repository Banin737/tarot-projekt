"use client";

import { createContext, useContext, useMemo } from "react";
import { resources, translate, type Locale } from "./resources";

type I18nContextValue = {
  locale: Locale;
  t: (key: string) => string;
};

const defaultLocale: Locale = "ru";

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  t: (key: string) => translate(defaultLocale, key),
});

export const I18nProvider = ({
  locale = defaultLocale,
  children,
}: {
  locale?: Locale;
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
export { resources };
