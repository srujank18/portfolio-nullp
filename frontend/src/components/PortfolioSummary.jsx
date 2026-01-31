import React from 'react';

const PortfolioSummary = ({ summary }) => {
  if (!summary) return <div className="card">Loading details...</div>;

  const isPositive = summary.totalGainLoss >= 0;

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h2>Total Balance</h2>
        <div className="stat-value">
          ${summary.totalValue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>
      <div className="card">
        <h2>Total Gain/Loss</h2>
        <div className={`stat-value ${isPositive ? 'gain' : 'loss'}`}>
          {isPositive ? '+' : ''}${Math.abs(summary.totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className={`stat-label ${isPositive ? 'gain' : 'loss'}`}>
          {summary.totalGainLossPercentage?.toFixed(2)}%
        </div>
      </div>
      <div className="card">
        <h2>Top Category</h2>
        <div className="stat-value">
            {/* Simple logic to find max allocation */}
            {Object.entries(summary.categoryAllocation || {}).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
