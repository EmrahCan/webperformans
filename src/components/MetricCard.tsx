import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

interface MetricDetail {
  label: string;
  value: string;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  status: 'good' | 'needs-improvement' | 'poor';
  details: MetricDetail[];
}

export function MetricCard({
  icon,
  label,
  value,
  description,
  status,
  details = []
}: MetricCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const statusColors = {
    'good': 'bg-green-100 border-green-200 text-green-800',
    'needs-improvement': 'bg-yellow-100 border-yellow-200 text-yellow-800',
    'poor': 'bg-red-100 border-red-200 text-red-800'
  };

  return (
    <div className={`rounded-lg border ${statusColors[status]} transition-all`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h3 className="text-sm font-medium">{label}</h3>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
          </div>
          <button
            data-tooltip-id={`tooltip-${label}`}
            className="text-current opacity-75 hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path stroke="currentColor" strokeWidth="2" d="M12 16v-4M12 8h.01"/>
            </svg>
          </button>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-sm font-medium opacity-75 hover:opacity-100"
        >
          View details
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-current border-opacity-20 p-4 space-y-3">
          {details.map((detail, index) => (
            <div key={index}>
              <dt className="text-xs font-medium opacity-75">{detail.label}</dt>
              <dd className="text-sm mt-1">{detail.value}</dd>
            </div>
          ))}
          <div className="mt-4 p-3 border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-700">{description}</p>
          </div>
        </div>
      )}

      <Tooltip id={`tooltip-${label}`} place="top">
        {description}
      </Tooltip>
    </div>
  );
}