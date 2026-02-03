import React from 'react';

const CategoryBreakdown = ({ summary }) => {
    if (!summary || !summary.assets || summary.assets.length === 0) {
        return (
            <div className="card">
                <h2>Category Breakdown</h2>
                <p style={{ color: 'var(--text-secondary)' }}>No assets in portfolio.</p>
            </div>
        );
    }

    const categoryData = {};
    summary.assets.forEach(asset => {
        const category = asset.categoryName || 'Other';
        if (!categoryData[category]) {
            categoryData[category] = {
                assets: [],
                totalValue: 0,
                totalCost: 0,
                gainLoss: 0,
            };
        }
        const assetCost = asset.quantity * asset.purchasePrice;
        const assetGainLoss = asset.currentValue - assetCost;
        categoryData[category].assets.push(asset);
        categoryData[category].totalValue += asset.currentValue || 0;
        categoryData[category].totalCost += assetCost;
        categoryData[category].gainLoss += assetGainLoss;
    });

    const categories = Object.keys(categoryData).sort();
    const totalPortfolioValue = summary.totalValue || 0;

    return (
        <div className="card">
            <h2>Category Breakdown</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', marginBottom: '1rem' }}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Assets</th>
                            <th>Value</th>
                            <th>% of Portfolio</th>
                            <th>Gain/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => {
                            const data = categoryData[category];
                            const percentage = totalPortfolioValue > 0
                                ? ((data.totalValue / totalPortfolioValue) * 100).toFixed(2)
                                : '0.00';
                            const gainLossPercent = data.totalCost > 0
                                ? ((data.gainLoss / data.totalCost) * 100).toFixed(2)
                                : '0.00';

                            return (
                                <tr key={category}>
                                    <td style={{ fontWeight: 'bold' }}>{category}</td>
                                    <td>{data.assets.length}</td>
                                    <td>${data.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                                    <td>{percentage}%</td>
                                    <td style={{
                                        color: data.gainLoss >= 0 ? '#4ade80' : '#f87171',
                                        fontWeight: '500'
                                    }}>
                                        ${data.gainLoss.toLocaleString('en-US', { maximumFractionDigits: 2 })} ({gainLossPercent}%)
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Category Details */}
            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Assets by Category</h3>
                {categories.map(category => (
                    <div key={category} style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{
                            color: '#38bdf8',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {category}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                            {categoryData[category].assets.map(asset => (
                                <div key={asset.id} style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#0f172a',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.85rem'
                                }}>
                                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                                        {asset.symbol}
                                    </div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                                        {asset.quantity} shares @ ${asset.purchasePrice.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBreakdown;
