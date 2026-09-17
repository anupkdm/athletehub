import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AthleteCard } from '../components/AthleteCard';
import { Search, Filter, RefreshCw, Trophy } from 'lucide-react';

export const Athletes = ({ onSelectAthlete }) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    sport: 'All',
    location: '',
    gender: 'All',
    availability: 'All',
    minScore: 0
  });

  const fetchAthletes = async () => {
    setLoading(true);
    try {
      const res = await api.getAthletes(filters);
      if (res.success) setAthletes(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, [filters]);

  const handleReset = () => {
    setFilters({ search: '', sport: 'All', location: '', gender: 'All', availability: 'All', minScore: 0 });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Talent Discovery</span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Explore Undiscovered Athletes</h1>
        <p style={{ color: 'var(--text-muted)' }}>Search and filter verified sports talent across states, districts, and villages.</p>
      </div>

      <div className="athlete-discovery-grid">
        {/* Filter Sidebar */}
        <aside className="glass-card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter style={{ width: '16px', color: 'var(--primary)' }} /> Filters
            </h3>
            <button onClick={handleReset} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <RefreshCw style={{ width: '12px' }} /> Reset
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Search Athlete</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
                placeholder="Name, position, village..."
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Sport Category</label>
            <select value={filters.sport} onChange={e => setFilters({ ...filters, sport: e.target.value })} className="form-select">
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
          </div>

          <div className="form-group">
            <label className="form-label">Location (State / District)</label>
            <input
              type="text"
              value={filters.location}
              onChange={e => setFilters({ ...filters, location: e.target.value })}
              placeholder="e.g. Punjab, Odisha, Ranchi"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select value={filters.gender} onChange={e => setFilters({ ...filters, gender: e.target.value })} className="form-select">
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Min Score Rating ({filters.minScore})</label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minScore}
              onChange={e => setFilters({ ...filters, minScore: e.target.value })}
              style={{ width: '100%' }}
            />
          </div>
        </aside>

        {/* Results Grid */}
        <div>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading athletes database...</div>
          ) : athletes.length === 0 ? (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <Trophy style={{ width: '40px', height: '40px', color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <h3>No Athletes Found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.4rem' }}>Try clearing or adjusting your search filters.</p>
            </div>
          ) : (
            <div className="grid-3">
              {athletes.map(a => (
                <AthleteCard key={a._id} athlete={a} onViewProfile={onSelectAthlete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
