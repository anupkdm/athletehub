import React from 'react';
import { Trophy, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer = ({ setActiveTab }) => {
  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 1.5rem 1.5rem 1.5rem',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0284c7 0%, #f97316 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Trophy style={{ color: '#ffffff', width: '20px' }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Sports<span className="gradient-text">Talent</span></h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Empowering talented athletes from rural and underserved communities by connecting them directly with certified coaches, scouts, trials, and sports organizations.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><button onClick={() => setActiveTab('athletes')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Athlete Discovery</button></li>
              <li><button onClick={() => setActiveTab('opportunities')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Sports Trials & Camps</button></li>
              <li><button onClick={() => setActiveTab('sports')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Sports Categories</button></li>
              <li><button onClick={() => setActiveTab('success')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Success Stories</button></li>
              <li><button onClick={() => setActiveTab('faq')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>FAQ & Help</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Featured Sports</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Football', 'Athletics & Track', 'Cricket', 'Kabaddi', 'Basketball', 'Boxing', 'Wrestling', 'Badminton'].map(s => (
                <span key={s} className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Contact Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail style={{ width: '16px', color: 'var(--primary)' }} /> support@sportstalent.org
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone style={{ width: '16px', color: 'var(--accent-orange)' }} /> +91 (800) 123-TALENT
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin style={{ width: '16px', color: 'var(--accent-green)' }} /> Sports Authority Complex, New Delhi
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>© 2026 Full-Stack Sports Talent Identification Platform. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart style={{ width: '14px', color: '#ef4444' }} /> for rural & underserved athletic champions.
          </div>
        </div>
      </div>
    </footer>
  );
};
