import type { LoadingStep, DiagnosticReport } from '../types/diagnostics';
import type { DeviceType } from '../types/analysis';

export function analyzeDiagnostics(steps: LoadingStep[], deviceType: DeviceType): DiagnosticReport {
  const totalLoadTime = steps.reduce((total, step) => total + step.duration, 0);
  const recommendations: string[] = [];
  const criticalIssues: string[] = [];
  const diagnosticDetails: { [key: string]: string[] } = {
    network: [],
    performance: [],
    security: [],
    optimization: []
  };

  // Analyze steps and generate recommendations
  steps.forEach(step => {
    if (step.duration > 1000) {
      if (step.name === 'DNS Lookup') {
        criticalIssues.push('Slow DNS resolution detected');
        recommendations.push('Consider using DNS prefetching for faster domain lookups');
        diagnosticDetails.network.push(
          'DNS resolution took longer than expected',
          'High latency in DNS lookup phase',
          'Consider using a faster DNS provider'
        );
      } 
      else if (step.name === 'Initial Server Response') {
        criticalIssues.push('Slow server response time detected');
        recommendations.push('Optimize server configuration for better response times');
        diagnosticDetails.performance.push(
          'Server response time exceeds recommended threshold',
          'Consider implementing caching mechanisms',
          'Review server-side processing efficiency'
        );
      }
      else if (step.name === 'SSL Handshake') {
        criticalIssues.push('SSL handshake taking too long');
        recommendations.push('Optimize SSL/TLS configuration');
        diagnosticDetails.security.push(
          'SSL handshake duration is affecting page load',
          'Review SSL certificate configuration',
          'Consider enabling SSL session resumption'
        );
      }
      else if (step.name === 'Content Download') {
        criticalIssues.push('Slow content download speed');
        recommendations.push('Optimize content delivery and implement compression');
        diagnosticDetails.optimization.push(
          'Large content size affecting download speed',
          'Enable GZIP compression for text-based assets',
          'Consider using a CDN for faster content delivery'
        );
      }
    }

    // Additional performance checks
    if (step.name === 'Page Rendering' && step.duration > 800) {
      diagnosticDetails.performance.push(
        'Rendering performance needs improvement',
        'Consider implementing code splitting',
        'Review and optimize JavaScript execution'
      );
    }
  });

  // Device-specific analysis
  if (deviceType === 'mobile') {
    if (totalLoadTime > 3000) {
      recommendations.push('Implement a lighter version for mobile users');
      recommendations.push('Use adaptive loading based on network conditions');
      diagnosticDetails.optimization.push(
        'Mobile page load time exceeds recommended threshold',
        'Consider implementing AMP version',
        'Optimize images specifically for mobile devices'
      );
    }

    // Mobile-specific performance checks
    diagnosticDetails.performance.push(
      'Review touch event handlers for mobile optimization',
      'Check viewport configuration for mobile devices',
      'Ensure proper font scaling on mobile screens'
    );
  }

  // Network condition analysis
  if (steps.some(step => step.status === 'warning')) {
    diagnosticDetails.network.push(
      'Network conditions may be affecting performance',
      'Consider implementing offline capabilities',
      'Review resource prioritization'
    );
  }

  // Security recommendations
  diagnosticDetails.security.push(
    'Review Content Security Policy implementation',
    'Check for secure cookie attributes',
    'Ensure proper CORS configuration'
  );

  return {
    deviceType,
    totalLoadTime,
    steps,
    recommendations,
    criticalIssues,
    diagnosticDetails
  };
}