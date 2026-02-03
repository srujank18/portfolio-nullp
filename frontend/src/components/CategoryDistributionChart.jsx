import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDistributionChart = ({ summary }) => {
    if (!summary || !summary.assets || summary.assets.length === 0) {
        return (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No asset data available</p>
            </div>
        );
    }

    const categoryCount = {};
    summary.assets.forEach(asset => {
        const category = asset.categoryName || 'Other';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const labels = Object.keys(categoryCount);
    const dataValues = Object.values(categoryCount);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    '#38bdf8', '#818cf8', '#4ade80', '#facc15', '#f87171', '#c084fc',
                ],
                borderColor: '#1e293b',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#94a3b8',
                    font: { family: 'Inter' },
                    padding: 15,
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="card">
            <h2>Asset Count by Category</h2>
            <div style={{ height: '300px', position: 'relative' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default CategoryDistributionChart;
