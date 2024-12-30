import type { AnalysisMetrics } from '../../types/analysis';
import { getFindings } from './findings';

export const generateMetrics = (language: string): AnalysisMetrics => ({
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
  findings: getFindings(language)
});