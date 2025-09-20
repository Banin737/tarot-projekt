export type SubcategoryConfig = {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  templateId: string;
  questionnaireId: string;
};

export type SectionConfig = {
  id: string;
  slug: string;
  titleKey: string;
  subcategories: SubcategoryConfig[];
};

export const SECTION_CONFIG: SectionConfig[] = [
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
        templateId: "new_connections_triangles",
        questionnaireId: "questionnaire_new_connections_ru",
      },
      {
        id: "long_term",
        slug: "dolgosrochnye",
        titleKey: "sections.relationships.longTerm.title",
        descriptionKey: "sections.relationships.longTerm.description",
        templateId: "long_term_crossroads",
        questionnaireId: "questionnaire_long_term_ru",
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
        templateId: "job_growth_ladder",
        questionnaireId: "questionnaire_job_growth_ru",
      },
      {
        id: "finance_balance",
        slug: "balans",
        titleKey: "sections.career.financeBalance.title",
        descriptionKey: "sections.career.financeBalance.description",
        templateId: "finance_balance_flow",
        questionnaireId: "questionnaire_finance_balance_ru",
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
        templateId: "choice_duality",
        questionnaireId: "questionnaire_choice_ru",
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
        templateId: "weekly_waves",
        questionnaireId: "questionnaire_weekly_ru",
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
        templateId: "self_care_pulse",
        questionnaireId: "questionnaire_self_care_ru",
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
        templateId: "pregnancy_planning_nurture",
        questionnaireId: "questionnaire_pregnancy_planning_ru",
      },
    ],
  },
];
