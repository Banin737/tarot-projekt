import { LedgerEntryType } from "@prisma/client";
import { prisma } from "../prisma";

const BASE_SPREAD_LIMIT = 3;

const periodKey = (date = new Date()): string => date.toISOString().slice(0, 10);

export const getUserBalance = async (userId: string): Promise<number> => {
  const result = await prisma.ledgerEntry.aggregate({
    where: { userId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
};

export const ensureSpreadLimit = async (
  userId: string | null,
  templateId: string,
): Promise<void> => {
  const period = periodKey();
  const counter = await prisma.usageCounter.findFirst({
    where: {
      userId: userId ?? null,
      templateId,
      period,
    },
  });

  if (counter && counter.count >= BASE_SPREAD_LIMIT) {
    throw new Error("spread.limit.exceeded");
  }

  if (counter) {
    await prisma.usageCounter.update({
      where: { id: counter.id },
      data: { count: counter.count + 1 },
    });
  } else {
    await prisma.usageCounter.create({
      data: {
        userId: userId ?? undefined,
        templateId,
        period,
        count: 1,
      },
    });
  }
};

export const recordLedgerEntry = async (
  params: {
    userId?: string;
    sessionId?: string;
    type: LedgerEntryType;
    amount: number;
    descriptionKey: string;
    metadata?: Record<string, unknown>;
  },
): Promise<{ entryId: string; balanceAfter: number }> => {
  if (params.amount === 0) {
    throw new Error("ledger.zero_amount");
  }

  const balanceBefore = params.userId ? await getUserBalance(params.userId) : 0;
  const balanceAfter = balanceBefore + params.amount;

  const entry = await prisma.ledgerEntry.create({
    data: {
      userId: params.userId,
      sessionId: params.sessionId,
      type: params.type,
      amount: params.amount,
      balanceAfter,
      descriptionKey: params.descriptionKey,
      metadata: params.metadata,
    },
  });

  return { entryId: entry.id, balanceAfter };
};
