import React from 'react';

const PortfolioSummary = ({ summary }) => {
  if (!summary) return <div className="card">Loading portfolio details...</div>;

  const isPositive = summary.totalGainLoss >= 0;
  const totalCost = summary.totalValue - summary.totalGainLoss;

  // Find top category by allocation
  const topCategory = Object.entries(summary.categoryAllocation || {})
    .sort(([, a], [, b]) => b - a)[0];

  const topCategoryName = topCategory?.[0] || 'N/A';
  const topCategoryPercent = topCategory?.[1]?.toFixed(1) || '0.0';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
      {/* Total Portfolio Value */}
      <div className="card">
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Portfolio Value</h3>
        </div>
        <div className="stat-value">
          ${(summary.totalValue || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </div>
        <div className="stat-label">Total Assets</div>
        <div className="stat-subtext" style={{ marginTop: '0.75rem' }}>
          Cost basis: ${totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </div>
      </div>

      {/* Gain/Loss Card */}
      <div className="card">
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gain / Loss</h3>
        </div>
        <div className={`stat-value ${isPositive ? 'gain' : 'loss'}`}>
          {isPositive ? '+' : '-'}${Math.abs(summary.totalGainLoss || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <span className={`stat-label ${isPositive ? 'gain' : 'loss'}`}>
            {isPositive ? '+' : ''}{(summary.totalGainLossPercentage || 0).toFixed(2)}%
          </span>
        </div>
        <div className="stat-subtext" style={{ marginTop: '0.75rem' }}>
          Return on Investment
        </div>
      </div>

      {/* Top Category */}
      <div className="card">
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Largest Position</h3>
        </div>
        <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>
          {topCategoryName}
        </div>
        <div className="stat-label">
          {topCategoryPercent}% of portfolio
        </div>
        <div className="stat-subtext" style={{ marginTop: '0.75rem' }}>
          Primary allocation
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
