import { debugLog } from '../debugUtils';
import type { AnalysisStep } from '../../types/analysis';

const steps = {
  en: [
    {
      id: 1,
      title: 'Loading Page Content',
      description: 'Fetching and analyzing the webpage content',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Performance Analysis',
      description: 'Measuring load times and performance metrics',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Accessibility Check',
      description: 'Evaluating accessibility standards compliance',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Best Practices Audit',
      description: 'Checking adherence to web development best practices',
      status: 'pending'
    },
    {
      id: 5,
      title: 'SEO Analysis',
      description: 'Analyzing search engine optimization factors',
      status: 'pending'
    }
  ],
  tr: [
    {
      id: 1,
      title: 'Sayfa İçeriği Yükleniyor',
      description: 'Web sayfası içeriği alınıyor ve analiz ediliyor',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Performans Analizi',
      description: 'Yükleme süreleri ve performans metrikleri ölçülüyor',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Erişilebilirlik Kontrolü',
      description: 'Erişilebilirlik standartlarına uygunluk değerlendiriliyor',
      status: 'pending'
    },
    {
      id: 4,
      title: 'En İyi Uygulamalar Denetimi',
      description: 'Web geliştirme en iyi uygulamalarına uygunluk kontrol ediliyor',
      status: 'pending'
    },
    {
      id: 5,
      title: 'SEO Analizi',
      description: 'Arama motoru optimizasyonu faktörleri analiz ediliyor',
      status: 'pending'
    }
  ]
};

export const getInitialSteps = (language: string): AnalysisStep[] => {
  debugLog('Initializing analysis steps for language:', language);
  return steps[language as keyof typeof steps] || steps.en;
};