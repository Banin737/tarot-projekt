import type { SpreadRole } from "@prisma/client";
import type { EngineCardInput, FactorContribution } from "../types";

const ROLE_WEIGHTS: Record<SpreadRole, number> = {
  SIGNIFICATOR: 1,
  PAST: 0.6,
  PRESENT: 0.8,
  FUTURE: 0.9,
  ADVICE: 1,
  OUTCOME: 1.1,
  BLOCKER: -0.8,
  SUPPORT: 0.7,
  CLARIFIER: 0.5,
  THEME: 0.8,
};

export const computePositionModifier = (card: EngineCardInput): FactorContribution => {
  const weightFromRole = ROLE_WEIGHTS[card.position.role] ?? 0.8;
  const value = weightFromRole * card.position.polarityWeight;
  return {
    id: `${card.cardId}-position`,
    label: `position:${card.position.role.toLowerCase()}`,
    value,
    type: "position",
  };
};
