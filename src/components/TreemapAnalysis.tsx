import React from 'react';
import { FileCode, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { TreemapAnalysis } from '../types/analysis';

interface TreemapAnalysisProps {
  data: TreemapAnalysis;
  lighthouseUrl: string;
}

export function TreemapAnalysis({ data, lighthouseUrl }: TreemapAnalysisProps) {
  const { t } = useLanguage();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {t('analysis.bundleAnalysis')}
        </h2>
        <a
          href={lighthouseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          <FileCode className="w-4 h-4" />
          {t('analysis.viewFullTreemap')}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">{t('analysis.totalSize')}</h3>
            <span className="text-lg font-semibold">{formatBytes(data.totalBytes)}</span>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">{t('analysis.unusedCode')}</h3>
            <span className="text-lg font-semibold text-yellow-600">
              {formatBytes(data.unusedBytes)}
            </span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">{t('analysis.codeCoverage')}</h3>
            <span className="text-lg font-semibold">
              {data.coveragePercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {data.unusedBytes > 100 * 1024 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800">
                {t('analysis.optimizationNeeded')}
              </h4>
              <p className="mt-1 text-sm text-yellow-700">
                {t('analysis.unusedCodeWarning')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">{t('analysis.largestModules')}</h3>
        <div className="space-y-2">
          {data.scriptTreemap.slice(0, 5).map((module, index) => (
            <div
              key={index}
              className="p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 truncate" title={module.url}>
                  {module.url.split('/').pop()}
                </span>
                <span className="text-sm text-gray-500">{formatBytes(module.size)}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${module.coverage}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-gray-500">{t('analysis.coverage')}</span>
                <span className="text-gray-600">{module.coverage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}