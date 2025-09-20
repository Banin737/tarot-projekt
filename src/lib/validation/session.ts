import { z } from "zod";

export const questionnaireValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.array(z.string()),
  z.array(z.number()),
]);

export const questionnaireAnswerSchema = z.object({
  questionId: z.string().min(1),
  tags: z.array(z.string()).default([]),
  value: questionnaireValueSchema,
});

export const createSessionInputSchema = z.object({
  userId: z.string().uuid().optional(),
  templateId: z.string().min(1, "templateId.required"),
  locale: z.enum(["ru", "en"]).default("ru"),
  questionnaireAnswers: z.array(questionnaireAnswerSchema).default([]),
  clientContext: z
    .object({
      ipHash: z.string().optional(),
      userAgent: z.string().optional(),
    })
    .optional(),
});

export const createSessionResponseSchema = z.object({
  sessionId: z.string().uuid(),
  status: z.enum(["CREATED", "DRAWN", "INTERPRETED", "CLOSED"]),
});

export type CreateSessionInput = z.infer<typeof createSessionInputSchema>;
export type CreateSessionResponse = z.infer<typeof createSessionResponseSchema>;
