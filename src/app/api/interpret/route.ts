import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { interpretRequestSchema, interpretResponseSchema } from "@/lib/validation";
import { interpretSpread } from "@/lib/tarot/engine";
import type { EngineCardInput, QuestionnaireModifier } from "@/lib/tarot/types";

const normaliseScale = (value: unknown): number => {
  const numeric = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numeric)) {
    return 0;
  }
  return Math.max(Math.min((numeric - 5) * 0.05, 0.5), -0.5);
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = interpretRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { sessionId, locale } = parsed.data;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        template: true,
        draws: {
          include: {
            card: true,
            position: true,
          },
          orderBy: { position: { index: "asc" } },
        },
        answers: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "session.not_found" }, { status: 404 });
    }

    if (session.draws.length === 0) {
      return NextResponse.json({ error: "session.no_draws" }, { status: 409 });
    }

    const meaningRecords = await prisma.cardMeaning.findMany({
      where: {
        cardId: { in: session.draws.map((draw) => draw.cardId) },
        locale,
      },
      include: { meaningTags: true },
    });

    if (meaningRecords.length === 0) {
      return NextResponse.json({ error: "meaning.not_found" }, { status: 404 });
    }

    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        subcategoryId: session.template.subcategoryId,
        locale,
      },
      include: { questions: { include: { options: true } } },
    });

    const modifiers: QuestionnaireModifier[] = [];
    for (const questionnaire of questionnaires) {
      for (const question of questionnaire.questions) {
        const answerRecord = session.answers.find((answer) => answer.questionId === question.id);
        if (!answerRecord) continue;

        const rawValue = answerRecord.value as Record<string, unknown> | unknown;
        const actualValue =
          rawValue && typeof rawValue === "object" && "value" in rawValue
            ? (rawValue as Record<string, unknown>).value ?? null
            : rawValue;
        const answerTags =
          rawValue && typeof rawValue === "object" && "tags" in rawValue
            ? (((rawValue as Record<string, unknown>).tags as string[]) ?? [])
            : [];

        let weight = 0;
        if (question.options.length > 0) {
          if (Array.isArray(actualValue)) {
            weight = actualValue.reduce((acc, value) => {
              const option = question.options.find((opt) => opt.value === value);
              return option ? acc + option.weight : acc;
            }, 0);
          } else if (typeof actualValue === "string") {
            const option = question.options.find((opt) => opt.value === actualValue);
            weight = option?.weight ?? 0;
          }
        } else {
          weight = normaliseScale(actualValue ?? 0);
        }

        const tags = [...(question.tags ?? []), ...answerTags];
        for (const tag of tags) {
          modifiers.push({ tag, weight });
        }
      }
    }

    const cardInputs: EngineCardInput[] = session.draws
      .map((draw) => {
        const meaning = meaningRecords.find((record) => record.cardId === draw.cardId);
        if (!meaning) return null;
        return {
          cardId: draw.cardId,
          cardName: draw.card.name,
          arcana: draw.card.arcana,
          isMajor: draw.card.isMajor,
          basePolarity: meaning.basePolarity,
          layoutType: meaning.layoutType,
          meaningUp: meaning.meaningUp,
          meaningRev: meaning.meaningRev,
          advicePotential: meaning.advicePotential,
          notes: meaning.notes,
          tags: meaning.meaningTags.map((tag) => tag.tag),
          position: {
            index: draw.position.index,
            role: draw.position.role,
            polarityWeight: draw.position.polarityWeight,
          },
          isReversed: draw.isReversed,
        } satisfies EngineCardInput;
      })
      .filter((card): card is EngineCardInput => Boolean(card));

    const interpretation = interpretSpread({
      cards: cardInputs,
      isSequential: session.template.isSequential,
      questionnaireModifiers: modifiers,
    });

    await prisma.session.update({
      where: { id: sessionId },
      data: { status: "INTERPRETED", completedAt: new Date() },
    });

    await prisma.sessionInterpretation.upsert({
      where: { sessionId },
      update: {
        summary: interpretation.summary,
        advice: interpretation.advice,
        factors: interpretation.topFactors,
        totalScore: interpretation.totalScore,
      },
      create: {
        sessionId,
        summary: interpretation.summary,
        advice: interpretation.advice,
        factors: interpretation.topFactors,
        totalScore: interpretation.totalScore,
      },
    });

    await Promise.all(
      interpretation.cards.map((card) => {
        const draw = session.draws.find((item) => item.cardId === card.cardId);
        const meaning = meaningRecords.find((record) => record.cardId === card.cardId);
        if (!draw || !meaning) return null;
        const baseFactor = card.factors.find((factor) => factor.type === "base");
        return prisma.cardInterpretation.upsert({
          where: { drawId: draw.id },
          update: {
            meaningId: meaning.id,
            finalPolarity: card.polarityScore,
            influenceScore: card.polarityScore - (baseFactor?.value ?? 0),
            adviceInjection: null,
            explanation: card.factors,
          },
          create: {
            drawId: draw.id,
            meaningId: meaning.id,
            finalPolarity: card.polarityScore,
            influenceScore: card.polarityScore - (baseFactor?.value ?? 0),
            adviceInjection: null,
            explanation: card.factors,
          },
        });
      }),
    );

    const response = interpretResponseSchema.parse({
      sessionId,
      ...interpretation,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("interpret.error", error);
    return NextResponse.json({ error: "interpret.failed" }, { status: 500 });
  }
}
