import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { DiagnosticReport } from '../types/diagnostics';

interface DiagnosticSummaryProps {
  report: DiagnosticReport;
}

export function DiagnosticSummary({ report }: DiagnosticSummaryProps) {
  const { t } = useLanguage();

  const categories = {
    network: t('diagnostics.networkAnalysis'),
    performance: t('diagnostics.performanceMetrics'),
    security: t('diagnostics.securityChecks'),
    optimization: t('diagnostics.optimizationTips')
  };

  return (
    <div className="space-y-6">
      {/* Critical Issues */}
      {report.criticalIssues.length > 0 && (
        <div className="p-4 bg-white rounded-lg border">
          <h4 className="flex items-center gap-2 text-red-600 font-medium mb-2">
            <AlertCircle className="w-5 h-5" />
            {t('diagnostics.criticalIssues')}
          </h4>
          <ul className="space-y-2">
            {report.criticalIssues.map((issue, index) => (
              <li key={index} className="text-sm text-red-600">
                • {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detailed Diagnostics */}
      {Object.entries(report.diagnosticDetails).map(([category, details]) => (
        details.length > 0 && (
          <div key={category} className="p-4 bg-white rounded-lg border">
            <h4 className="flex items-center gap-2 text-blue-600 font-medium mb-4">
              <CheckCircle2 className="w-5 h-5" />
              {categories[category as keyof typeof categories]}
            </h4>
            <ul className="space-y-3">
              {details.map((detail, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )
      ))}

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <div className="p-4 bg-white rounded-lg border">
          <h4 className="flex items-center gap-2 text-green-600 font-medium mb-2">
            <CheckCircle2 className="w-5 h-5" />
            {t('diagnostics.recommendations')}
          </h4>
          <ul className="space-y-2">
            {report.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}