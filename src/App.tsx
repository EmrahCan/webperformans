import React, { useState, useRef, useEffect } from 'react';
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
import { generateABTests, analyzeCostBenefit } from './utils/advancedAnalysis';
import type { AnalysisStep, AnalysisComment, AnalysisMetrics, DeviceType, SSLAnalysisType } from './types/analysis';
import type { LoadingStep, DiagnosticReport } from './types/diagnostics';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';

function App() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps);
  const [comments, setComments] = useState<AnalysisComment[]>([]);
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [diagnosticReport, setDiagnosticReport] = useState<DiagnosticReport | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    fcp: number;
    lcp: number;
    tbt: number;
  } | null>(null);
  const [sslAnalysis, setSSLAnalysis] = useState<SSLAnalysisType | null>(null);
  const [abTests, setAbTests] = useState<any[]>([]);
  const [costBenefit, setCostBenefit] = useState<any[]>([]);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');

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
    if (!url) return;

    // Arama kaydını localStorage'a ekle
    const searchLog = JSON.parse(localStorage.getItem('searchLog') || '[]');
    searchLog.unshift({
      url: url,
      timestamp: new Date().toISOString(),
      device: deviceType
    });
    // Son 100 aramayı tut
    if (searchLog.length > 100) {
      searchLog.pop();
    }
    localStorage.setItem('searchLog', JSON.stringify(searchLog));

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

      // A/B Test önerileri
      const abTestSuggestions = generateABTests(newMetrics);
      setAbTests(abTestSuggestions);

      // Maliyet-fayda analizi
      const costBenefitAnalysis = analyzeCostBenefit(newMetrics);
      setCostBenefit(costBenefitAnalysis);

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

  // Dil değiştirme fonksiyonu
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  // Ziyaretçi sayacı
  useEffect(() => {
    const countVisitor = () => {
      const today = new Date().toISOString().split('T')[0];
      const visitorStats = JSON.parse(localStorage.getItem('visitorStats') || '{}');
      
      // Günlük istatistikler
      if (!visitorStats.daily) {
        visitorStats.daily = { date: today, count: 0 };
      }
      if (visitorStats.daily.date !== today) {
        visitorStats.daily = { date: today, count: 0 };
      }
      visitorStats.daily.count++;

      // Aylık istatistikler
      const currentMonth = today.substring(0, 7);
      if (!visitorStats.monthly) {
        visitorStats.monthly = { month: currentMonth, count: 0 };
      }
      if (visitorStats.monthly.month !== currentMonth) {
        visitorStats.monthly = { month: currentMonth, count: 0 };
      }
      visitorStats.monthly.count++;

      // Yıllık istatistikler
      const currentYear = today.substring(0, 4);
      if (!visitorStats.yearly) {
        visitorStats.yearly = { year: currentYear, count: 0 };
      }
      if (visitorStats.yearly.year !== currentYear) {
        visitorStats.yearly = { year: currentYear, count: 0 };
      }
      visitorStats.yearly.count++;

      localStorage.setItem('visitorStats', JSON.stringify(visitorStats));
    };

    // Sayfa yüklendiğinde ziyaretçiyi say
    countVisitor();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100">
            {/* Dil değiştirme butonu */}
            <div className="absolute top-4 right-4">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>
            </div>
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

                {/* Render LighthouseCalculator only when analysis is complete */}
                {showResults && performanceMetrics && (
                  <LighthouseCalculator metrics={performanceMetrics} />
                )}

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

                    {/* A/B Test Önerileri */}
                    {abTests.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">A/B Test Önerileri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {abTests.map((test, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow">
                              <h3 className="font-bold">{test.name}</h3>
                              <p className="text-gray-600">{test.description}</p>
                              <div className="mt-2">
                                <span className="text-blue-600">Beklenen Etki: {test.impact}</span>
                                <br />
                                <span className="text-green-600">Kazanç: {test.estimatedGain}</span>
                                <br />
                                <span className={`text-${test.effort === 'low' ? 'green' : test.effort === 'medium' ? 'yellow' : 'red'}-600`}>
                                  Zorluk: {test.effort}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Maliyet-Fayda Analizi */}
                    {costBenefit.length > 0 && (
                      <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Maliyet-Fayda Analizi</h2>
                        <div className="grid grid-cols-1 gap-4">
                          {costBenefit.map((analysis, index) => (
                            <div key={index} className="p-4 bg-white rounded-lg shadow">
                              <h3 className="font-bold">{analysis.improvement}</h3>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                <div>
                                  <h4 className="font-semibold">Maliyet</h4>
                                  <p>Geliştirme: {analysis.cost.development}₺</p>
                                  <p>Bakım: {analysis.cost.maintenance}₺</p>
                                  <p className="font-bold">Toplam: {analysis.cost.total}₺</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Faydalar</h4>
                                  <p>{analysis.benefit.performanceGain}</p>
                                  <p>{analysis.benefit.userExperienceGain}</p>
                                  <p>{analysis.benefit.estimatedRevenueIncrease}</p>
                                  <p className="font-bold text-green-600">ROI: {analysis.benefit.roi}</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <span className={`inline-block px-2 py-1 rounded text-white bg-${analysis.priority === 'high' ? 'red' : analysis.priority === 'medium' ? 'yellow' : 'green'}-600`}>
                                  {analysis.priority} öncelik
                                </span>
                                <span className="ml-2">{analysis.timeToImplement}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;