import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import DeviceFrame from './components/DeviceFrame';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Toast from './components/Toast';

import Home from './pages/Home';
import BedBooking from './pages/BedBooking';
import Diagnostics from './pages/Diagnostics';
import Equipment from './pages/Equipment';
import Lodging from './pages/Lodging';
import Support from './pages/Support';
import Journey from './pages/Journey';
import AuthLanding from './pages/AuthLanding';

import { PhoneCall } from 'lucide-react';
import './App.css';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [viewMode, setViewMode]     = useState('frame');
  const [activeTab, setActiveTab]   = useState('auth');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [toastMessage, setToastMessage]         = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Auth state ? null means logged out
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hm_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // If already logged in, skip auth page
  useEffect(() => {
    if (currentUser) setActiveTab('home');
  }, []);

  const showToast = (msg) => setToastMessage(msg);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try { localStorage.setItem('hm_current_user', JSON.stringify(user)); } catch {}
    setActiveTab('home');
    showToast(`Welcome, ${user.name}!`);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try { localStorage.removeItem('hm_current_user'); } catch {}
    setActiveTab('auth');
    showToast('Signed out successfully');
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <DeviceFrame viewMode={viewMode} setViewMode={setViewMode}>
        {/* Only show Header + Nav when authenticated */}
        {currentUser && (
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onShowEmergencyModal={() => setShowEmergencyModal(true)}
            currentUser={currentUser}
            onOpenAuth={() => { setCurrentUser(null); setActiveTab('auth'); }}
            onSignOut={handleSignOut}
          />
        )}

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 relative">
          {activeTab === 'auth' && (
            <AuthLanding
              onLoginSuccess={handleLoginSuccess}
              onExploreGuest={() => {
                setCurrentUser({ name: 'Guest', email: '', picture: '', provider: 'guest' });
                setActiveTab('home');
              }}
            />
          )}
          {activeTab === 'home' && (
            <Home
              onNavigate={setActiveTab}
              onSelectHospital={setSelectedHospital}
              currentUser={currentUser}
            />
          )}
          {activeTab === 'beds' && (
            <BedBooking
              selectedHospital={selectedHospital}
              setSelectedHospital={setSelectedHospital}
              onBookingSuccess={showToast}
            />
          )}
          {activeTab === 'labs' && <Diagnostics onBookingSuccess={showToast} />}
          {activeTab === 'equipment' && <Equipment onBookingSuccess={showToast} />}
          {activeTab === 'lodging' && <Lodging onBookingSuccess={showToast} />}
          {activeTab === 'support' && <Support onBookingSuccess={showToast} />}
          {activeTab === 'journey' && <Journey currentUser={currentUser} />}
        </main>

        {currentUser && (
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </DeviceFrame>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {showEmergencyModal && (
        <div className="fixed inset-0 z-[70] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs shadow-xl space-y-4 text-center animate-scaleIn border border-slate-100">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-jakarta">24/7 Emergency Triage</h3>
              <p className="text-xs text-rose-600 font-semibold">WellViva Critical Dispatch Helpline</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Helpline 1:</span>
                <a href="tel:+919820462984" className="text-emerald-600 font-bold font-mono">+91 9820462984</a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Helpline 2:</span>
                <a href="tel:+919537995556" className="text-emerald-600 font-bold font-mono">+91 9537995556</a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sterling Hospitals:</span>
                <a href="tel:+919898987878" className="text-emerald-600 font-bold font-mono">+91 9898987878</a>
              </div>
            </div>
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
