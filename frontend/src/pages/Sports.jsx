import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Trophy, Dribbble, Zap, Target, Activity, Award, Shield, Circle, ArrowRight } from 'lucide-react';

const DEFAULT_SPORTS = [
  {
    _id: '1',
    name: 'Football',
    category: 'Team',
    description: 'Global 11-a-side team sport focusing on sprint kinematics, stamina, ball control, and tactical positioning.',
    rulesSummary: '90 minutes total match duration (two 45-min halves), 11 players per side.'
  },
  {
    _id: '2',
    name: 'Athletics & Track',
    category: 'Individual',
    description: 'Track and field disciplines evaluating peak sprint velocity (100m/200m), long jump, and endurance.',
    rulesSummary: 'Standard IAAF competition rules with photo-finish timing and electronic combine sensors.'
  },
  {
    _id: '3',
    name: 'Cricket',
    category: 'Team',
    description: 'Batting, fast bowling, seam movement, spin control, and fielding agility across regional formats.',
    rulesSummary: 'T20, One Day (50 overs), and multi-day match formats under ICC guidelines.'
  },
  {
    _id: '4',
    name: 'Kabaddi',
    category: 'Combat',
    description: 'High-intensity contact sport testing breath control, explosive raiding agility, and defensive tackles.',
    rulesSummary: '7 players per side, two 20-minute halves with 30-second raid time clock.'
  },
  {
    _id: '5',
    name: 'Basketball',
    category: 'Team',
    description: 'Fast-paced court sport demanding high vertical bounce, shooting accuracy, floor vision, and transition speed.',
    rulesSummary: '4 quarters of 10 minutes (FIBA format), 24-second shot clock.'
  },
  {
    _id: '6',
    name: 'Boxing',
    category: 'Combat',
    description: 'Olympic weight category boxing testing stamina, rapid punch combos, ring movement, and defense.',
    rulesSummary: '3 rounds of 3 minutes each under IBA amateur boxing rules.'
  },
  {
    _id: '7',
    name: 'Wrestling',
    category: 'Combat',
    description: 'Freestyle and Greco-Roman wrestling measuring core stability, leverage, grappling strength, and endurance.',
    rulesSummary: '2 periods of 3 minutes with point scoring for takedowns, throws, and pins.'
  },
  {
    _id: '8',
    name: 'Badminton',
    category: 'Racquet',
    description: 'High-speed racquet sport evaluating rapid reaction velocity, shuttle precision, and court agility.',
    rulesSummary: 'Best of 3 sets played to 21 points under BWF regulations.'
  }
];

export const SportsPage = ({ setActiveTab }) => {
  const [sports, setSports] = useState(DEFAULT_SPORTS);

  useEffect(() => {
    api.getSports().then(res => {
      if (res && res.success && res.data && res.data.length > 0) {
        setSports(res.data);
      }
    }).catch(() => setSports(DEFAULT_SPORTS));
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2.5rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
        <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Sports Disciplines</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>Supported Sports Categories</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore position benchmarks, combine testing metrics, and opportunities across diverse disciplines.</p>
      </div>

      <div className="grid-3">
        {sports.map(s => (
          <div key={s._id || s.name} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy style={{ width: '22px' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{s.name}</h3>
                <span className="badge badge-orange" style={{ fontSize: '0.68rem' }}>{s.category} Sport</span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{s.description}</p>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              <strong>Rule Summary:</strong> {s.rulesSummary}
            </div>

            <button onClick={() => setActiveTab('athletes')} className="btn btn-secondary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
              View {s.name} Athletes <ArrowRight style={{ width: '15px' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
