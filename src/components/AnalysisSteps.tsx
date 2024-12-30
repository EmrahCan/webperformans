import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type { AnalysisStep } from '../types/analysis';

interface AnalysisStepsProps {
  steps: AnalysisStep[];
}

export function AnalysisSteps({ steps }: AnalysisStepsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Analysis Progress</h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {step.status === 'completed' && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
              {step.status === 'in-progress' && (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              )}
              {step.status === 'pending' && (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}