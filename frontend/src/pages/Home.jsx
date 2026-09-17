import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AthleteCard } from '../components/AthleteCard';
import { OpportunityCard } from '../components/OpportunityCard';
import { 
  Trophy, Sparkles, Target, Zap, Users, ArrowRight, ShieldCheck, Activity, Award, CheckCircle2, MessageSquare
} from 'lucide-react';

export const Home = ({ setActiveTab, onSelectAthlete, onApplyOpportunity, onOpenAuth }) => {
  const [featuredAthletes, setFeaturedAthletes] = useState([]);
  const [featuredOpportunities, setFeaturedOpportunities] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState('');

  useEffect(() => {
    api.getAthletes({ limit: 3 }).then(res => res.success && setFeaturedAthletes(res.data));
    api.getOpportunities().then(res => res.success && setFeaturedOpportunities(res.data.slice(0, 3)));
    api.getSportsNews().then(res => res.success && setNewsList(res.data.slice(0, 3)));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const res = await api.submitContact(contactForm);
    if (res.success) {
      setContactSuccess(res.message);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      
      {/* Hero Section */}
      <section>
        <div className="glass-panel" style={{
          padding: '3.5rem 2.5rem',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(249, 115, 22, 0.08) 100%)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '1.2rem' }}>
                <Sparkles style={{ width: '14px' }} /> Grassroots & Rural Sports Talent Network
              </div>

              <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '1.2rem' }}>
                Talent Exists Everywhere.<br />
                <span className="gradient-text">Opportunity Should Too.</span>
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Empowering promising athletes from rural villages and underserved communities to showcase verified biometric combine metrics, certificate achievements, and highlight videos directly to certified coaches and sports scouts.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => setActiveTab('athletes')} style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}>
                  Explore Athletes <ArrowRight style={{ width: '18px' }} />
                </button>
                <button className="btn btn-orange" onClick={() => setActiveTab('opportunities')} style={{ padding: '0.8rem 1.6rem', fontSize: '0.95rem' }}>
                  Browse Trials & Camps <Target style={{ width: '18px' }} />
                </button>
              </div>
            </div>

            {/* Live Stats Display Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="glass-card" style={{ textCenter: 'center', padding: '1.5rem', textAlign: 'center' }}>
                <Users style={{ color: 'var(--primary)', width: '32px', height: '32px', margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>1,250+</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Rural Athletes</p>
              </div>
              <div className="glass-card" style={{ textCenter: 'center', padding: '1.5rem', textAlign: 'center' }}>
                <ShieldCheck style={{ color: 'var(--accent-green)', width: '32px', height: '32px', margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>180+</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Scouts & Coaches</p>
              </div>
              <div className="glass-card" style={{ textCenter: 'center', padding: '1.5rem', textAlign: 'center' }}>
                <Target style={{ color: 'var(--accent-orange)', width: '32px', height: '32px', margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>45+</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active State Trials Hosted</p>
              </div>
              <div className="glass-card" style={{ textCenter: 'center', padding: '1.5rem', textAlign: 'center' }}>
                <Award style={{ color: '#eab308', width: '32px', height: '32px', margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>94%</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Selection Match Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rural Athletes Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.4rem' }}>Discovered Prodigies</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Featured Rural Athletes</h2>
          </div>
          <button className="btn btn-secondary" onClick={() => setActiveTab('athletes')}>
            View All ({featuredAthletes.length}) <ArrowRight style={{ width: '16px' }} />
          </button>
        </div>

        <div className="grid-3">
          {featuredAthletes.map(a => (
            <AthleteCard key={a._id} athlete={a} onViewProfile={onSelectAthlete} />
          ))}
        </div>
      </section>

      {/* Active Sports Opportunities Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-orange" style={{ marginBottom: '0.4rem' }}>Opportunities & Trials</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Upcoming Trials & Camps</h2>
          </div>
          <button className="btn btn-secondary" onClick={() => setActiveTab('opportunities')}>
            View All Opportunities <ArrowRight style={{ width: '16px' }} />
          </button>
        </div>

        <div className="grid-3">
          {featuredOpportunities.map(opp => (
            <OpportunityCard key={opp._id} opportunity={opp} onApply={onApplyOpportunity} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Structured Process</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>How The Platform Works</h2>
          <p style={{ color: 'var(--text-muted)' }}>Bridging rural sports potential with elite sports organizations in three simple steps.</p>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ textAlign: 'center', padding: '1.75rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(2, 132, 199, 0.15)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.25rem', fontWeight: 900 }}>1</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Create Athlete Profile</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Upload match highlights, verified combine test scores, certificate records, and village location data.</p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center', padding: '1.75rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(249, 115, 22, 0.15)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.25rem', fontWeight: 900 }}>2</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Get Discovered & Apply</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Certified coaches search filter by biometric parameters, while athletes submit applications for trials.</p>
          </div>

          <div className="glass-card" style={{ textAlign: 'center', padding: '1.75rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.25rem', fontWeight: 900 }}>3</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Attend Trials & Get Scouted</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Receive invitation notifications, complete state combines, and secure academy sponsorships.</p>
          </div>
        </div>
      </section>

      {/* Latest Sports News Feed */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Latest Bulletins</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Sports Scouting News</h2>
          </div>
          <button className="btn btn-secondary" onClick={() => setActiveTab('news')}>
            More News <ArrowRight style={{ width: '16px' }} />
          </button>
        </div>

        <div className="grid-3">
          {newsList.map(n => (
            <div key={n.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={n.image} alt={n.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
              <span className="badge badge-orange" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '0.7rem' }}>{n.category}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{n.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1 }}>{n.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Contact Form */}
      <section className="glass-panel" style={{ padding: '2.5rem' }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>Reach Out</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Have Questions or Feedback?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Whether you are a rural village sports administrator, an athlete needing support, or a scout looking to partner with us, we are here to assist.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 style={{ color: 'var(--accent-green)', width: '18px' }} /> Direct message routing to official administrators
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 style={{ color: 'var(--accent-green)', width: '18px' }} /> Response within 24 hours guaranteed
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="glass-card">
            {contactSuccess && (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {contactSuccess}
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Your Full Name</label>
              <input type="text" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} placeholder="e.g. Rajesh Kumar" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} placeholder="e.g. rajesh@gmail.com" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" required value={contactForm.subject} onChange={e => setContactForm({ ...contactForm, subject: e.target.value })} placeholder="e.g. Village Trial Request" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea rows="3" required value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Write your message here..." className="form-textarea"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </section>

    </div>
  );
};
