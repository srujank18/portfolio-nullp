import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioSummary from './components/PortfolioSummary';
import AssetTable from './components/AssetTable';
import AddAssetForm from './components/AddAssetForm';
import AllocationChart from './components/AllocationChart';
import SentimentPanel from './components/SentimentPanel';

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

      {/* Top Row: Summary & Chart */}
      <PortfolioSummary summary={summary} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <AllocationChart summary={summary} />
        <SentimentPanel apiBase={API_BASE} />
      </div>

      {/* Bottom Row: Assets & Add Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', paddingBottom: '2rem' }}>
        <AssetTable assets={summary ? summary.assets : []} onAssetChange={handleRefresh} apiBase={API_BASE} />
        <AddAssetForm onAssetAdded={handleRefresh} apiBase={API_BASE} />
      </div>
    </div>
  );
}

export default App;
