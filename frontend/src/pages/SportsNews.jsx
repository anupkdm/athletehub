import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Newspaper, ExternalLink, Calendar } from 'lucide-react';

export const SportsNewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.getSportsNews().then(res => res.success && setNews(res.data));
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-orange" style={{ marginBottom: '0.4rem' }}>Media & Headlines</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>Sports Scouting & Talent News</h1>
        <p style={{ color: 'var(--text-muted)' }}>Latest updates on national combines, rural athletics, tech innovations, and scouting events.</p>
      </div>

      <div className="grid-2">
        {news.map(item => (
          <div key={item.id} className="glass-card" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <img src={item.image} alt={item.title} style={{ width: '180px', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Calendar style={{ width: '13px' }} /> {item.date}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{item.summary}</p>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Source: {item.source}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
