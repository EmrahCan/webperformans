import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { DeviceMetrics } from '../types/analysis';

interface DeviceMetricsDisplayProps {
  metrics: DeviceMetrics;
}

export function DeviceMetricsDisplay({ metrics }: DeviceMetricsDisplayProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-600">{t('deviceMetrics.viewport')}</h3>
        <p className="mt-1 text-lg font-semibold">
          {metrics.viewport.width} × {metrics.viewport.height}
        </p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-600">{t('deviceMetrics.networkSpeed')}</h3>
        <p className="mt-1 text-lg font-semibold">{metrics.networkSpeed}</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-600">{t('deviceMetrics.userAgent')}</h3>
        <p className="mt-1 text-xs text-gray-500 truncate" title={metrics.userAgent}>
          {metrics.userAgent}
        </p>
      </div>
    </div>
  );
}