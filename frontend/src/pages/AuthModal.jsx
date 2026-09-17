import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';
import { UserCheck, ShieldCheck, Trophy, LogIn, UserPlus, Key } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [role, setRole] = useState('Athlete'); // 'Athlete', 'Coach', 'Scout'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    sport: 'Football',
    position: 'Forward / Winger',
    location: 'Ludhiana, Punjab',
    organization: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (mode === 'login') {
        res = await login(formData.email, formData.password);
      } else {
        res = await register({ ...formData, role });
      }

      if (res.success) {
        onClose();
      } else {
        setError(res.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (email) => {
    setMode('login');
    setFormData({ ...formData, email, password: 'password123' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? 'User Login' : 'Create Platform Account'}>
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem', borderRadius: '12px' }}>
        <button
          type="button"
          onClick={() => { setMode('login'); setError(''); }}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            background: mode === 'login' ? 'var(--primary)' : 'transparent',
            color: mode === 'login' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          <LogIn style={{ width: '15px', verticalAlign: 'middle', marginRight: '4px' }} /> Login
        </button>

        <button
          type="button"
          onClick={() => { setMode('register'); setError(''); }}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            background: mode === 'register' ? 'var(--primary)' : 'transparent',
            color: mode === 'register' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          <UserPlus style={{ width: '15px', verticalAlign: 'middle', marginRight: '4px' }} /> Register
        </button>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Role Selection Pills for Register */}
      {mode === 'register' && (
        <div className="form-group">
          <label className="form-label">Select Your Platform Role</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Athlete', 'Coach', 'Scout'].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.2rem',
                  borderRadius: '10px',
                  border: role === r ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  background: role === r ? 'rgba(2, 132, 199, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: role === r ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Ramesh Kumar" className="form-input" />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. user@gmail.com" className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" className="form-input" />
        </div>

        {mode === 'register' && role === 'Athlete' && (
          <>
            <div className="form-group">
              <label className="form-label">Primary Sport</label>
              <select value={formData.sport} onChange={e => setFormData({ ...formData, sport: e.target.value })} className="form-select">
                <option value="Football">Football</option>
                <option value="Athletics & Track">Athletics & Track</option>
                <option value="Cricket">Cricket</option>
                <option value="Kabaddi">Kabaddi</option>
                <option value="Basketball">Basketball</option>
                <option value="Boxing">Boxing</option>
                <option value="Wrestling">Wrestling</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Playing Position / Event</label>
              <input type="text" value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} placeholder="e.g. Striker, 100m Sprint, Fast Bowler" className="form-input" />
            </div>
          </>
        )}

        {mode === 'register' && (role === 'Coach' || role === 'Scout') && (
          <div className="form-group">
            <label className="form-label">Organization / Club Name</label>
            <input type="text" value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} placeholder="e.g. State Sports Academy" className="form-input" />
          </div>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.7rem', marginTop: '0.5rem' }}>
          {loading ? 'Processing...' : mode === 'login' ? 'Login to Dashboard' : `Register as ${role}`}
        </button>
      </form>

      {/* Quick Demo Logins Helper */}
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', textAlign: 'center' }}>
          ⚡ Click below for Instant Demo Credentials:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
          <button onClick={() => handleQuickDemoLogin('admin@sportstalent.org')} className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem' }}>
            👑 Admin Demo
          </button>
          <button onClick={() => handleQuickDemoLogin('coach.rajesh@academy.org')} className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem' }}>
            ⚽ Coach Demo
          </button>
          <button onClick={() => handleQuickDemoLogin('scout.vikram@scoutnetwork.org')} className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem' }}>
            🔍 Scout Demo
          </button>
          <button onClick={() => handleQuickDemoLogin('ramesh.football@gmail.com')} className="btn btn-secondary" style={{ fontSize: '0.72rem', padding: '0.35rem' }}>
            🏃 Athlete Demo
          </button>
        </div>
      </div>
    </Modal>
  );
};
