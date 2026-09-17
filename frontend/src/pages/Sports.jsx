import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Trophy, Dribbble, Zap, Target, Activity, Award, Shield, Circle, ArrowRight } from 'lucide-react';

export const SportsPage = ({ setActiveTab }) => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    api.getSports().then(res => res.success && setSports(res.data));
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Sports Disciplines</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>Supported Sports Categories</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore position benchmarks, combine testing metrics, and opportunities across diverse disciplines.</p>
      </div>

      <div className="grid-3">
        {sports.map(s => (
          <div key={s._id || s.name} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy style={{ width: '22px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{s.name}</h3>
                <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>{s.category} Sport</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{s.description}</p>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              <strong>Rule Summary:</strong> {s.rulesSummary}
            </div>

            <button onClick={() => setActiveTab('athletes')} className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
              View {s.name} Athletes <ArrowRight style={{ width: '15px' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
