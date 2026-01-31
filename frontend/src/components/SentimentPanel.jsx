import React, { useState, useEffect } from 'react';
import api from '../api';

const SentimentPanel = ({ apiBase = 'http://localhost:9092' }) => {
    const [ticker, setTicker] = useState('');
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!ticker) return;
        setLoading(true);
        try {
            const res = await api.get(`/api/sentiment/${ticker}`);
            setSentiment(res.data);
        } catch (error) {
            console.error(error);
            setSentiment(null);
            alert("Could not fetch sentiment for " + ticker);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSentiment = async () => {
            try {
                const res = await api.get(`/api/sentiment/${ticker}`);
                setSentiment(res.data);
            } catch (err) {
                console.error('Sentiment fetch error', err);
            }
        };

        if (ticker) {
            fetchSentiment();
        }
    }, [ticker, apiBase]);

    return (
        <div className="card">
            <h2>Market Sentiment AI</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter Ticker (e.g. AAPL)"
                    style={{ marginBottom: 0 }}
                />
                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </form>

            {sentiment && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{sentiment.ticker}</span>
                        <span className={`sentiment-badge ${sentiment.sentimentScore >= 0.6 ? 'sentiment-positive' : sentiment.sentimentScore <= 0.4 ? 'sentiment-negative' : ''}`}>
                            Score: {sentiment.sentimentScore}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                        {sentiment.summary}
                    </p>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Analysis as of: {new Date(sentiment.lastUpdated).toLocaleString()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SentimentPanel;
