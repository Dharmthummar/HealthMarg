import React, { useState } from 'react';
import { MapPin, PhoneCall, ChevronDown, ArrowLeft } from 'lucide-react';
import { ORIGIN_CITIES, DESTINATION_HUBS } from '../data/mockData';

const logoBase = import.meta.env.BASE_URL || './';

export default function Header({ activeTab, setActiveTab, selectedCity, setSelectedCity, onShowEmergencyModal }) {
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const currentCityObj = ORIGIN_CITIES.find(c => c.id === selectedCity) || ORIGIN_CITIES[0];
  const currentHubObj = DESTINATION_HUBS.find(h => h.id === currentCityObj.hub) || DESTINATION_HUBS[0];

  return (
    <header className="liquid-glass-header text-slate-900 px-4 py-2.5 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center justify-between gap-2">
        
        {/* Left: Brand Identity with Graphic LOGO.png Image */}
        {activeTab !== 'home' ? (
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950 bg-white/80 border border-white/80 px-3 py-1.5 rounded-full text-xs font-semibold shadow-xs transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Home</span>
          </button>
        ) : (
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setActiveTab('home')}
          >
            {/* Exact graphic logo image icon */}
            <img 
              src={`${logoBase}LOGO.png`}
              alt="HealthMarg Logo" 
              className="w-8 h-8 object-contain drop-shadow-xs transition-transform group-hover:scale-105 shrink-0" 
            />
            <div className="flex flex-col leading-none">
              <div className="flex items-center">
                <span className="font-extrabold text-base text-[#072D4B] font-jakarta tracking-tight">Health</span>
                <span className="font-extrabold text-base text-emerald-600 font-jakarta tracking-tight">Marg</span>
              </div>
              <span className="text-[9px] text-slate-500 font-medium tracking-wide">Heartland Care Loop</span>
            </div>
          </div>
        )}

        {/* Center: Heartland Location Picker Badge */}
        <button
          onClick={() => setShowLocationPicker(true)}
          className="flex items-center gap-1.5 bg-white/80 hover:bg-white border border-white/90 px-3 py-1.5 rounded-full text-xs shadow-xs transition max-w-[155px] active:scale-95"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <div className="truncate text-left leading-tight">
            <span className="block font-bold text-slate-900 truncate text-[11px] font-jakarta">{currentCityObj.name.split(',')[0]}</span>
            <span className="block text-[9px] text-emerald-700 truncate font-mono">➔ {currentHubObj.name.split(' ')[0]}</span>
          </div>
          <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-0.5" />
        </button>

        {/* Right: Emergency Hotline Pill */}
        <button
          onClick={onShowEmergencyModal}
          className="flex items-center gap-1 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-2.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition active:scale-95 shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5 text-rose-100" />
          <span className="text-[11px] hidden sm:inline">24/7 Helpline</span>
          <span className="text-[11px] sm:hidden">Help</span>
        </button>
      </div>

      {/* Heartland Region Selector Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 z-[55] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl border border-white text-slate-900 rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-4 animate-scaleIn">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-jakarta">Heartland Region</h4>
                  <p className="text-[10px] text-slate-500">Select origin town for live route</p>
                </div>
              </div>
              <button
                onClick={() => setShowLocationPicker(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 hover:text-slate-900 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar pr-1">
              {ORIGIN_CITIES.map((city) => {
                const isSelected = city.id === selectedCity;
                const hub = DESTINATION_HUBS.find(h => h.id === city.hub);
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city.id);
                      setShowLocationPicker(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border text-xs transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 font-jakarta">{city.name}</div>
                      <div className="text-[10px] text-emerald-600 mt-0.5">Connected Hub: {hub?.name} ({city.distance})</div>
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowLocationPicker(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded-xl text-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
