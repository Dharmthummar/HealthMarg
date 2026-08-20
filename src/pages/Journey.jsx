import React, { useState } from 'react';
import { INITIAL_CARE_JOURNEY } from '../data/mockData';
import { QrCode, CheckCircle2, Clock, MapPin, Sparkles, AlertCircle, RefreshCw, ChevronRight, ShieldCheck } from 'lucide-react';
import QrModal from '../components/QrModal';

export default function Journey() {
  const [journeyState, setJourneyState] = useState(INITIAL_CARE_JOURNEY);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleAdvanceStep = () => {
    setJourneyState(prev => {
      const nextSteps = prev.steps.map(step => {
        if (step.id === 4 && step.status === 'pending') {
          return { ...step, status: 'completed', time: 'Just Now' };
        }
        if (step.id === 5 && step.status === 'pending') {
          return { ...step, status: 'active', time: 'Just Now' };
        }
        return step;
      });
      return { ...prev, steps: nextSteps, status: "Admitted & In Care" };
    });
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#062A4E] to-[#0D9488] text-white rounded-3xl p-4 shadow-xl border border-teal-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-teal-300" />
            <h1 className="font-bold text-base font-jakarta">Active Referral Pass & Journey</h1>
          </div>
          <span className="bg-teal-500/20 text-teal-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-teal-500/30 animate-pulse">
            Pass ID: {journeyState.journeyId}
          </span>
        </div>
        <p className="text-xs text-sky-200/80 mt-1">
          Live tracking from Heartland Referral Clinic to Apollo Tier-1 ICU Admission.
        </p>
      </div>

      {/* QR Code Quick Pass Banner */}
      <div
        onClick={() => setShowQrModal(true)}
        className="bg-white rounded-3xl p-4 border border-slate-200 shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 text-white rounded-2xl group-hover:scale-105 transition shadow">
            <QrCode className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900 font-jakarta">Hospital Priority Admission QR Pass</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded">
                READY
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Tap to show QR code at Triage Gate & Admission desk.</p>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
      </div>

      {/* Patient & Care Corridor Overview */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 space-y-3 shadow-lg border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 text-xs">
          <span className="text-slate-400">Patient:</span>
          <span className="font-bold text-white font-jakarta text-sm">{journeyState.patientName} ({journeyState.age} Yrs)</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">Origin Heartland:</span>
            <span className="font-medium text-emerald-400">{journeyState.origin}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block">Tier-1 Hub Corridor:</span>
            <span className="font-medium text-sky-300">{journeyState.destinationHub}</span>
          </div>
        </div>
      </div>

      {/* 5-Step Referral Journey Timeline */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 font-jakarta flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>End-to-End Care Loop Status</span>
          </h3>

          {/* Simulate Next Step for Judges */}
          <button
            onClick={handleAdvanceStep}
            className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold px-2.5 py-1 rounded-full border border-emerald-300 transition"
          >
            <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" />
            <span>Advance Progress</span>
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {journeyState.steps.map((step) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            return (
              <div key={step.id} className="relative flex items-start justify-between group">
                
                {/* Node icon */}
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-md'
                    : isActive
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-100 animate-pulse'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {isCompleted ? '✓' : step.id}
                </div>

                <div>
                  <h4 className={`font-bold text-xs font-jakarta ${
                    isActive ? 'text-emerald-700' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">{step.location}</p>
                </div>

                <span className={`text-[10px] font-mono shrink-0 ml-2 ${
                  isCompleted ? 'text-emerald-600 font-bold' : isActive ? 'text-amber-600 font-bold' : 'text-slate-400'
                }`}>
                  {step.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Modal Component */}
      <QrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        journeyData={journeyState}
      />

    </div>
  );
}
