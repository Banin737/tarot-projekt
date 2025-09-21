import { PrismaClient, LayoutType, ArcanaType, ArtifactCategory, SpreadRole, QuestionnaireInputType } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

type RawCardMeaning = {
  card_id: string;
  card_name: string;
  arcana?: string;
  sphere_context: string;
  layout_type: string;
  meaning_up: string;
  meaning_rev: string;
  advice_potential: string;
  notes?: string;
};

type SectionSeed = {
  id: string;
  slug: string;
  titleKey: string;
  subcategories: Array<{
    id: string;
    slug: string;
    titleKey: string;
    descriptionKey: string;
    templates: Array<{
      id: string;
      slug: string;
      titleKey: string;
      descriptionKey: string;
      cardCount: number;
      isSequential?: boolean;
      positions: Array<{
        index: number;
        role: SpreadRole;
        polarityWeight: number;
        descriptionKey?: string;
      }>;
    }>;
    questionnaires: Array<{
      id: string;
      locale: string;
      titleKey: string;
      descriptionKey: string;
      questions: Array<{
        id: string;
        order: number;
        labelKey: string;
        helperKey?: string;
        inputType: QuestionnaireInputType;
        tags?: string[];
        options?: Array<{ id: string; value: string; labelKey: string; weight?: number }>;
      }>;
    }>;
  }>;
};

const sections: SectionSeed[] = [
  {
    id: "relationships",
    slug: "otnosheniya",
    titleKey: "sections.relationships.title",
    subcategories: [
      {
        id: "new_connections",
        slug: "novye-znakomstva",
        titleKey: "sections.relationships.newConnections.title",
        descriptionKey: "sections.relationships.newConnections.description",
        templates: [
          {
            id: "new_connections_triangles",
            slug: "triad-insight",
            titleKey: "templates.triadInsight.title",
            descriptionKey: "templates.triadInsight.description",
            cardCount: 3,
            positions: [
              { index: 0, role: SpreadRole.SIGNIFICATOR, polarityWeight: 1 },
              { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 0.9 },
              { index: 2, role: SpreadRole.OUTCOME, polarityWeight: 1.1 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_new_connections_ru",
            locale: "ru",
            titleKey: "questionnaires.newConnections.title",
            descriptionKey: "questionnaires.newConnections.description",
            questions: [
              {
                id: "new_connections_intent",
                order: 0,
                labelKey: "questionnaires.newConnections.intent.label",
                inputType: QuestionnaireInputType.SELECT,
                options: [
                  { id: "intent_friendship", value: "friendship", labelKey: "common.friendship", weight: 0 },
                  { id: "intent_romance", value: "romance", labelKey: "common.romance", weight: 0.1 },
                  { id: "intent_unsure", value: "unsure", labelKey: "common.unsure", weight: -0.1 },
                ],
              },
              {
                id: "new_connections_contact_frequency",
                order: 1,
                labelKey: "questionnaires.newConnections.frequency.label",
                inputType: QuestionnaireInputType.SCALE,
                helperKey: "questionnaires.newConnections.frequency.helper",
                tags: ["pace"],
              },
            ],
          },
        ],
      },
      {
        id: "long_term",
        slug: "dolgosrochnye",
        titleKey: "sections.relationships.longTerm.title",
        descriptionKey: "sections.relationships.longTerm.description",
        templates: [
          {
            id: "long_term_crossroads",
            slug: "crossroads",
            titleKey: "templates.crossroads.title",
            descriptionKey: "templates.crossroads.description",
            cardCount: 5,
            isSequential: true,
            positions: [
              { index: 0, role: SpreadRole.PAST, polarityWeight: 0.8 },
              { index: 1, role: SpreadRole.PRESENT, polarityWeight: 1 },
              { index: 2, role: SpreadRole.BLOCKER, polarityWeight: -0.6 },
              { index: 3, role: SpreadRole.ADVICE, polarityWeight: 1.2 },
              { index: 4, role: SpreadRole.OUTCOME, polarityWeight: 1.4 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_long_term_ru",
            locale: "ru",
            titleKey: "questionnaires.longTerm.title",
            descriptionKey: "questionnaires.longTerm.description",
            questions: [
              {
                id: "long_term_conflict_level",
                order: 0,
                labelKey: "questionnaires.longTerm.conflict.label",
                inputType: QuestionnaireInputType.SCALE,
                tags: ["conflict"],
              },
              {
                id: "long_term_commitment",
                order: 1,
                labelKey: "questionnaires.longTerm.commitment.label",
                inputType: QuestionnaireInputType.SELECT,
                options: [
                  { id: "commitment_low", value: "low", labelKey: "common.low", weight: -0.2 },
                  { id: "commitment_medium", value: "medium", labelKey: "common.medium", weight: 0 },
                  { id: "commitment_high", value: "high", labelKey: "common.high", weight: 0.3 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "career",
    slug: "dengi-i-rabota",
    titleKey: "sections.career.title",
    subcategories: [
      {
        id: "job_growth",
        slug: "rost",
        titleKey: "sections.career.growth.title",
        descriptionKey: "sections.career.growth.description",
        templates: [
          {
            id: "job_growth_ladder",
            slug: "career-ladder",
            titleKey: "templates.careerLadder.title",
            descriptionKey: "templates.careerLadder.description",
            cardCount: 4,
            isSequential: true,
            positions: [
              { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
              { index: 1, role: SpreadRole.BLOCKER, polarityWeight: -0.7 },
              { index: 2, role: SpreadRole.SUPPORT, polarityWeight: 0.9 },
              { index: 3, role: SpreadRole.OUTCOME, polarityWeight: 1.3 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_job_growth_ru",
            locale: "ru",
            titleKey: "questionnaires.jobGrowth.title",
            descriptionKey: "questionnaires.jobGrowth.description",
            questions: [
              {
                id: "job_growth_industry",
                order: 0,
                labelKey: "questionnaires.jobGrowth.industry.label",
                inputType: QuestionnaireInputType.TEXT,
                tags: ["career"],
              },
              {
                id: "job_growth_timeline",
                order: 1,
                labelKey: "questionnaires.jobGrowth.timeline.label",
                inputType: QuestionnaireInputType.SELECT,
                options: [
                  { id: "timeline_short", value: "short", labelKey: "common.shortTerm", weight: 0.2 },
                  { id: "timeline_mid", value: "mid", labelKey: "common.midTerm", weight: 0 },
                  { id: "timeline_long", value: "long", labelKey: "common.longTerm", weight: -0.1 },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "finance_balance",
        slug: "balans",
        titleKey: "sections.career.financeBalance.title",
        descriptionKey: "sections.career.financeBalance.description",
        templates: [
          {
            id: "finance_balance_flow",
            slug: "flow",
            titleKey: "templates.flow.title",
            descriptionKey: "templates.flow.description",
            cardCount: 3,
            positions: [
              { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
              { index: 1, role: SpreadRole.BLOCKER, polarityWeight: -0.8 },
              { index: 2, role: SpreadRole.ADVICE, polarityWeight: 1.1 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_finance_balance_ru",
            locale: "ru",
            titleKey: "questionnaires.financeBalance.title",
            descriptionKey: "questionnaires.financeBalance.description",
            questions: [
              {
                id: "finance_balance_pressure",
                order: 0,
                labelKey: "questionnaires.financeBalance.pressure.label",
                inputType: QuestionnaireInputType.SCALE,
                tags: ["stress"],
              },
              {
                id: "finance_balance_priority",
                order: 1,
                labelKey: "questionnaires.financeBalance.priority.label",
                inputType: QuestionnaireInputType.MULTISELECT,
                options: [
                  { id: "priority_savings", value: "savings", labelKey: "common.savings", weight: 0.1 },
                  { id: "priority_debt", value: "debt", labelKey: "common.debt", weight: -0.1 },
                  { id: "priority_invest", value: "invest", labelKey: "common.invest", weight: 0.2 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "situations",
    slug: "raznye-situacii",
    titleKey: "sections.situations.title",
    subcategories: [
      {
        id: "difficult_choice",
        slug: "vybor",
        titleKey: "sections.situations.choice.title",
        descriptionKey: "sections.situations.choice.description",
        templates: [
          {
            id: "choice_duality",
            slug: "duality",
            titleKey: "templates.duality.title",
            descriptionKey: "templates.duality.description",
            cardCount: 2,
            positions: [
              { index: 0, role: SpreadRole.SUPPORT, polarityWeight: 1 },
              { index: 1, role: SpreadRole.BLOCKER, polarityWeight: -1 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_choice_ru",
            locale: "ru",
            titleKey: "questionnaires.choice.title",
            descriptionKey: "questionnaires.choice.description",
            questions: [
              {
                id: "choice_options_count",
                order: 0,
                labelKey: "questionnaires.choice.options.label",
                inputType: QuestionnaireInputType.SCALE,
                tags: ["complexity"],
              },
              {
                id: "choice_timeframe",
                order: 1,
                labelKey: "questionnaires.choice.timeframe.label",
                inputType: QuestionnaireInputType.SELECT,
                options: [
                  { id: "choice_time_urgent", value: "urgent", labelKey: "common.urgent", weight: 0.2 },
                  { id: "choice_time_soon", value: "soon", labelKey: "common.soon", weight: 0 },
                  { id: "choice_time_later", value: "later", labelKey: "common.later", weight: -0.1 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "forecast",
    slug: "prognostika",
    titleKey: "sections.forecast.title",
    subcategories: [
      {
        id: "weekly",
        slug: "nedelya",
        titleKey: "sections.forecast.weekly.title",
        descriptionKey: "sections.forecast.weekly.description",
        templates: [
          {
            id: "weekly_waves",
            slug: "waves",
            titleKey: "templates.waves.title",
            descriptionKey: "templates.waves.description",
            cardCount: 7,
            isSequential: true,
            positions: Array.from({ length: 7 }).map((_, idx) => ({
              index: idx,
              role: idx === 6 ? SpreadRole.OUTCOME : SpreadRole.PRESENT,
              polarityWeight: 0.8 + idx * 0.05,
            })),
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_weekly_ru",
            locale: "ru",
            titleKey: "questionnaires.weekly.title",
            descriptionKey: "questionnaires.weekly.description",
            questions: [
              {
                id: "weekly_focus",
                order: 0,
                labelKey: "questionnaires.weekly.focus.label",
                inputType: QuestionnaireInputType.MULTISELECT,
                options: [
                  { id: "weekly_focus_love", value: "love", labelKey: "common.love", weight: 0.1 },
                  { id: "weekly_focus_work", value: "work", labelKey: "common.work", weight: 0.1 },
                  { id: "weekly_focus_health", value: "health", labelKey: "common.health", weight: -0.05 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "personal",
    slug: "lichnyie",
    titleKey: "sections.personal.title",
    subcategories: [
      {
        id: "self_care",
        slug: "samoocenka",
        titleKey: "sections.personal.selfCare.title",
        descriptionKey: "sections.personal.selfCare.description",
        templates: [
          {
            id: "self_care_pulse",
            slug: "pulse",
            titleKey: "templates.pulse.title",
            descriptionKey: "templates.pulse.description",
            cardCount: 3,
            positions: [
              { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
              { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1 },
              { index: 2, role: SpreadRole.ADVICE, polarityWeight: 1.2 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_self_care_ru",
            locale: "ru",
            titleKey: "questionnaires.selfCare.title",
            descriptionKey: "questionnaires.selfCare.description",
            questions: [
              {
                id: "self_care_energy",
                order: 0,
                labelKey: "questionnaires.selfCare.energy.label",
                inputType: QuestionnaireInputType.SCALE,
                tags: ["energy"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "pregnancy",
    slug: "beremennost",
    titleKey: "sections.pregnancy.title",
    subcategories: [
      {
        id: "planning",
        slug: "planirovanie",
        titleKey: "sections.pregnancy.planning.title",
        descriptionKey: "sections.pregnancy.planning.description",
        templates: [
          {
            id: "pregnancy_planning_nurture",
            slug: "nurture",
            titleKey: "templates.nurture.title",
            descriptionKey: "templates.nurture.description",
            cardCount: 4,
            positions: [
              { index: 0, role: SpreadRole.PRESENT, polarityWeight: 1 },
              { index: 1, role: SpreadRole.SUPPORT, polarityWeight: 1.1 },
              { index: 2, role: SpreadRole.BLOCKER, polarityWeight: -0.8 },
              { index: 3, role: SpreadRole.ADVICE, polarityWeight: 1.2 },
            ],
          },
        ],
        questionnaires: [
          {
            id: "questionnaire_pregnancy_planning_ru",
            locale: "ru",
            titleKey: "questionnaires.pregnancyPlanning.title",
            descriptionKey: "questionnaires.pregnancyPlanning.description",
            questions: [
              {
                id: "pregnancy_planning_support",
                order: 0,
                labelKey: "questionnaires.pregnancyPlanning.support.label",
                inputType: QuestionnaireInputType.SELECT,
                options: [
                  { id: "support_high", value: "high", labelKey: "common.high", weight: 0.2 },
                  { id: "support_medium", value: "medium", labelKey: "common.medium", weight: 0 },
                  { id: "support_low", value: "low", labelKey: "common.low", weight: -0.2 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const artifactSeeds = {
  cosmetic: [
    { id: "constellation_glow", nameKey: "artifacts.constellationGlow.name", descriptionKey: "artifacts.constellationGlow.description", passiveType: "aura" },
    { id: "starfall_trail", nameKey: "artifacts.starfallTrail.name", descriptionKey: "artifacts.starfallTrail.description", passiveType: "trail" },
    { id: "mystic_frame", nameKey: "artifacts.mysticFrame.name", descriptionKey: "artifacts.mysticFrame.description", passiveType: "frame" },
    { id: "ember_cards", nameKey: "artifacts.emberCards.name", descriptionKey: "artifacts.emberCards.description", passiveType: "cardSkin" },
    { id: "aurora_backdrop", nameKey: "artifacts.auroraBackdrop.name", descriptionKey: "artifacts.auroraBackdrop.description", passiveType: "background" },
    { id: "chorus_bells", nameKey: "artifacts.chorusBells.name", descriptionKey: "artifacts.chorusBells.description", passiveType: "sound" },
    { id: "lumina_pointer", nameKey: "artifacts.luminaPointer.name", descriptionKey: "artifacts.luminaPointer.description", passiveType: "cursor" },
  ],
  mechanical: [
    { id: "focus_totem", nameKey: "artifacts.focusTotem.name", descriptionKey: "artifacts.focusTotem.description", passiveType: "cooldown" },
    { id: "whisper_codex", nameKey: "artifacts.whisperCodex.name", descriptionKey: "artifacts.whisperCodex.description", passiveType: "interpretation" },
    { id: "fortune_compass", nameKey: "artifacts.fortuneCompass.name", descriptionKey: "artifacts.fortuneCompass.description", passiveType: "reward" },
    { id: "veil_guard", nameKey: "artifacts.veilGuard.name", descriptionKey: "artifacts.veilGuard.description", passiveType: "antifraud" },
    { id: "echo_charm", nameKey: "artifacts.echoCharm.name", descriptionKey: "artifacts.echoCharm.description", passiveType: "sequence" },
    { id: "pulse_anchor", nameKey: "artifacts.pulseAnchor.name", descriptionKey: "artifacts.pulseAnchor.description", passiveType: "energy" },
    { id: "clarity_rune", nameKey: "artifacts.clarityRune.name", descriptionKey: "artifacts.clarityRune.description", passiveType: "advice" },
  ],
};

const levels = Array.from({ length: 20 }, (_, idx) => idx + 1);

const readCards = (): RawCardMeaning[] => {
  const filePath = path.resolve(__dirname, "..", "data", "cards_meanings.json");
  if (!fs.existsSync(filePath)) {
    throw new Error(`Card meanings file is missing at ${filePath}`);
  }
  const contents = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(contents) as RawCardMeaning[];
  if (!Array.isArray(parsed)) {
    throw new Error("cards_meanings.json must be an array");
  }
  return parsed;
};

const toLayout = (layout: string | undefined): LayoutType => {
  switch (layout?.toLowerCase()) {
    case "positive":
      return LayoutType.POSITIVE;
    case "negative":
      return LayoutType.NEGATIVE;
    default:
      return LayoutType.NEUTRAL;
  }
};

const toArcana = (arcana: string | undefined): ArcanaType => {
  return arcana?.toLowerCase() === "major" ? ArcanaType.MAJOR : ArcanaType.MINOR;
};

const basePolarity = (layout: LayoutType): number => {
  if (layout === LayoutType.POSITIVE) return 1;
  if (layout === LayoutType.NEGATIVE) return -1;
  return 0;
};

const upsertSections = async () => {
  for (const section of sections) {
    await prisma.tarotSection.upsert({
      where: { id: section.id },
      update: {},
      create: {
        id: section.id,
        slug: section.slug,
        titleKey: section.titleKey,
        subcategories: {
          create: section.subcategories.map((subcategory) => ({
            id: subcategory.id,
            slug: subcategory.slug,
            titleKey: subcategory.titleKey,
            descriptionKey: subcategory.descriptionKey,
            templates: {
              create: subcategory.templates.map((template) => ({
                sectionId: section.id,
                id: template.id,
                slug: template.slug,
                titleKey: template.titleKey,
                descriptionKey: template.descriptionKey,
                cardCount: template.cardCount,
                isSequential: template.isSequential ?? false,
                positions: {
                  create: template.positions.map((position) => ({
                    index: position.index,
                    role: position.role,
                    polarityWeight: position.polarityWeight,
                    descriptionKey: position.descriptionKey,
                  })),
                },
              })),
            },
            questionnaires: {
              create: subcategory.questionnaires.map((questionnaire) => ({
                id: questionnaire.id,
                locale: questionnaire.locale,
                titleKey: questionnaire.titleKey,
                descriptionKey: questionnaire.descriptionKey,
                questions: {
                  create: questionnaire.questions.map((question) => ({
                    id: question.id,
                    order: question.order,
                    labelKey: question.labelKey,
                    helperKey: question.helperKey,
                    inputType: question.inputType,
                    tags: question.tags ?? [],
                    options: {
                      create: question.options?.map((option) => ({
                        id: option.id,
                        value: option.value,
                        labelKey: option.labelKey,
                        weight: option.weight ?? 0,
                      })) ?? [],
                    },
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }
};

const seedCards = async () => {
  await prisma.cardMeaningTag.deleteMany();
  await prisma.cardMeaning.deleteMany();
  await prisma.card.deleteMany();

  const cards = readCards();
  for (const raw of cards) {
    const arcana = toArcana(raw.arcana);
    await prisma.card.create({
      data: {
        id: raw.card_id,
        name: raw.card_name,
        arcana,
        isMajor: arcana === ArcanaType.MAJOR,
      },
    });
    const layout = toLayout(raw.layout_type);
    await prisma.cardMeaning.create({
      data: {
        cardId: raw.card_id,
        locale: "ru",
        sphereContext: raw.sphere_context,
        layoutType: layout,
        meaningUp: raw.meaning_up,
        meaningRev: raw.meaning_rev,
        advicePotential: raw.advice_potential,
        notes: raw.notes,
        basePolarity: basePolarity(layout),
        meaningTags: {
          create: [
            { tag: raw.sphere_context },
            { tag: layout === LayoutType.POSITIVE ? "positive" : layout === LayoutType.NEGATIVE ? "negative" : "neutral" },
          ],
        },
      },
    });
  }
};

const seedArtifacts = async () => {
  await prisma.artifactLevel.deleteMany();
  await prisma.userArtifact.deleteMany();
  await prisma.artifact.deleteMany();

  const createLevels = (artifactId: string, baseCost: number) => {
    return levels.map((level) => {
      const cost = Math.round(baseCost * Math.pow(1.25, level - 1));
      const passiveValue = parseFloat((baseCost / 100 + level * 0.05).toFixed(2));
      return {
        level,
        cost,
        passiveValue,
        effect: { level, modifier: passiveValue },
      };
    });
  };

  for (const data of artifactSeeds.cosmetic) {
    await prisma.artifact.create({
      data: {
        id: data.id,
        slug: data.id,
        nameKey: data.nameKey,
        descriptionKey: data.descriptionKey,
        category: ArtifactCategory.COSMETIC,
        baseCost: 100,
        passiveType: data.passiveType,
        levels: {
          create: createLevels(data.id, 100),
        },
      },
    });
  }

  for (const data of artifactSeeds.mechanical) {
    await prisma.artifact.create({
      data: {
        id: data.id,
        slug: data.id,
        nameKey: data.nameKey,
        descriptionKey: data.descriptionKey,
        category: ArtifactCategory.MECHANICAL,
        baseCost: 400,
        passiveType: data.passiveType,
        levels: {
          create: createLevels(data.id, 400),
        },
      },
    });
  }
};

const seedAchievements = async () => {
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();

  const achievements = [
    {
      id: "streak_three",
      slug: "streak-three",
      nameKey: "achievements.streakThree.name",
      descriptionKey: "achievements.streakThree.description",
      threshold: 3,
      reward: 100,
    },
    {
      id: "artifact_master",
      slug: "artifact-master",
      nameKey: "achievements.artifactMaster.name",
      descriptionKey: "achievements.artifactMaster.description",
      threshold: 10,
      reward: 250,
    },
    {
      id: "social_butterfly",
      slug: "social-butterfly",
      nameKey: "achievements.socialButterfly.name",
      descriptionKey: "achievements.socialButterfly.description",
      threshold: 5,
      reward: 120,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement,
    });
  }
};

const main = async () => {
  try {
    await upsertSections();
    await seedCards();
    await seedArtifacts();
    await seedAchievements();
    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed failed", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

void main();





