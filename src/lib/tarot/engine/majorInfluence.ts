import type { EngineCardInput, FactorContribution } from "../types";

const INFLUENCE_WINDOW = 3;
const BASE_IMPACT = -1;

export const computeMajorInfluence = (
  card: EngineCardInput,
  allCards: EngineCardInput[],
): FactorContribution => {
  if (card.isMajor) {
    return { id: `${card.cardId}-major`, label: "major:self", value: 0, type: "major" };
  }

  const preceding = allCards.filter(
    (candidate) =>
      candidate.position.index < card.position.index &&
      candidate.isMajor &&
      candidate.basePolarity < 0,
  );

  let influence = 0;
  for (const majorCard of preceding) {
    const distance = card.position.index - majorCard.position.index;
    if (distance > 0 && distance <= INFLUENCE_WINDOW) {
      const decay = 1 / distance;
      influence += BASE_IMPACT * decay * Math.abs(majorCard.basePolarity);
    }
  }

  return {
    id: `${card.cardId}-major`,
    label: "major:preceding",
    value: influence,
    type: "major",
  };
};
