import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

type Language = 'en' | 'tr' | 'de' | 'fr' | 'it';
type Translations = typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string) => {
    return path.split('.').reduce((obj, key) => {
      return obj?.[key as keyof typeof obj];
    }, translations[language]) as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}