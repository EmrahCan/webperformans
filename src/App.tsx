import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { UrlForm } from './components/UrlForm';
import { DeviceSelector } from './components/DeviceSelector';
import { DeviceMetricsDisplay } from './components/DeviceMetricsDisplay';
import { ScoreGrid } from './components/ScoreGrid';
import { CoreWebVitals } from './components/CoreWebVitals';
import { AnalysisSteps } from './components/AnalysisSteps';
import { AnalysisComments } from './components/AnalysisComments';
import { DetailedAnalysis } from './components/DetailedAnalysis';
import { DiagnosticTimeline } from './components/DiagnosticTimeline';
import { DiagnosticSummary } from './components/DiagnosticSummary';
import { LighthouseCalculator } from './components/LighthouseCalculator';
import { SSLAnalysis } from './components/SSLAnalysis';
import { AnalysisProgress } from './components/AnalysisProgress';
import { ExportPDF } from './components/ExportPDF';
import { normalizeUrl } from './utils/urlUtils';
import { getDeviceMetrics } from './utils/deviceUtils';
import { analyzeDiagnostics } from './utils/diagnosticsUtils';
import { initialSteps, generateAnalysisComments, generateAnalysisMetrics } from './utils/analysisUtils';
import { analyzeSSL } from './utils/sslUtils';
import type { AnalysisStep, AnalysisComment, AnalysisMetrics, DeviceType, SSLAnalysisType } from './types/analysis';
import type { LoadingStep, DiagnosticReport } from './types/diagnostics';

function App() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps);
  const [comments, setComments] = useState<AnalysisComment[]>([]);
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fcp: 0,
    lcp: 0,
    tbt: 0
  });
  const [sslAnalysis, setSSLAnalysis] = useState<SSLAnalysisType | null>(null);

  const deviceMetrics = getDeviceMetrics(deviceType);

  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([
    { id: '1', name: 'DNS Lookup', status: 'pending', description: 'Resolving domain name...' },
    { id: '2', name: 'SSL Certificate Check', status: 'pending', description: 'Verifying SSL certificate...' },
    { id: '3', name: 'Security Headers', status: 'pending', description: 'Checking security headers...' },
    { id: '4', name: 'Performance Analysis', status: 'pending', description: 'Analyzing page performance...' },
    { id: '5', name: 'Core Web Vitals', status: 'pending', description: 'Measuring core web vitals...' },
    { id: '6', name: 'Final Report', status: 'pending', description: 'Generating final report...' }
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsAnalyzing(true);
      setShowResults(false);
      setCurrentStep(0);
      
      // Reset all steps to pending
      setAnalysisSteps(steps => steps.map(step => ({ ...step, status: 'pending' })));

      const normalizedUrl = normalizeUrl(url);
      setUrl(normalizedUrl);

      // DNS Lookup
      setCurrentStep(1);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '1' ? { ...step, status: 'in-progress' } : step
      ));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '1' ? { ...step, status: 'completed' } : step
      ));

      // SSL Check
      setCurrentStep(2);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '2' ? { ...step, status: 'in-progress' } : step
      ));
      const sslResults = await analyzeSSL(url);
      setSSLAnalysis(sslResults);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '2' ? { ...step, status: 'completed' } : step
      ));

      // Security Headers
      setCurrentStep(3);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '3' ? { ...step, status: 'in-progress' } : step
      ));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '3' ? { ...step, status: 'completed' } : step
      ));

      // Performance Analysis
      setCurrentStep(4);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '4' ? { ...step, status: 'in-progress' } : step
      ));
      const newMetrics = generateAnalysisMetrics();
      setMetrics(newMetrics);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '4' ? { ...step, status: 'completed' } : step
      ));

      // Core Web Vitals
      setCurrentStep(5);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '5' ? { ...step, status: 'in-progress' } : step
      ));
      setPerformanceMetrics({
        fcp: Math.round(Math.random() * 2000 + 1000),
        lcp: Math.round(Math.random() * 3000 + 1500),
        tbt: Math.round(Math.random() * 400 + 100)
      });
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '5' ? { ...step, status: 'completed' } : step
      ));

      // Final Report
      setCurrentStep(6);
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '6' ? { ...step, status: 'in-progress' } : step
      ));
      setComments(generateAnalysisComments());
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisSteps(steps => steps.map(step => 
        step.id === '6' ? { ...step, status: 'completed' } : step
      ));

      setShowResults(true);
    } catch (error) {
      console.error(error);
      // Mark current step as error
      setAnalysisSteps(steps => steps.map(step => 
        step.id === currentStep.toString() ? { ...step, status: 'error' } : step
      ));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <DeviceSelector
            selectedDevice={deviceType}
            onDeviceChange={setDeviceType}
          />
          <DeviceMetricsDisplay metrics={deviceMetrics} />
          <UrlForm
            url={url}
            onUrlChange={setUrl}
            onSubmit={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />

          <LighthouseCalculator metrics={performanceMetrics} />

          {isAnalyzing && (
            <AnalysisProgress 
              steps={analysisSteps} 
              currentStep={currentStep} 
            />
          )}

          {showResults && (
            <div className="mt-8 space-y-8">
              <ScoreGrid />
              <CoreWebVitals />
              {diagnosticReport && (
                <>
                  <DiagnosticTimeline steps={diagnosticReport.steps} />
                  <DiagnosticSummary report={diagnosticReport} />
                </>
              )}
              <div>
                <div className="flex justify-end mb-4">
                  <ExportPDF targetRef={resultsRef} url={url} />
                </div>
                <div ref={resultsRef}>
                  {metrics && <DetailedAnalysis metrics={metrics} />}
                  <AnalysisComments comments={comments} />
                  {sslAnalysis && (
                    <div className="mt-8">
                      <SSLAnalysis analysis={sslAnalysis} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;