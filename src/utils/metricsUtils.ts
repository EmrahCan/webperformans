import axios from 'axios';

export async function fetchMetrics(url: string): Promise<{ lcp: string; inp: string; cls: string; fcp: string; ttfb: string }> {
  try {
    const response = await axios.get(url);
    // Simulated metrics for demonstration purposes
    return {
      lcp: '2.4s',
      inp: '229ms',
      cls: '0',
      fcp: '2.4s',
      ttfb: '1.2s',
    };
  } catch (error) {
    console.error('Metrics fetch failed:', error);
    return {
      lcp: 'Unknown',
      inp: 'Unknown',
      cls: 'Unknown',
      fcp: 'Unknown',
      ttfb: 'Unknown',
    };
  }
}

export function observeMetrics(callback: (metrics: { lcp: string; fid: string; cls: string; fcp: string; ttfb: string }) => void) {
  const metrics = {
    lcp: 'Unknown',
    fid: 'Unknown',
    cls: 'Unknown',
    fcp: 'Unknown',
    ttfb: 'Unknown',
  };

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        metrics.lcp = `${entry.startTime.toFixed(2)}ms`;
      } else if (entry.entryType === 'first-input') {
        metrics.fid = `${entry.processingStart - entry.startTime}ms`;
      } else if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
        metrics.cls = entry.value.toString();
      } else if (entry.entryType === 'navigation') {
        metrics.fcp = `${entry.responseStart.toFixed(2)}ms`;
        metrics.ttfb = `${entry.responseStart.toFixed(2)}ms`;
      }
    }
    callback(metrics);
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });
  observer.observe({ type: 'first-input', buffered: true });
  observer.observe({ type: 'layout-shift', buffered: true });
  observer.observe({ type: 'navigation', buffered: true });
}
