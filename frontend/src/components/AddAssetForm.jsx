import React, { useState, useEffect } from 'react';
import api from '../api';

const AddAssetForm = ({ onAssetAdded, apiBase = 'http://localhost:9091' }) => {
    const [formData, setFormData] = useState({
        symbol: '',
        name: '',
        quantity: '',
        purchasePrice: '',
        categoryName: 'Stocks' // Default
    });

    const [categories, setCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Fetch categories for dropdown
        api.get('/api/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories", err));
    }, [apiBase]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Coerce numeric fields into numbers before sending
            const payload = {
                ...formData,
                quantity: parseFloat(formData.quantity),
                purchasePrice: parseFloat(formData.purchasePrice)
            };
            const res = await api.post('/api/portfolio/assets', payload);
            console.log('Asset add response:', res.data);
            setFormData({
                symbol: '',
                name: '',
                quantity: '',
                purchasePrice: '',
                categoryName: 'Stocks'
            });
            onAssetAdded();
            alert('Asset added: ' + (res.data && res.data.symbol ? res.data.symbol : 'ok'));
        } catch (error) {
            console.error("Error adding asset", error);
            const msg = error?.response?.data ? JSON.stringify(error.response.data) : error.message;
            alert("Failed to add asset: " + msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card">
            <h2>Add New Asset</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Symbol</label>
                        <input
                            type="text"
                            placeholder="e.g. AAPL"
                            value={formData.symbol}
                            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Asset Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Apple Inc."
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Quantity</label>
                        <input
                            type="number"
                            step="0.0001"
                            placeholder="0.00"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Purchase Price</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.purchasePrice}
                            onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                        <select
                            value={formData.categoryName}
                            onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                        >
                            {categories.length > 0 ? categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            )) : <option value="Stocks">Stocks</option>}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }} disabled={submitting}>{submitting ? 'Adding…' : 'Add to Portfolio'}</button>
            </form>
        </div>
    );
};

export default AddAssetForm;
