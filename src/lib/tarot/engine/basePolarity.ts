import type { EngineCardInput, FactorContribution } from "../types";

export const computeBasePolarity = (card: EngineCardInput): FactorContribution => {
  return {
    id: `${card.cardId}-base`,
    label: "base",
    value: card.basePolarity,
    type: "base",
  };
};
