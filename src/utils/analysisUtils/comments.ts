import type { AnalysisComment } from '../../types/analysis';

export const getComments = (language: string): AnalysisComment[] => {
  const comments = {
    en: [
      {
        category: 'performance',
        type: 'success',
        message: 'Exceptional server response time with optimized backend',
        recommendation: `
          • Implement HTTP/3 for improved performance
          • Enable Brotli compression for better compression ratios
          • Consider implementing service workers for offline support
          • Add resource hints (preload, prefetch) for critical assets
        `
      },
      {
        category: 'accessibility',
        type: 'warning',
        message: 'Several accessibility issues detected in interactive elements',
        recommendation: `
          • Add ARIA labels to all interactive elements
          • Ensure color contrast ratio meets WCAG 2.1 standards (minimum 4.5:1)
          • Implement keyboard navigation support
          • Add skip links for main content
          • Ensure proper heading hierarchy
        `
      },
      {
        category: 'best-practices',
        type: 'success',
        message: 'Strong security measures and modern best practices implemented',
        recommendation: `
          • Add Content Security Policy (CSP) headers
          • Implement Subresource Integrity (SRI) for external resources
          • Enable HTTP Strict Transport Security (HSTS)
          • Configure permissions policy
          • Regular security audits and dependency updates
        `
      },
      {
        category: 'seo',
        type: 'error',
        message: 'Critical SEO elements missing or incomplete',
        recommendation: `
          • Add unique meta descriptions (150-160 characters)
          • Implement structured data for rich snippets
          • Optimize image alt texts and file names
          • Create XML sitemap and submit to search engines
          • Implement canonical URLs for duplicate content
        `
      },
      {
        category: 'performance',
        type: 'warning',
        message: 'JavaScript performance bottlenecks identified',
        recommendation: `
          • Implement code splitting for large bundles
          • Add dynamic imports for route-based code splitting
          • Optimize third-party script loading
          • Implement efficient bundle caching strategy
          • Monitor and optimize main thread work
        `
      }
    ],
    tr: [
      {
        category: 'performance',
        type: 'success',
        message: 'Optimize edilmiş backend ile üstün sunucu yanıt süresi',
        recommendation: `
          • Gelişmiş performans için HTTP/3 uygulayın
          • Daha iyi sıkıştırma oranları için Brotli sıkıştırma etkinleştirin
          • Çevrimdışı destek için service worker'ları düşünün
          • Kritik kaynaklar için resource hints (preload, prefetch) ekleyin
        `
      },
      {
        category: 'accessibility',
        type: 'warning',
        message: 'Etkileşimli öğelerde erişilebilirlik sorunları tespit edildi',
        recommendation: `
          • Tüm etkileşimli öğelere ARIA etiketleri ekleyin
          • Renk kontrast oranının WCAG 2.1 standartlarını karşıladığından emin olun (minimum 4.5:1)
          • Klavye navigasyon desteği ekleyin
          • Ana içerik için atlama bağlantıları ekleyin
          • Uygun başlık hiyerarşisini sağlayın
        `
      }
    ]
  };
  
  return comments[language] || comments.en;
};