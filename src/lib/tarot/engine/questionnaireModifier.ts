import type { EngineCardInput, FactorContribution, QuestionnaireModifier } from "../types";

export const computeQuestionnaireModifier = (
  card: EngineCardInput,
  modifiers: QuestionnaireModifier[],
): FactorContribution => {
  if (!modifiers.length || !card.tags.length) {
    return { id: `${card.cardId}-questionnaire`, label: "questionnaire:none", value: 0, type: "questionnaire" };
  }

  const total = modifiers
    .filter((modifier) => card.tags.includes(modifier.tag))
    .reduce((acc, modifier) => acc + modifier.weight, 0);

  const intensity = 1.5 + Math.abs(card.basePolarity) + Math.abs(card.position.polarityWeight);
  const value = parseFloat((total * intensity).toFixed(3));

  return {
    id: `${card.cardId}-questionnaire`,
    label: "questionnaire:tags",
    value,
    type: "questionnaire",
  };
};
