import { LedgerEntryType } from "@prisma/client";
import { prisma } from "../prisma";
import { getUserBalance, recordLedgerEntry } from "./ledgerService";

export class ArtifactUpgradeError extends Error {}

export const upgradeArtifact = async (
  userId: string,
  artifactId: string,
): Promise<{
  userArtifactId: string;
  level: number;
  cost: number;
  passiveValue: number;
}> => {
  const artifact = await prisma.artifact.findUnique({
    where: { id: artifactId },
    include: { levels: true },
  });

  if (!artifact) {
    throw new ArtifactUpgradeError("artifact.not_found");
  }

  const userArtifact = await prisma.userArtifact.findUnique({
    where: { userId_artifactId: { userId, artifactId } },
    include: { artifact: { include: { levels: true } } },
  });

  const currentLevel = userArtifact?.level ?? 0;
  const nextLevel = currentLevel + 1;

  const targetLevel = artifact.levels.find((level) => level.level === nextLevel);
  if (!targetLevel) {
    throw new ArtifactUpgradeError("artifact.max_level");
  }

  const balance = await getUserBalance(userId);
  if (balance < targetLevel.cost) {
    throw new ArtifactUpgradeError("artifact.not_enough_balance");
  }

  const { entryId } = await recordLedgerEntry({
    userId,
    type: LedgerEntryType.ADJUSTMENT,
    amount: -targetLevel.cost,
    descriptionKey: "ledger.artifact.upgrade",
    metadata: { artifactId, level: nextLevel },
  });

  const updated = await prisma.userArtifact.upsert({
    where: { userId_artifactId: { userId, artifactId } },
    update: { level: nextLevel },
    create: { userId, artifactId, level: nextLevel },
  });

  await prisma.ledgerEntry.update({
    where: { id: entryId },
    data: { balanceAfter: balance - targetLevel.cost },
  });

  return {
    userArtifactId: updated.id,
    level: updated.level,
    cost: targetLevel.cost,
    passiveValue: targetLevel.passiveValue,
  };
};
