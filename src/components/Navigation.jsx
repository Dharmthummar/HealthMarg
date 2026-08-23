import React from 'react';
import { Home, Bed, Microscope, Hotel, Truck, QrCode } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'beds', label: 'Beds', icon: Bed, badge: '26' },
    { id: 'labs', label: 'Labs', icon: Microscope },
    { id: 'lodging', label: 'Lodges', icon: Hotel },
    { id: 'equipment', label: 'Rentals', icon: Truck },
    { id: 'journey', label: 'Pass', icon: QrCode }
  ];

  return (
    <nav className="hm-glass-nav text-slate-500 flex items-center justify-around py-1.5 px-2 sticky bottom-0 z-40 shrink-0 safe-area-bottom select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`nav-tab-${item.id}`}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 min-w-[48px] min-h-[44px] cursor-pointer relative transition-all duration-150 active:scale-95 ${
              isActive
                ? 'text-emerald-700 font-semibold'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className="relative pointer-events-none">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 stroke-[2.25px]' : 'stroke-[1.75px]'}`} />
              {item.badge && !isActive && (
                <span className="absolute -top-1 -right-2.5 text-[8px] font-bold px-1 py-0.2 bg-emerald-600 text-white rounded-full leading-tight shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>

            <span className={`text-[10px] tracking-tight mt-0.5 font-jakarta pointer-events-none ${
              isActive ? 'font-bold text-emerald-800' : 'font-medium'
            }`}>
              {item.label}
            </span>

            {/* Active Indicator Dot */}
            {isActive && (
              <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5 pointer-events-none" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
