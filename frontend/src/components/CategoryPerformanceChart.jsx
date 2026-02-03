import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CategoryPerformanceChart = ({ summary }) => {
    if (!summary || !summary.assets || summary.assets.length === 0) {
        return (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No asset data available</p>
            </div>
        );
    }

    // Group assets by category and calculate metrics
    const categoryData = {};
    summary.assets.forEach(asset => {
        const category = asset.categoryName || 'Other';
        if (!categoryData[category]) {
            categoryData[category] = {
                totalCurrentValue: 0,
                totalCostBasis: 0,
                count: 0
            };
        }
        const costBasis = asset.quantity * asset.purchasePrice;
        categoryData[category].totalCurrentValue += asset.currentValue || 0;
        categoryData[category].totalCostBasis += costBasis;
        categoryData[category].count += 1;
    });

    const labels = Object.keys(categoryData).sort();
    const currentValueData = labels.map(cat => categoryData[cat].totalCurrentValue);
    const costBasisData = labels.map(cat => categoryData[cat].totalCostBasis);
    const gainLossData = labels.map((cat, idx) => currentValueData[idx] - costBasisData[idx]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Current Value',
                data: currentValueData,
                backgroundColor: '#a855f7',
                borderColor: '#9333ea',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: '#c084fc',
            },
            {
                label: 'Cost Basis',
                data: costBasisData,
                backgroundColor: '#06b6d4',
                borderColor: '#0891b2',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: '#22d3ee',
            },
            {
                label: 'Gain/Loss',
                data: gainLossData,
                backgroundColor: gainLossData.map(val => val >= 0 ? '#10b981' : '#ef4444'),
                borderColor: gainLossData.map(val => val >= 0 ? '#059669' : '#dc2626'),
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: gainLossData.map(val => val >= 0 ? '#34d399' : '#f87171'),
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
                        const value = context.parsed.y;
                        return ` $${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
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

    return (
        <div className="card">
            <h2>Category Performance Analysis</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                Current value vs. cost basis and profit/loss by category
            </p>
            <div style={{ height: '350px', position: 'relative' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default CategoryPerformanceChart;
