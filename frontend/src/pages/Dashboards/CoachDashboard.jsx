import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../../components/Modal';
import { PlusCircle, Users, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const CoachDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [oppForm, setOppForm] = useState({
    title: '',
    type: 'Sports Trial',
    sport: 'Football',
    location: '',
    deadline: '',
    description: ''
  });
  const [statusMsg, setStatusMsg] = useState('');

  const fetchApplications = async () => {
    const res = await api.getApplications();
    if (res.success) setApplications(res.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCreateOpp = async (e) => {
    e.preventDefault();
    const res = await api.createOpportunity(oppForm);
    if (res.success) {
      setStatusMsg('Opportunity created successfully!');
      setCreateModal(false);
      setOppForm({ title: '', type: 'Sports Trial', sport: 'Football', location: '', deadline: '', description: '' });
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    const res = await api.updateApplicationStatus(appId, newStatus);
    if (res.success) {
      fetchApplications();
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Coach Portal: {user?.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Manage trial applications, evaluate applicant notes, and launch new scouting combines.</p>
        </div>
        <button onClick={() => setCreateModal(true)} className="btn btn-orange">
          <PlusCircle style={{ width: '18px' }} /> Post New Trial Opportunity
        </button>
      </div>

      {statusMsg && (
        <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem' }}>
          {statusMsg}
        </div>
      )}

      {/* Applicant Applications Reviewer */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Received Trial Applicants ({applications.length})</h3>

        {applications.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No applicants have submitted applications for your opportunities yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {applications.map(app => (
              <div key={app._id} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '1.25rem', borderRadius: '14px', borderLeft: '3px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img src={app.athlete?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'} alt={app.athlete?.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{app.athlete?.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{app.athlete?.email} • {app.athlete?.phone || 'Village Applicant'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-blue">{app.status}</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(0, 0, 0, 0.2)', padding: '0.75rem', borderRadius: '10px', marginBottom: '0.8rem' }}>
                  <strong>Cover Pitch Note:</strong> "{app.coverNote || 'No pitch note provided.'}"
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.4rem' }}>Update Status:</span>
                  {['Under Review', 'Shortlisted', 'Accepted', 'Rejected'].map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(app._id, st)}
                      style={{
                        background: app.status === st ? 'var(--primary)' : 'rgba(255, 255, 255, 0.06)',
                        color: app.status === st ? '#ffffff' : 'var(--text-secondary)',
                        border: '1px solid var(--border-color)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Opportunity Modal */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Create Sports Opportunity">
        <form onSubmit={handleCreateOpp}>
          <div className="form-group">
            <label className="form-label">Opportunity Title</label>
            <input type="text" required value={oppForm.title} onChange={e => setOppForm({ ...oppForm, title: e.target.value })} className="form-input" placeholder="e.g. Grassroots U-20 Football Combine" />
          </div>

          <div className="form-group">
            <label className="form-label">Type</label>
            <select value={oppForm.type} onChange={e => setOppForm({ ...oppForm, type: e.target.value })} className="form-select">
              <option value="Sports Trial">Sports Trial</option>
              <option value="Talent Hunt">Talent Hunt</option>
              <option value="Training Camp">Training Camp</option>
              <option value="Competition">Competition</option>
              <option value="Championship">Championship</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sport Discipline</label>
            <select value={oppForm.sport} onChange={e => setOppForm({ ...oppForm, sport: e.target.value })} className="form-select">
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
            <label className="form-label">Location</label>
            <input type="text" required value={oppForm.location} onChange={e => setOppForm({ ...oppForm, location: e.target.value })} className="form-input" placeholder="e.g. Jawaharlal Nehru Stadium, New Delhi" />
          </div>

          <div className="form-group">
            <label className="form-label">Application Deadline</label>
            <input type="date" required value={oppForm.deadline} onChange={e => setOppForm({ ...oppForm, deadline: e.target.value })} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Description & Requirements</label>
            <textarea rows="3" required value={oppForm.description} onChange={e => setOppForm({ ...oppForm, description: e.target.value })} className="form-textarea" placeholder="Detail eligibility, required documents, and trial schedule..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Publish Opportunity</button>
        </form>
      </Modal>
    </div>
  );
};
