import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { AboutPage } from './pages/About';
import { SportsPage } from './pages/Sports';
import { SportsNewsPage } from './pages/SportsNews';
import { Athletes } from './pages/Athletes';
import { AthleteProfilePage } from './pages/AthleteProfile';
import { Opportunities } from './pages/Opportunities';
import { SuccessStoriesPage } from './pages/SuccessStories';
import { FAQPage } from './pages/FAQ';
import { ContactPage } from './pages/Contact';
import { AuthModal } from './pages/AuthModal';

import { AthleteDashboard } from './pages/Dashboards/AthleteDashboard';
import { CoachDashboard } from './pages/Dashboards/CoachDashboard';
import { ScoutDashboard } from './pages/Dashboards/ScoutDashboard';
import { AdminDashboard } from './pages/Dashboards/AdminDashboard';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedAthleteId, setSelectedAthleteId] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  const handleSelectAthlete = (id) => {
    setSelectedAthleteId(id);
    setActiveTab('athlete-detail');
  };

  const renderRoleDashboard = () => {
    if (!user) return <div style={{ padding: '3rem', textAlign: 'center' }}>Please log in to access your dashboard.</div>;

    switch (user.role) {
      case 'Coach':
        return <CoachDashboard />;
      case 'Scout':
        return <ScoutDashboard onSelectAthlete={handleSelectAthlete} />;
      case 'Admin':
        return <AdminDashboard />;
      case 'Athlete':
      default:
        return <AthleteDashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      <main className="container" style={{ flex: 1, paddingTop: '1rem', paddingBottom: '3rem' }}>
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            onSelectAthlete={handleSelectAthlete}
            onApplyOpportunity={() => setActiveTab('opportunities')}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'sports' && <SportsPage setActiveTab={setActiveTab} />}
        {activeTab === 'news' && <SportsNewsPage />}
        {activeTab === 'athletes' && <Athletes onSelectAthlete={handleSelectAthlete} />}
        {activeTab === 'athlete-detail' && (
          <AthleteProfilePage
            athleteId={selectedAthleteId}
            onBack={() => setActiveTab('athletes')}
            currentUser={user}
          />
        )}
        {activeTab === 'opportunities' && (
          <Opportunities currentUser={user} onOpenAuth={() => setAuthModalOpen(true)} />
        )}
        {activeTab === 'success' && <SuccessStoriesPage />}
        {activeTab === 'faq' && <FAQPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'dashboard' && renderRoleDashboard()}
      </main>

      <Footer setActiveTab={setActiveTab} />

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
