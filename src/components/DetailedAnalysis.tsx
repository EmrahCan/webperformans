import React from 'react';
import { MetricsChart } from './MetricsChart';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { AnalysisMetrics } from '../types/analysis';

interface DetailedAnalysisProps {
  metrics: AnalysisMetrics;
}

export function DetailedAnalysis({ metrics }: DetailedAnalysisProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Detailed Performance Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricsChart
          title="Loading Performance (LCP)"
          data={metrics.lcp}
          unit="s"
          threshold={{ good: 2.5, needsImprovement: 4.0 }}
        />
        
        <MetricsChart
          title="Interactivity (FID)"
          data={metrics.fid}
          unit="ms"
          threshold={{ good: 100, needsImprovement: 300 }}
        />
        
        <MetricsChart
          title="Visual Stability (CLS)"
          data={metrics.cls}
          unit=""
          threshold={{ good: 0.1, needsImprovement: 0.25 }}
        />
        
        <MetricsChart
          title="Time to First Byte (TTFB)"
          data={metrics.ttfb}
          unit="ms"
          threshold={{ good: 800, needsImprovement: 1800 }}
        />
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-md font-medium text-gray-900">Key Findings</h3>
        {metrics.findings.map((finding, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            {finding.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            {finding.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
            {finding.type === 'error' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
            <div>
              <p className="font-medium text-gray-900">{finding.title}</p>
              <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}