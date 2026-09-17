import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Trophy, Award, Zap, Send, MessageSquare, Bell, Plus, CheckCircle2, Clock
} from 'lucide-react';

export const AthleteDashboard = () => {
  const { user, profile, setProfile } = useAuth();
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState({ inbox: [], sent: [] });
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('applications');

  // Form states for adding performance & achievement
  const [perfForm, setPerfForm] = useState({ metricName: '100m Sprint', metricValue: '', unit: 'sec' });
  const [achForm, setAchForm] = useState({ title: '', category: 'District', year: 2026, description: '' });
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    api.getApplications().then(res => res.success && setApplications(res.data));
    api.getMessages().then(res => res.success && setMessages(res));
    api.getNotifications().then(res => res.success && setNotifications(res.data));
  }, []);

  const handleAddPerformance = async (e) => {
    e.preventDefault();
    const res = await api.addPerformance(perfForm);
    if (res.success) {
      setStatusMsg('Performance metric saved!');
      setPerfForm({ metricName: '100m Sprint', metricValue: '', unit: 'sec' });
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    const res = await api.addAchievement(achForm);
    if (res.success) {
      setStatusMsg('Achievement certificate logged!');
      setAchForm({ title: '', category: 'District', year: 2026, description: '' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Profile Summary */}
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={user?.avatar} alt={user?.name} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid var(--primary)' }} />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Welcome, {user?.name}</h1>
            <span className="badge badge-blue">{profile?.sport || 'Athlete'} • {profile?.position || 'Player'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Applications</span>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-blue)' }}>{applications.length}</div>
          </div>
          <div className="glass-card" style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Overall Score</span>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-green)' }}>{profile?.stats?.overallScore || 85}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        {[
          { id: 'applications', label: `My Applications (${applications.length})` },
          { id: 'performance', label: 'Log Combine Metrics' },
          { id: 'achievements', label: 'Add Achievements' },
          { id: 'messages', label: `Inbox Messages (${messages.inbox?.length || 0})` }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: activeTab === t.id ? 'rgba(2, 132, 199, 0.2)' : 'transparent',
              color: activeTab === t.id ? 'var(--accent-blue)' : 'var(--text-muted)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {statusMsg && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem' }}>
          {statusMsg}
        </div>
      )}

      {/* Application Status Tracker */}
      {activeTab === 'applications' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Submitted Trial Applications</h3>
          {applications.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>You have not applied for any sports trials yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {applications.map(app => (
                <div key={app._id} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{app.opportunity?.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.opportunity?.organization} • Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                  </div>

                  <span className={`badge ${
                    app.status === 'Accepted' || app.status === 'Shortlisted' ? 'badge-green' :
                    app.status === 'Under Review' ? 'badge-orange' : 'badge-blue'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Performance Logger Form */}
      {activeTab === 'performance' && (
        <form onSubmit={handleAddPerformance} className="glass-card" style={{ maxWidth: '500px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Record Biometric Combine Metric</h3>
          <div className="form-group">
            <label className="form-label">Metric Name</label>
            <input type="text" required value={perfForm.metricName} onChange={e => setPerfForm({ ...perfForm, metricName: e.target.value })} className="form-input" placeholder="e.g. 100m Sprint, Vertical Jump" />
          </div>
          <div className="form-group">
            <label className="form-label">Metric Value</label>
            <input type="number" step="0.01" required value={perfForm.metricValue} onChange={e => setPerfForm({ ...perfForm, metricValue: e.target.value })} className="form-input" placeholder="e.g. 11.4" />
          </div>
          <div className="form-group">
            <label className="form-label">Unit</label>
            <input type="text" required value={perfForm.unit} onChange={e => setPerfForm({ ...perfForm, unit: e.target.value })} className="form-input" placeholder="sec, cm, km/h" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Metric</button>
        </form>
      )}

      {/* Achievement Logger Form */}
      {activeTab === 'achievements' && (
        <form onSubmit={handleAddAchievement} className="glass-card" style={{ maxWidth: '500px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Log Sports Achievement</h3>
          <div className="form-group">
            <label className="form-label">Achievement Title</label>
            <input type="text" required value={achForm.title} onChange={e => setAchForm({ ...achForm, title: e.target.value })} className="form-input" placeholder="e.g. State Championship Gold" />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select value={achForm.category} onChange={e => setAchForm({ ...achForm, category: e.target.value })} className="form-select">
              <option value="District">District</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Year</label>
            <input type="number" required value={achForm.year} onChange={e => setAchForm({ ...achForm, year: e.target.value })} className="form-input" />
          </div>
          <button type="submit" className="btn btn-orange" style={{ width: '100%' }}>Add Achievement</button>
        </form>
      )}

      {/* Messages Inbox */}
      {activeTab === 'messages' && (
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Scout & Coach Messages</h3>
          {messages.inbox?.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No messages in your inbox.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {messages.inbox?.map(msg => (
                <div key={msg._id} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{msg.sender?.name} ({msg.sender?.role})</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>{msg.subject}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
