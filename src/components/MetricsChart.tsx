import React from 'react';
import { LineChart, Activity } from 'lucide-react';

interface MetricData {
  timestamp: string;
  value: number;
}

interface MetricsChartProps {
  title: string;
  data: MetricData[];
  unit: string;
  threshold: {
    good: number;
    needsImprovement: number;
  };
}

export function MetricsChart({ title, data, unit, threshold }: MetricsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 100;

  const getBarColor = (value: number) => {
    if (value <= threshold.good) return 'bg-green-500';
    if (value <= threshold.needsImprovement) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-gray-500" />
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <LineChart className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="relative h-[100px] flex items-end gap-1">
        {data.map((point, index) => {
          const height = (point.value / maxValue) * chartHeight;
          return (
            <div
              key={index}
              className="flex-1 relative group"
            >
              <div
                className={`${getBarColor(point.value)} rounded-t transition-all duration-300`}
                style={{ height: `${height}px` }}
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity">
                {point.value}{unit}<br />
                {point.timestamp}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>Good: ≤{threshold.good}{unit}</span>
        <span>Needs Improvement: ≤{threshold.needsImprovement}{unit}</span>
      </div>
    </div>
  );
}