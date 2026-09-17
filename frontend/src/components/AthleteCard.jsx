import React from 'react';
import { ShieldCheck, MapPin, Zap, Award, Bookmark, Eye, Star } from 'lucide-react';

export const AthleteCard = ({ athlete, onViewProfile, onToggleSave, isSaved }) => {
  const user = athlete.user || {};
  const stats = athlete.stats || {};
  const locationStr = typeof athlete.location === 'object'
    ? `${athlete.location.villageCity}, ${athlete.location.state}`
    : athlete.location || 'Rural Region';

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Header & Avatar */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt={user.name}
            style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid var(--primary)' }}
          />
          {athlete.verificationBadge && (
            <div title="Verified Rural Athlete" style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              background: '#0284c7',
              borderRadius: '50%',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck style={{ width: '16px', height: '16px', color: '#ffffff' }} />
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{user.name}</h3>
            <button
              onClick={() => onToggleSave && onToggleSave(user._id || athlete._id)}
              style={{
                background: isSaved ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
                border: 'none',
                color: isSaved ? 'var(--accent-orange)' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px'
              }}
              title={isSaved ? 'Unsave Athlete' : 'Save Athlete'}
            >
              <Bookmark style={{ width: '18px', fill: isSaved ? 'currentColor' : 'none' }} />
            </button>
          </div>
          <span className="badge badge-blue" style={{ marginTop: '0.2rem' }}>
            {athlete.sport} • {athlete.position}
          </span>
        </div>
      </div>

      {/* Location & Bio */}
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <MapPin style={{ width: '14px', color: 'var(--accent-orange)' }} /> {locationStr}
      </div>

      <p style={{
        fontSize: '0.84rem',
        color: 'var(--text-muted)',
        marginBottom: '1rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {athlete.bio || 'Dedicated athlete seeking trials and recruitment opportunities.'}
      </p>

      {/* Combine Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.04)',
        padding: '0.6rem',
        borderRadius: '10px',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Score</div>
          <div style={{ fontWeight: 800, color: 'var(--accent-blue)', fontSize: '0.95rem' }}>{stats.overallScore || 85}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Speed</div>
          <div style={{ fontWeight: 800, color: 'var(--accent-green)', fontSize: '0.95rem' }}>{stats.sprintSpeedKmh || 32} km/h</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Jump</div>
          <div style={{ fontWeight: 800, color: 'var(--accent-orange)', fontSize: '0.95rem' }}>{stats.verticalJumpCm || 65} cm</div>
        </div>
      </div>

      {/* Card Action */}
      <button
        onClick={() => onViewProfile(athlete._id || user._id)}
        className="btn btn-secondary"
        style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}
      >
        <Eye style={{ width: '15px' }} /> View Full Profile
      </button>
    </div>
  );
};
