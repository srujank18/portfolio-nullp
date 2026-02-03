import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AllocationChart = ({ summary }) => {
    if (!summary || !summary.categoryAllocation || Object.keys(summary.categoryAllocation).length === 0) {
        return (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No allocation data available</p>
            </div>
        );
    }

    const labels = Object.keys(summary.categoryAllocation);
    const dataValues = Object.values(summary.categoryAllocation);

    // Unique, distinct colors for pie slices
    const chartColors = [
        '#a855f7', // purple - primary
        '#10b981', // emerald - secondary
        '#06b6d4', // teal - tertiary
        '#f59e0b', // amber
        '#ec4899', // pink
        '#8b5cf6', // violet
        '#14b8a6', // teal-dark
        '#f97316', // orange
        '#6366f1', // indigo
        '#3b82f6', // blue
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: chartColors.slice(0, labels.length),
                borderColor: '#000000',
                borderWidth: 3,
                hoverBorderColor: '#ffffff',
                hoverBorderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
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
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const value = context.parsed;
                        return ` ${value.toFixed(2)}% of portfolio`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="card">
            <h2>Portfolio Allocation by Category</h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                Distribution of portfolio value across asset categories
            </p>
            <div style={{ height: '300px', position: 'relative' }}>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default AllocationChart;
