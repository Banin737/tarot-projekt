export type AchievementPreview = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  threshold: number;
  reward: number;
};

export const ACHIEVEMENTS: AchievementPreview[] = [
  {
    id: "streak_three",
    nameKey: "achievements.streakThree.name",
    descriptionKey: "achievements.streakThree.description",
    threshold: 3,
    reward: 100,
  },
  {
    id: "artifact_master",
    nameKey: "achievements.artifactMaster.name",
    descriptionKey: "achievements.artifactMaster.description",
    threshold: 10,
    reward: 250,
  },
  {
    id: "social_butterfly",
    nameKey: "achievements.socialButterfly.name",
    descriptionKey: "achievements.socialButterfly.description",
    threshold: 5,
    reward: 120,
  },
];
