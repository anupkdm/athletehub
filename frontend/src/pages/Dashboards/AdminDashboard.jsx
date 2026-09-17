import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { 
  Users, ShieldCheck, Target, Award, Mail, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [statusMsg, setStatusMsg] = useState('');

  const fetchAdminData = async () => {
    const sRes = await api.getAdminStats();
    if (sRes.success) setStats(sRes.data);

    const uRes = await api.getAdminUsers();
    if (uRes.success) setUsers(uRes.data);

    const cRes = await api.getContactMessages();
    if (cRes.success) setContacts(cRes.data);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleVerify = async (userId) => {
    const res = await api.toggleVerifyUser(userId);
    if (res.success) {
      setStatusMsg(res.message);
      fetchAdminData();
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900 }}>System Administrator Control Panel</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Overview of platform analytics, user verification badges, and system inquiries.</p>
      </div>

      {/* Stats Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Users</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>{stats.totalUsers || 0}</h3>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Athletes</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-blue)' }}>{stats.totalAthletes || 0}</h3>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Coaches</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-orange)' }}>{stats.totalCoaches || 0}</h3>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Scouts</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-green)' }}>{stats.totalScouts || 0}</h3>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Opportunities</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#eab308' }}>{stats.totalOpportunities || 0}</h3>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Applications</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#a855f7' }}>{stats.totalApplications || 0}</h3>
        </div>
      </div>

      {statusMsg && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem' }}>
          {statusMsg}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            background: activeTab === 'users' ? 'rgba(2, 132, 199, 0.2)' : 'transparent',
            color: activeTab === 'users' ? 'var(--accent-blue)' : 'var(--text-muted)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          User Management & Verifications ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          style={{
            background: activeTab === 'contacts' ? 'rgba(2, 132, 199, 0.2)' : 'transparent',
            color: activeTab === 'contacts' ? 'var(--accent-blue)' : 'var(--text-muted)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          Contact Messages ({contacts.length})
        </button>
      </div>

      {/* User Management Table */}
      {activeTab === 'users' && (
        <div className="glass-card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>User</th>
                <th style={{ padding: '0.75rem' }}>Email</th>
                <th style={{ padding: '0.75rem' }}>Role</th>
                <th style={{ padding: '0.75rem' }}>Verification Status</th>
                <th style={{ padding: '0.75rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={u.avatar} alt={u.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    {u.name}
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className="badge badge-blue">{u.role}</span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {u.isVerified ? (
                      <span className="badge badge-green"><ShieldCheck style={{ width: '13px' }} /> Verified</span>
                    ) : (
                      <span className="badge badge-orange">Unverified</span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => handleToggleVerify(u._id)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}
                    >
                      {u.isVerified ? 'Revoke Badge' : 'Grant Verified Badge'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Contact Messages Table */}
      {activeTab === 'contacts' && (
        <div className="glass-card">
          {contacts.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No contact submissions found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {contacts.map(c => (
                <div key={c._id} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{c.name} ({c.email})</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-orange)' }}>{c.subject}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
