import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  CalendarDaysIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

// Types matching the API response
interface AnalyticsData {
  summary: {
    totalDownloads: number;
    downloadsToday: number;
    downloadsThisWeek: number;
    downloadsThisMonth: number;
    uniqueIPs: number;
    lastDownload?: string;
  };
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
    unknown: number;
  };
  browserStats: Record<string, number>;
  osStats: Record<string, number>;
  dailyStats: Array<{
    date: string;
    downloads: number;
  }>;
  recentDownloads: Array<{
    timestamp: string;
    device: string;
    browser: string;
    os: string;
    ip: string;
  }>;
}

// Stat card component
const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <motion.div
    className="card"
    whileHover={{ y: -4 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary">
          {title}
        </p>
        <p className="text-2xl font-bold text-notion-text dark:text-dark-text">
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

// Simple bar chart component
const SimpleBarChart: React.FC<{
  data: Array<{ date: string; downloads: number }>;
  title: string;
}> = ({ data, title }) => {
  const maxDownloads = Math.max(...data.map((d) => d.downloads), 1);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-notion-text dark:text-dark-text mb-4">
        {title}
      </h3>
      <div className="space-y-2">
        {data.slice(-7).map((item, index) => (
          <div key={item.date} className="flex items-center space-x-3">
            <div className="w-16 text-xs text-notion-text-secondary dark:text-dark-text-secondary">
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex-1 bg-notion-bg-secondary dark:bg-dark-bg-secondary rounded-full h-4 relative overflow-hidden">
              <motion.div
                className="h-full bg-notion-accent dark:bg-dark-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(item.downloads / maxDownloads) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
            <div className="w-8 text-xs text-notion-text dark:text-dark-text font-medium">
              {item.downloads}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Device/Browser stats component
const StatsBreakdown: React.FC<{
  title: string;
  data: Record<string, number>;
  icons?: Record<string, React.ReactNode>;
}> = ({ title, data, icons }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="text-lg font-semibold text-notion-text dark:text-dark-text mb-4">
        {title}
      </h3>
      <div className="space-y-3">
        {Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {icons?.[key] && (
                  <div className="w-5 h-5 text-notion-text-secondary dark:text-dark-text-secondary">
                    {icons[key]}
                  </div>
                )}
                <span className="text-sm text-notion-text dark:text-dark-text capitalize">
                  {key}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-notion-text dark:text-dark-text">
                  {value}
                </span>
                <span className="text-xs text-notion-text-secondary dark:text-dark-text-secondary">
                  ({total > 0 ? Math.round((value / total) * 100) : 0}%)
                </span>
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default function DownloadAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/download-analytics");

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-notion-accent dark:border-dark-accent border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
        <button onClick={fetchAnalytics} className="mt-4 btn-secondary">
          Retry
        </button>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-notion-text-secondary dark:text-dark-text-secondary">
          No analytics data available
        </p>
      </div>
    );
  }

  const deviceIcons = {
    desktop: <ComputerDesktopIcon className="w-5 h-5" />,
    mobile: <DevicePhoneMobileIcon className="w-5 h-5" />,
    tablet: <DeviceTabletIcon className="w-5 h-5" />,
    unknown: <EyeIcon className="w-5 h-5" />,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Download Analytics</h2>
        <p className="section-subtitle">
          Insights into CV download activity and visitor engagement
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Downloads"
          value={analytics.summary.totalDownloads}
          icon={<ArrowDownTrayIcon className="w-6 h-6" />}
          color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="This Month"
          value={analytics.summary.downloadsThisMonth}
          icon={<CalendarDaysIcon className="w-6 h-6" />}
          color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
        />
        <StatCard
          title="This Week"
          value={analytics.summary.downloadsThisWeek}
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Unique Visitors"
          value={analytics.summary.uniqueIPs}
          icon={<EyeIcon className="w-6 h-6" />}
          color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
        />
      </div>

      {/* Charts and Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SimpleBarChart
          data={analytics.dailyStats}
          title="Downloads Last 7 Days"
        />

        <StatsBreakdown
          title="Device Types"
          data={analytics.deviceStats}
          icons={deviceIcons}
        />

        <StatsBreakdown title="Browsers" data={analytics.browserStats} />

        <StatsBreakdown title="Operating Systems" data={analytics.osStats} />
      </div>

      {/* Recent Downloads */}
      {analytics.recentDownloads.length > 0 && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-notion-text dark:text-dark-text mb-4">
            Recent Downloads
          </h3>
          <div className="space-y-2">
            {analytics.recentDownloads.map((download, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-notion-border dark:border-dark-border last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  {deviceIcons[download.device as keyof typeof deviceIcons] ||
                    deviceIcons.unknown}
                  <div>
                    <div className="text-sm text-notion-text dark:text-dark-text">
                      {download.browser} on {download.os}
                    </div>
                    <div className="text-xs text-notion-text-secondary dark:text-dark-text-secondary">
                      {download.ip}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-notion-text-secondary dark:text-dark-text-secondary">
                  {new Date(download.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchAnalytics}
          className="btn-secondary"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
    </div>
  );
}
