import type { EngineCardInput, FactorContribution } from "../types";

export const computeSequenceModifier = (
  card: EngineCardInput,
  cards: EngineCardInput[],
  isSequential: boolean,
): FactorContribution => {
  if (!isSequential) {
    return { id: `${card.cardId}-sequence`, label: "sequence:none", value: 0, type: "sequence" };
  }
  const total = cards.length;
  const orderWeight = (total - card.position.index) / total; // earlier cards closer to 1
  const value = parseFloat((orderWeight * 0.3).toFixed(3));
  return {
    id: `${card.cardId}-sequence`,
    label: "sequence:order",
    value,
    type: "sequence",
  };
};
