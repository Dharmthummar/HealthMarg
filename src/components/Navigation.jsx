import React from 'react';
import { Home, Bed, Microscope, Truck, Hotel, Wallet, QrCode } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'beds', label: 'Beds', icon: Bed, badge: 'LIVE' },
    { id: 'labs', label: 'Labs', icon: Microscope },
    { id: 'equipment', label: 'Rentals', icon: Truck },
    { id: 'lodging', label: 'Lodges', icon: Hotel },
    { id: 'support', label: 'Loans', icon: Wallet },
    { id: 'journey', label: 'Pass', icon: QrCode, badge: 'Active' }
  ];

  return (
    <nav className="liquid-glass-nav text-slate-500 flex items-center py-1.5 px-0.5 sticky bottom-0 z-30 shrink-0 safe-area-bottom overflow-x-auto no-scrollbar">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center min-w-[52px] flex-1 py-1 px-0.5 relative transition-all duration-200 active:scale-90 ${
              isActive
                ? 'text-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {/* Top Active Line */}
            {isActive && (
              <span className="absolute -top-1.5 w-6 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            )}

            <div className="relative">
              <Icon className={`w-[18px] h-[18px] transition-transform ${isActive ? 'scale-110 stroke-[2.5px]' : 'stroke-2'}`} />
              {item.badge && (
                <span className={`absolute -top-1.5 -right-2.5 text-[6.5px] font-extrabold px-1 py-[1px] rounded-full leading-none ${
                  item.badge === 'LIVE' ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>

            <span className={`text-[9px] tracking-tight mt-0.5 transition-colors font-jakarta leading-none ${
              isActive ? 'text-emerald-700 font-bold' : 'font-medium'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
