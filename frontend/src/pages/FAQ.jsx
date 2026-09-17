import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does the platform help athletes from rural and underserved areas?',
      a: 'The platform provides a free, structured profile builder where rural athletes can record standardized combine metrics (sprint speed, vertical jump, stamina), upload match videos, and display certificates. Certified scouts across India search this database using objective performance filters, eliminating geographical recruiting barriers.'
    },
    {
      q: 'Who verifies the athlete combine scores and certificates?',
      a: 'Athletes can self-report metrics initially. Verified Badges are issued after scores are verified by state sports officers, certified academy coaches, or during official combine trials hosted on the platform.'
    },
    {
      q: 'Is registration free for athletes?',
      a: 'Yes, registering an athlete profile, building your digital CV, searching for trials, and applying for sports opportunities is 100% free for all athletes.'
    },
    {
      q: 'How can coaches and scouts organize sports trials on the platform?',
      a: 'Coaches and scouts can register for an official organization account. Once verified by platform administrators, they gain access to post trial notices, review applicant profiles, update trial application statuses, and send direct outreach messages.'
    },
    {
      q: 'What application statuses exist and how are they updated?',
      a: 'Applications progress through 5 clear stages: Pending -> Under Review -> Shortlisted -> Accepted -> Rejected. Applicants receive instant notifications whenever their application status changes.'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>Help & Knowledge Base</span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--text-muted)' }}>Everything you need to know about athlete profiles, scouting, and trials.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-card" style={{ cursor: 'pointer', padding: '1.25rem' }} onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HelpCircle style={{ width: '18px', color: 'var(--primary)' }} /> {faq.q}
              </h3>
              {openIdx === idx ? <ChevronUp style={{ width: '18px' }} /> : <ChevronDown style={{ width: '18px' }} />}
            </div>
            {openIdx === idx && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.8rem', lineHeight: 1.6, paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)' }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
