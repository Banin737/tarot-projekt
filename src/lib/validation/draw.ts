import { z } from "zod";

export const drawRequestSchema = z.object({
  sessionId: z.string().uuid(),
  count: z.number().min(1).max(10),
  allowReversed: z.boolean().default(true),
});

export const drawCardSchema = z.object({
  cardId: z.string(),
  cardName: z.string(),
  positionIndex: z.number().int().min(0),
  isReversed: z.boolean(),
});

export const drawResponseSchema = z.object({
  sessionId: z.string().uuid(),
  cards: z.array(drawCardSchema),
});

export type DrawRequest = z.infer<typeof drawRequestSchema>;
export type DrawResponse = z.infer<typeof drawResponseSchema>;
