import React, { useState } from 'react';
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

import { PhoneCall } from 'lucide-react';
import './App.css';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [viewMode, setViewMode] = useState('frame'); // 'frame' | 'fullscreen'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'beds' | 'labs' | 'equipment' | 'lodging' | 'support' | 'journey'
  const [selectedCity, setSelectedCity] = useState('mehsana');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  return (
    <>
      {/* 1. Animated Liquid Preloader Splash Screen */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 2. Main Mobile App in Device Frame Wrapper */}
      <DeviceFrame
        viewMode={viewMode}
        setViewMode={setViewMode}
      >
        {/* Mobile Liquid Glass Header Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onShowEmergencyModal={() => setShowEmergencyModal(true)}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          {activeTab === 'home' && (
            <Home
              onNavigate={setActiveTab}
              selectedCity={selectedCity}
              onSelectHospital={setSelectedHospital}
            />
          )}

          {activeTab === 'beds' && (
            <BedBooking
              selectedHospital={selectedHospital}
              setSelectedHospital={setSelectedHospital}
              onBookingSuccess={showToast}
            />
          )}

          {activeTab === 'labs' && (
            <Diagnostics
              onBookingSuccess={showToast}
            />
          )}

          {activeTab === 'equipment' && (
            <Equipment
              onBookingSuccess={showToast}
            />
          )}

          {activeTab === 'lodging' && (
            <Lodging
              onBookingSuccess={showToast}
            />
          )}

          {activeTab === 'support' && (
            <Support
              onBookingSuccess={showToast}
            />
          )}

          {activeTab === 'journey' && (
            <Journey />
          )}
        </main>

        {/* Bottom Mobile Navigation */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </DeviceFrame>

      {/* 3. Interactive Feedback Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* 4. Emergency Helpline Triage Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl border border-white text-slate-900 rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-4 text-center animate-scaleIn">
            
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200 animate-pulse">
              <PhoneCall className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-slate-900 font-jakarta">24/7 Emergency Triage</h3>
              <p className="text-xs text-rose-600 font-semibold">WellViva Critical Dispatch Helpline</p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Emergency Line 1:</span>
                <a href="tel:+919820462984" className="text-emerald-600 font-bold font-mono hover:underline">+91 9820462984</a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Line 2:</span>
                <a href="tel:+919537995556" className="text-emerald-600 font-bold font-mono hover:underline">+91 9537995556</a>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed font-jakarta">
              Instant ICU bed allocation, medical ambulance triage & emergency family stay support.
            </p>

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
