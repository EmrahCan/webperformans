// Core types
export type DeviceType = 'desktop' | 'mobile';

export interface DeviceMetrics {
  viewport: {
    width: number;
    height: number;
  };
  userAgent: string;
  networkSpeed: string;
}

// Analysis types
export interface AnalysisStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface AnalysisComment {
  category: 'performance' | 'accessibility' | 'best-practices' | 'seo';
  type: 'success' | 'warning' | 'error';
  message: string;
  recommendation?: string;
}

export interface MetricData {
  timestamp: string;
  value: number;
}

export interface Finding {
  type: 'success' | 'warning' | 'error';
  title: string;
  description: string;
}

export interface AnalysisMetrics {
  lcp: MetricData[];
  fid: MetricData[];
  cls: MetricData[];
  ttfb: MetricData[];
  findings: Finding[];
}

// Treemap types
export interface TreemapData {
  url: string;
  coverage: number;
  size: number;
  children?: TreemapData[];
}

export interface TreemapAnalysis {
  scriptTreemap: TreemapData[];
  unusedBytes: number;
  totalBytes: number;
  coveragePercentage: number;
}