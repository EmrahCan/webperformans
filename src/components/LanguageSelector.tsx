import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  tr: 'Türkçe'
};

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as keyof typeof languages)}
        className="bg-transparent border-none text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
    </div>
  );
}