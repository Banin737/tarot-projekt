import { computeBasePolarity } from "./basePolarity";
import { computeMajorInfluence } from "./majorInfluence";
import { computePositionModifier } from "./positionModifier";
import { computeQuestionnaireModifier } from "./questionnaireModifier";
import { computeSequenceModifier } from "./sequenceModifier";
import type {
  CardInterpretationResult,
  EngineCardInput,
  FactorContribution,
  SpreadContext,
  SpreadInterpretation,
} from "../types";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const computeOrientationFactor = (card: EngineCardInput, polarityBase: number): FactorContribution => {
  if (card.isReversed) {
    const penalty = Math.abs(polarityBase) + Math.abs(card.position.polarityWeight) * 0.6;
    return {
      id: `${card.cardId}-orientation`,
      label: "orientation:reversed",
      value: -parseFloat(penalty.toFixed(3)),
      type: "orientation",
    };
  }

  return {
    id: `${card.cardId}-orientation`,
    label: "orientation:upright",
    value: 0,
    type: "orientation",
  };
};

const summariseOutlook = (
  score: number,
): { outlook: SpreadInterpretation["outlook"]; summary: string } => {
  if (score > 0.6) {
    return {
      outlook: "positive",
      summary: "Позитивный вектор, раскрываются возможности.",
    };
  }

  if (score < -0.3) {
    return {
      outlook: "caution",
      summary: "Повышенное внимание: проявления напряжения требуют действий.",
    };
  }

  return {
    outlook: "neutral",
    summary: "Нейтральная динамика, многое зависит от ваших решений.",
  };
};

const buildAdvice = (cards: CardInterpretationResult[]): string => {
  const sorted = [...cards].sort((a, b) => b.polarityScore - a.polarityScore);
  const positives = sorted.filter((card) => card.polarityScore >= 0).slice(0, 2);
  const negatives = sorted.filter((card) => card.polarityScore < 0).slice(0, 1);

  const adviceParts: string[] = [];
  for (const positive of positives) {
    adviceParts.push(`${positive.cardName}: ${positive.advice}`);
  }
  for (const negative of negatives) {
    adviceParts.push(`${negative.cardName}: ${negative.advice}`);
  }

  return adviceParts.join(" \n");
};

export const interpretSpread = (context: SpreadContext): SpreadInterpretation => {
  const cardResults: CardInterpretationResult[] = context.cards.map((card) => {
    const base = computeBasePolarity(card);
    const position = computePositionModifier(card);
    const major = computeMajorInfluence(card, context.cards);
    const sequence = computeSequenceModifier(card, context.cards, context.isSequential);
    const questionnaire = computeQuestionnaireModifier(card, context.questionnaireModifiers);
    const orientation = computeOrientationFactor(card, base.value);

    const contributions = [base, position, major, sequence, questionnaire, orientation];
    const polarityScore = clamp(
      contributions.reduce((acc, factor) => acc + factor.value, 0),
      -2,
      2,
    );
    const meaning = card.isReversed || polarityScore < 0 ? card.meaningRev : card.meaningUp;

    const factors = contributions
      .filter((factor) => Math.abs(factor.value) > 0.001)
      .map((factor) => ({ ...factor, value: parseFloat(factor.value.toFixed(3)) }));

    return {
      cardId: card.cardId,
      cardName: card.cardName,
      isReversed: card.isReversed,
      polarityScore: parseFloat(polarityScore.toFixed(3)),
      meaning,
      advice: card.advicePotential,
      notes: card.notes,
      factors,
    } satisfies CardInterpretationResult;
  });

  const totalScore =
    cardResults.reduce((acc, card) => acc + card.polarityScore, 0) / Math.max(cardResults.length, 1);

  const { outlook, summary } = summariseOutlook(totalScore);
  const hasStrongNegative = cardResults.some((card) => card.polarityScore <= -0.5);
  const finalOutlook: SpreadInterpretation["outlook"] = hasStrongNegative && totalScore < 0 ? "caution" : outlook;
  const finalSummary =
    hasStrongNegative && totalScore < 0
      ? "Повышенное внимание: проявления напряжения требуют действий."
      : summary;

  const advice = buildAdvice(cardResults);

  const factorList = cardResults
    .flatMap((card) => card.factors.map((factor) => ({ cardId: card.cardId, ...factor })))
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
    .slice(0, 5)
    .map((factor) => ({
      cardId: factor.cardId,
      label: factor.label,
      value: factor.value,
      type: factor.type,
    }));

  return {
    totalScore: parseFloat(totalScore.toFixed(3)),
    outlook: finalOutlook,
    summary: finalSummary,
    advice,
    cards: cardResults,
    topFactors: factorList,
  } satisfies SpreadInterpretation;
};
