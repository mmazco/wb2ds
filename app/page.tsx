"use client";

import { useState, useMemo, useEffect } from "react";
import { apps } from "./data/apps";
import { TabType, Category } from "./types";
import ScatterChart from "./components/ScatterChart";
import Modal from "./components/Modal";

const tabs: TabType[] = [
  "All Apps",
  "Financial & Asset Management",
  "Prediction & Data Markets",
  "Gaming, Entertainment & Education",
  "Social & Identity Tools",
  "Commerce & Attention",
  "World ID Utility vs Rewards"
];

// External link icon
const ExternalIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M10.5 1.5L4.5 7.5M10.5 1.5H6.75M10.5 1.5V5.25M10.5 10.5H1.5V1.5H5.25" 
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("All Apps");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const filteredApps = useMemo(() => {
    if (activeTab === "All Apps" || activeTab === "World ID Utility vs Rewards") {
      return apps;
    }
    return apps.filter(app => app.category === activeTab);
  }, [activeTab]);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header className="header">
        <h1>WB2 BA DEMO DAY 11.15.2025</h1>
        <div className="header-right">
          <span>APPS: {apps.length}</span>
          <a 
            href="https://github.com/mmazco/wb2ds" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            aria-label="View on GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main-container">
        {activeTab === "World ID Utility vs Rewards" ? (
          <ScatterChart apps={apps} onOpenModal={() => setIsModalOpen(true)} theme={theme} />
        ) : (
          <>
            <div className="section-header">
              <h2 className="section-title">{activeTab}</h2>
              <span className="section-count">{filteredApps.length}</span>
            </div>

            <div className="apps-grid">
              {filteredApps.map((app) => (
                <article key={app.name} className="app-card">
                  <div className="app-card-header">
                    <h3 className="app-name">{app.name}</h3>
                    <div className="app-status">
                      <span className="status-dot"></span>
                      <span>LIVE</span>
                    </div>
                  </div>
                  
                  <span className="app-tag">{app.tag}</span>
                  
                  <p className="app-desc">{app.description}</p>
                  
                  {(app.appLink || app.demoLink) && (
                    <div className="app-links">
                      {app.appLink && (
                        <a href={app.appLink} target="_blank" rel="noopener noreferrer" className="app-link">
                          App <ExternalIcon />
                        </a>
                      )}
                      {app.demoLink && (
                        <a href={app.demoLink} target="_blank" rel="noopener noreferrer" className="app-link">
                          Demo <ExternalIcon />
                        </a>
                      )}
                    </div>
                  )}
                  
                  <div className="metrics-section">
                    <div className="metrics-label">Suggested Key Metrics for Growth</div>
                    <div className="metrics-value">{app.metric}</div>
                  </div>

                  {app.team && (
                    <div className="metrics-section">
                      <div className="metrics-label">Team</div>
                      <div className="metrics-value">{app.team}</div>
                    </div>
                  )}
                  
                  <div className="scores">
                    <div className="score-item">
                      <span className="score-label">World ID Utility</span>
                      <span className="score-value">{app.utilityScore}%</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Rewards</span>
                      <span className="score-value">{app.rewardsScore}%</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
