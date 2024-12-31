import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatsData {
  daily: {
    totalSearches: number;
    analyzedSites: Array<{ url: string; score: number }>;
  };
  monthly: {
    totalSearches: number;
    analyzedSites: Array<{ url: string; score: number }>;
  };
  yearly: {
    totalSearches: number;
    analyzedSites: Array<{ url: string; score: number }>;
  };
}

interface SearchLogEntry {
  url: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [stats, setStats] = useState<StatsData>({
    daily: {
      totalSearches: 0,
      analyzedSites: []
    },
    monthly: {
      totalSearches: 0,
      analyzedSites: []
    },
    yearly: {
      totalSearches: 0,
      analyzedSites: []
    }
  });
  const [searchLog, setSearchLog] = useState<Array<{ url: string; timestamp: string }>>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    const loadStats = () => {
      try {
        const searchLog = JSON.parse(localStorage.getItem('searchLog') || '[]');
        const now = new Date();
        
        // Günlük istatistikler
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dailySearches = searchLog.filter((log: any) => 
          new Date(log.timestamp) >= today
        );

        // Aylık istatistikler
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlySearches = searchLog.filter((log: any) => 
          new Date(log.timestamp) >= firstDayOfMonth
        );

        // Yıllık istatistikler
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const yearlySearches = searchLog.filter((log: any) => 
          new Date(log.timestamp) >= firstDayOfYear
        );

        setStats({
          daily: {
            totalSearches: dailySearches.length,
            analyzedSites: dailySearches.map((s: any) => ({ 
              url: s.url, 
              score: 0 
            }))
          },
          monthly: {
            totalSearches: monthlySearches.length,
            analyzedSites: monthlySearches.map((s: any) => ({ 
              url: s.url, 
              score: 0 
            }))
          },
          yearly: {
            totalSearches: yearlySearches.length,
            analyzedSites: yearlySearches.map((s: any) => ({ 
              url: s.url, 
              score: 0 
            }))
          }
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const loadSearchLog = () => {
      try {
        const storedSearches = localStorage.getItem('searchLog');
        if (storedSearches) {
          const searches = JSON.parse(storedSearches);
          setSearchLog(searches);
        }
      } catch (error) {
        console.error('Error loading search log:', error);
        setSearchLog([]);
      }
    };

    loadSearchLog();
    // Her 30 saniyede bir güncelle
    const interval = setInterval(loadSearchLog, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const activeStats = stats[activeTab];

  // Grafik verilerini hazırla
  const getChartData = () => {
    const searchLogData = {
      labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      datasets: [
        {
          label: 'Toplam Arama',
          data: Array(7).fill(activeStats.totalSearches / 7).map(v => Math.floor(v)),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };

    const siteData = {
      labels: activeStats.analyzedSites.map(site => site.url),
      datasets: [
        {
          label: 'Analiz Edilen Siteler',
          data: activeStats.analyzedSites.map(site => site.score),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return { searchLogData, siteData };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const { searchLogData, siteData } = getChartData();

  const resetStats = () => {
    try {
      localStorage.removeItem('searchLog');
      setStats({
        daily: {
          totalSearches: 0,
          analyzedSites: []
        },
        monthly: {
          totalSearches: 0,
          analyzedSites: []
        },
        yearly: {
          totalSearches: 0,
          analyzedSites: []
        }
      });
      setSearchLog([]);
      alert('İstatistikler başarıyla sıfırlandı!');
    } catch (error) {
      console.error('Error resetting stats:', error);
      alert('İstatistikleri sıfırlarken bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Zaman Aralığı Seçici */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('daily')}
                className={`${
                  activeTab === 'daily'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              >
                Günlük
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`${
                  activeTab === 'monthly'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              >
                Aylık
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`${
                  activeTab === 'yearly'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
              >
                Yıllık
              </button>
            </nav>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Toplam Arama
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {activeStats.totalSearches}
                </dd>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Analiz Edilen Siteler
                </h3>
                <div className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Site URL
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Puan
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activeStats.analyzedSites.map((site, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {site.url}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {site.score}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grafikler */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Arama Grafiği */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Arama İstatistikleri</h3>
              <Line options={chartOptions} data={searchLogData} />
            </div>

            {/* Site Grafiği */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Analiz Edilen Siteler</h3>
              <Bar options={chartOptions} data={siteData} />
            </div>
          </div>

          {/* Anlık Aramalar */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Anlık Aramalar</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih/Saat
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchLog.map((search, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {search.url}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(search.timestamp).toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                  {searchLog.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                        Henüz arama kaydı bulunmuyor
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={resetStats}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          İstatistikleri Sıfırla
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
