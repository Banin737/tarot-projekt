"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { QuestionnaireField } from "@/lib/constants/questionnaires";
import { translate } from "@/lib/i18n/resources";
import { useTranslation } from "@/lib/i18n";

type Locale = "ru" | "en";

export type QuestionnaireFormProps = {
  templateId: string;
  fields: QuestionnaireField[];
};

type FormState = Record<string, string | string[] | number>;

export const QuestionnaireForm = ({ templateId, fields }: QuestionnaireFormProps) => {
  const router = useRouter();
  const { locale } = useTranslation();
  const [formState, setFormState] = useState<FormState>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: QuestionnaireField, value: string | string[] | number) => {
    setFormState((prev) => ({ ...prev, [field.id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const answers = Object.entries(formState).map(([questionId, value]) => ({
        questionId,
        value,
        tags: [],
      }));

      const sessionResponse = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, locale, questionnaireAnswers: answers }),
      });

      if (!sessionResponse.ok) {
        throw new Error("session.create_failed");
      }

      const sessionJson = (await sessionResponse.json()) as { sessionId: string };

      const drawResponse = await fetch("/api/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionJson.sessionId, count: fields.length, allowReversed: true }),
      });

      if (!drawResponse.ok) {
        throw new Error("draw.failed");
      }

      router.push(`/spreads/${sessionJson.sessionId}`);
    } catch (submitError) {
      console.error(submitError);
      setError("Не удалось подготовить расклад. Попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentLocale = (locale ?? "ru") as Locale;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium text-slate-200" htmlFor={field.id}>
            {translate(currentLocale, field.labelKey)}
          </label>
          {field.helperKey ? (
            <p className="text-xs text-slate-400">{translate(currentLocale, field.helperKey)}</p>
          ) : null}
          {field.type === "select" && field.options ? (
            <select
              id={field.id}
              defaultValue=""
              className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm"
              onChange={(event) => handleChange(field, event.target.value)}
              required
            >
              <option value="" disabled>
                --
              </option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {translate(currentLocale, option.labelKey)}
                </option>
              ))}
            </select>
          ) : null}
          {field.type === "multiselect" && field.options ? (
            <div className="flex flex-wrap gap-3">
              {field.options.map((option) => {
                const current = (formState[field.id] as string[]) ?? [];
                const checked = current.includes(option.value);
                return (
                  <label key={option.value} className="flex items-center gap-2 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => {
                        const next = event.target.checked
                          ? [...current, option.value]
                          : current.filter((item) => item !== option.value);
                        handleChange(field, next);
                      }}
                    />
                    {translate(currentLocale, option.labelKey)}
                  </label>
                );
              })}
            </div>
          ) : null}
          {field.type === "scale" ? (
            <div className="flex items-center gap-3">
              <input
                type="range"
                id={field.id}
                min={0}
                max={10}
                defaultValue={5}
                className="flex-1"
                onChange={(event) => handleChange(field, Number(event.target.value))}
              />
              <span className="w-10 text-right text-sm">{(formState[field.id] as number) ?? 5}</span>
            </div>
          ) : null}
          {field.type === "text" ? (
            <input
              type="text"
              id={field.id}
              className="w-full rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm"
              onChange={(event) => handleChange(field, event.target.value)}
            />
          ) : null}
        </div>
      ))}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        type="submit"
        className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? "Загрузка..." : translate(currentLocale, "ui.beginSpread")}
      </button>
    </form>
  );
};
