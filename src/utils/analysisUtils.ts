import type { AnalysisStep, AnalysisComment, AnalysisMetrics } from '../types/analysis';

export const initialSteps: AnalysisStep[] = [
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
];

export function generateAnalysisComments(): AnalysisComment[] {
  return [
    {
      category: 'Performance',
      comments: [
        {
          type: 'warning',
          message: 'First Contentful Paint (FCP) is above recommended threshold',
          details: 'FCP should be under 2 seconds for optimal user experience. Consider optimizing server response time and reducing render-blocking resources.',
          impact: 'High'
        },
        {
          type: 'success',
          message: 'Time to Interactive (TTI) is within acceptable range',
          details: 'Your page becomes interactive quickly, providing a smooth user experience.',
          impact: 'Medium'
        }
      ]
    },
    {
      category: 'Security',
      comments: [
        {
          type: 'info',
          message: 'HTTPS is properly configured',
          details: 'Your site uses modern TLS 1.3 protocol with strong cipher suites.',
          impact: 'High'
        },
        {
          type: 'warning',
          message: 'Content Security Policy (CSP) is missing',
          details: 'Implementing CSP helps prevent XSS attacks and other code injection vulnerabilities.',
          impact: 'High'
        }
      ]
    },
    {
      category: 'SEO',
      comments: [
        {
          type: 'error',
          message: 'Meta description is missing',
          details: 'Add a descriptive meta description to improve search engine visibility.',
          impact: 'Medium'
        },
        {
          type: 'success',
          message: 'Mobile-friendly design detected',
          details: 'Your site uses responsive design principles, which is great for SEO.',
          impact: 'High'
        }
      ]
    },
    {
      category: 'Accessibility',
      comments: [
        {
          type: 'warning',
          message: 'Low contrast text detected',
          details: 'Some text elements do not meet WCAG 2.1 contrast requirements. This affects users with visual impairments.',
          impact: 'Medium'
        },
        {
          type: 'success',
          message: 'Proper heading structure',
          details: 'Your page uses semantic heading tags in the correct order.',
          impact: 'Medium'
        }
      ]
    },
    {
      category: 'Best Practices',
      comments: [
        {
          type: 'info',
          message: 'Modern image formats used',
          details: 'Your site uses WebP images with proper fallbacks.',
          impact: 'Medium'
        },
        {
          type: 'warning',
          message: 'Console errors detected',
          details: 'JavaScript errors in the console may affect functionality and user experience.',
          impact: 'Medium'
        }
      ]
    }
  ];
}

export const generateAnalysisMetrics = (): AnalysisMetrics => ({
  lcp: [
    { timestamp: '10:00', value: 1.2 },
    { timestamp: '10:05', value: 1.8 },
    { timestamp: '10:10', value: 1.5 },
    { timestamp: '10:15', value: 2.1 },
    { timestamp: '10:20', value: 1.9 }
  ],
  fid: [
    { timestamp: '10:00', value: 45 },
    { timestamp: '10:05', value: 78 },
    { timestamp: '10:10', value: 56 },
    { timestamp: '10:15', value: 89 },
    { timestamp: '10:20', value: 67 }
  ],
  cls: [
    { timestamp: '10:00', value: 0.05 },
    { timestamp: '10:05', value: 0.08 },
    { timestamp: '10:10', value: 0.12 },
    { timestamp: '10:15', value: 0.09 },
    { timestamp: '10:20', value: 0.07 }
  ],
  ttfb: [
    { timestamp: '10:00', value: 350 },
    { timestamp: '10:05', value: 420 },
    { timestamp: '10:10', value: 380 },
    { timestamp: '10:15', value: 450 },
    { timestamp: '10:20', value: 400 }
  ],
  findings: [
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
        • Affected elements:
          - Hero section banner
          - Product image gallery
          - Navigation menu
      `
    }
  ]
});