export type QuestionnaireField = {
  id: string;
  labelKey: string;
  helperKey?: string;
  type: "select" | "multiselect" | "scale" | "text";
  options?: Array<{ value: string; labelKey: string }>;
};

export const QUESTIONNAIRES: Record<string, QuestionnaireField[]> = {
  questionnaire_new_connections_ru: [
    {
      id: "new_connections_intent",
      labelKey: "questionnaires.newConnections.intent.label",
      type: "select",
      options: [
        { value: "friendship", labelKey: "common.friendship" },
        { value: "romance", labelKey: "common.romance" },
        { value: "unsure", labelKey: "common.unsure" },
      ],
    },
    {
      id: "new_connections_contact_frequency",
      labelKey: "questionnaires.newConnections.frequency.label",
      helperKey: "questionnaires.newConnections.frequency.helper",
      type: "scale",
    },
  ],
  questionnaire_long_term_ru: [
    {
      id: "long_term_conflict_level",
      labelKey: "questionnaires.longTerm.conflict.label",
      type: "scale",
    },
    {
      id: "long_term_commitment",
      labelKey: "questionnaires.longTerm.commitment.label",
      type: "select",
      options: [
        { value: "low", labelKey: "common.low" },
        { value: "medium", labelKey: "common.medium" },
        { value: "high", labelKey: "common.high" },
      ],
    },
  ],
  questionnaire_job_growth_ru: [
    {
      id: "job_growth_industry",
      labelKey: "questionnaires.jobGrowth.industry.label",
      type: "text",
    },
    {
      id: "job_growth_timeline",
      labelKey: "questionnaires.jobGrowth.timeline.label",
      type: "select",
      options: [
        { value: "short", labelKey: "common.shortTerm" },
        { value: "mid", labelKey: "common.midTerm" },
        { value: "long", labelKey: "common.longTerm" },
      ],
    },
  ],
  questionnaire_finance_balance_ru: [
    {
      id: "finance_balance_pressure",
      labelKey: "questionnaires.financeBalance.pressure.label",
      type: "scale",
    },
    {
      id: "finance_balance_priority",
      labelKey: "questionnaires.financeBalance.priority.label",
      type: "multiselect",
      options: [
        { value: "savings", labelKey: "common.savings" },
        { value: "debt", labelKey: "common.debt" },
        { value: "invest", labelKey: "common.invest" },
      ],
    },
  ],
  questionnaire_choice_ru: [
    {
      id: "choice_options_count",
      labelKey: "questionnaires.choice.options.label",
      type: "scale",
    },
    {
      id: "choice_timeframe",
      labelKey: "questionnaires.choice.timeframe.label",
      type: "select",
      options: [
        { value: "urgent", labelKey: "common.urgent" },
        { value: "soon", labelKey: "common.soon" },
        { value: "later", labelKey: "common.later" },
      ],
    },
  ],
  questionnaire_weekly_ru: [
    {
      id: "weekly_focus",
      labelKey: "questionnaires.weekly.focus.label",
      type: "multiselect",
      options: [
        { value: "love", labelKey: "common.love" },
        { value: "work", labelKey: "common.work" },
        { value: "health", labelKey: "common.health" },
      ],
    },
  ],
  questionnaire_self_care_ru: [
    {
      id: "self_care_energy",
      labelKey: "questionnaires.selfCare.energy.label",
      type: "scale",
    },
  ],
  questionnaire_pregnancy_planning_ru: [
    {
      id: "pregnancy_planning_support",
      labelKey: "questionnaires.pregnancyPlanning.support.label",
      type: "select",
      options: [
        { value: "high", labelKey: "common.high" },
        { value: "medium", labelKey: "common.medium" },
        { value: "low", labelKey: "common.low" },
      ],
    },
  ],
};
