import React, { useState } from 'react';
import { 
  Search, Bed, Microscope, Truck, Hotel, Wallet, ShieldCheck, 
  ChevronRight, HeartPulse, Sparkles, Star, AlertCircle, 
  ArrowRight, Stethoscope
} from 'lucide-react';
import { HOSPITALS } from '../data/mockData';

export default function Home({ onNavigate, selectedCity, onSelectHospital }) {
  const [searchQuery, setSearchQuery] = useState('');

  // 6 Core Ecosystem Categories
  const careCategories = [
    {
      id: 'beds',
      title: 'Real-Time Beds',
      subtitle: 'ICU & Ward Availability',
      icon: Bed,
      color: 'from-sky-500 to-blue-600',
      badge: '14 Vacant',
      action: () => onNavigate('beds')
    },
    {
      id: 'equipment',
      title: 'Equipment Rental',
      subtitle: 'BiPAP, O2, ICU Beds',
      icon: Truck,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Rent ₹80/d',
      action: () => onNavigate('equipment')
    },
    {
      id: 'lodging',
      title: 'Family Lodges',
      subtitle: 'Homestays Near Hospital',
      icon: Hotel,
      color: 'from-amber-500 to-orange-600',
      badge: 'From ₹350',
      action: () => onNavigate('lodging')
    },
    {
      id: 'labs',
      title: 'Pathology Labs',
      subtitle: 'PET-CT, MRI, Blood',
      icon: Microscope,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Home Pickup',
      action: () => onNavigate('labs')
    },
    {
      id: 'support',
      title: 'Medical Loans',
      subtitle: '0% EMI & NGO Grants',
      icon: Wallet,
      color: 'from-teal-500 to-emerald-600',
      badge: 'Instant Aid',
      action: () => onNavigate('support')
    },
    {
      id: 'journey',
      title: 'Referral Pass',
      subtitle: 'Live Journey Tracker',
      icon: HeartPulse,
      color: 'from-rose-500 to-pink-600',
      badge: 'Active Pass',
      action: () => onNavigate('journey')
    }
  ];

  return (
    <div className="p-4 space-y-5 pb-4 font-sans bg-slate-50 relative overflow-hidden">
      
      {/* Liquid Refraction Background Spheres */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none animate-refract" />
      <div className="absolute top-1/2 -left-10 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none animate-refract" />

      {/* 1. Hero Card - Liquid Glass Gradient Banner */}
      <div className="relative rounded-3xl liquid-glass p-4 text-slate-900 shadow-md border border-white/90 overflow-hidden">
        <div className="flex items-center gap-1.5 bg-emerald-100/90 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200 mb-3 w-fit">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>India's 1st Heartland Referral Network</span>
        </div>

        <h1 className="text-lg font-bold font-jakarta leading-snug tracking-tight text-[#072D4B]">
          Connecting <span className="text-emerald-600">Heartland India</span> to Urban Healthcare
        </h1>
        
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
          Real-time ICU beds, patient family lodgings & 4-hr equipment rentals in Tier-I hubs.
        </p>

        {/* Liquid Search Bar */}
        <div className="mt-3.5">
          <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-slate-200/90">
            <Search className="w-4 h-4 text-emerald-600 ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Search ICU Bed, BiPAP, Lab Test..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
            />
            <button
              onClick={() => onNavigate('beds')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shadow-sm shrink-0 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 2. Emergency Critical Triage Banner */}
      <div
        onClick={() => onNavigate('beds')}
        className="liquid-glass-card p-3 rounded-2xl flex items-center justify-between shadow-xs cursor-pointer hover:border-rose-400/60 transition active:scale-[0.99]"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 animate-pulse shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-slate-900 font-jakarta">Emergency Triage</span>
              <span className="bg-rose-500 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                URGENT
              </span>
            </div>
            <p className="text-[10px] text-slate-600 mt-0.5 font-medium truncate">
              14 Vacant ICU & Ventilator beds in Ahmedabad Hub
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-rose-500 shrink-0 ml-1" />
      </div>

      {/* 3. Liquid Glass Ecosystem Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-sm text-slate-900 font-jakarta flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Care Ecosystem</span>
          </h2>
          <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            360° Loop
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {careCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={cat.action}
                className="liquid-glass-card rounded-2xl p-3 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-95"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-extrabold bg-slate-100/90 text-slate-700 px-1.5 py-0.5 rounded-full border border-slate-200 leading-none">
                    {cat.badge}
                  </span>
                </div>

                <div className="mt-2.5">
                  <h3 className="font-bold text-[11px] text-slate-900 font-jakarta leading-tight">{cat.title}</h3>
                  <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">{cat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Complete Care Bundle Card */}
      <div className="liquid-glass-dark text-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-400 text-slate-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
              COMPLETE LOOP
            </span>
            <span className="text-[11px] text-sky-200 font-medium">Heartland Saver Bundle</span>
          </div>
          <span className="text-xs font-mono text-emerald-300 font-bold">Save ₹2,500</span>
        </div>

        <h3 className="font-bold text-sm text-white mt-2 font-jakarta">Integrated Patient Referral Package</h3>
        <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
          Includes: ICU Bed Hold + Family Lodge Booking + BiPAP Rental + Express Diagnostic Report.
        </p>

        <button
          onClick={() => onNavigate('beds')}
          className="mt-3 w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
        >
          <span>Book Complete Bundle</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5. Featured Tier-1 Super-Specialty Hospitals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-sm text-slate-900 font-jakarta flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>Tier-1 Tertiary Hospitals</span>
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">Real-Time Bed Statuses</p>
          </div>

          <button
            onClick={() => onNavigate('beds')}
            className="text-xs text-emerald-600 font-bold hover:underline flex items-center"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {HOSPITALS.map((hosp) => (
            <div
              key={hosp.id}
              onClick={() => { onSelectHospital(hosp); onNavigate('beds'); }}
              className="liquid-glass-card rounded-2xl p-3 shadow-xs hover:shadow-md transition cursor-pointer flex gap-3 items-center active:scale-[0.99]"
            >
              <img
                src={hosp.image}
                alt={hosp.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200/80 shadow-xs bg-slate-100"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)';
                  e.target.style.display = 'flex';
                }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-[11px] text-slate-900 truncate font-jakarta">{hosp.name}</h3>
                  <div className="flex items-center text-amber-600 text-[9px] font-bold shrink-0 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                    <span>{hosp.rating}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 truncate mt-0.5">{hosp.location}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                    {hosp.vacantBeds} Beds
                  </span>
                  <span className="bg-rose-50 text-rose-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-rose-200">
                    {hosp.icuVacant} ICU
                  </span>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>₹{hosp.bedPrices.general}<span className="text-slate-400">/day</span></span>
                  <span className="text-emerald-700 font-semibold">{hosp.nearbyLodgesCount} Lodges</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
