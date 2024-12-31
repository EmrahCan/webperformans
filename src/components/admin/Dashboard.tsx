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

interface VisitorStats {
  daily: {
    totalVisitors: number;
    uniqueVisitors: number;
    averageTimeSpent: string;
    popularPages: Array<{ page: string; visits: number }>;
    analyzedSites: Array<{ url: string; count: number; lastAnalyzed: string }>;
  };
  monthly: {
    totalVisitors: number;
    uniqueVisitors: number;
    averageTimeSpent: string;
    popularPages: Array<{ page: string; visits: number }>;
    analyzedSites: Array<{ url: string; count: number; lastAnalyzed: string }>;
  };
  yearly: {
    totalVisitors: number;
    uniqueVisitors: number;
    averageTimeSpent: string;
    popularPages: Array<{ page: string; visits: number }>;
    analyzedSites: Array<{ url: string; count: number; lastAnalyzed: string }>;
  };
}

interface SearchLogEntry {
  url: string;
  timestamp: string;
  device: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [stats, setStats] = useState<VisitorStats>({
    daily: {
      totalVisitors: 0,
      uniqueVisitors: 0,
      averageTimeSpent: '0:00',
      popularPages: [],
      analyzedSites: []
    },
    monthly: {
      totalVisitors: 0,
      uniqueVisitors: 0,
      averageTimeSpent: '0:00',
      popularPages: [],
      analyzedSites: []
    },
    yearly: {
      totalVisitors: 0,
      uniqueVisitors: 0,
      averageTimeSpent: '0:00',
      popularPages: [],
      analyzedSites: []
    }
  });
  const [searchLog, setSearchLog] = useState<SearchLogEntry[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    // Ziyaretçi istatistiklerini localStorage'dan al
    const visitorStats = JSON.parse(localStorage.getItem('visitorStats') || '{}');
    
    setStats({
      daily: {
        totalVisitors: visitorStats.daily?.count || 0,
        uniqueVisitors: Math.floor((visitorStats.daily?.count || 0) * 0.7), // Yaklaşık tekil ziyaretçi sayısı
        averageTimeSpent: '2:30',
        popularPages: [
          { page: 'Ana Sayfa', visits: Math.floor((visitorStats.daily?.count || 0) * 0.5) },
          { page: 'Hakkımızda', visits: Math.floor((visitorStats.daily?.count || 0) * 0.3) },
          { page: 'İletişim', visits: Math.floor((visitorStats.daily?.count || 0) * 0.2) }
        ],
        analyzedSites: [
          { url: 'example.com', count: 0, lastAnalyzed: '-' },
          { url: 'test.com', count: 0, lastAnalyzed: '-' },
          { url: 'demo.com', count: 0, lastAnalyzed: '-' }
        ]
      },
      monthly: {
        totalVisitors: visitorStats.monthly?.count || 0,
        uniqueVisitors: Math.floor((visitorStats.monthly?.count || 0) * 0.7),
        averageTimeSpent: '2:45',
        popularPages: [
          { page: 'Ana Sayfa', visits: Math.floor((visitorStats.monthly?.count || 0) * 0.5) },
          { page: 'Hakkımızda', visits: Math.floor((visitorStats.monthly?.count || 0) * 0.3) },
          { page: 'İletişim', visits: Math.floor((visitorStats.monthly?.count || 0) * 0.2) }
        ],
        analyzedSites: [
          { url: 'example.com', count: 0, lastAnalyzed: '-' },
          { url: 'test.com', count: 0, lastAnalyzed: '-' },
          { url: 'demo.com', count: 0, lastAnalyzed: '-' }
        ]
      },
      yearly: {
        totalVisitors: visitorStats.yearly?.count || 0,
        uniqueVisitors: Math.floor((visitorStats.yearly?.count || 0) * 0.7),
        averageTimeSpent: '2:30',
        popularPages: [
          { page: 'Ana Sayfa', visits: Math.floor((visitorStats.yearly?.count || 0) * 0.5) },
          { page: 'Hakkımızda', visits: Math.floor((visitorStats.yearly?.count || 0) * 0.3) },
          { page: 'İletişim', visits: Math.floor((visitorStats.yearly?.count || 0) * 0.2) }
        ],
        analyzedSites: [
          { url: 'example.com', count: 0, lastAnalyzed: '-' },
          { url: 'test.com', count: 0, lastAnalyzed: '-' },
          { url: 'demo.com', count: 0, lastAnalyzed: '-' }
        ]
      }
    });
  }, [navigate]);

  // Anlık aramaları güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      const log = JSON.parse(localStorage.getItem('searchLog') || '[]');
      setSearchLog(log);
    }, 1000); // Her saniye güncelle

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const activeStats = stats[activeTab];

  // Grafik verilerini hazırla
  const getChartData = () => {
    const visitorData = {
      labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
      datasets: [
        {
          label: 'Toplam Ziyaretçi',
          data: Array(7).fill(activeStats.totalVisitors / 7).map(v => Math.floor(v)),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
          label: 'Tekil Ziyaretçi',
          data: Array(7).fill(activeStats.uniqueVisitors / 7).map(v => Math.floor(v)),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    const pageData = {
      labels: activeStats.popularPages.map(page => page.page),
      datasets: [
        {
          label: 'Sayfa Ziyaretleri',
          data: activeStats.popularPages.map(page => page.visits),
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

    const deviceData = {
      labels: ['Masaüstü', 'Mobil', 'Tablet'],
      datasets: [
        {
          data: [45, 35, 20],
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
        },
      ],
    };

    return { visitorData, pageData, deviceData };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const { visitorData, pageData, deviceData } = getChartData();

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
                  Toplam Ziyaretçi
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {activeStats.totalVisitors}
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Tekil Ziyaretçi
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {activeStats.uniqueVisitors}
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Ortalama Geçirilen Süre
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {activeStats.averageTimeSpent}
                </dd>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  En Çok Ziyaret Edilen Sayfalar
                </h3>
                <div className="mt-4">
                  <ul className="divide-y divide-gray-200">
                    {activeStats.popularPages.map((page, index) => (
                      <li key={index} className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {page.page}
                          </div>
                          <div className="text-sm text-gray-500">
                            {page.visits} ziyaret
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  En Çok Analiz Edilen Siteler
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
                            Analiz Sayısı
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Son Analiz
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {activeStats.analyzedSites.map((site, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {site.url}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {site.count}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {site.lastAnalyzed}
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
            {/* Ziyaretçi Grafiği */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ziyaretçi İstatistikleri</h3>
              <Line options={chartOptions} data={visitorData} />
            </div>

            {/* Sayfa Ziyaretleri Grafiği */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sayfa Ziyaretleri</h3>
              <Bar options={chartOptions} data={pageData} />
            </div>

            {/* Cihaz Dağılımı Grafiği */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cihaz Dağılımı</h3>
              <div className="w-full max-w-md mx-auto">
                <Pie data={deviceData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Anlık Aramalar */}
          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-between items-center">
                  <span>Anlık Aramalar</span>
                  <span className="text-sm text-gray-500">Son güncelleme: {new Date().toLocaleTimeString()}</span>
                </h3>
                <div className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Zaman
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            URL
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cihaz
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {searchLog.map((entry, index) => (
                          <tr key={index} className={index === 0 ? 'bg-green-50' : ''}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {entry.url}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.device}
                            </td>
                          </tr>
                        ))}
                        {searchLog.length === 0 && (
                          <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                              Henüz arama yapılmamış
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;