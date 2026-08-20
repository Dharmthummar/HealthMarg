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
    <nav className="liquid-glass-nav text-slate-500 flex items-center justify-around py-2 px-1 sticky bottom-0 z-30 shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-0.5 relative transition-all duration-200 active:scale-90 ${
              isActive
                ? 'text-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {/* Top Active Line */}
            {isActive && (
              <span className="absolute -top-2 w-7 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            )}

            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5px]' : 'stroke-2'}`} />
              {item.badge && (
                <span className={`absolute -top-1 -right-2 text-[7.5px] font-extrabold px-1 py-0.2 rounded-full leading-none shadow-xs ${
                  item.badge === 'LIVE' ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>

            <span className={`text-[10px] tracking-tight mt-1 transition-colors font-jakarta ${
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
