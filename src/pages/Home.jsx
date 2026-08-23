import React, { useState } from 'react';
import { Search, Bed, Microscope, Hotel, Truck, Wallet, Star, MapPin, ChevronRight, Navigation, Loader2, QrCode } from 'lucide-react';
import { HOSPITALS, AHMEDABAD_SPECIALTIES } from '../data/mockData';
import useGeolocation from '../hooks/useGeolocation';

export default function Home({ onNavigate, onSelectHospital, currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const geo = useGeolocation();
  const hosp = HOSPITALS[0];

  const services = [
    { id: 'beds',      title: 'Hospital Beds',   sub: 'Live ICU & Ward',     icon: Bed,        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=75', tint: 'from-emerald-900/80' },
    { id: 'lodging',   title: 'Family Lodges',   sub: 'From \u20B9300/night',     icon: Hotel,      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=75', tint: 'from-amber-900/80' },
    { id: 'labs',      title: 'Diagnostics',     sub: 'CT, MRI, Blood',      icon: Microscope, image: './assets/products/mri_scanner.jpg', tint: 'from-sky-900/80' },
    { id: 'equipment', title: 'Rentals',          sub: 'Nebulizer, BiPAP, O2', icon: Truck,     image: './assets/products/nebulizer.jpg', tint: 'from-indigo-900/80' },
    { id: 'support',   title: '0% EMI',           sub: 'Medical Loans',      icon: Wallet,     image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=75', tint: 'from-teal-900/80' },
    { id: 'journey',   title: 'Referral Pass',    sub: 'QR Gate Check-In',   icon: QrCode,     image: './assets/products/echo_ultrasound.jpg', tint: 'from-rose-900/80' }
  ];

  const totalVacant = hosp.bedCategories.reduce((s, b) => s + b.vacant, 0);
  const icuVacant   = hosp.bedCategories.find(b => b.id === 'icu')?.vacant ?? 0;

  const matchedSpecs = searchQuery
    ? AHMEDABAD_SPECIALTIES.filter(s => s !== 'All Specialties' && s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="p-4 space-y-4 pb-6 font-sans bg-slate-50">
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-semibold mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Bed Availability Active</span>
            </div>
            <h1 className="text-base font-extrabold text-slate-900 font-jakarta tracking-tight">
              {currentUser?.provider === 'guest' ? 'Welcome to HealthMarg' : `Hi, ${currentUser?.name?.split(' ')[0] || 'there'}`} ??
            </h1>
            <p className="text-[10.5px] text-slate-500 mt-0.5">
              Real-time beds, family stays & diagnostics across Gujarat & Maharashtra.
            </p>
          </div>
          <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200 shrink-0">
            {totalVacant} Beds
          </span>
        </div>

        <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          {geo.loading ? (
            <><Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" /><span className="text-slate-400">Detecting location...</span></>
          ) : geo.error ? (
            <><Navigation className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-400">Location unavailable</span></>
          ) : (
            <>
              <Navigation className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-700 truncate flex-1">{geo.city}</span>
              <span className="font-bold text-emerald-700 shrink-0">{geo.distanceKm} km to Sterling</span>
            </>
          )}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Search Cardiology, ICU, Neurology..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {searchQuery && matchedSpecs.length > 0 && (
          <div className="space-y-1">
            {matchedSpecs.slice(0, 3).map((s, i) => (
              <button
                key={i} onClick={() => { onSelectHospital(hosp); onNavigate('beds'); }}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 text-xs"
              >
                <span className="font-semibold text-slate-800">{s}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">Sterling <ChevronRight className="w-3 h-3" /></span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Services</h2>
        <div className="grid grid-cols-3 gap-2">
          {services.map(srv => {
            const Icon = srv.icon;
            return (
              <button
                key={srv.id} onClick={() => onNavigate(srv.id)}
                className="relative h-24 rounded-2xl overflow-hidden active:scale-95 transition-transform shadow-xs"
              >
                <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${srv.tint} to-transparent`} />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-2">
                  <Icon className="w-4 h-4 text-white/90 mb-1" />
                  <div className="text-[11px] font-bold text-white leading-tight">{srv.title}</div>
                  <div className="text-[9px] text-white/70 leading-tight">{srv.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h2 className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Our Tertiary Partner</h2>
          <button
            onClick={() => { onSelectHospital(hosp); onNavigate('beds'); }}
            className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5 hover:underline"
          >
            Book Bed <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div
          onClick={() => { onSelectHospital(hosp); onNavigate('beds'); }}
          className="hm-card overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="relative h-40">
            <img src={hosp.image} alt={hosp.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
            <div className="absolute top-2.5 right-2.5">
              <span className="bg-white/95 text-slate-800 text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">NABH & NABL</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-bold text-[15px] text-white font-jakarta">{hosp.name}</h3>
                  <p className="text-[10px] text-white/80 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {hosp.location}
                    {geo.distanceKm && <span className="text-emerald-400 font-bold"> | {geo.distanceKm} km</span>}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />{hosp.rating}
                </div>
              </div>
              <div className="flex gap-1.5 mt-2">
                <span className="bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{totalVacant} Beds Live</span>
                <span className="bg-rose-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{icuVacant} ICU</span>
                <span className="bg-slate-800/80 text-white/90 text-[9px] font-semibold px-2 py-0.5 rounded-full">53 Specialties</span>
              </div>
            </div>
          </div>

          <div className="p-3 flex gap-1.5 overflow-x-auto no-scrollbar">
            {Object.values(hosp.facilities).map((f, i) => (
              <span key={i} className="text-[9.5px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg whitespace-nowrap shrink-0">
                ? {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
