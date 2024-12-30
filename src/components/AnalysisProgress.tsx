import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface AnalysisStep {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  description?: string;
}

interface AnalysisProgressProps {
  steps: AnalysisStep[];
  currentStep: number;
}

export function AnalysisProgress({ steps, currentStep }: AnalysisProgressProps) {
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
              step.status === 'in-progress' ? 'bg-blue-50' : 
              step.status === 'completed' ? 'bg-green-50' :
              step.status === 'error' ? 'bg-red-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {step.status === 'in-progress' ? (
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              ) : step.status === 'completed' ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : step.status === 'error' ? (
                <XCircle className="w-6 h-6 text-red-500" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
              )}
            </div>
            
            <div className="ml-4 flex-1">
              <p className={`font-medium ${
                step.status === 'in-progress' ? 'text-blue-700' :
                step.status === 'completed' ? 'text-green-700' :
                step.status === 'error' ? 'text-red-700' : 'text-gray-700'
              }`}>
                {step.name}
              </p>
              {step.description && (
                <p className="text-sm text-gray-500 mt-1">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
