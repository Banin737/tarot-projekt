import { z } from "zod";

export const artifactUpgradeRequestSchema = z.object({
  userId: z.string().uuid(),
  artifactId: z.string().min(1),
});

export const artifactUpgradeResponseSchema = z.object({
  userArtifactId: z.string().uuid(),
  artifactId: z.string(),
  level: z.number().int().positive(),
  cost: z.number().int().nonnegative(),
  passiveValue: z.number(),
});

export type ArtifactUpgradeRequest = z.infer<typeof artifactUpgradeRequestSchema>;
export type ArtifactUpgradeResponse = z.infer<typeof artifactUpgradeResponseSchema>;
