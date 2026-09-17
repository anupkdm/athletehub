import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, User, LogOut, Menu, X, ShieldCheck, UserCheck, PlusCircle, Search, LayoutDashboard
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenAuthModal }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rolePreview, setRolePreview] = useState('all');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'sports', label: 'Sports' },
    { id: 'news', label: 'Sports News' },
    { id: 'athletes', label: 'Athletes' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'success', label: 'Success Stories' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: '12px',
      zIndex: 900,
      margin: '0 1rem 1.5rem 1.rem',
      padding: '0.75rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('home')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #0284c7 0%, #f97316 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)'
        }}>
          <Trophy style={{ color: '#ffffff', width: '24px', height: '24px' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.1 }}>
            Sports<span className="gradient-text">Talent</span>
          </h1>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Talent Identification Platform
          </span>
        </div>
      </div>

      {/* Main Desktop Navigation Items */}
      <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: activeTab === item.id ? 'rgba(2, 132, 199, 0.15)' : 'transparent',
              color: activeTab === item.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
              border: 'none',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Action Controls: Role Pill, Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* User Auth state / Dashboard */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="btn btn-primary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
            >
              <LayoutDashboard style={{ width: '16px' }} />
              {user.role} Dashboard
            </button>
            <button
              onClick={logout}
              title="Log Out"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <LogOut style={{ width: '17px' }} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          >
            <User style={{ width: '16px' }} />
            Login / Register
          </button>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
          className="mobile-hamburger-btn"
        >
          {mobileMenuOpen ? <X style={{ width: '24px' }} /> : <Menu style={{ width: '24px' }} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)',
          marginTop: '0.5rem'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              style={{
                background: activeTab === item.id ? 'rgba(2, 132, 199, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === item.id ? 'var(--accent-blue)' : 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
