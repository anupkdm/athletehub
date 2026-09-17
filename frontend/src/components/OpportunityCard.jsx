import React from 'react';
import { Calendar, MapPin, Building, Award, Send, Bookmark } from 'lucide-react';

export const OpportunityCard = ({ opportunity, onApply, onToggleSave, isSaved }) => {
  const deadlineDate = opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'Open Deadline';

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
        <span className="badge badge-orange">{opportunity.type || 'Sports Trial'}</span>
        <button
          onClick={() => onToggleSave && onToggleSave(opportunity._id)}
          style={{
            background: isSaved ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
            border: 'none',
            color: isSaved ? 'var(--accent-orange)' : 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <Bookmark style={{ width: '18px', fill: isSaved ? 'currentColor' : 'none' }} />
        </button>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{opportunity.title}</h3>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Building style={{ width: '15px', color: 'var(--primary)' }} /> {opportunity.organization}
      </div>

      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin style={{ width: '14px', color: 'var(--accent-orange)' }} /> {opportunity.location}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar style={{ width: '14px', color: 'var(--accent-green)' }} /> Deadline: {deadlineDate}
        </div>
      </div>

      <p style={{
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '1.2rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {opportunity.description}
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
        <button
          onClick={() => onApply(opportunity)}
          className="btn btn-primary"
          style={{ flex: 1, padding: '0.55rem', fontSize: '0.85rem' }}
        >
          <Send style={{ width: '15px' }} /> Apply Now
        </button>
      </div>
    </div>
  );
};
