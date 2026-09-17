import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { OpportunityCard } from '../components/OpportunityCard';
import { Modal } from '../components/Modal';
import { Target, Search, Filter, CheckCircle2 } from 'lucide-react';

export const Opportunities = ({ currentUser, onOpenAuth }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', sport: 'All', type: 'All' });
  
  const [applyModal, setApplyModal] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [applySuccess, setApplySuccess] = useState('');
  const [applyError, setApplyError] = useState('');

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const res = await api.getOpportunities(filters);
      if (res.success) setOpportunities(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [filters]);

  const handleOpenApply = (opp) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setSelectedOpp(opp);
    setApplyModal(true);
    setApplySuccess('');
    setApplyError('');
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplyError('');
    try {
      const res = await api.applyToOpportunity(selectedOpp._id, coverNote);
      if (res.success) {
        setApplySuccess('Application submitted successfully! Track status in your Athlete Dashboard.');
        setTimeout(() => {
          setApplyModal(false);
          setCoverNote('');
        }, 2000);
      } else {
        setApplyError(res.message || 'Failed to submit application');
      }
    } catch (err) {
      setApplyError('Error submitting application');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-orange" style={{ marginBottom: '0.4rem' }}>Trials & Opportunities</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Sports Trials, Camps & Talent Hunts</h1>
        <p style={{ color: 'var(--text-muted)' }}>Browse certified sports trials hosted by academies, scouts, and state associations.</p>
      </div>

      {/* Top Search Controls */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <input
            type="text"
            value={filters.search}
            onChange={e => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search trial title, organization, city..."
            className="form-input"
          />
        </div>

        <select value={filters.sport} onChange={e => setFilters({ ...filters, sport: e.target.value })} className="form-select" style={{ width: '180px' }}>
          <option value="All">All Sports</option>
          <option value="Football">Football</option>
          <option value="Athletics & Track">Athletics & Track</option>
          <option value="Cricket">Cricket</option>
          <option value="Kabaddi">Kabaddi</option>
          <option value="Basketball">Basketball</option>
          <option value="Boxing">Boxing</option>
          <option value="Wrestling">Wrestling</option>
          <option value="Badminton">Badminton</option>
        </select>

        <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })} className="form-select" style={{ width: '180px' }}>
          <option value="All">All Types</option>
          <option value="Sports Trial">Sports Trial</option>
          <option value="Talent Hunt">Talent Hunt</option>
          <option value="Training Camp">Training Camp</option>
          <option value="Competition">Competition</option>
          <option value="Championship">Championship</option>
        </select>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading active opportunities...</div>
      ) : opportunities.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <Target style={{ width: '40px', height: '40px', color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
          <h3>No Opportunities Match Your Criteria</h3>
        </div>
      ) : (
        <div className="grid-3">
          {opportunities.map(opp => (
            <OpportunityCard key={opp._id} opportunity={opp} onApply={handleOpenApply} />
          ))}
        </div>
      )}

      {/* Application Submit Modal */}
      <Modal isOpen={applyModal} onClose={() => setApplyModal(false)} title={`Apply for ${selectedOpp?.title}`}>
        {applySuccess ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--accent-green)' }}>
            <CheckCircle2 style={{ width: '40px', height: '40px', margin: '0 auto 0.5rem auto' }} />
            <h3>{applySuccess}</h3>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit}>
            {applyError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {applyError}
              </div>
            )}
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.9rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Organization</div>
              <div style={{ fontWeight: 700 }}>{selectedOpp?.organization}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Location & Sport</div>
              <div style={{ fontSize: '0.88rem' }}>{selectedOpp?.location} • {selectedOpp?.sport}</div>
            </div>

            <div className="form-group">
              <label className="form-label">Cover Note / Pitch Message</label>
              <textarea
                rows="4"
                required
                value={coverNote}
                onChange={e => setCoverNote(e.target.value)}
                placeholder="Explain your key sports achievements, village team background, and why you are ready for this trial..."
                className="form-textarea"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Trial Application</button>
          </form>
        )}
      </Modal>
    </div>
  );
};
