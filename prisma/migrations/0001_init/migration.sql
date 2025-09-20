-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."ArcanaType" AS ENUM ('MAJOR', 'MINOR');

-- CreateEnum
CREATE TYPE "public"."LayoutType" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "public"."SpreadRole" AS ENUM ('SIGNIFICATOR', 'PAST', 'PRESENT', 'FUTURE', 'ADVICE', 'OUTCOME', 'BLOCKER', 'SUPPORT', 'CLARIFIER', 'THEME');

-- CreateEnum
CREATE TYPE "public"."SessionStatus" AS ENUM ('CREATED', 'DRAWN', 'INTERPRETED', 'CLOSED');

-- CreateEnum
CREATE TYPE "public"."LedgerEntryType" AS ENUM ('SESSION_REWARD', 'ACHIEVEMENT', 'ARTIFACT_PASSIVE', 'REFERRAL', 'ADJUSTMENT', 'PENALTY');

-- CreateEnum
CREATE TYPE "public"."ArtifactCategory" AS ENUM ('COSMETIC', 'MECHANICAL');

-- CreateEnum
CREATE TYPE "public"."QuestionnaireInputType" AS ENUM ('SELECT', 'MULTISELECT', 'SCALE', 'TEXT', 'BOOLEAN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "email" TEXT,
    "displayName" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TarotSection" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TarotSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TarotSubcategory" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleKey" TEXT NOT NULL,
    "descriptionKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TarotSubcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpreadTemplate" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleKey" TEXT NOT NULL,
    "descriptionKey" TEXT,
    "cardCount" INTEGER NOT NULL,
    "isSequential" BOOLEAN NOT NULL DEFAULT false,
    "sectionId" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpreadTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SpreadPosition" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "role" "public"."SpreadRole" NOT NULL,
    "polarityWeight" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "descriptionKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpreadPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "arcana" "public"."ArcanaType" NOT NULL,
    "suit" TEXT,
    "isMajor" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardMeaning" (
    "id" SERIAL NOT NULL,
    "cardId" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "sphereContext" TEXT NOT NULL,
    "layoutType" "public"."LayoutType" NOT NULL,
    "meaningUp" TEXT NOT NULL,
    "meaningRev" TEXT NOT NULL,
    "advicePotential" TEXT NOT NULL,
    "notes" TEXT,
    "basePolarity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardMeaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardMeaningTag" (
    "id" SERIAL NOT NULL,
    "meaningId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "CardMeaningTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Questionnaire" (
    "id" TEXT NOT NULL,
    "subcategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "titleKey" TEXT NOT NULL,
    "descriptionKey" TEXT,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuestionnaireQuestion" (
    "id" TEXT NOT NULL,
    "questionnaireId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "labelKey" TEXT NOT NULL,
    "helperKey" TEXT,
    "inputType" "public"."QuestionnaireInputType" NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "QuestionnaireQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuestionnaireOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "labelKey" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "QuestionnaireOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "templateId" TEXT NOT NULL,
    "status" "public"."SessionStatus" NOT NULL DEFAULT 'CREATED',
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "ipHash" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SessionAnswer" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardDraw" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "isReversed" BOOLEAN NOT NULL DEFAULT false,
    "drawnAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardDraw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardInterpretation" (
    "id" TEXT NOT NULL,
    "drawId" TEXT NOT NULL,
    "meaningId" INTEGER NOT NULL,
    "finalPolarity" DOUBLE PRECISION NOT NULL,
    "influenceScore" DOUBLE PRECISION NOT NULL,
    "adviceInjection" TEXT,
    "explanation" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardInterpretation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SessionInterpretation" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "notes" TEXT,
    "factors" JSONB NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionInterpretation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LedgerEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "type" "public"."LedgerEntryType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "balanceAfter" INTEGER NOT NULL,
    "descriptionKey" TEXT NOT NULL,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Artifact" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameKey" TEXT NOT NULL,
    "descriptionKey" TEXT NOT NULL,
    "category" "public"."ArtifactCategory" NOT NULL,
    "baseCost" INTEGER NOT NULL,
    "passiveType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ArtifactLevel" (
    "id" TEXT NOT NULL,
    "artifactId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "passiveValue" DOUBLE PRECISION NOT NULL,
    "effect" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArtifactLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserArtifact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "artifactId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameKey" TEXT NOT NULL,
    "descriptionKey" TEXT NOT NULL,
    "threshold" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "achievedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Referral" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "inviteeId" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "rewardGranted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UsageCounter" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "period" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsageCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "public"."User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TarotSection_slug_key" ON "public"."TarotSection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TarotSubcategory_slug_key" ON "public"."TarotSubcategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SpreadTemplate_slug_key" ON "public"."SpreadTemplate"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SpreadPosition_templateId_index_key" ON "public"."SpreadPosition"("templateId", "index");

-- CreateIndex
CREATE INDEX "CardMeaning_cardId_locale_idx" ON "public"."CardMeaning"("cardId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "CardMeaningTag_meaningId_tag_key" ON "public"."CardMeaningTag"("meaningId", "tag");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireQuestion_questionnaireId_order_key" ON "public"."QuestionnaireQuestion"("questionnaireId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAnswer_sessionId_questionId_key" ON "public"."SessionAnswer"("sessionId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CardDraw_sessionId_positionId_key" ON "public"."CardDraw"("sessionId", "positionId");

-- CreateIndex
CREATE UNIQUE INDEX "CardInterpretation_drawId_key" ON "public"."CardInterpretation"("drawId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionInterpretation_sessionId_key" ON "public"."SessionInterpretation"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_slug_key" ON "public"."Artifact"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ArtifactLevel_artifactId_level_key" ON "public"."ArtifactLevel"("artifactId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "UserArtifact_userId_artifactId_key" ON "public"."UserArtifact"("userId", "artifactId");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "public"."Achievement"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "public"."UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_code_key" ON "public"."Referral"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_inviteeId_key" ON "public"."Referral"("inviteeId");

-- CreateIndex
CREATE INDEX "UsageCounter_userId_period_templateId_idx" ON "public"."UsageCounter"("userId", "period", "templateId");

-- AddForeignKey
ALTER TABLE "public"."TarotSubcategory" ADD CONSTRAINT "TarotSubcategory_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."TarotSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpreadTemplate" ADD CONSTRAINT "SpreadTemplate_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."TarotSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpreadTemplate" ADD CONSTRAINT "SpreadTemplate_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "public"."TarotSubcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SpreadPosition" ADD CONSTRAINT "SpreadPosition_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."SpreadTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardMeaning" ADD CONSTRAINT "CardMeaning_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardMeaningTag" ADD CONSTRAINT "CardMeaningTag_meaningId_fkey" FOREIGN KEY ("meaningId") REFERENCES "public"."CardMeaning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Questionnaire" ADD CONSTRAINT "Questionnaire_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "public"."TarotSubcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuestionnaireQuestion" ADD CONSTRAINT "QuestionnaireQuestion_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "public"."Questionnaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."QuestionnaireOption" ADD CONSTRAINT "QuestionnaireOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."QuestionnaireQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."SpreadTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionAnswer" ADD CONSTRAINT "SessionAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardDraw" ADD CONSTRAINT "CardDraw_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardDraw" ADD CONSTRAINT "CardDraw_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "public"."SpreadPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardDraw" ADD CONSTRAINT "CardDraw_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardInterpretation" ADD CONSTRAINT "CardInterpretation_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "public"."CardDraw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardInterpretation" ADD CONSTRAINT "CardInterpretation_meaningId_fkey" FOREIGN KEY ("meaningId") REFERENCES "public"."CardMeaning"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionInterpretation" ADD CONSTRAINT "SessionInterpretation_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LedgerEntry" ADD CONSTRAINT "LedgerEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ArtifactLevel" ADD CONSTRAINT "ArtifactLevel_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "public"."Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserArtifact" ADD CONSTRAINT "UserArtifact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserArtifact" ADD CONSTRAINT "UserArtifact_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "public"."Artifact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "public"."Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Referral" ADD CONSTRAINT "Referral_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsageCounter" ADD CONSTRAINT "UsageCounter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsageCounter" ADD CONSTRAINT "UsageCounter_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

