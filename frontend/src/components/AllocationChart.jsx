import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AllocationChart = ({ summary }) => {
    if (!summary || !summary.categoryAllocation || Object.keys(summary.categoryAllocation).length === 0) {
        return (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No data for chart</p>
            </div>
        );
    }

    const labels = Object.keys(summary.categoryAllocation);
    const dataValues = Object.values(summary.categoryAllocation);

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    '#38bdf8', // accent-primary
                    '#818cf8', // accent-secondary
                    '#4ade80', // success
                    '#facc15', // yellow
                    '#f87171', // danger
                    '#c084fc', // purple
                ],
                borderColor: '#1e293b', // bg-secondary
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#94a3b8', // text-secondary
                    font: {
                        family: 'Inter'
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="card">
            <h2>Asset Allocation</h2>
            <div style={{ height: '300px', position: 'relative' }}>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default AllocationChart;
