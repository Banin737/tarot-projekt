import type { ArcanaType, LayoutType, SpreadRole } from "@prisma/client";

export type QuestionnaireModifier = {
  tag: string;
  weight: number;
};

export type EngineCardInput = {
  cardId: string;
  cardName: string;
  arcana: ArcanaType;
  isMajor: boolean;
  basePolarity: number;
  layoutType: LayoutType;
  meaningUp: string;
  meaningRev: string;
  advicePotential: string;
  notes?: string | null;
  tags: string[];
  position: {
    index: number;
    role: SpreadRole;
    polarityWeight: number;
  };
  isReversed: boolean;
};

export type SpreadContext = {
  cards: EngineCardInput[];
  isSequential: boolean;
  questionnaireModifiers: QuestionnaireModifier[];
};

export type FactorContribution = {
  id: string;
  label: string;
  value: number;
  type: "base" | "position" | "major" | "sequence" | "questionnaire" | "orientation";
};

export type CardInterpretationResult = {
  cardId: string;
  cardName: string;
  isReversed: boolean;
  polarityScore: number;
  meaning: string;
  advice: string;
  notes?: string | null;
  factors: FactorContribution[];
};

export type SpreadInterpretation = {
  totalScore: number;
  outlook: "positive" | "neutral" | "caution";
  summary: string;
  advice: string;
  cards: CardInterpretationResult[];
  topFactors: Array<{ cardId: string; label: string; value: number; type: FactorContribution["type"] }>;
};
