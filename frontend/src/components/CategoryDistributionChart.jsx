import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CategoryDistributionChart = ({ summary }) => {
    if (!summary || !summary.assets || summary.assets.length === 0) {
        return (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No asset data available</p>
            </div>
        );
    }

    // Calculate category metrics
    const categoryData = {};
    summary.assets.forEach(asset => {
        const category = asset.categoryName || 'Other';
        if (!categoryData[category]) {
            categoryData[category] = {
                value: 0,
                cost: 0,
                count: 0,
                gainLoss: 0
            };
        }
        const costBasis = asset.quantity * asset.purchasePrice;
        categoryData[category].value += asset.currentValue || 0;
        categoryData[category].cost += costBasis;
        categoryData[category].count += 1;
        categoryData[category].gainLoss += (asset.currentValue - costBasis);
    });

    const labels = Object.keys(categoryData).sort();
    const portfolioValue = summary.totalValue || 0;

    const valueData = labels.map(cat => categoryData[cat].value);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Portfolio Value',
                data: valueData,
                backgroundColor: '#a855f7',
                borderColor: '#9333ea',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: '#c084fc',
                yAxisID: 'y',
            }
        ],
    };

    const options = {
        indexAxis: 'x',
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#b8b8b8',
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: '500',
                    },
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
            },
            tooltip: {
                backgroundColor: '#1f1f1f',
                borderColor: '#2a2a2a',
                borderWidth: 1,
                titleColor: '#a855f7',
                bodyColor: '#b8b8b8',
                padding: 12,
                callbacks: {
                    label: function(context) {
                        const categoryName = context.label;
                        const value = context.parsed.y;
                        const count = categoryData[categoryName].count;
                        const percent = ((value / portfolioValue) * 100).toFixed(1);
                        return [
                            ` Portfolio Value: $${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
                            ` Allocation: ${percent}%`,
                            ` Holdings: ${count} asset${count !== 1 ? 's' : ''}`
                        ];
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#808080',
                    font: {
                        family: 'Inter',
                        size: 11,
                    },
                    callback: function(value) {
                        return '$' + (value / 1000).toFixed(0) + 'k';
                    }
                },
                grid: {
                    color: '#2a2a2a',
                    drawBorder: false,
                }
            },
            x: {
                ticks: {
                    color: '#b8b8b8',
                    font: {
                        family: 'Inter',
                        size: 11,
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false,
                }
            }
        }
    };

    // Calculate stats for the summary section below chart
    const topCategory = labels.reduce((max, cat) =>
        categoryData[cat].value > categoryData[max].value ? cat : max
    );
    const topValue = categoryData[topCategory].value;
    const topPercent = ((topValue / portfolioValue) * 100).toFixed(1);

    return (
        <div className="card">
            <h2>Portfolio Value Distribution</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                How your portfolio value is distributed across categories (Dollar allocation)
            </p>
            <div style={{ height: '300px', position: 'relative' }}>
                <Bar data={data} options={options} />
            </div>

            {/* Summary stats below chart */}
            <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        Total Categories
                    </div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
                        {labels.length}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        Total Holdings
                    </div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
                        {labels.reduce((sum, cat) => sum + categoryData[cat].count, 0)}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        Largest Category
                    </div>
                    <div style={{ color: 'var(--success)', fontSize: '0.95rem', fontWeight: '700' }}>
                        {topCategory} ({topPercent}%)
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                        Avg per Category
                    </div>
                    <div style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: '700' }}>
                        ${(portfolioValue / labels.length).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDistributionChart;
