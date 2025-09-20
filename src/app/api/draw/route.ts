import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { drawRequestSchema, drawResponseSchema } from "@/lib/validation";

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = drawRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { sessionId, count, allowReversed } = parsed.data;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        template: { include: { positions: { orderBy: { index: "asc" } } } },
        draws: true,
      },
    });

    if (!session) {
      return NextResponse.json({ error: "session.not_found" }, { status: 404 });
    }

    if (session.draws.length > 0) {
      return NextResponse.json({ error: "session.already_drawn" }, { status: 409 });
    }

    const positions = session.template.positions.slice(0, count);
    if (positions.length < count) {
      return NextResponse.json({ error: "draw.count_exceeds_template" }, { status: 422 });
    }

    const cards = await prisma.card.findMany();
    if (cards.length < count) {
      return NextResponse.json({ error: "draw.insufficient_deck" }, { status: 500 });
    }

    const selectedCards = shuffle(cards).slice(0, count);

    const created = await Promise.all(
      positions.map((position, index) => {
        const card = selectedCards[index];
        const isReversed = allowReversed ? Math.random() > 0.5 : false;
        return prisma.cardDraw.create({
          data: {
            sessionId,
            positionId: position.id,
            cardId: card.id,
            isReversed,
          },
          include: { card: true },
        });
      }),
    );

    await prisma.session.update({
      where: { id: sessionId },
      data: { status: "DRAWN" },
    });

    const response = drawResponseSchema.parse({
      sessionId,
      cards: created.map((draw) => ({
        cardId: draw.cardId,
        cardName: draw.card.name,
        positionIndex: positions.findIndex((pos) => pos.id === draw.positionId),
        isReversed: draw.isReversed,
      })),
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("draw.error", error);
    return NextResponse.json({ error: "draw.failed" }, { status: 500 });
  }
}
