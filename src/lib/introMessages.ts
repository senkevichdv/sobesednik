export interface IntroMessage {
  en: string;
  ru: string;
}

export interface IntroChoices {
  en: Array<{ id: string; label: string }>;
  ru: Array<{ id: string; label: string }>;
}

export const introMessages: IntroMessage = {
  en: "Welcome to a space for reflection. Here you'll explore short stories that mirror inner landscapes. Nothing is saved. Press Start to begin your journey.",
  ru: "Добро пожаловать в пространство для размышлений. Здесь вы исследуете короткие истории, отражающие внутренние пейзажи. Ничего не сохраняется. Нажмите Старт, чтобы начать путешествие."
};

export const introChoices: IntroChoices = {
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
