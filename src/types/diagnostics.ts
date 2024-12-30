import type { DeviceType } from './analysis';

export interface LoadingStep {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  status: 'pending' | 'completed' | 'warning' | 'error';
  details?: string;
}

export interface DiagnosticReport {
  deviceType: DeviceType;
  totalLoadTime: number;
  steps: LoadingStep[];
  recommendations: string[];
  criticalIssues: string[];
}