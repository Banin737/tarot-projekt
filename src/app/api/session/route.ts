import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionInputSchema, createSessionResponseSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = createSessionInputSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { templateId, locale, questionnaireAnswers, clientContext, userId } = parsed.data;

    const template = await prisma.spreadTemplate.findUnique({
      where: { id: templateId },
      include: { positions: true },
    });

    if (!template) {
      return NextResponse.json({ error: "template.not_found" }, { status: 404 });
    }

    const session = await prisma.session.create({
      data: {
        userId,
        templateId: template.id,
        locale,
        ipHash: clientContext?.ipHash,
        userAgent: clientContext?.userAgent,
        answers: {
          create: questionnaireAnswers.map((answer) => ({
            questionId: answer.questionId,
            value: { value: answer.value, tags: answer.tags },
          })),
        },
      },
    });

    const response = createSessionResponseSchema.parse({
      sessionId: session.id,
      status: session.status,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("session.create.error", error);
    return NextResponse.json({ error: "session.create_failed" }, { status: 500 });
  }
}
