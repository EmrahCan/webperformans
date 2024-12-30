import type { TreemapAnalysis } from '../types/analysis';

export const generateTreemapUrl = (url: string): string => {
  const params = new URLSearchParams({
    url: url,
    view: 'treemap'
  });
  return `https://googlechrome.github.io/lighthouse/treemap/?${params}`;
};

export const analyzeTreemap = async (url: string): Promise<TreemapAnalysis> => {
  // In a real implementation, this would fetch data from Lighthouse API
  // For demo, returning mock data
  return {
    scriptTreemap: [
      {
        url: 'node_modules/react-dom/client.js',
        coverage: 72,
        size: 130_000
      },
      {
        url: 'node_modules/@emotion/react/dist/emotion-react.esm.js',
        coverage: 45,
        size: 89_000
      },
      {
        url: 'src/components/index.js',
        coverage: 95,
        size: 45_000
      },
      {
        url: 'src/utils/index.js',
        coverage: 88,
        size: 32_000
      },
      {
        url: 'src/hooks/index.js',
        coverage: 91,
        size: 28_000
      }
    ],
    unusedBytes: 120_000,
    totalBytes: 450_000,
    coveragePercentage: 73.3
  };
};