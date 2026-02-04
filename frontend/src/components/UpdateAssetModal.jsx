import React, { useState, useEffect } from 'react';
import api from '../api';

const UpdateAssetModal = ({ asset, categories, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: asset.name,
        quantity: asset.quantity,
        purchasePrice: asset.purchasePrice,
        categoryName: asset.categoryName
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            ...formData,
            quantity: parseFloat(formData.quantity),
            purchasePrice: parseFloat(formData.purchasePrice)
        };

        try {
            console.log('Updating asset with ID:', asset.id);
            console.log('Payload:', payload);
            console.log('API Base URL:', api.defaults.baseURL);

            const response = await api.put(`/api/portfolio/assets/${asset.id}`, payload);
            console.log('Update successful:', response.data);
            console.log('Response status:', response.status);

            // Success - no alert needed, just close and refresh
            console.log('Calling onSuccess callback...');
            onSuccess();

            // Give the parent component time to fetch updated data before closing modal
            setTimeout(() => {
                onClose();
            }, 300);

        } catch (error) {
            console.error('Error updating asset:', error);
            console.error('Error details:', {
                message: error?.message,
                status: error?.response?.status,
                statusText: error?.response?.statusText,
                data: error?.response?.data,
                request: error?.request ? 'Request was made' : 'No request made',
                config: error?.config
            });

            // Better error message
            let errorMsg = 'Network Error';
            if (error.response) {
                errorMsg = `Server Error (${error.response.status}): ${error.response.data?.message || error.response.statusText}`;
            } else if (error.request) {
                errorMsg = 'Network Error: No response from server. Check if backend is running on http://localhost:9092';
            } else if (error.message) {
                errorMsg = error.message;
            }

            alert('Failed to update asset: ' + errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ maxWidth: '500px', width: '90%' }}>
                <h2>Edit Asset: {asset.symbol}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Asset Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            step="0.0001"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Purchase Price
                        </label>
                        <input
                            type="number"
                            name="purchasePrice"
                            step="0.01"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            Category
                        </label>
                        <select
                            name="categoryName"
                            value={formData.categoryName}
                            onChange={handleChange}
                        >
                            {categories.length > 0 ? (
                                categories.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))
                            ) : (
                                <option value={formData.categoryName}>{formData.categoryName}</option>
                            )}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating…' : 'Update Asset'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAssetModal;
