import React, { useState } from 'react';
import api from '../api';

const AiPanel = () => {
  const [prompt, setPrompt] = useState('Give me a one-line summary of my portfolio.');
  const [model, setModel] = useState('gemini');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
    try {
      const res = await api.post('/api/ai/ask', { prompt, model });
      if (res && res.data && res.data.answer) {
        setAnswer(res.data.answer);
      } else {
        setAnswer(JSON.stringify(res.data || 'No response'));
      }
    } catch (err) {
      console.error('AI request failed', err);
      const msg = err?.response?.data ? JSON.stringify(err.response.data) : err.message;
      setAnswer('Error: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>AI Assistant</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.5rem' }}>
          <textarea
            rows={4}
            style={{ width: '100%' }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input value={model} onChange={(e) => setModel(e.target.value)} style={{ flex: '1' }} />
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Thinking…' : 'Ask'}</button>
        </div>
      </form>
      <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
        {answer}
      </div>
    </div>
  );
};

export default AiPanel;
