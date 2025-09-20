import { z } from "zod";

export const ledgerSourceEnum = z.enum([
  "session",
  "achievement",
  "artifact_passive",
  "referral",
  "adjustment",
]);

export const ledgerEarnRequestSchema = z.object({
  userId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
  source: ledgerSourceEnum,
  amount: z.number().int(),
  metadata: z.record(z.unknown()).optional(),
});

export const ledgerEarnResponseSchema = z.object({
  entryId: z.string().uuid(),
  balanceAfter: z.number().int(),
});

export type LedgerEarnRequest = z.infer<typeof ledgerEarnRequestSchema>;
export type LedgerEarnResponse = z.infer<typeof ledgerEarnResponseSchema>;
