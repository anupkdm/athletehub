import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { AthleteCard } from '../../components/AthleteCard';
import { Search, Bookmark, Mail, ShieldCheck } from 'lucide-react';

export const ScoutDashboard = ({ onSelectAthlete }) => {
  const { user } = useAuth();
  const [savedAthletes, setSavedAthletes] = useState([]);
  const [allAthletes, setAllAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAthletes().then(res => {
      if (res.success) {
        setAllAthletes(res.data);
        // Filter athletes saved in user account
        if (user?.savedAthletes) {
          setSavedAthletes(res.data.filter(a => user.savedAthletes.includes(a._id || a.user?._id)));
        }
      }
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Scout Matrix Portal: {user?.name}</h1>
          <span className="badge badge-blue"><ShieldCheck style={{ width: '14px' }} /> Certified Scout</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Scout, evaluate, save, and directly contact high-potential sports talent across India.</p>
      </div>

      {/* Saved Watchlist */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Bookmark style={{ color: 'var(--accent-orange)', width: '18px' }} /> Saved Athlete Watchlist ({savedAthletes.length})
        </h3>

        {savedAthletes.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No athletes currently saved to your watchlist. Browse the Athlete Discovery page and click the bookmark icon to save candidates.</p>
        ) : (
          <div className="grid-3">
            {savedAthletes.map(a => (
              <AthleteCard key={a._id} athlete={a} onViewProfile={onSelectAthlete} isSaved={true} />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Candidates */}
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Top Rated Candidates Across Regions</h3>
        {loading ? (
          <div>Loading talent matrix...</div>
        ) : (
          <div className="grid-3">
            {allAthletes.slice(0, 6).map(a => (
              <AthleteCard key={a._id} athlete={a} onViewProfile={onSelectAthlete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
