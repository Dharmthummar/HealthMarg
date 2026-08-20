import React, { useState } from 'react';
import { PITCH_DATA } from '../data/mockData';
import LogoSvg from './LogoSvg';
import { X, CheckCircle2, DollarSign, TrendingUp, ShieldAlert, Award, Phone, Mail, Sparkles } from 'lucide-react';

export default function JudgeDrawer({ isOpen, onClose, onNavigate }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="w-full max-w-xl bg-slate-900 text-slate-100 h-full shadow-2xl border-l border-slate-800 flex flex-col overflow-hidden animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-[#072D4B] to-[#0A4423] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/10 rounded-xl">
              <LogoSvg width={40} height={40} showText={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white font-jakarta">HealthMarg Pitch Deck</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  JUDGE MODE
                </span>
              </div>
              <p className="text-xs text-sky-200/80">WellViva HealthTech India Pvt. Ltd.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 overflow-x-auto border-b border-slate-800 text-xs font-medium scrollbar-none">
          {[
            { id: 'overview', label: 'Problem & Solution' },
            { id: 'usp', label: 'USP & Edge' },
            { id: 'revenue', label: 'Revenue Model' },
            { id: 'market', label: 'Market TAM/SAM' },
            { id: 'gtm', label: 'GTM & Milestones' },
            { id: 'contact', label: 'Contact & Team' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm text-slate-300">
          
          {/* TAB 1: OVERVIEW & PROBLEM */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem Section */}
              <div className="bg-rose-950/30 border border-rose-900/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                  <ShieldAlert className="w-5 h-5" />
                  <h4>The Core Problem in India’s Heartland</h4>
                </div>
                <ul className="space-y-2">
                  {PITCH_DATA.problem.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Section */}
              <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <h4>The HealthMarg Solution</h4>
                </div>
                <ul className="space-y-2">
                  {PITCH_DATA.solution.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prototype Flow Shortcuts for Judges */}
              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-3">
                <h5 className="font-semibold text-sky-400 text-xs uppercase tracking-wider">Test Prototype Flow Live</h5>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { onNavigate('beds'); onClose(); }}
                    className="p-2.5 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 text-left text-xs font-medium text-white flex items-center justify-between"
                  >
                    <span>🏥 Bed Booking</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => { onNavigate('equipment'); onClose(); }}
                    className="p-2.5 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 text-left text-xs font-medium text-white flex items-center justify-between"
                  >
                    <span>🦽 Equipment Rental</span>
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                  <button
                    onClick={() => { onNavigate('lodging'); onClose(); }}
                    className="p-2.5 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 text-left text-xs font-medium text-white flex items-center justify-between"
                  >
                    <span>🏨 Family Lodging</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => { onNavigate('journey'); onClose(); }}
                    className="p-2.5 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-700 text-left text-xs font-medium text-white flex items-center justify-between"
                  >
                    <span>📍 Active Pass</span>
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USP */}
          {activeTab === 'usp' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Award className="w-5 h-5" />
                <h4>Unique Selling Proposition & Moat</h4>
              </div>
              <div className="grid gap-3">
                {PITCH_DATA.usp.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs text-slate-200 font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-sky-950/40 rounded-2xl border border-sky-800/50 space-y-2">
                <h5 className="font-bold text-sky-300 text-xs">Why No Pharmacy?</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  By intentionally excluding direct pharmacy sales, HealthMarg completely sidesteps complex drug retail licenses, inventory risk, and regulatory bottlenecks — focusing 100% on high-margin hospital referral fees, medical equipment rentals, and lodging commissions.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: REVENUE MODEL */}
          {activeTab === 'revenue' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <DollarSign className="w-5 h-5" />
                <h4>Monetization & Unit Economics</h4>
              </div>

              <div className="grid gap-3">
                {PITCH_DATA.revenueStreams.map((rev, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-white text-sm">{rev.title}</h5>
                      <span className="text-xs text-emerald-400 font-mono font-medium">{rev.rate}</span>
                    </div>
                    <span className="text-xs bg-slate-700/60 text-slate-300 px-3 py-1 rounded-full border border-slate-600">
                      Active Stream
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MARKET TAM / SAM */}
          {activeTab === 'market' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
                <TrendingUp className="w-5 h-5" />
                <h4>Market Opportunity</h4>
              </div>

              <div className="grid gap-3">
                <div className="p-4 bg-gradient-to-r from-sky-950/60 to-slate-900 rounded-2xl border border-sky-800/60">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">TAM</span>
                  <div className="text-3xl font-extrabold text-white my-1 font-jakarta">{PITCH_DATA.marketSize.tam}</div>
                  <p className="text-xs text-slate-300">{PITCH_DATA.marketSize.tamDesc}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">SAM</span>
                  <div className="text-3xl font-extrabold text-white my-1 font-jakarta">{PITCH_DATA.marketSize.sam}</div>
                  <p className="text-xs text-slate-300">{PITCH_DATA.marketSize.samDesc}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-teal-950/60 to-slate-900 rounded-2xl border border-teal-800/60">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">SOM (Target 2030)</span>
                  <div className="text-3xl font-extrabold text-white my-1 font-jakarta">{PITCH_DATA.marketSize.som}</div>
                  <p className="text-xs text-slate-300">{PITCH_DATA.marketSize.somDesc}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GTM */}
          {activeTab === 'gtm' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base">Go To Market Rollout Plan</h4>
              <div className="space-y-3">
                {PITCH_DATA.gtmStrategy.map((gtm, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-start gap-3">
                    <span className="px-2 py-0.5 bg-sky-500/20 text-sky-400 rounded font-bold text-xs shrink-0 mt-0.5">
                      P{idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{gtm}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 space-y-3 text-center">
                <LogoSvg width={80} height={80} showText={false} />
                <h4 className="font-bold text-lg text-white font-jakarta">{PITCH_DATA.company}</h4>
                <p className="text-xs text-sky-300 font-medium">{PITCH_DATA.parentCompany}</p>
                <div className="text-[11px] font-mono text-slate-400">CIN: {PITCH_DATA.cin}</div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-800/60 rounded-xl flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contact Founders</span>
                    <span className="text-slate-200 font-medium">{PITCH_DATA.contact.phone}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Official Email</span>
                    <span className="text-slate-200 font-medium">{PITCH_DATA.contact.email} / {PITCH_DATA.contact.gmail}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400">
          Ready for Pitch Competition Demo • HealthMarg © 2026
        </div>
      </div>
    </div>
  );
}
