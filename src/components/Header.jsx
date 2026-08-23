import React, { useState } from 'react';
import { PhoneCall, ChevronDown, ArrowLeft, User, LogOut } from 'lucide-react';

const logoBase = import.meta.env.BASE_URL || './';

export default function Header({ activeTab, setActiveTab, onShowEmergencyModal, currentUser, onSignOut }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const isGuest = currentUser?.provider === 'guest';
  const initials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'G';

  return (
    <header className="hm-glass-header text-slate-900 px-4 py-2.5 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-2">

        {/* Left: Brand or Back Button */}
        {activeTab !== 'home' ? (
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-full text-xs font-semibold transition active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={() => setActiveTab('home')}
          >
            <img
              src={`${logoBase}LOGO.png`} alt="HealthMarg"
              className="w-7 h-7 object-contain"
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
            <div className="leading-none">
              <div className="flex items-baseline">
                <span className="font-extrabold text-[13px] text-slate-900 font-jakarta tracking-tight">Health</span>
                <span className="font-extrabold text-[13px] text-emerald-600 font-jakarta tracking-tight">Marg</span>
              </div>
              <span className="text-[8px] text-slate-400">Heartland Care</span>
            </div>
          </div>
        )}

        {/* Right: Profile + Emergency */}
        <div className="flex items-center gap-2 shrink-0">
          {/* User Avatar / Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 bg-white border border-slate-200 pl-1 pr-2.5 py-1 rounded-full shadow-xs hover:border-slate-300 transition active:scale-95"
            >
              {currentUser?.picture && !isGuest ? (
                <img
                  src={currentUser.picture} alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover border border-slate-200"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[9px] font-bold text-emerald-700">
                  {initials}
                </div>
              )}
              <span className="text-[10.5px] font-semibold text-slate-800 max-w-[72px] truncate font-jakarta">
                {isGuest ? 'Guest' : currentUser?.name?.split(' ')[0] || ''}
              </span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-lg p-2 space-y-1 z-50 animate-scaleIn">
                <div className="p-2 border-b border-slate-100 pb-2.5">
                  {currentUser?.picture && !isGuest && (
                    <img
                      src={currentUser.picture} alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 mb-1.5"
                    />
                  )}
                  <p className="font-bold text-xs text-slate-900 font-jakarta">{currentUser?.name}</p>
                  <p className="text-[9px] text-slate-400 truncate">{currentUser?.email || 'Guest session'}</p>
                  {!isGuest && (
                    <span className="inline-block mt-1 text-[8px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.5 rounded border border-emerald-100">
                      Google Account
                    </span>
                  )}
                </div>

                <button
                  onClick={() => { setShowDropdown(false); onSignOut(); }}
                  className="w-full text-left p-2 text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 text-xs font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isGuest ? 'Sign In with Google' : 'Sign Out'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Emergency Triage Button */}
          <button
            onClick={onShowEmergencyModal}
            className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 flex items-center justify-center transition active:scale-95 shrink-0"
            title="Emergency Triage Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
