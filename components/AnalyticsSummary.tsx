import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChartBarIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface AnalyticsSummary {
  totalDownloads: number;
  downloadsToday: number;
  downloadsThisWeek: number;
  uniqueVisitors: number;
  lastDownload?: string;
}

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}> = ({ title, value, icon, color, subtitle }) => (
  <motion.div
    className="card"
    whileHover={{ y: -2 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-notion-text dark:text-dark-text mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-notion-text-muted dark:text-dark-text-muted">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
    </div>
  </motion.div>
);

export default function AnalyticsSummary() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalyticsSummary();
  }, []);

  const fetchAnalyticsSummary = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/download-analytics");

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();

      setAnalytics({
        totalDownloads: data.summary.totalDownloads,
        downloadsToday: data.summary.downloadsToday,
        downloadsThisWeek: data.summary.downloadsThisWeek,
        uniqueVisitors: data.summary.uniqueIPs,
        lastDownload: data.summary.lastDownload,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-notion-accent dark:border-dark-accent border-t-transparent mx-auto"></div>
        <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary mt-2">
          Loading analytics...
        </p>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary">
          Analytics temporarily unavailable
        </p>
      </div>
    );
  }

  const formatLastDownload = (timestamp?: string) => {
    if (!timestamp) return "No downloads yet";

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Less than 1 hour ago";
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-notion-text dark:text-dark-text mb-2">
          📊 Portfolio Analytics
        </h3>
        <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary">
          Real-time insights into visitor engagement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Downloads"
          value={analytics.totalDownloads}
          icon={<ArrowDownTrayIcon className="w-6 h-6" />}
          color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          subtitle="All time"
        />

        <StatCard
          title="This Week"
          value={analytics.downloadsThisWeek}
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          subtitle="Last 7 days"
        />

        <StatCard
          title="Today"
          value={analytics.downloadsToday}
          icon={<ClockIcon className="w-6 h-6" />}
          color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
          subtitle="Since midnight"
        />

        <StatCard
          title="Unique Visitors"
          value={analytics.uniqueVisitors}
          icon={<EyeIcon className="w-6 h-6" />}
          color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
          subtitle="Different IPs"
        />
      </div>

      {/* Last Download */}
      <motion.div
        className="card text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-2">
          <GlobeAltIcon className="w-5 h-5 text-notion-text-secondary dark:text-dark-text-secondary" />
          <p className="text-sm font-medium text-notion-text dark:text-dark-text">
            Last CV Download
          </p>
        </div>
        <p className="text-sm text-notion-text-secondary dark:text-dark-text-secondary">
          {formatLastDownload(analytics.lastDownload)}
        </p>
      </motion.div>

      {/* Vercel Analytics Note */}
      <motion.div
        className="text-center pt-4 border-t border-notion-border dark:border-dark-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-xs text-notion-text-muted dark:text-dark-text-muted">
          Powered by Vercel Analytics & Custom Tracking
        </p>
        <Link
          href="/analytics"
          className="text-xs text-notion-accent dark:text-dark-accent hover:underline mt-1 inline-block"
        >
          View detailed analytics →
        </Link>
      </motion.div>
    </motion.div>
  );
}
