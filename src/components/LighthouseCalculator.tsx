import React, { useState, useEffect } from 'react';

interface LighthouseCalculatorProps {
  metrics?: {
    fcp: number;
    lcp: number;
    tbt: number;
  };
}

export function LighthouseCalculator({ metrics }: LighthouseCalculatorProps) {
  const [localMetrics, setLocalMetrics] = useState({
    fcp: metrics?.fcp || 0,
    lcp: metrics?.lcp || 0,
    tbt: metrics?.tbt || 0
  });
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (metrics) {
      setLocalMetrics(metrics);
    }
  }, [metrics]);

  const calculateScore = () => {
    // Lighthouse scoring weights
    const weights = {
      fcp: 0.15,
      lcp: 0.25,
      tbt: 0.30,
    };

    // Score calculations based on Lighthouse metrics
    const fcpScore = calculateMetricScore(localMetrics.fcp, [2000, 4000]); // Good: 0-2s, Poor: >4s
    const lcpScore = calculateMetricScore(localMetrics.lcp, [2500, 4500]); // Good: 0-2.5s, Poor: >4.5s
    const tbtScore = calculateMetricScore(localMetrics.tbt, [300, 600]);   // Good: 0-300ms, Poor: >600ms

    // Calculate weighted average
    const totalScore = (
      fcpScore * weights.fcp +
      lcpScore * weights.lcp +
      tbtScore * weights.tbt
    ) * 100;

    setScore(Math.round(totalScore));
  };

  const calculateMetricScore = (value: number, [good, poor]: number[]) => {
    if (value <= good) return 1;
    if (value >= poor) return 0;
    return (poor - value) / (poor - good);
  };

  useEffect(() => {
    calculateScore();
  }, [localMetrics]);

  const handleInputChange = (metric: keyof typeof localMetrics) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMetrics(prev => ({
      ...prev,
      [metric]: Number(e.target.value)
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Lighthouse Score Calculator</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Contentful Paint (FCP) - milliseconds
          </label>
          <div className="mt-1">
            <input
              type="number"
              value={localMetrics.fcp}
              onChange={handleInputChange('fcp')}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter FCP in milliseconds"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Good: 0-2000ms, Poor: &gt;4000ms</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Largest Contentful Paint (LCP) - milliseconds
          </label>
          <div className="mt-1">
            <input
              type="number"
              value={localMetrics.lcp}
              onChange={handleInputChange('lcp')}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter LCP in milliseconds"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Good: 0-2500ms, Poor: &gt;4500ms</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Blocking Time (TBT) - milliseconds
          </label>
          <div className="mt-1">
            <input
              type="number"
              value={localMetrics.tbt}
              onChange={handleInputChange('tbt')}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter TBT in milliseconds"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Good: 0-300ms, Poor: &gt;600ms</p>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Performance Score</h3>
            <div className={`text-4xl font-bold mt-2 ${
              score >= 90 ? 'text-green-600' :
              score >= 50 ? 'text-orange-500' :
              'text-red-600'
            }`}>
              {score}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
