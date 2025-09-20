import { NextResponse } from "next/server";
import { artifactUpgradeRequestSchema, artifactUpgradeResponseSchema } from "@/lib/validation";
import { upgradeArtifact, ArtifactUpgradeError } from "@/lib/economy";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = artifactUpgradeRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { userId, artifactId } = parsed.data;

    const upgrade = await upgradeArtifact(userId, artifactId);

    const response = artifactUpgradeResponseSchema.parse({
      userArtifactId: upgrade.userArtifactId,
      artifactId,
      level: upgrade.level,
      cost: upgrade.cost,
      passiveValue: upgrade.passiveValue,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ArtifactUpgradeError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("artifact.upgrade.error", error);
    return NextResponse.json({ error: "artifact.upgrade_failed" }, { status: 500 });
  }
}
