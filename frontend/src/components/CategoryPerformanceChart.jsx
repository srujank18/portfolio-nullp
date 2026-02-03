import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CategoryPerformanceChart = ({ summary }) => {
    if (!summary || !summary.assets || summary.assets.length === 0) {
        return (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No asset data available</p>
            </div>
        );
    }

    // Group assets by category and calculate total value per category
    const categoryData = {};
    summary.assets.forEach(asset => {
        const category = asset.categoryName || 'Other';
        if (!categoryData[category]) {
            categoryData[category] = {
                totalValue: 0,
                totalCost: 0,
                count: 0
            };
        }
        categoryData[category].totalValue += asset.currentValue || 0;
        categoryData[category].totalCost += (asset.quantity * asset.purchasePrice) || 0;
        categoryData[category].count += 1;
    });

    const labels = Object.keys(categoryData);
    const valueData = labels.map(cat => categoryData[cat].totalValue);
    const costData = labels.map(cat => categoryData[cat].totalCost);
    const gainLossData = labels.map((cat, idx) => valueData[idx] - costData[idx]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Current Value',
                data: valueData,
                backgroundColor: '#38bdf8',
                borderColor: '#0369a1',
                borderWidth: 1,
            },
            {
                label: 'Cost Basis',
                data: costData,
                backgroundColor: '#818cf8',
                borderColor: '#4f46e5',
                borderWidth: 1,
            },
            {
                label: 'Gain/Loss',
                data: gainLossData,
                backgroundColor: gainLossData.map(val => val >= 0 ? '#4ade80' : '#f87171'),
                borderColor: gainLossData.map(val => val >= 0 ? '#15803d' : '#dc2626'),
                borderWidth: 1,
            }
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#94a3b8',
                    font: { family: 'Inter' },
                    padding: 15,
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#94a3b8',
                    callback: function(value) {
                        return '$' + value.toFixed(0);
                    }
                },
                grid: {
                    color: '#334155',
                }
            },
            x: {
                ticks: {
                    color: '#94a3b8',
                },
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <div className="card">
            <h2>Category Performance</h2>
            <div style={{ height: '300px', position: 'relative' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default CategoryPerformanceChart;
