export type Locale = "ru" | "en";

type TranslationTree = Record<string, string | TranslationTree>;

export const resources: Record<Locale, TranslationTree> = {
  ru: {
    sections: {
      relationships: {
        title: "Отношения",
        newConnections: {
          title: "Новые знакомства",
          description: "Как будет развиваться новый контакт",
        },
        longTerm: {
          title: "Долгосрочные отношения",
          description: "Диалог о будущем союза",
        },
      },
      career: {
        title: "Деньги и работа",
        growth: {
          title: "Рост и карьера",
          description: "Следующий шаг в профессии",
        },
        financeBalance: {
          title: "Финансовый баланс",
          description: "Как сбалансировать бюджет",
        },
      },
      situations: {
        title: "Разные ситуации",
        choice: {
          title: "Сложный выбор",
          description: "Помощь в принятии решения",
        },
      },
      forecast: {
        title: "Прогностика",
        weekly: {
          title: "Неделя",
          description: "Погодите тенденции на семь дней",
        },
      },
      personal: {
        title: "Личные расклады",
        selfCare: {
          title: "Забота о себе",
          description: "Эмоциональный тонус",
        },
      },
      pregnancy: {
        title: "Беременность",
        planning: {
          title: "Планирование",
          description: "Подготовка к появлению малыша",
        },
      },
    },
    questionnaires: {
      newConnections: {
        title: "О чем спросим перед раскладом?",
        description: "Ответы помогут точнее подобрать интерпретации",
        intent: { label: "Что хотите прояснить?" },
        frequency: { label: "Как часто общаетесь?", helper: "0 — редко, 10 — каждый день" },
      },
      longTerm: {
        title: "Контекст отношений",
        description: "Немного детализации",
        conflict: { label: "Уровень напряжения" },
        commitment: { label: "Готовность к шагу" },
      },
      jobGrowth: {
        title: "Заявка на рост",
        description: "Сфокусируем расклад",
        industry: { label: "Сфера или роль" },
        timeline: { label: "Горизонт ожиданий" },
      },
      financeBalance: {
        title: "Финансовый баланс",
        description: "Уточним фокус",
        pressure: { label: "Уровень стресса" },
        priority: { label: "Главные приоритеты" },
      },
      choice: {
        title: "Опишите выбор",
        description: "Дайте немного контекста",
        options: { label: "Сколько вариантов рассматриваете?" },
        timeframe: { label: "Насколько срочно решение?" },
      },
      weekly: {
        title: "Фокус недели",
        description: "Выберите приоритеты",
        focus: { label: "Что важно?" },
      },
      selfCare: {
        title: "Отметьте состояние",
        description: "Поможет подсветить эмоциональные слои",
        energy: { label: "Уровень энергии" },
      },
      pregnancyPlanning: {
        title: "Контекст планирования",
        description: "Для деликатного диалога",
        support: { label: "Какой уровень поддержки есть?" },
      },
    },
    templates: {
      triadInsight: { title: "Триада знакомства", description: "Оценка взаимности и перспектив" },
      crossroads: { title: "Перекресток", description: "Про прошлое, настоящее и путь вперед" },
      careerLadder: { title: "Лестница роста", description: "Перспективы карьеры" },
      flow: { title: "Финансовый поток", description: "Баланс ресурсов" },
      duality: { title: "Дуальность", description: "Сравнение вариантов" },
      waves: { title: "Волны недели", description: "Ежедневный прогноз" },
      pulse: { title: "Пульс", description: "Тонус и ресурсы" },
      nurture: { title: "Забота", description: "Поддержка при планировании" },
    },
    ui: {
      exploreSections: "Выберите направление",
      viewSubcategories: "Перейти",
      startQuestionnaire: "Ответить на вопросы",
      beginSpread: "Начать расклад",
      drawCards: "Вытянуть карты",
      interpret: "Получить интерпретацию",
      artifacts: {
        title: "Артефакты",
        subtitle: "Коллекция эффектов и пассивов",
      },
      achievements: {
        title: "Достижения",
        subtitle: "Цели для вдохновения",
      },
      factorsTab: "Пояснения факторов",
      adviceTab: "Совет",
      meaningTab: "Смысл",
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
        frequency: { label: "How often do you talk?", helper: "0 — rarely, 10 — daily" },
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
    constellationGlow: { name: "Сияние созвездий", description: "Свечение для стола и карт" },
    starfallTrail: { name: "След звездопада", description: "Эффект метеоров при перетасовке" },
    mysticFrame: { name: "Мистическая рамка", description: "Оформление аналитики" },
    emberCards: { name: "Тлеющие карты", description: "Огненный стиль рубашек" },
    auroraBackdrop: { name: "Северное сияние", description: "Фон для раскладов" },
    chorusBells: { name: "Хор колокольчиков", description: "Звуки при открытии карт" },
    luminaPointer: { name: "Светящийся курсор", description: "Подсветка при наведении" },
    focusTotem: { name: "Тотем фокуса", description: "Снижает кулдаун на сессии" },
    whisperCodex: { name: "Шепчущий кодекс", description: "Усиленные интерпретации" },
    fortuneCompass: { name: "Компас удачи", description: "Больше наград за завершение" },
    veilGuard: { name: "Страж завесы", description: "Дополнительная защита от фрода" },
    echoCharm: { name: "Амулет эха", description: "Повышенная сила последовательных карт" },
    pulseAnchor: { name: "Якорь пульса", description: "Замедляет спад энергии" },
    clarityRune: { name: "Руна ясности", description: "Четкость советов" },
  },
  achievements: {
    streakThree: { name: "Три в ряд", description: "Завершите три расклада подряд" },
    artifactMaster: { name: "Мастер артефактов", description: "Откройте 10 улучшений" },
    socialButterfly: { name: "Социальная бабочка", description: "Поделитесь с 5 друзьями" },
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
    title: "Артефакты",
    subtitle: "Коллекция эффектов и пассивов",
  },
  achievements: {
    title: "Достижения",
    subtitle: "Цели для вдохновения",
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

Object.assign(resources.ru.ui as Record<string, unknown>, { spread: { title: "Итог расклада", subtitle: "Анимация выкладки и итоговые данные." } });
Object.assign(resources.en.ui as Record<string, unknown>, { spread: { title: "Spread summary", subtitle: "Reveal animation and final breakdown." } });

