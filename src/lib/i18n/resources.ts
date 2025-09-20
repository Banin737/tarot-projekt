export type Locale = "ru" | "en";

type TranslationTree = Record<string, string | TranslationTree>;

export const resources: Record<Locale, TranslationTree> = {
  ru: {
    sections: {
      relationships: {
        title: "���������",
        newConnections: {
          title: "����� ����������",
          description: "��� ����� ����������� ����� �������",
        },
        longTerm: {
          title: "������������ ���������",
          description: "������ � ������� �����",
        },
      },
      career: {
        title: "������ � ������",
        growth: {
          title: "���� � �������",
          description: "��������� ��� � ���������",
        },
        financeBalance: {
          title: "���������� ������",
          description: "��� �������������� ������",
        },
      },
      situations: {
        title: "������ ��������",
        choice: {
          title: "������� �����",
          description: "������ � �������� �������",
        },
      },
      forecast: {
        title: "�����������",
        weekly: {
          title: "������",
          description: "�������� ��������� �� ���� ����",
        },
      },
      personal: {
        title: "������ ��������",
        selfCare: {
          title: "������ � ����",
          description: "������������� �����",
        },
      },
      pregnancy: {
        title: "������������",
        planning: {
          title: "������������",
          description: "���������� � ��������� ������",
        },
      },
    },
    questionnaires: {
      newConnections: {
        title: "� ��� ������� ����� ���������?",
        description: "������ ������� ������ ��������� �������������",
        intent: { label: "��� ������ ���������?" },
        frequency: { label: "��� ����� ���������?", helper: "0 � �����, 10 � ������ ����" },
      },
      longTerm: {
        title: "�������� ���������",
        description: "������� �����������",
        conflict: { label: "������� ����������" },
        commitment: { label: "���������� � ����" },
      },
      jobGrowth: {
        title: "������ �� ����",
        description: "����������� �������",
        industry: { label: "����� ��� ����" },
        timeline: { label: "�������� ��������" },
      },
      financeBalance: {
        title: "���������� ������",
        description: "������� �����",
        pressure: { label: "������� �������" },
        priority: { label: "������� ����������" },
      },
      choice: {
        title: "������� �����",
        description: "����� ������� ���������",
        options: { label: "������� ��������� ��������������?" },
        timeframe: { label: "��������� ������ �������?" },
      },
      weekly: {
        title: "����� ������",
        description: "�������� ����������",
        focus: { label: "��� �����?" },
      },
      selfCare: {
        title: "�������� ���������",
        description: "������� ���������� ������������� ����",
        energy: { label: "������� �������" },
      },
      pregnancyPlanning: {
        title: "�������� ������������",
        description: "��� ����������� �������",
        support: { label: "����� ������� ��������� ����?" },
      },
    },
    templates: {
      triadInsight: { title: "������ ����������", description: "������ ���������� � ����������" },
      crossroads: { title: "�����������", description: "��� �������, ��������� � ���� ������" },
      careerLadder: { title: "�������� �����", description: "����������� �������" },
      flow: { title: "���������� �����", description: "������ ��������" },
      duality: { title: "����������", description: "��������� ���������" },
      waves: { title: "����� ������", description: "���������� �������" },
      pulse: { title: "�����", description: "����� � �������" },
      nurture: { title: "������", description: "��������� ��� ������������" },
    },
    ui: {
      exploreSections: "�������� �����������",
      viewSubcategories: "�������",
      startQuestionnaire: "�������� �� �������",
      beginSpread: "������ �������",
      drawCards: "�������� �����",
      interpret: "�������� �������������",
      artifacts: {
        title: "���������",
        subtitle: "��������� �������� � ��������",
      },
      achievements: {
        title: "����������",
        subtitle: "���� ��� �����������",
      },
      factorsTab: "��������� ��������",
      adviceTab: "�����",
      meaningTab: "�����",
    },
  },
  en: {
    sections: {
      relationships: {
        title: "Relationships",
        newConnections: {
          title: "New Connections",
          description: "How the bond may grow",
        },
        longTerm: {
          title: "Long-Term",
          description: "Dialogue about shared future",
        },
      },
      career: {
        title: "Money & Work",
        growth: { title: "Growth", description: "Next professional step" },
        financeBalance: { title: "Financial Balance", description: "Stabilising the budget" },
      },
      situations: {
        title: "Situations",
        choice: { title: "Difficult choice", description: "Guidance to decide" },
      },
      forecast: {
        title: "Forecasting",
        weekly: { title: "Week", description: "Seven-day tendencies" },
      },
      personal: {
        title: "Personal",
        selfCare: { title: "Self-care", description: "Emotional tone" },
      },
      pregnancy: {
        title: "Pregnancy",
        planning: { title: "Planning", description: "Preparing for a baby" },
      },
    },
    questionnaires: {
      newConnections: {
        title: "Pre-spread questions",
        description: "A bit of context sharpens insights",
        intent: { label: "What do you want to clarify?" },
        frequency: { label: "How often do you talk?", helper: "0 � rarely, 10 � daily" },
      },
      longTerm: {
        title: "Relationship context",
        description: "Give us the vibe",
        conflict: { label: "Level of tension" },
        commitment: { label: "Commitment level" },
      },
      jobGrowth: {
        title: "Career focus",
        description: "Tune the spread",
        industry: { label: "Field or role" },
        timeline: { label: "Timeline" },
      },
      financeBalance: {
        title: "Financial balance",
        description: "Select focus",
        pressure: { label: "Stress level" },
        priority: { label: "Priorities" },
      },
      choice: {
        title: "Describe the decision",
        description: "More detail, better answer",
        options: { label: "How many options?" },
        timeframe: { label: "How urgent is it?" },
      },
      weekly: {
        title: "Weekly focus",
        description: "Pick your priorities",
        focus: { label: "What matters?" },
      },
      selfCare: {
        title: "State check",
        description: "Helps map emotional layers",
        energy: { label: "Energy level" },
      },
      pregnancyPlanning: {
        title: "Planning context",
        description: "Sensitive conversation",
        support: { label: "Support level" },
      },
    },
    templates: {
      triadInsight: { title: "Triad insight", description: "Assessing chemistry and outlook" },
      crossroads: { title: "Crossroads", description: "Past, present, direction" },
      careerLadder: { title: "Career ladder", description: "Career progression" },
      flow: { title: "Flow", description: "Balancing resources" },
      duality: { title: "Duality", description: "Comparing options" },
      waves: { title: "Weekly waves", description: "Seven-day rhythm" },
      pulse: { title: "Pulse", description: "Resource check" },
      nurture: { title: "Nurture", description: "Support in planning" },
    },
    ui: {
      exploreSections: "Choose a path",
      viewSubcategories: "Open",
      startQuestionnaire: "Answer the questions",
      beginSpread: "Begin spread",
      drawCards: "Draw cards",
      interpret: "Interpret",
      artifacts: {
        title: "Artifacts",
        subtitle: "Cosmetics and passive effects",
      },
      achievements: {
        title: "Achievements",
        subtitle: "Goals for momentum",
      },
      factorsTab: "Factors",
      adviceTab: "Advice",
      meaningTab: "Meaning",
    },
  },
};

export const translate = (locale: Locale, key: string): string => {
  const segments = key.split(".");
  let current: unknown = resources[locale];
  for (const segment of segments) {
    if (typeof current !== "object" || current === null || !(segment in current)) {
      return key;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return typeof current === "string" ? current : key;
};

Object.assign(resources.ru, {
  artifacts: {
    constellationGlow: { name: "������ ���������", description: "�������� ��� ����� � ����" },
    starfallTrail: { name: "���� ����������", description: "������ �������� ��� �����������" },
    mysticFrame: { name: "����������� �����", description: "���������� ���������" },
    emberCards: { name: "������� �����", description: "�������� ����� �������" },
    auroraBackdrop: { name: "�������� ������", description: "��� ��� ���������" },
    chorusBells: { name: "��� �������������", description: "����� ��� �������� ����" },
    luminaPointer: { name: "���������� ������", description: "��������� ��� ���������" },
    focusTotem: { name: "����� ������", description: "������� ������� �� ������" },
    whisperCodex: { name: "�������� ������", description: "��������� �������������" },
    fortuneCompass: { name: "������ �����", description: "������ ������ �� ����������" },
    veilGuard: { name: "����� ������", description: "�������������� ������ �� �����" },
    echoCharm: { name: "������ ���", description: "���������� ���� ���������������� ����" },
    pulseAnchor: { name: "����� ������", description: "��������� ���� �������" },
    clarityRune: { name: "���� �������", description: "�������� �������" },
  },
  achievements: {
    streakThree: { name: "��� � ���", description: "��������� ��� �������� ������" },
    artifactMaster: { name: "������ ����������", description: "�������� 10 ���������" },
    socialButterfly: { name: "���������� �������", description: "���������� � 5 ��������" },
  },
});

Object.assign(resources.en, {
  artifacts: {
    constellationGlow: { name: "Constellation glow", description: "Ambient light for the table" },
    starfallTrail: { name: "Starfall trail", description: "Meteor effect on shuffle" },
    mysticFrame: { name: "Mystic frame", description: "Frame around insights" },
    emberCards: { name: "Ember cards", description: "Fiery card backs" },
    auroraBackdrop: { name: "Aurora backdrop", description: "Spread background" },
    chorusBells: { name: "Chorus bells", description: "Chimes on reveal" },
    luminaPointer: { name: "Lumina pointer", description: "Glowing cursor" },
    focusTotem: { name: "Focus totem", description: "Shorter cooldown" },
    whisperCodex: { name: "Whisper codex", description: "Amplified interpretations" },
    fortuneCompass: { name: "Fortune compass", description: "More rewards per session" },
    veilGuard: { name: "Veil guard", description: "Extra fraud shield" },
    echoCharm: { name: "Echo charm", description: "Stronger sequential impact" },
    pulseAnchor: { name: "Pulse anchor", description: "Stabilises energy" },
    clarityRune: { name: "Clarity rune", description: "Sharper advice" },
  },
  achievements: {
    streakThree: { name: "Three streak", description: "Complete three spreads in a row" },
    artifactMaster: { name: "Artifact master", description: "Unlock 10 upgrades" },
    socialButterfly: { name: "Social butterfly", description: "Share with five friends" },
  },
});
Object.assign(resources.ru.ui as Record<string, unknown>, {
  artifacts: {
    title: "���������",
    subtitle: "��������� �������� � ��������",
  },
  achievements: {
    title: "����������",
    subtitle: "���� ��� �����������",
  },
});

Object.assign(resources.en.ui as Record<string, unknown>, {
  artifacts: {
    title: "Artifacts",
    subtitle: "Cosmetics and passives",
  },
  achievements: {
    title: "Achievements",
    subtitle: "Goals to inspire",
  },
});

Object.assign(resources.ru.ui as Record<string, unknown>, { spread: { title: "���� ��������", subtitle: "�������� �������� � �������� ������." } });
Object.assign(resources.en.ui as Record<string, unknown>, { spread: { title: "Spread summary", subtitle: "Reveal animation and final breakdown." } });

