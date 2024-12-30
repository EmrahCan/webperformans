import React from 'react';
import { Zap } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg animate-float">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {t('header.title')}
              </h1>
              <p className="mt-1 text-gray-600">
                {t('header.subtitle')}
              </p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </header>
  );
}