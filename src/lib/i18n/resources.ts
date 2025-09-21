import { DEFAULT_LOCALE, type SupportedLocale } from "./config";

export interface TranslationTree {
  [key: string]: string | TranslationTree;
}

export type Locale = SupportedLocale;

export const resources: Record<SupportedLocale, TranslationTree> = {
  ru: {
    common: {
      friendship: "Р”СЂСѓР¶Р±Р°",
      romance: "Р РѕРјР°РЅС‚РёРєР°",
      unsure: "РџРѕРєР° РЅРµ СѓРІРµСЂРµРЅР°",
      low: "РќРёР·РєРёР№",
      medium: "РЎСЂРµРґРЅРёР№",
      high: "Р’С‹СЃРѕРєРёР№",
      shortTerm: "Р‘Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ",
      midTerm: "РЎСЂРµРґРЅРµСЃСЂРѕС‡РЅРѕ",
      longTerm: "Р”РѕР»РіРѕСЃСЂРѕС‡РЅРѕ",
      savings: "РЎР±РµСЂРµР¶РµРЅРёСЏ",
      debt: "Р”РѕР»РіРё",
      invest: "РРЅРІРµСЃС‚РёС†РёРё",
      urgent: "РЎСЂРѕС‡РЅРѕ",
      soon: "РЎРєРѕСЂРѕ",
      later: "РџРѕР·Р¶Рµ",
      love: "Р›СЋР±РѕРІСЊ",
      work: "Р Р°Р±РѕС‚Р°",
      health: "Р—РґРѕСЂРѕРІСЊРµ"
    },
    sections: {
      relationships: {
        title: "РћС‚РЅРѕС€РµРЅРёСЏ",
        newConnections: {
          title: "РќРѕРІС‹Рµ Р·РЅР°РєРѕРјСЃС‚РІР°",
          description: "РљР°Рє Р±СѓРґРµС‚ СЂР°Р·РІРёРІР°С‚СЊСЃСЏ РЅРѕРІС‹Р№ РєРѕРЅС‚Р°РєС‚"
        },
        longTerm: {
          title: "Р”РѕР»РіРѕСЃСЂРѕС‡РЅС‹Рµ РѕС‚РЅРѕС€РµРЅРёСЏ",
          description: "Р”РёР°Р»РѕРі Рѕ Р±СѓРґСѓС‰РµРј СЃРѕСЋР·Р°"
        }
      },
      career: {
        title: "Р”РµРЅСЊРіРё Рё СЂР°Р±РѕС‚Р°",
        growth: {
          title: "Р РѕСЃС‚ Рё РєР°СЂСЊРµСЂР°",
          description: "РЎР»РµРґСѓСЋС‰РёР№ С€Р°Рі РІ РїСЂРѕС„РµСЃСЃРёРё"
        },
        financeBalance: {
          title: "Р¤РёРЅР°РЅСЃРѕРІС‹Р№ Р±Р°Р»Р°РЅСЃ",
          description: "РљР°Рє СЃР±Р°Р»Р°РЅСЃРёСЂРѕРІР°С‚СЊ Р±СЋРґР¶РµС‚"
        }
      },
      situations: {
        title: "Р Р°Р·РЅС‹Рµ СЃРёС‚СѓР°С†РёРё",
        choice: {
          title: "РЎР»РѕР¶РЅС‹Р№ РІС‹Р±РѕСЂ",
          description: "РџРѕРјРѕС‰СЊ РІ РїСЂРёРЅСЏС‚РёРё СЂРµС€РµРЅРёСЏ"
        }
      },
      forecast: {
        title: "РџСЂРѕРіРЅРѕСЃС‚РёРєР°",
        weekly: {
          title: "РќРµРґРµР»СЏ",
          description: "РўРµРЅРґРµРЅС†РёРё РЅР° СЃРµРјСЊ РґРЅРµР№"
        }
      },
      personal: {
        title: "Р›РёС‡РЅС‹Рµ СЂР°СЃРєР»Р°РґС‹",
        selfCare: {
          title: "Р—Р°Р±РѕС‚Р° Рѕ СЃРµР±Рµ",
          description: "Р­РјРѕС†РёРѕРЅР°Р»СЊРЅС‹Р№ С‚РѕРЅСѓСЃ"
        }
      },
      pregnancy: {
        title: "Р‘РµСЂРµРјРµРЅРЅРѕСЃС‚СЊ",
        planning: {
          title: "РџР»Р°РЅРёСЂРѕРІР°РЅРёРµ",
          description: "РџРѕРґРіРѕС‚РѕРІРєР° Рє РїРѕСЏРІР»РµРЅРёСЋ РјР°Р»С‹С€Р°"
        }
      }
    },
    questionnaires: {
      newConnections: {
        title: "Рћ С‡С‘Рј СЃРїСЂРѕСЃРёРј РїРµСЂРµРґ СЂР°СЃРєР»Р°РґРѕРј?",
        description: "РћС‚РІРµС‚С‹ РїРѕРјРѕРіСѓС‚ С‚РѕС‡РЅРµРµ РїРѕРґРѕР±СЂР°С‚СЊ РёРЅС‚РµСЂРїСЂРµС‚Р°С†РёРё",
        intent: { label: "Р§С‚Рѕ С…РѕС‚РёС‚Рµ РїСЂРѕСЏСЃРЅРёС‚СЊ?" },
        frequency: {
          label: "РљР°Рє С‡Р°СЃС‚Рѕ РѕР±С‰Р°РµС‚РµСЃСЊ?",
          helper: "0 вЂ” СЂРµРґРєРѕ, 10 вЂ” РєР°Р¶РґС‹Р№ РґРµРЅСЊ"
        }
      },
      longTerm: {
        title: "РљРѕРЅС‚РµРєСЃС‚ РѕС‚РЅРѕС€РµРЅРёР№",
        description: "РќРµРјРЅРѕРіРѕ РґРµС‚Р°Р»РёР·Р°С†РёРё",
        conflict: { label: "РЈСЂРѕРІРµРЅСЊ РЅР°РїСЂСЏР¶РµРЅРёСЏ" },
        commitment: { label: "Р“РѕС‚РѕРІРЅРѕСЃС‚СЊ Рє С€Р°РіСѓ" }
      },
      jobGrowth: {
        title: "Р—Р°СЏРІРєР° РЅР° СЂРѕСЃС‚",
        description: "РЎС„РѕРєСѓСЃРёСЂСѓРµРј СЂР°СЃРєР»Р°Рґ",
        industry: { label: "РЎС„РµСЂР° РёР»Рё СЂРѕР»СЊ" },
        timeline: { label: "Р“РѕСЂРёР·РѕРЅС‚ РѕР¶РёРґР°РЅРёР№" }
      },
      financeBalance: {
        title: "Р¤РёРЅР°РЅСЃРѕРІС‹Р№ Р±Р°Р»Р°РЅСЃ",
        description: "РЈС‚РѕС‡РЅРёРј С„РѕРєСѓСЃ",
        pressure: { label: "РЈСЂРѕРІРµРЅСЊ СЃС‚СЂРµСЃСЃР°" },
        priority: { label: "Р“Р»Р°РІРЅС‹Рµ РїСЂРёРѕСЂРёС‚РµС‚С‹" }
      },
      choice: {
        title: "РћРїРёС€РёС‚Рµ РІС‹Р±РѕСЂ",
        description: "Р”Р°Р№С‚Рµ РЅРµРјРЅРѕРіРѕ РєРѕРЅС‚РµРєСЃС‚Р°",
        options: { label: "РЎРєРѕР»СЊРєРѕ РІР°СЂРёР°РЅС‚РѕРІ СЂР°СЃСЃРјР°С‚СЂРёРІР°РµС‚Рµ?" },
        timeframe: { label: "РќР°СЃРєРѕР»СЊРєРѕ СЃСЂРѕС‡РЅРѕ СЂРµС€РµРЅРёРµ?" }
      },
      weekly: {
        title: "Р¤РѕРєСѓСЃ РЅРµРґРµР»Рё",
        description: "Р’С‹Р±РµСЂРёС‚Рµ РїСЂРёРѕСЂРёС‚РµС‚С‹",
        focus: { label: "Р§С‚Рѕ РІР°Р¶РЅРѕ?" }
      },
      selfCare: {
        title: "РћС‚РјРµС‚СЊС‚Рµ СЃРѕСЃС‚РѕСЏРЅРёРµ",
        description: "РџРѕРјРѕР¶РµС‚ РїРѕРґСЃРІРµС‚РёС‚СЊ СЌРјРѕС†РёРѕРЅР°Р»СЊРЅС‹Рµ СЃР»РѕРё",
        energy: { label: "РЈСЂРѕРІРµРЅСЊ СЌРЅРµСЂРіРёРё" }
      },
      pregnancyPlanning: {
        title: "РљРѕРЅС‚РµРєСЃС‚ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ",
        description: "Р”Р»СЏ РґРµР»РёРєР°С‚РЅРѕРіРѕ РґРёР°Р»РѕРіР°",
        support: { label: "РљР°РєРѕР№ СѓСЂРѕРІРµРЅСЊ РїРѕРґРґРµСЂР¶РєРё РµСЃС‚СЊ?" }
      }
    },
    templates: {
      triadInsight: {
        title: "РўСЂРёР°РґР° Р·РЅР°РєРѕРјСЃС‚РІР°",
        description: "РћС†РµРЅРєР° РІР·Р°РёРјРЅРѕСЃС‚Рё Рё РїРµСЂСЃРїРµРєС‚РёРІ"
      },
      crossroads: {
        title: "РџРµСЂРµРєСЂС‘СЃС‚РѕРє",
        description: "РџСЂРѕ РїСЂРѕС€Р»РѕРµ, РЅР°СЃС‚РѕСЏС‰РµРµ Рё РїСѓС‚СЊ РІРїРµСЂС‘Рґ"
      },
      careerLadder: {
        title: "Р›РµСЃС‚РЅРёС†Р° СЂРѕСЃС‚Р°",
        description: "РџРµСЂСЃРїРµРєС‚РёРІС‹ РєР°СЂСЊРµСЂС‹"
      },
      flow: {
        title: "Р¤РёРЅР°РЅСЃРѕРІС‹Р№ РїРѕС‚РѕРє",
        description: "Р‘Р°Р»Р°РЅСЃ СЂРµСЃСѓСЂСЃРѕРІ"
      },
      duality: {
        title: "Р”СѓР°Р»СЊРЅРѕСЃС‚СЊ",
        description: "РЎСЂР°РІРЅРµРЅРёРµ РІР°СЂРёР°РЅС‚РѕРІ"
      },
      waves: {
        title: "Р’РѕР»РЅС‹ РЅРµРґРµР»Рё",
        description: "Р•Р¶РµРґРЅРµРІРЅС‹Р№ РїСЂРѕРіРЅРѕР·"
      },
      pulse: {
        title: "РџСѓР»СЊСЃ",
        description: "РўРѕРЅСѓСЃ Рё СЂРµСЃСѓСЂСЃС‹"
      },
      nurture: {
        title: "Р—Р°Р±РѕС‚Р°",
        description: "РџРѕРґРґРµСЂР¶РєР° РїСЂРё РїР»Р°РЅРёСЂРѕРІР°РЅРёРё"
      }
    },
    ui: {
      exploreSections: "Р’С‹Р±РµСЂРёС‚Рµ РЅР°РїСЂР°РІР»РµРЅРёРµ",
      viewSubcategories: "РџРµСЂРµР№С‚Рё",
      startQuestionnaire: "РћС‚РІРµС‚РёС‚СЊ РЅР° РІРѕРїСЂРѕСЃС‹",
      beginSpread: "РќР°С‡Р°С‚СЊ СЂР°СЃРєР»Р°Рґ",
      drawCards: "Р’С‹С‚СЏРЅСѓС‚СЊ РєР°СЂС‚С‹",
      interpret: "РџРѕР»СѓС‡РёС‚СЊ РёРЅС‚РµСЂРїСЂРµС‚Р°С†РёСЋ",
      factorsTab: "РџРѕСЏСЃРЅРµРЅРёСЏ С„Р°РєС‚РѕСЂРѕРІ",
      adviceTab: "РЎРѕРІРµС‚",
      meaningTab: "РЎРјС‹СЃР»",
      artifacts: {
        title: "РђСЂС‚РµС„Р°РєС‚С‹",
        subtitle: "РљРѕР»Р»РµРєС†РёСЏ СЌС„С„РµРєС‚РѕРІ Рё РїР°СЃСЃРёРІРѕРІ"
      },
      achievements: {
        title: "Р”РѕСЃС‚РёР¶РµРЅРёСЏ",
        subtitle: "Р¦РµР»Рё РґР»СЏ РІРґРѕС…РЅРѕРІРµРЅРёСЏ"
      },
      spread: {
        title: "РС‚РѕРі СЂР°СЃРєР»Р°РґР°",
        subtitle: "РђРЅРёРјР°С†РёСЏ РІС‹РєР»Р°РґРєРё Рё РёС‚РѕРіРѕРІС‹Рµ РґР°РЅРЅС‹Рµ."
      }
    },
    artifacts: {
      constellationGlow: {
        name: "РЎРёСЏРЅРёРµ СЃРѕР·РІРµР·РґРёР№",
        description: "РЎРІРµС‡РµРЅРёРµ РґР»СЏ СЃС‚РѕР»Р° Рё РєР°СЂС‚"
      },
      starfallTrail: {
        name: "РЎР»РµРґ Р·РІРµР·РґРѕРїР°РґР°",
        description: "Р­С„С„РµРєС‚ РјРµС‚РµРѕСЂРѕРІ РїСЂРё РїРµСЂРµС‚Р°СЃРѕРІРєРµ"
      },
      mysticFrame: {
        name: "РњРёСЃС‚РёС‡РµСЃРєР°СЏ СЂР°РјРєР°",
        description: "РћС„РѕСЂРјР»РµРЅРёРµ Р°РЅР°Р»РёС‚РёРєРё"
      },
      emberCards: {
        name: "РўР»РµСЋС‰РёРµ РєР°СЂС‚С‹",
        description: "РћРіРЅРµРЅРЅС‹Р№ СЃС‚РёР»СЊ СЂСѓР±Р°С€РµРє"
      },
      auroraBackdrop: {
        name: "РЎРµРІРµСЂРЅРѕРµ СЃРёСЏРЅРёРµ",
        description: "Р¤РѕРЅ РґР»СЏ СЂР°СЃРєР»Р°РґРѕРІ"
      },
      chorusBells: {
        name: "РҐРѕСЂ РєРѕР»РѕРєРѕР»СЊС‡РёРєРѕРІ",
        description: "Р—РІСѓРєРё РїСЂРё РѕС‚РєСЂС‹С‚РёРё РєР°СЂС‚"
      },
      luminaPointer: {
        name: "РЎРІРµС‚СЏС‰РёР№СЃСЏ РєСѓСЂСЃРѕСЂ",
        description: "РџРѕРґСЃРІРµС‚РєР° РїСЂРё РЅР°РІРµРґРµРЅРёРё"
      },
      focusTotem: {
        name: "РўРѕС‚РµРј С„РѕРєСѓСЃР°",
        description: "РЎРЅРёР¶Р°РµС‚ РєСѓР»РґР°СѓРЅ РЅР° СЃРµСЃСЃРёРё"
      },
      whisperCodex: {
        name: "РЁРµРїС‡СѓС‰РёР№ РєРѕРґРµРєСЃ",
        description: "РЈСЃРёР»РµРЅРЅС‹Рµ РёРЅС‚РµСЂРїСЂРµС‚Р°С†РёРё"
      },
      fortuneCompass: {
        name: "РљРѕРјРїР°СЃ СѓРґР°С‡Рё",
        description: "Р‘РѕР»СЊС€Рµ РЅР°РіСЂР°Рґ Р·Р° Р·Р°РІРµСЂС€РµРЅРёРµ"
      },
      veilGuard: {
        name: "РЎС‚СЂР°Р¶ Р·Р°РІРµСЃС‹",
        description: "Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅР°СЏ Р·Р°С‰РёС‚Р° РѕС‚ С„СЂРѕРґР°"
      },
      echoCharm: {
        name: "РђРјСѓР»РµС‚ СЌС…Р°",
        description: "РџРѕРІС‹С€РµРЅРЅР°СЏ СЃРёР»Р° РїРѕСЃР»РµРґРѕРІР°С‚РµР»СЊРЅС‹С… РєР°СЂС‚"
      },
      pulseAnchor: {
        name: "РЇРєРѕСЂСЊ РїСѓР»СЊСЃР°",
        description: "Р—Р°РјРµРґР»СЏРµС‚ СЃРїР°Рґ СЌРЅРµСЂРіРёРё"
      },
      clarityRune: {
        name: "Р СѓРЅР° СЏСЃРЅРѕСЃС‚Рё",
        description: "Р§С‘С‚РєРёРµ СЃРѕРІРµС‚С‹"
      }
    },
    achievements: {
      streakThree: {
        name: "РўСЂРё РІ СЂСЏРґ",
        description: "Р—Р°РІРµСЂС€РёС‚Рµ С‚СЂРё СЂР°СЃРєР»Р°РґР° РїРѕРґСЂСЏРґ"
      },
      artifactMaster: {
        name: "РњР°СЃС‚РµСЂ Р°СЂС‚РµС„Р°РєС‚РѕРІ",
        description: "РћС‚РєСЂРѕР№С‚Рµ 10 СѓР»СѓС‡С€РµРЅРёР№"
      },
      socialButterfly: {
        name: "РЎРѕС†РёР°Р»СЊРЅР°СЏ Р±Р°Р±РѕС‡РєР°",
        description: "РџРѕРґРµР»РёС‚РµСЃСЊ СЃ РїСЏС‚СЊСЋ РґСЂСѓР·СЊСЏРјРё"
      }
    }
  },
  en: {
    common: {
      friendship: "Friendship",
      romance: "Romance",
      unsure: "Not sure yet",
      low: "Low",
      medium: "Medium",
      high: "High",
      shortTerm: "Short term",
      midTerm: "Mid term",
      longTerm: "Long term",
      savings: "Savings",
      debt: "Debt",
      invest: "Invest",
      urgent: "Urgent",
      soon: "Soon",
      later: "Later",
      love: "Love",
      work: "Work",
      health: "Health"
    },
    sections: {
      relationships: {
        title: "Relationships",
        newConnections: {
          title: "New Connections",
          description: "How the bond may grow"
        },
        longTerm: {
          title: "Long-Term",
          description: "Dialogue about shared future"
        }
      },
      career: {
        title: "Money & Work",
        growth: {
          title: "Growth",
          description: "Next professional step"
        },
        financeBalance: {
          title: "Financial Balance",
          description: "Stabilising the budget"
        }
      },
      situations: {
        title: "Situations",
        choice: {
          title: "Difficult choice",
          description: "Guidance to decide"
        }
      },
      forecast: {
        title: "Forecasting",
        weekly: {
          title: "Week",
          description: "Seven-day tendencies"
        }
      },
      personal: {
        title: "Personal",
        selfCare: {
          title: "Self-care",
          description: "Emotional tone"
        }
      },
      pregnancy: {
        title: "Pregnancy",
        planning: {
          title: "Planning",
          description: "Preparing for a baby"
        }
      }
    },
    questionnaires: {
      newConnections: {
        title: "Pre-spread questions",
        description: "A bit of context sharpens insights",
        intent: { label: "What do you want to clarify?" },
        frequency: {
          label: "How often do you talk?",
          helper: "0 вЂ” rarely, 10 вЂ” daily"
        }
      },
      longTerm: {
        title: "Relationship context",
        description: "Give us the vibe",
        conflict: { label: "Level of tension" },
        commitment: { label: "Commitment level" }
      },
      jobGrowth: {
        title: "Career focus",
        description: "Tune the spread",
        industry: { label: "Field or role" },
        timeline: { label: "Timeline" }
      },
      financeBalance: {
        title: "Financial balance",
        description: "Select focus",
        pressure: { label: "Stress level" },
        priority: { label: "Priorities" }
      },
      choice: {
        title: "Describe the decision",
        description: "More detail, better answer",
        options: { label: "How many options?" },
        timeframe: { label: "How urgent is it?" }
      },
      weekly: {
        title: "Weekly focus",
        description: "Pick your priorities",
        focus: { label: "What matters?" }
      },
      selfCare: {
        title: "State check",
        description: "Helps map emotional layers",
        energy: { label: "Energy level" }
      },
      pregnancyPlanning: {
        title: "Planning context",
        description: "Sensitive conversation",
        support: { label: "Support level" }
      }
    },
    templates: {
      triadInsight: {
        title: "Triad insight",
        description: "Assessing chemistry and outlook"
      },
      crossroads: {
        title: "Crossroads",
        description: "Past, present, direction"
      },
      careerLadder: {
        title: "Career ladder",
        description: "Career progression"
      },
      flow: {
        title: "Flow",
        description: "Balancing resources"
      },
      duality: {
        title: "Duality",
        description: "Comparing options"
      },
      waves: {
        title: "Weekly waves",
        description: "Seven-day rhythm"
      },
      pulse: {
        title: "Pulse",
        description: "Resource check"
      },
      nurture: {
        title: "Nurture",
        description: "Support in planning"
      }
    },
    ui: {
      exploreSections: "Choose a path",
      viewSubcategories: "Open",
      startQuestionnaire: "Answer the questions",
      beginSpread: "Begin spread",
      drawCards: "Draw cards",
      interpret: "Interpret",
      factorsTab: "Factors",
      adviceTab: "Advice",
      meaningTab: "Meaning",
      artifacts: {
        title: "Artifacts",
        subtitle: "Cosmetics and passives"
      },
      achievements: {
        title: "Achievements",
        subtitle: "Goals to inspire"
      },
      spread: {
        title: "Spread summary",
        subtitle: "Reveal animation and final breakdown."
      }
    },
    artifacts: {
      constellationGlow: {
        name: "Constellation glow",
        description: "Ambient light for the table"
      },
      starfallTrail: {
        name: "Starfall trail",
        description: "Meteor effect on shuffle"
      },
      mysticFrame: {
        name: "Mystic frame",
        description: "Frame around insights"
      },
      emberCards: {
        name: "Ember cards",
        description: "Fiery card backs"
      },
      auroraBackdrop: {
        name: "Aurora backdrop",
        description: "Spread background"
      },
      chorusBells: {
        name: "Chorus bells",
        description: "Chimes on reveal"
      },
      luminaPointer: {
        name: "Lumina pointer",
        description: "Glowing cursor"
      },
      focusTotem: {
        name: "Focus totem",
        description: "Shorter cooldown"
      },
      whisperCodex: {
        name: "Whisper codex",
        description: "Amplified interpretations"
      },
      fortuneCompass: {
        name: "Fortune compass",
        description: "More rewards per session"
      },
      veilGuard: {
        name: "Veil guard",
        description: "Extra fraud shield"
      },
      echoCharm: {
        name: "Echo charm",
        description: "Stronger sequential impact"
      },
      pulseAnchor: {
        name: "Pulse anchor",
        description: "Stabilises energy"
      },
      clarityRune: {
        name: "Clarity rune",
        description: "Sharper advice"
      }
    },
    achievements: {
      streakThree: {
        name: "Three streak",
        description: "Complete three spreads in a row"
      },
      artifactMaster: {
        name: "Artifact master",
        description: "Unlock 10 upgrades"
      },
      socialButterfly: {
        name: "Social butterfly",
        description: "Share with five friends"
      }
    }
  }
};

export const translate = (locale: SupportedLocale, key: string): string => {
  const segments = key.split(".");
  let current: unknown = resources[locale] ?? resources[DEFAULT_LOCALE];

  for (const segment of segments) {
    if (typeof current !== "object" || current === null || !(segment in (current as Record<string, unknown>))) {
      return key;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : key;
};

