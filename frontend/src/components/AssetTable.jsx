import React from 'react';
import api from '../api';

const AssetTable = ({ assets, onAssetChange }) => {
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/portfolio/assets/${id}`);
            onAssetChange();
        } catch (error) {
            console.error('Delete error', error);
            alert('Failed to delete asset');
        }
    };

    return (
        <div className="card">
            <h2>Your Assets</h2>
            {assets.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>No assets in portfolio.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Qty</th>
                            <th>Avg Price</th>
                            <th>Current Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <tr key={asset.id}>
                                <td style={{ fontWeight: 'bold' }}>{asset.symbol}</td>
                                <td>{asset.name}</td>
                                <td>{asset.categoryName}</td>
                                <td>{asset.quantity}</td>
                                <td>${asset.purchasePrice.toLocaleString()}</td>
                                <td style={{
                                    color: asset.currentValue >= (asset.quantity * asset.purchasePrice) ? 'var(--success)' : 'var(--danger)'
                                }}>
                                    ${asset.currentValue.toLocaleString()}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                                        onClick={() => handleDelete(asset.id)}
                                    >
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AssetTable;
