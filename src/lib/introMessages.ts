export interface IntroMessage {
  en: string;
  ru: string;
}

export interface IntroChoices {
  en: Array<{ id: string; label: string }>;
  ru: Array<{ id: string; label: string }>;
}

export const introMessages: IntroMessage = {
  en: "Welcome! When you're ready, press Start to begin your journey.",
  ru: "Добро пожаловать! Когда будете готовы, нажмите Старт, чтобы начать путешествие.",
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
