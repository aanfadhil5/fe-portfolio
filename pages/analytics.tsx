import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DownloadAnalytics from "../components/DownloadAnalytics";

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Server-side authentication approach (more secure)

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem("analytics_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth-analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("analytics_auth", "true");
        sessionStorage.setItem("analytics_token", data.token);
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    sessionStorage.removeItem("analytics_auth");
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Analytics - Portfolio</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>

        <div className="min-h-screen bg-notion-bg dark:bg-dark-bg flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            <div className="card">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-notion-text dark:text-dark-text mb-2">
                  Analytics Access
                </h1>
                <p className="text-notion-text-secondary dark:text-dark-text-secondary">
                  Enter password to view download analytics
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-notion-text dark:text-dark-text mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="Enter analytics password"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-500 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  Access Analytics
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Download Analytics - Portfolio</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Download analytics and insights" />
      </Head>

      <div className="min-h-screen bg-notion-bg dark:bg-dark-bg">
        {/* Navigation */}
        <nav className="bg-white dark:bg-dark-card border-b border-notion-border dark:border-dark-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push("/")}
                  className="text-notion-text dark:text-dark-text hover:text-notion-accent dark:hover:text-dark-accent transition-colors"
                >
                  ← Back to Portfolio
                </button>
                <span className="text-notion-text-muted dark:text-dark-text-muted">
                  |
                </span>
                <h1 className="text-lg font-semibold text-notion-text dark:text-dark-text">
                  Analytics Dashboard
                </h1>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-notion-text-secondary dark:text-dark-text-secondary hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DownloadAnalytics />
        </main>
      </div>
    </>
  );
}
