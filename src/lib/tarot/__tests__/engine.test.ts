import { ArcanaType, LayoutType, SpreadRole } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { interpretSpread } from "../../tarot/engine";
import type { EngineCardInput, QuestionnaireModifier } from "../../tarot/types";

const makeCard = (partial: Partial<EngineCardInput>): EngineCardInput => ({
  cardId: "stub",
  cardName: "Stub",
  arcana: ArcanaType.MINOR,
  isMajor: false,
  basePolarity: 0.8,
  layoutType: LayoutType.POSITIVE,
  meaningUp: "Bright outlook",
  meaningRev: "Delay ahead",
  advicePotential: "Act with courage",
  notes: null,
  tags: ["pace"],
  position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
  isReversed: false,
  ...partial,
});

const runSpread = (
  cards: EngineCardInput[],
  questionnaireModifiers: QuestionnaireModifier[] = [],
  isSequential = false,
) =>
  interpretSpread({
    cards,
    isSequential,
    questionnaireModifiers,
  });

describe("Tarot engine", () => {
  it("keeps upright positive cards positive", () => {
    const result = runSpread([makeCard({ cardId: "ace", cardName: "Ace" })]);
    expect(result.cards[0].polarityScore).toBeGreaterThan(0);
    expect(result.cards[0].meaning).toBe("Bright outlook");
  });

  it("switches to reversed meaning when card is reversed", () => {
    const result = runSpread([
      makeCard({
        cardId: "ace",
        cardName: "Ace",
        isReversed: true,
      }),
    ]);
    expect(result.cards[0].polarityScore).toBeLessThan(0.5);
    expect(result.cards[0].meaning).toBe("Delay ahead");
    expect(
      result.cards[0].factors.some((factor) => factor.type === "orientation" && factor.value < 0),
    ).toBe(true);
  });

  it("reduces minor arcana score when preceded by negative major arcana", () => {
    const tower = makeCard({
      cardId: "tower",
      cardName: "The Tower",
      arcana: ArcanaType.MAJOR,
      isMajor: true,
      basePolarity: -1,
      position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
    });
    const minor = makeCard({
      cardId: "cups",
      cardName: "Ace of Cups",
      position: { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 },
    });
    const { cards } = runSpread([tower, minor], []);
    const minorResult = cards.find((card) => card.cardId === "cups");
    expect(minorResult).toBeDefined();
    expect(minorResult?.polarityScore).toBeLessThan(0.6);
  });

  it("weakens influence of major arcana with distance", () => {
    const tower = makeCard({
      cardId: "tower",
      cardName: "The Tower",
      arcana: ArcanaType.MAJOR,
      isMajor: true,
      basePolarity: -1,
      position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
    });
    const minorNear = makeCard({
      cardId: "near",
      cardName: "Near Minor",
      position: { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 },
    });
    const minorFar = makeCard({
      cardId: "far",
      cardName: "Far Minor",
      position: { index: 4, role: SpreadRole.OUTCOME, polarityWeight: 1 },
    });
    const { cards } = runSpread([tower, minorNear, makeCard({ position: { index: 2, role: SpreadRole.CLARIFIER, polarityWeight: 1 } }), minorFar], []);
    const nearScore = cards.find((card) => card.cardId === "near")?.polarityScore ?? 0;
    const farScore = cards.find((card) => card.cardId === "far")?.polarityScore ?? 0;
    expect(nearScore).toBeLessThan(farScore);
  });

  it("caps overall polarity score", () => {
    const strongCard = makeCard({ basePolarity: 2 });
    const { cards } = runSpread([strongCard], []);
    expect(Math.abs(cards[0].polarityScore)).toBeLessThanOrEqual(2);
  });

  it("applies sequential boost to early cards", () => {
    const first = makeCard({ cardId: "first", position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 } });
    const last = makeCard({ cardId: "last", position: { index: 3, role: SpreadRole.OUTCOME, polarityWeight: 1 } });
    const sequential = runSpread([first, makeCard({ position: { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 } }), makeCard({ position: { index: 2, role: SpreadRole.ADVICE, polarityWeight: 1 } }), last], [], true);
    const nonSequential = runSpread([first, makeCard({ position: { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 } }), makeCard({ position: { index: 2, role: SpreadRole.ADVICE, polarityWeight: 1 } }), last], [], false);
    expect(
      sequential.cards.find((card) => card.cardId === "first")?.polarityScore ?? 0,
    ).toBeGreaterThan(
      nonSequential.cards.find((card) => card.cardId === "first")?.polarityScore ?? 0,
    );
  });

  it("applies questionnaire modifiers based on tags", () => {
    const modifiers: QuestionnaireModifier[] = [
      { tag: "pace", weight: -0.3 },
      { tag: "conflict", weight: 0.2 },
    ];
    const result = runSpread([makeCard({ cardId: "tagged" })], modifiers);
    const card = result.cards[0];
    expect(card.polarityScore).toBeLessThan(0.8);
    expect(card.factors.some((factor) => factor.type === "questionnaire" && factor.value < 0)).toBe(true);
  });

  it("highlights top factors for explainability", () => {
    const tower = makeCard({
      cardId: "tower",
      cardName: "The Tower",
      arcana: ArcanaType.MAJOR,
      isMajor: true,
      basePolarity: -1,
      position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
    });
    const result = runSpread([tower, makeCard({ cardId: "minor", position: { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 } })], []);
    expect(result.topFactors).toHaveLength(5);
    expect(result.topFactors[0].label).toContain("base");
  });

  it("composes spread advice from top cards", () => {
    const result = runSpread([
      makeCard({ cardId: "one", cardName: "One" }),
      makeCard({ cardId: "two", cardName: "Two", basePolarity: -0.6, meaningUp: "Warning", advicePotential: "Hold back" }),
    ]);
    expect(result.advice).toContain("One");
    expect(result.advice).toContain("Two");
  });

  it("detects caution outlook for negative average", () => {
    const result = runSpread([
      makeCard({ basePolarity: -0.9, cardId: "neg1", cardName: "Neg1", isReversed: true }),
      makeCard({ basePolarity: -0.8, cardId: "neg2", cardName: "Neg2", isReversed: true }),
    ]);
    expect(result.outlook).toBe("caution");
  });
});
