import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PerformanceChart } from '../components/PerformanceChart';
import { Modal } from '../components/Modal';
import { 
  ShieldCheck, MapPin, Calendar, Award, Zap, Video, Mail, ArrowLeft, CheckCircle2, Star
} from 'lucide-react';

export const AthleteProfilePage = ({ athleteId, onBack, currentUser }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msgModal, setMsgModal] = useState(false);
  const [msgContent, setMsgContent] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  useEffect(() => {
    if (athleteId) {
      api.getAthleteById(athleteId).then(res => {
        if (res.success) setData(res);
        setLoading(false);
      });
    }
  }, [athleteId]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading athlete profile...</div>;
  if (!data) return <div style={{ padding: '4rem', textAlign: 'center' }}>Athlete not found.</div>;

  const profile = data.data;
  const user = profile.user || {};
  const stats = profile.stats || {};
  const locationStr = typeof profile.location === 'object'
    ? `${profile.location.villageCity}, ${profile.location.district || ''}, ${profile.location.state}`
    : profile.location;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const res = await api.sendMessage(user._id, 'Scout Outreach Inquiry', msgContent);
    if (res.success) {
      setMsgSent(true);
      setTimeout(() => {
        setMsgModal(false);
        setMsgSent(false);
        setMsgContent('');
      }, 1500);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <button onClick={onBack} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
        <ArrowLeft style={{ width: '16px' }} /> Back to Athletes
      </button>

      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <img
          src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
          alt={user.name}
          style={{ width: '120px', height: '120px', borderRadius: '24px', objectFit: 'cover', border: '3px solid var(--primary)' }}
        />

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{user.name}</h1>
            {profile.verificationBadge && (
              <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                <ShieldCheck style={{ width: '15px' }} /> Verified Rural Athlete
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', margin: '0.6rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>{profile.sport} ({profile.position})</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin style={{ width: '14px' }} /> {locationStr}</span>
            <span>•</span>
            <span>Age: {profile.age}</span>
            <span>•</span>
            <span>Gender: {profile.gender}</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '700px' }}>
            {profile.bio || 'Dedicated athlete seeking trials and high-performance academy entry.'}
          </p>
        </div>

        <button onClick={() => setMsgModal(true)} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          <Mail style={{ width: '18px' }} /> Message Athlete
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        {/* Biometrics & Analytics Radar */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap style={{ color: 'var(--primary)', width: '20px' }} /> Biometric Combine Metrics
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.8rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Top Speed</span>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-green)' }}>{stats.sprintSpeedKmh || 32} km/h</h4>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.8rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vertical Bounce</span>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-orange)' }}>{stats.verticalJumpCm || 65} cm</h4>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.8rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Stamina Index</span>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-blue)' }}>{stats.staminaIndex || 88} / 100</h4>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.8rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Overall Score</span>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#eab308' }}>{stats.overallScore || 90}</h4>
            </div>
          </div>

          <PerformanceChart stats={stats} />
        </div>

        {/* Verified Achievements & Certificates */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award style={{ color: 'var(--accent-orange)', width: '20px' }} /> Verified Achievements
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {data.achievements && data.achievements.length > 0 ? (
              data.achievements.map(ach => (
                <div key={ach._id} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.9rem', borderRadius: '12px', borderLeft: '3px solid var(--accent-orange)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{ach.title}</h4>
                    <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>{ach.year}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{ach.description}</p>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>State Gold Medalist 2025 • Rural Combine Champion.</p>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      <Modal isOpen={msgModal} onClose={() => setMsgModal(false)} title={`Contact ${user.name}`}>
        {msgSent ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--accent-green)' }}>
            <CheckCircle2 style={{ width: '40px', height: '40px', margin: '0 auto 0.5rem auto' }} />
            <h3>Message Sent Successfully!</h3>
          </div>
        ) : (
          <form onSubmit={handleSendMessage}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Send a direct scouting outreach message to {user.name}.
            </p>
            <div className="form-group">
              <label className="form-label">Message Content</label>
              <textarea
                rows="4"
                required
                value={msgContent}
                onChange={e => setMsgContent(e.target.value)}
                placeholder="State your organization, trial invitation details, or scout inquiry..."
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Direct Outreach</button>
          </form>
        )}
      </Modal>
    </div>
  );
};
