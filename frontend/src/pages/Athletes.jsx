import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AthleteCard } from '../components/AthleteCard';
import { Search, Filter, RefreshCw, Trophy } from 'lucide-react';

const DEFAULT_ATHLETES = [
  {
    _id: '1',
    user: {
      _id: 'u1',
      name: 'Ramesh Kumar',
      email: 'ramesh.football@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Football',
    position: 'Striker / Left Winger',
    location: { state: 'Punjab', district: 'Ludhiana', villageCity: 'Khanna Village' },
    age: 18,
    gender: 'Male',
    bio: 'Self-taught striker from Khanna Village with explosive sprint speed. Won state-level rural tournament MVP.',
    verificationBadge: true,
    stats: { overallScore: 92, sprintSpeedKmh: 34.2, verticalJumpCm: 72, staminaIndex: 90, agilityScore: 88 }
  },
  {
    _id: '2',
    user: {
      _id: 'u2',
      name: 'Sunita Devi',
      email: 'sunita.sprint@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Athletics & Track',
    position: '100m / 200m Sprint',
    location: { state: 'Odisha', district: 'Sambalpur', villageCity: 'Rengali' },
    age: 19,
    gender: 'Female',
    bio: 'National Junior Athletics medalist running barefoot on village dirt tracks. Seeking professional coaching facility.',
    verificationBadge: true,
    stats: { overallScore: 95, sprintSpeedKmh: 35.8, verticalJumpCm: 78, staminaIndex: 94, agilityScore: 92 }
  },
  {
    _id: '3',
    user: {
      _id: 'u3',
      name: 'Rahul Verma',
      email: 'rahul.bowler@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Cricket',
    position: 'Right-Arm Fast Bowler',
    location: { state: 'Jharkhand', district: 'Ranchi', villageCity: 'Tupudana' },
    age: 20,
    gender: 'Male',
    bio: 'Consistently bowls 138+ km/h pace bowling in regional club tournaments with natural inswing.',
    verificationBadge: true,
    stats: { overallScore: 88, sprintSpeedKmh: 31.5, verticalJumpCm: 68, staminaIndex: 86, agilityScore: 84 }
  },
  {
    _id: '4',
    user: {
      _id: 'u4',
      name: 'Priya Singh',
      email: 'priya.kabaddi@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Kabaddi',
    position: 'Right Raider',
    location: { state: 'Haryana', district: 'Rohtak', villageCity: 'Mham' },
    age: 17,
    gender: 'Female',
    bio: 'Agile raider with exceptional toe-touch precision and multi-point raid abilities.',
    verificationBadge: true,
    stats: { overallScore: 90, sprintSpeedKmh: 30.8, verticalJumpCm: 70, staminaIndex: 91, agilityScore: 95 }
  },
  {
    _id: '5',
    user: {
      _id: 'u5',
      name: 'Amit Sharma',
      email: 'amit.hoops@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
      isVerified: false
    },
    sport: 'Basketball',
    position: 'Point Guard',
    location: { state: 'Uttar Pradesh', district: 'Meerut', villageCity: 'Kankarkhera' },
    age: 19,
    gender: 'Male',
    bio: 'Floor general with high court vision, 3-point range, and 84cm vertical bounce.',
    verificationBadge: false,
    stats: { overallScore: 86, sprintSpeedKmh: 32.0, verticalJumpCm: 84, staminaIndex: 88, agilityScore: 87 }
  },
  {
    _id: '6',
    user: {
      _id: 'u6',
      name: 'Kavita Rani',
      email: 'kavita.boxing@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Boxing',
    position: 'Flyweight (51kg)',
    location: { state: 'Haryana', district: 'Bhiwani', villageCity: 'Dhanana' },
    age: 18,
    gender: 'Female',
    bio: 'Explosive left-hook jab precision with outstanding footwork from Bhiwani boxing academy.',
    verificationBadge: true,
    stats: { overallScore: 91, sprintSpeedKmh: 29.5, verticalJumpCm: 65, staminaIndex: 93, agilityScore: 94 }
  },
  {
    _id: '7',
    user: {
      _id: 'u7',
      name: 'Vikram Rathore',
      email: 'vikram.manipur@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Football',
    position: 'Central Midfielder',
    location: { state: 'Manipur', district: 'Imphal East', villageCity: 'Khurai' },
    age: 19,
    gender: 'Male',
    bio: 'Technically gifted playmaker with 91% passing accuracy in Northeast State Youth Championship.',
    verificationBadge: true,
    stats: { overallScore: 89, sprintSpeedKmh: 33.0, verticalJumpCm: 68, staminaIndex: 92, agilityScore: 89 }
  },
  {
    _id: '8',
    user: {
      _id: 'u8',
      name: 'Ananya Roy',
      email: 'ananya.shuttle@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      isVerified: true
    },
    sport: 'Badminton',
    position: 'Singles Specialist',
    location: { state: 'West Bengal', district: 'Darjeeling', villageCity: 'Siliguri' },
    age: 17,
    gender: 'Female',
    bio: 'Fast court coverage, sharp drop-shots, and silver medalist in East Zone Junior Badminton.',
    verificationBadge: true,
    stats: { overallScore: 87, sprintSpeedKmh: 28.5, verticalJumpCm: 62, staminaIndex: 89, agilityScore: 93 }
  }
];

export const Athletes = ({ onSelectAthlete }) => {
  const [athletes, setAthletes] = useState(DEFAULT_ATHLETES);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sport: 'All',
    location: '',
    gender: 'All',
    availability: 'All',
    minScore: 0
  });

  const fetchAthletes = async () => {
    try {
      const res = await api.getAthletes(filters);
      if (res && res.success && res.data && res.data.length > 0) {
        setAthletes(res.data);
      } else {
        // Apply filter on DEFAULT_ATHLETES if API returns empty
        let list = [...DEFAULT_ATHLETES];
        if (filters.sport && filters.sport !== 'All') {
          list = list.filter(a => a.sport.toLowerCase().includes(filters.sport.toLowerCase()));
        }
        if (filters.gender && filters.gender !== 'All') {
          list = list.filter(a => a.gender === filters.gender);
        }
        if (filters.minScore > 0) {
          list = list.filter(a => a.stats.overallScore >= Number(filters.minScore));
        }
        if (filters.search) {
          const s = filters.search.toLowerCase();
          list = list.filter(a => 
            a.user.name.toLowerCase().includes(s) || 
            a.sport.toLowerCase().includes(s) || 
            a.position.toLowerCase().includes(s) ||
            a.location.villageCity.toLowerCase().includes(s) ||
            a.location.state.toLowerCase().includes(s)
          );
        }
        if (filters.location) {
          const loc = filters.location.toLowerCase();
          list = list.filter(a => 
            a.location.state.toLowerCase().includes(loc) ||
            a.location.district.toLowerCase().includes(loc) ||
            a.location.villageCity.toLowerCase().includes(loc)
          );
        }
        setAthletes(list);
      }
    } catch (e) {
      console.error(e);
      setAthletes(DEFAULT_ATHLETES);
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
