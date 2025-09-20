import { NextResponse } from "next/server";
import { LedgerEntryType } from "@prisma/client";
import { ledgerEarnRequestSchema, ledgerEarnResponseSchema } from "@/lib/validation";
import { ensureSpreadLimit, recordLedgerEntry } from "@/lib/economy";
import { prisma } from "@/lib/prisma";

const ledgerTypeMap: Record<string, LedgerEntryType> = {
  session: LedgerEntryType.SESSION_REWARD,
  achievement: LedgerEntryType.ACHIEVEMENT,
  artifact_passive: LedgerEntryType.ARTIFACT_PASSIVE,
  referral: LedgerEntryType.REFERRAL,
  adjustment: LedgerEntryType.ADJUSTMENT,
};

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = ledgerEarnRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { source, amount, metadata, sessionId, userId } = parsed.data;

    if (!ledgerTypeMap[source]) {
      return NextResponse.json({ error: "ledger.source_not_supported" }, { status: 400 });
    }

    if (source === "session" && (!sessionId || !userId)) {
      return NextResponse.json({ error: "ledger.session_requires_ids" }, { status: 400 });
    }

    if (source === "session" && sessionId && userId) {
      const session = await prisma.session.findUnique({ where: { id: sessionId } });
      if (!session) {
        return NextResponse.json({ error: "session.not_found" }, { status: 404 });
      }
      await ensureSpreadLimit(userId, session.templateId);
    }

    const { entryId, balanceAfter } = await recordLedgerEntry({
      userId,
      sessionId,
      amount,
      type: ledgerTypeMap[source],
      descriptionKey: `ledger.${source}`,
      metadata,
    });

    const response = ledgerEarnResponseSchema.parse({
      entryId,
      balanceAfter,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("ledger.earn.error", error);
    return NextResponse.json({ error: "ledger.earn_failed" }, { status: 500 });
  }
}
