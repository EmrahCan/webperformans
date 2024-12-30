import React from 'react';
import { Shield, ShieldAlert, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { SSLAnalysis as SSLAnalysisType } from '../types/ssl';

interface SSLAnalysisProps {
  analysis: SSLAnalysisType;
}

export function SSLAnalysis({ analysis }: SSLAnalysisProps) {
  const { certificate, securityScore, warnings, recommendations, securityHeaders } = analysis;
  
  const getExpiryStatus = () => {
    if (certificate.daysUntilExpiry > 60) return 'text-green-600';
    if (certificate.daysUntilExpiry > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* SSL Certificate Status */}
      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          SSL Certificate Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Issuer</p>
            <p className="font-medium">{certificate.issuer}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Protocol</p>
            <p className="font-medium">{certificate.protocol}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Valid From</p>
            <p className="font-medium">{new Date(certificate.validFrom).toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Valid Until</p>
            <p className={`font-medium flex items-center gap-1 ${getExpiryStatus()}`}>
              <Clock className="w-4 h-4" />
              {new Date(certificate.validTo).toLocaleDateString()}
              ({certificate.daysUntilExpiry} days)
            </p>
          </div>
        </div>

        {/* Security Score */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Security Score</span>
            <span className={`text-xl font-bold ${
              securityScore >= 90 ? 'text-green-600' :
              securityScore >= 70 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {securityScore}/100
            </span>
          </div>
        </div>
      </div>

      {/* Security Headers */}
      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Security Headers
        </h3>
        
        <div className="space-y-3">
          {Object.entries(securityHeaders).map(([header, info]) => (
            <div key={header} className="flex items-start justify-between">
              <div>
                <p className="font-medium">{header}</p>
                {info.recommendation && (
                  <p className="text-sm text-gray-600">{info.recommendation}</p>
                )}
              </div>
              {info.present ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Warnings & Recommendations */}
      {(warnings.length > 0 || recommendations.length > 0) && (
        <div className="p-4 bg-white rounded-lg border">
          {warnings.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-red-600 mb-2">Warnings</h4>
              <ul className="space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-red-600">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {recommendations.length > 0 && (
            <div>
              <h4 className="font-medium text-green-600 mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
