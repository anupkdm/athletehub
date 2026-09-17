import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react';

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.submitContact(form);
    if (res.success) {
      setSuccess(res.message);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span className="badge badge-green" style={{ marginBottom: '0.4rem' }}>Get in Touch</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>Contact Platform Support</h1>
        <p style={{ color: 'var(--text-muted)' }}>We are here to assist athletes, coaches, scouts, and sports organizations.</p>
      </div>

      <div className="grid-2">
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Contact Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Mail style={{ color: 'var(--primary)', width: '20px' }} /> support@sportstalent.org
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Phone style={{ color: 'var(--accent-orange)', width: '20px' }} /> +91 (800) 123-TALENT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MapPin style={{ color: 'var(--accent-green)', width: '20px' }} /> Sports Authority Complex, New Delhi
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card">
          {success && (
            <div style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--accent-green)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {success}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="form-input" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="form-input" placeholder="Your email" />
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input type="text" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="form-input" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea rows="3" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="form-textarea" placeholder="Your message..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Send style={{ width: '15px' }} /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
