import React from 'react';
import { Target, Users, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Our Mission & Vision</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Democratizing Sports Scouting Across India</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '0.5rem' }}>
          Unlocking hidden athletic potential by connecting gifted rural and urban youth with elite sporting opportunities.
        </p>
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.8rem', color: 'var(--accent-blue)' }}>The Problem We Solve</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Millions of exceptionally gifted athletes in village clusters and small towns never get observed by professional scouts due to geographic bias, lack of financial means, and absence of standardized combine metrics.
          </p>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.8rem', color: 'var(--accent-orange)' }}>Our Technology Solution</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We provide a fair, transparent digital talent matrix. Athletes showcase verified biometric combine scores, certificate achievements, and match video clips. Coaches filter candidates using objective parameters.
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Core Platform Pillars</h2>
        <div className="grid-3">
          <div>
            <ShieldCheck style={{ width: '36px', height: '36px', color: 'var(--accent-green)', margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ fontWeight: 700 }}>Verification Integrity</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Verified badges guarantee genuine combine timings and certificate credentials.</p>
          </div>
          <div>
            <Target style={{ width: '36px', height: '36px', color: 'var(--accent-orange)', margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ fontWeight: 700 }}>Direct Opportunity Flow</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Athletes apply directly to state trials, talent hunts, and high-performance camps.</p>
          </div>
          <div>
            <Trophy style={{ width: '36px', height: '36px', color: 'var(--primary)', margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ fontWeight: 700 }}>Equal Access</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Free for athletes from any district, village, or sporting background.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
