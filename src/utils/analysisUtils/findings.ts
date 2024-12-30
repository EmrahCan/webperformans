import type { Finding } from '../../types/analysis';

export const getFindings = (language: string): Finding[] => {
  const findings = {
    en: [
      {
        type: 'success',
        title: 'Exceptional Server Performance',
        description: `
          • TTFB averages 400ms (95th percentile: 450ms)
          • Server-side rendering completes in 220ms
          • Database queries optimized (avg. 80ms)
          • Effective caching reduces repeat requests by 65%
          • CDN hit rate: 92% for static assets
        `
      },
      {
        type: 'warning',
        title: 'Layout Stability Needs Improvement',
        description: `
          • Current CLS: 0.12 (Goal: < 0.1)
          • Main contributors:
            - Dynamic content shifts: 0.05 (42% of total)
            - Unoptimized images: 0.04 (33% of total)
            - Web font loading: 0.03 (25% of total)
        `
      }
    ],
    tr: [
      {
        type: 'success',
        title: 'Üstün Sunucu Performansı',
        description: `
          • TTFB ortalaması 400ms (95. yüzdelik: 450ms)
          • Sunucu tarafı işleme 220ms'de tamamlanıyor
          • Veritabanı sorguları optimize edildi (ort. 80ms)
          • Etkili önbellekleme tekrar istekleri %65 azaltıyor
          • CDN isabet oranı: statik varlıklar için %92
        `
      },
      {
        type: 'warning',
        title: 'Düzen Kararlılığı İyileştirme Gerekiyor',
        description: `
          • Mevcut CLS: 0.12 (Hedef: < 0.1)
          • Ana etkenler:
            - Dinamik içerik kaymaları: 0.05 (toplamın %42'si)
            - Optimize edilmemiş görseller: 0.04 (toplamın %33'ü)
            - Web yazı tipi yüklemesi: 0.03 (toplamın %25'i)
        `
      }
    ]
  };

  return findings[language] || findings.en;
};