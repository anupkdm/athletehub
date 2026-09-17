import React from 'react';
import { Award, Star, Quote, ShieldCheck } from 'lucide-react';

export const SuccessStoriesPage = () => {
  const stories = [
    {
      name: 'Sunita Devi',
      sport: 'Athletics & Track (100m)',
      origin: 'Sambalpur Village, Odisha',
      achievement: 'Scouted for National Youth Academy Sponsorship',
      quote: 'Running barefoot on dirt tracks in my village, I never imagined national coaches would see my timing. The platform verified my combine sprint speed and changed my life.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Ramesh Kumar',
      sport: 'Football (Striker)',
      origin: 'Khanna Village, Punjab',
      achievement: 'Selected for State U-20 Combine Squad',
      quote: 'I had 18 goals in local district tournaments, but no scout had ever visited our town. After uploading my match highlight videos, Coach Rajesh reached out directly.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
    },
    {
      name: 'Rahul Verma',
      sport: 'Cricket (Fast Bowler)',
      origin: 'Tupudana, Jharkhand',
      achievement: 'Drafted into State High-Performance Fast Bowling Camp',
      quote: 'Bowling at 138+ km/h in village matches went unnoticed until biometric test metrics were recorded on my profile. Today I train at the central academy.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge badge-green" style={{ marginBottom: '0.4rem' }}>Inspirational Journeys</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>Rural Talent Success Stories</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real stories of athletes discovered from village grounds and propelled to professional sporting arenas.</p>
      </div>

      <div className="grid-3">
        {stories.map((s, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img src={s.image} alt={s.name} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid var(--accent-green)' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{s.name}</h3>
                <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{s.sport}</span>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{s.origin}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.12)', color: 'var(--accent-green)', padding: '0.6rem 0.8rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award style={{ width: '16px' }} /> {s.achievement}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, flex: 1, position: 'relative', paddingLeft: '1.2rem', borderLeft: '2px solid var(--border-color)' }}>
              "{s.quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
