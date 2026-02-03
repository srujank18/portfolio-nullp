import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioSummary from './components/PortfolioSummary';
import AssetTable from './components/AssetTable';
import AddAssetForm from './components/AddAssetForm';
import AllocationChart from './components/AllocationChart';
import CategoryPerformanceChart from './components/CategoryPerformanceChart';
import CategoryDistributionChart from './components/CategoryDistributionChart';
import CategoryBreakdown from './components/CategoryBreakdown';
import SentimentPanel from './components/SentimentPanel';
import AiPanel from './components/AiPanel';

// Use VITE_API_URL if set; default now matches backend default 9092
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9092';

function App() {
  const [summary, setSummary] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchPortfolio = () => {
    axios.get(`${API_BASE}/api/portfolio`)
      .then(res => setSummary(res.data))
      .catch(err => console.error("Error connecting to backend", err));
  };

  useEffect(() => {
    fetchPortfolio();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Portfolio Manager</h1>
      </header>

      {/* Portfolio Summary */}
      <PortfolioSummary summary={summary} />

      {/* Main Charts Row: Allocation, Distribution, Sentiment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <AllocationChart summary={summary} />
        <CategoryDistributionChart summary={summary} />
        <SentimentPanel apiBase={API_BASE} />
      </div>

      {/* Category Performance Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <CategoryPerformanceChart summary={summary} />
      </div>

      {/* Assets and Add Form Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <AssetTable assets={summary ? summary.assets : []} onAssetChange={handleRefresh} apiBase={API_BASE} />
        <div style={{ display: 'grid', gap: '1rem' }}>
          <AddAssetForm onAssetAdded={handleRefresh} apiBase={API_BASE} />
          <AiPanel />
        </div>
      </div>

      {/* Category Breakdown - Full Width */}
      <div style={{ marginBottom: '2rem' }}>
        <CategoryBreakdown summary={summary} />
      </div>
    </div>
  );
}

export default App;
