import React from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { LoadingStep } from '../types/diagnostics';

interface DiagnosticTimelineProps {
  steps: LoadingStep[];
}

export function DiagnosticTimeline({ steps }: DiagnosticTimelineProps) {
  const { t } = useLanguage();

  const getStatusIcon = (status: LoadingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{t('diagnostics.timeline')}</h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3 p-4 bg-white rounded-lg border">
            {getStatusIcon(step.status)}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{step.name}</h3>
                  {step.details && (
                    <p className="mt-1 text-sm text-gray-500">{step.details}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">URL: {step.url}</p>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {step.duration}ms
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}