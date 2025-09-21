"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "@/lib/i18n/config";

export async function setLocale(locale: SupportedLocale) {
  const normalized = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const store = await cookies();
  store.set({
    name: "locale",
    value: normalized,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
