import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { AnalysisComment } from '../types/analysis';

interface AnalysisCommentsProps {
  comments: AnalysisComment[];
}

export function AnalysisComments({ comments }: AnalysisCommentsProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'success':
        return 'bg-green-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getTextColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'error':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      case 'success':
        return 'text-green-700';
      default:
        return 'text-blue-700';
    }
  };

  const getImpactBadge = (impact: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (impact.toLowerCase()) {
      case 'high':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>High Impact</span>;
      case 'medium':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Medium Impact</span>;
      case 'low':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Low Impact</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {comments.map((category, index) => (
        <div key={index} className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {category.category} Analysis
          </h3>
          
          <div className="space-y-4">
            {category.comments.map((comment, commentIndex) => (
              <div
                key={commentIndex}
                className={`p-4 rounded-lg ${getBackgroundColor(comment.type)}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getIcon(comment.type)}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${getTextColor(comment.type)}`}>
                        {comment.message}
                      </p>
                      {comment.impact && getImpactBadge(comment.impact)}
                    </div>
                    
                    {comment.details && (
                      <p className="mt-2 text-sm text-gray-600">
                        {comment.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}