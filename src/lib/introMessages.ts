interface IntroMessage {
  en: string;
  ru: string;
}

interface IntroChoices {
  en: Array<{ id: string; label: string }>;
  ru: Array<{ id: string; label: string }>;
}

const introMessages: IntroMessage = {
  en: "Welcome! Each story is unique and shaped by your choices. Ready to explore?",
  ru: "Добро пожаловать! Каждая история уникальна и зависит от ваших выборов. Готовы исследовать?",
};

const introChoices: IntroChoices = {
  en: [
    { id: "start", label: "Start" }
  ],
  ru: [
    { id: "start", label: "Старт" }
  ]
};

export function getIntroMessage(lang: 'en' | 'ru' = 'en'): string {
  return introMessages[lang];
}

export function getIntroChoices(lang: 'en' | 'ru' = 'en'): Array<{ id: string; label: string }> {
  return introChoices[lang];
}
