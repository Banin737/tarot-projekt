import { z } from "zod";

export const interpretationFactorSchema = z.object({
  cardId: z.string(),
  label: z.string(),
  value: z.number(),
  type: z.enum(["base", "position", "major", "sequence", "questionnaire", "orientation"]),
});

export const cardFactorSchema = interpretationFactorSchema.omit({ cardId: true });

export const cardInterpretationSchema = z.object({
  cardId: z.string(),
  cardName: z.string(),
  isReversed: z.boolean(),
  polarityScore: z.number(),
  meaning: z.string(),
  advice: z.string(),
  notes: z.string().nullable().optional(),
  factors: z.array(cardFactorSchema),
});

export const interpretRequestSchema = z.object({
  sessionId: z.string().uuid(),
  locale: z.enum(["ru", "en"]).default("ru"),
});

export const interpretResponseSchema = z.object({
  sessionId: z.string().uuid().optional(),
  totalScore: z.number(),
  outlook: z.enum(["positive", "neutral", "caution"]),
  summary: z.string(),
  advice: z.string(),
  cards: z.array(cardInterpretationSchema),
  topFactors: z.array(interpretationFactorSchema),
});

export type InterpretRequest = z.infer<typeof interpretRequestSchema>;
export type InterpretResponse = z.infer<typeof interpretResponseSchema>;
export type InterpretationFactor = z.infer<typeof interpretationFactorSchema>;

