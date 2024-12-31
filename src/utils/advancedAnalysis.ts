import type { AnalysisMetrics } from '../types/analysis';

interface ABTest {
  name: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  estimatedGain: string;
}

interface CostBenefitAnalysis {
  improvement: string;
  cost: {
    development: number;
    maintenance: number;
    total: number;
  };
  benefit: {
    performanceGain: string;
    userExperienceGain: string;
    estimatedRevenueIncrease: string;
    roi: string;
  };
  priority: 'high' | 'medium' | 'low';
  timeToImplement: string;
}

// A/B Test önerileri
export function generateABTests(metrics: AnalysisMetrics): ABTest[] {
  const tests: ABTest[] = [
    {
      name: 'Lazy Loading Optimizasyonu',
      description: 'Sayfa açılışında görünür olmayan resimleri lazy loading ile yükle',
      impact: 'LCP ve FCP metriklerinde %20-30 iyileşme',
      effort: 'low',
      estimatedGain: '2-3 saniye sayfa yükleme hızı'
    },
    {
      name: 'Critical CSS İnline',
      description: 'İlk görünüm için kritik CSS\'leri inline olarak ekle',
      impact: 'FCP metriğinde %30-40 iyileşme',
      effort: 'medium',
      estimatedGain: '1-2 saniye ilk render süresi'
    },
    {
      name: 'HTTP/2 Push',
      description: 'Kritik kaynakları HTTP/2 Push ile gönder',
      impact: 'Genel sayfa yükleme süresinde %15-25 iyileşme',
      effort: 'high',
      estimatedGain: '1.5-2.5 saniye toplam yükleme süresi'
    }
  ];

  // Metriklere göre özel testler ekle
  if (metrics.lcp > 2500) {
    tests.push({
      name: 'Image Optimization',
      description: 'Resimleri WebP formatına dönüştür ve boyutları optimize et',
      impact: 'LCP metriğinde %40-50 iyileşme',
      effort: 'medium',
      estimatedGain: '2-3 saniye LCP süresi'
    });
  }

  return tests;
}

// Maliyet-fayda analizi
export function analyzeCostBenefit(metrics: AnalysisMetrics): CostBenefitAnalysis[] {
  const analyses: CostBenefitAnalysis[] = [];

  // LCP optimizasyonu analizi
  if (metrics.lcp > 2500) {
    analyses.push({
      improvement: 'LCP Optimizasyonu',
      cost: {
        development: 2000,
        maintenance: 500,
        total: 2500
      },
      benefit: {
        performanceGain: 'LCP\'de %40 iyileşme',
        userExperienceGain: 'Kullanıcı memnuniyetinde %25 artış',
        estimatedRevenueIncrease: 'Dönüşümlerde %15 artış',
        roi: '%300 (6 ay içinde)'
      },
      priority: 'high',
      timeToImplement: '2 hafta'
    });
  }

  // TBT optimizasyonu analizi
  if (metrics.tbt > 300) {
    analyses.push({
      improvement: 'JavaScript Optimizasyonu',
      cost: {
        development: 3000,
        maintenance: 1000,
        total: 4000
      },
      benefit: {
        performanceGain: 'TBT\'de %60 iyileşme',
        userExperienceGain: 'Kullanıcı etkileşiminde %35 iyileşme',
        estimatedRevenueIncrease: 'Dönüşümlerde %20 artış',
        roi: '%250 (6 ay içinde)'
      },
      priority: 'medium',
      timeToImplement: '3 hafta'
    });
  }

  return analyses;
}
