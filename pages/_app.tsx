import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../src/styles/globals.css';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Telegram Web App
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Expand the app to full height
      tg.expand();
      
      // Enable closing confirmation
      tg.enableClosingConfirmation();
      
      // Apply Telegram theme
      if (tg.themeParams) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#1B1D1E');
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#E5E5E5');
        document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#8B8B8B');
        document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#6AB4F9');
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#6AB4F9');
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#FFFFFF');
      }
      
      // Notify Telegram that the app is ready
      tg.ready();
      
      console.log('Telegram WebApp initialized:', {
        version: tg.version,
        platform: tg.platform,
        colorScheme: tg.colorScheme,
        user: tg.initDataUnsafe?.user
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
