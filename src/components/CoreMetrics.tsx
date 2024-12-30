import React from 'react';
import { Clock, Zap, Timer } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useLanguage } from '../contexts/LanguageContext';

interface CoreMetricsProps {
  fcp: number;
  lcp: number;
  tbt: number;
}

export function CoreMetrics({ fcp, lcp, tbt }: CoreMetricsProps) {
  const { t } = useLanguage();

  const getMetricStatus = (metric: string, value: number) => {
    const thresholds = {
      fcp: { good: 1800, needsImprovement: 3000 },
      lcp: { good: 2500, needsImprovement: 4000 },
      tbt: { good: 200, needsImprovement: 600 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">{t('metrics.coreMetrics')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={<Clock className="w-5 h-5" />}
          label={t('metrics.fcp')}
          value={`${(fcp / 1000).toFixed(1)}s`}
          description={t('metrics.fcpDescription')}
          status={getMetricStatus('fcp', fcp)}
          details={[
            {
              label: t('metrics.threshold'),
              value: '< 1.8s'
            },
            {
              label: t('metrics.impact'),
              value: t('metrics.fcpImpact')
            }
          ]}
        />

        <MetricCard
          icon={<Zap className="w-5 h-5" />}
          label={t('metrics.lcp')}
          value={`${(lcp / 1000).toFixed(1)}s`}
          description={t('metrics.lcpDescription')}
          status={getMetricStatus('lcp', lcp)}
          details={[
            {
              label: t('metrics.threshold'),
              value: '< 2.5s'
            },
            {
              label: t('metrics.impact'),
              value: t('metrics.lcpImpact')
            }
          ]}
        />

        <MetricCard
          icon={<Timer className="w-5 h-5" />}
          label={t('metrics.tbt')}
          value={`${tbt}ms`}
          description={t('metrics.tbtDescription')}
          status={getMetricStatus('tbt', tbt)}
          details={[
            {
              label: t('metrics.threshold'),
              value: '< 200ms'
            },
            {
              label: t('metrics.impact'),
              value: t('metrics.tbtImpact')
            }
          ]}
        />
      </div>
    </div>
  );
}