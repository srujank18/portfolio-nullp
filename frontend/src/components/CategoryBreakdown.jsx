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
    const totalPortfolioValue = summary.totalValue || 1;

    return (
        <div className="card">
            <h2>Detailed Category Breakdown</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Complete analysis of each asset category with holdings and performance metrics
            </p>

            {/* Summary Table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th style={{ textAlign: 'right' }}>Assets</th>
                            <th style={{ textAlign: 'right' }}>Current Value</th>
                            <th style={{ textAlign: 'right' }}>Cost Basis</th>
                            <th style={{ textAlign: 'right' }}>% Portfolio</th>
                            <th style={{ textAlign: 'right' }}>Gain/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => {
                            const data = categoryData[category];
                            const percentage = ((data.totalValue / totalPortfolioValue) * 100).toFixed(1);
                            const gainLossPercent = data.totalCost > 0
                                ? ((data.gainLoss / data.totalCost) * 100).toFixed(2)
                                : '0.00';
                            const isPositive = data.gainLoss >= 0;

                            return (
                                <tr key={category} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{category}</td>
                                    <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{data.assets.length}</td>
                                    <td style={{ textAlign: 'right', fontWeight: '500' }}>
                                        ${data.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                    </td>
                                    <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                                        ${data.totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                    </td>
                                    <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                                        {percentage}%
                                    </td>
                                    <td style={{
                                        textAlign: 'right',
                                        fontWeight: '500',
                                        color: isPositive ? 'var(--success)' : 'var(--danger)'
                                    }}>
                                        {isPositive ? '+' : ''}{gainLossPercent}%
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Detailed Assets by Category */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '1.5rem', marginTop: 0 }}>
                    Holdings by Category
                </h3>
                {categories.map(category => (
                    <div key={category} style={{ marginBottom: '2.5rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem',
                            paddingBottom: '0.75rem',
                            borderBottom: '2px solid var(--border)',
                        }}>
                            <h4 style={{
                                color: 'var(--accent-primary)',
                                margin: 0,
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {category}
                            </h4>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                {categoryData[category].assets.length} {categoryData[category].assets.length === 1 ? 'asset' : 'assets'}
                            </div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '1rem',
                        }}>
                            {categoryData[category].assets.map(asset => {
                                const costBasis = asset.quantity * asset.purchasePrice;
                                const gainLoss = asset.currentValue - costBasis;
                                const gainLossPercent = costBasis > 0
                                    ? ((gainLoss / costBasis) * 100).toFixed(1)
                                    : '0.0';
                                const isPositive = gainLoss >= 0;

                                return (
                                    <div
                                        key={asset.id}
                                        style={{
                                            padding: '1rem',
                                            backgroundColor: 'var(--bg-tertiary)',
                                            borderRadius: '0.5rem',
                                            border: '1px solid var(--border)',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--border)';
                                            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                                            <div>
                                                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                                    {asset.symbol}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                                                    {asset.name}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-tertiary)' }}>Qty:</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>{asset.quantity}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-tertiary)' }}>Price:</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>
                                                    ${asset.purchasePrice.toFixed(2)}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--text-tertiary)' }}>Value:</span>
                                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                                    ${asset.currentValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                                </span>
                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '0.8rem',
                                                paddingTop: '0.5rem',
                                                borderTop: '1px solid var(--border)',
                                                marginTop: '0.5rem',
                                                color: isPositive ? 'var(--success)' : 'var(--danger)',
                                                fontWeight: '500'
                                            }}>
                                                <span>G/L:</span>
                                                <span>{isPositive ? '+' : ''}{gainLossPercent}%</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBreakdown;
