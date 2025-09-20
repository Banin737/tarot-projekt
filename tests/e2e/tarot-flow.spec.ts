import { test, expect } from "@playwright/test";
import { ArcanaType, LayoutType, SpreadRole } from "@prisma/client";
import { interpretSpread } from "@/lib/tarot/engine";
import type { EngineCardInput, QuestionnaireModifier } from "@/lib/tarot/types";
import {
  createSessionInputSchema,
  drawRequestSchema,
  interpretRequestSchema,
  interpretResponseSchema,
} from "@/lib/validation";

test("validates full tarot flow schemas", () => {
  const sessionInput = createSessionInputSchema.parse({
    templateId: "new_connections_triangles",
    locale: "ru",
    questionnaireAnswers: [
      { questionId: "new_connections_intent", value: "friendship" },
      { questionId: "new_connections_contact_frequency", value: 7 },
    ],
  });

  const drawInput = drawRequestSchema.parse({ sessionId: crypto.randomUUID(), count: 3, allowReversed: true });
  const interpretInput = interpretRequestSchema.parse({ sessionId: drawInput.sessionId, locale: sessionInput.locale });

  expect(sessionInput.templateId).toBe("new_connections_triangles");
  expect(interpretInput.locale).toBe("ru");
});

test("computes interpretation with sequential influence", () => {
  const cards: EngineCardInput[] = [
    {
      cardId: "tower",
      cardName: "The Tower",
      arcana: ArcanaType.MAJOR,
      isMajor: true,
      basePolarity: -1,
      layoutType: LayoutType.NEGATIVE,
      meaningUp: "Shake-up",
      meaningRev: "Lingering crises",
      advicePotential: "Stay grounded",
      notes: null,
      tags: ["crisis"],
      position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
      isReversed: false,
    },
    {
      cardId: "fool",
      cardName: "The Fool",
      arcana: ArcanaType.MAJOR,
      isMajor: true,
      basePolarity: 0.5,
      layoutType: LayoutType.POSITIVE,
      meaningUp: "Leap",
      meaningRev: "Reckless",
      advicePotential: "Look before you leap",
      notes: null,
      tags: ["beginnings"],
      position: { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 },
      isReversed: false,
    },
    {
      cardId: "ace_of_cups",
      cardName: "Ace of Cups",
      arcana: ArcanaType.MINOR,
      isMajor: false,
      basePolarity: 1,
      layoutType: LayoutType.POSITIVE,
      meaningUp: "Overflow",
      meaningRev: "Block",
      advicePotential: "Share feelings",
      notes: null,
      tags: ["relationships"],
      position: { index: 2, role: SpreadRole.OUTCOME, polarityWeight: 1.2 },
      isReversed: false,
    },
  ];

  const modifiers: QuestionnaireModifier[] = [{ tag: "relationships", weight: 0.2 }];
  const interpretation = interpretSpread({ cards, isSequential: true, questionnaireModifiers: modifiers });
  expect(interpretation.cards).toHaveLength(3);
  expect(interpretation.cards[2].polarityScore).toBeGreaterThan(0.5);
  interpretResponseSchema.parse({ sessionId: crypto.randomUUID(), ...interpretation });
});

test("reversed card shifts meaning and factors", () => {
  const cards: EngineCardInput[] = [
    {
      cardId: "three_of_swords",
      cardName: "Three of Swords",
      arcana: ArcanaType.MINOR,
      isMajor: false,
      basePolarity: -0.8,
      layoutType: LayoutType.NEGATIVE,
      meaningUp: "Heartbreak",
      meaningRev: "Letting go",
      advicePotential: "Allow grief",
      notes: null,
      tags: ["relationships"],
      position: { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
      isReversed: true,
    },
  ];

  const interpretation = interpretSpread({ cards, isSequential: false, questionnaireModifiers: [] });
  expect(interpretation.cards[0].meaning).toBe("Letting go");
  const orientationFactor = interpretation.cards[0].factors.find((factor) => factor.type === "orientation");
  expect(orientationFactor?.value).toBeLessThan(0);
});
