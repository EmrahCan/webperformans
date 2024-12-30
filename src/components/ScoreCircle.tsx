import React from 'react';

interface ScoreCircleProps {
  score: number;
  size?: number;
  label: string;
}

export function ScoreCircle({ score, size = 96, label }: ScoreCircleProps) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? 'green' : score >= 50 ? 'orange' : 'red';
  
  const colorClasses = {
    green: 'text-green-600 stroke-green-600',
    orange: 'text-orange-500 stroke-orange-500',
    red: 'text-red-600 stroke-red-600'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r="40"
            className="stroke-gray-200"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="40"
            className={colorClasses[color]}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colorClasses[color]}`}>
            {score}
          </span>
        </div>
      </div>
      <span className="text-sm text-gray-600 font-medium">{label}</span>
    </div>
  );
}