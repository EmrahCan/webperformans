import type { AnalysisStep } from '../types/analysis';

export const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Debug] ${message}`, data || '');
  }
};

export const logAnalysisStep = (step: AnalysisStep) => {
  debugLog(`Analysis Step: ${step.title}`, {
    id: step.id,
    status: step.status,
    description: step.description
  });
};