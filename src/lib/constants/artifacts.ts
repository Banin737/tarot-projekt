export type ArtifactPreview = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  category: "cosmetic" | "mechanical";
  baseCost: number;
};

export const ARTIFACTS: ArtifactPreview[] = [
  { id: "constellation_glow", nameKey: "artifacts.constellationGlow.name", descriptionKey: "artifacts.constellationGlow.description", category: "cosmetic", baseCost: 100 },
  { id: "starfall_trail", nameKey: "artifacts.starfallTrail.name", descriptionKey: "artifacts.starfallTrail.description", category: "cosmetic", baseCost: 100 },
  { id: "mystic_frame", nameKey: "artifacts.mysticFrame.name", descriptionKey: "artifacts.mysticFrame.description", category: "cosmetic", baseCost: 100 },
  { id: "ember_cards", nameKey: "artifacts.emberCards.name", descriptionKey: "artifacts.emberCards.description", category: "cosmetic", baseCost: 100 },
  { id: "aurora_backdrop", nameKey: "artifacts.auroraBackdrop.name", descriptionKey: "artifacts.auroraBackdrop.description", category: "cosmetic", baseCost: 100 },
  { id: "chorus_bells", nameKey: "artifacts.chorusBells.name", descriptionKey: "artifacts.chorusBells.description", category: "cosmetic", baseCost: 100 },
  { id: "lumina_pointer", nameKey: "artifacts.luminaPointer.name", descriptionKey: "artifacts.luminaPointer.description", category: "cosmetic", baseCost: 100 },
  { id: "focus_totem", nameKey: "artifacts.focusTotem.name", descriptionKey: "artifacts.focusTotem.description", category: "mechanical", baseCost: 400 },
  { id: "whisper_codex", nameKey: "artifacts.whisperCodex.name", descriptionKey: "artifacts.whisperCodex.description", category: "mechanical", baseCost: 400 },
  { id: "fortune_compass", nameKey: "artifacts.fortuneCompass.name", descriptionKey: "artifacts.fortuneCompass.description", category: "mechanical", baseCost: 400 },
  { id: "veil_guard", nameKey: "artifacts.veilGuard.name", descriptionKey: "artifacts.veilGuard.description", category: "mechanical", baseCost: 400 },
  { id: "echo_charm", nameKey: "artifacts.echoCharm.name", descriptionKey: "artifacts.echoCharm.description", category: "mechanical", baseCost: 400 },
  { id: "pulse_anchor", nameKey: "artifacts.pulseAnchor.name", descriptionKey: "artifacts.pulseAnchor.description", category: "mechanical", baseCost: 400 },
  { id: "clarity_rune", nameKey: "artifacts.clarityRune.name", descriptionKey: "artifacts.clarityRune.description", category: "mechanical", baseCost: 400 },
];
