import React, { useState, useEffect } from 'react';
import api from '../api';
import UpdateAssetModal from './UpdateAssetModal';

const AssetTable = ({ assets, onAssetChange }) => {
    const [editingAsset, setEditingAsset] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories for dropdown in modal
        api.get('/api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories", err));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to sell this asset?')) {
            try {
                await api.delete(`/api/portfolio/assets/${id}`);
                onAssetChange();
            } catch (error) {
                console.error('Delete error', error);
                alert('Failed to delete asset');
            }
        }
    };

    const handleEditClick = (asset) => {
        setEditingAsset(asset);
    };

    const handleUpdateSuccess = () => {
        onAssetChange();
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
                            <th>Gain/Loss</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => {
                            const gainLoss = asset.currentValue - (asset.quantity * asset.purchasePrice);
                            const gainLossColor = gainLoss >= 0 ? 'var(--success)' : 'var(--danger)';
                            return (
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
                                <td style={{ color: gainLossColor }}>
                                    ${gainLoss.toLocaleString()}
                                </td>
                                <td>
                                    <button
                                        className="btn"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}
                                        onClick={() => handleEditClick(asset)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                                        onClick={() => handleDelete(asset.id)}
                                    >
                                        Sell
                                    </button>
                                </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            )}
            {editingAsset && (
                <UpdateAssetModal
                    asset={editingAsset}
                    categories={categories}
                    onClose={() => setEditingAsset(null)}
                    onSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default AssetTable;
