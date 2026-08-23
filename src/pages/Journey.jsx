import React, { useState } from 'react';
import { INITIAL_CARE_JOURNEY } from '../data/mockData';
import { QrCode, CheckCircle2, Clock, MapPin, Sparkles, RefreshCw, ChevronRight, ShieldCheck } from 'lucide-react';
import QrModal from '../components/QrModal';

export default function Journey() {
  const [journeyState, setJourneyState] = useState(INITIAL_CARE_JOURNEY);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleAdvanceStep = () => {
    const activeIdx = journeyState.steps.findIndex(s => s.status === 'active');
    if (activeIdx !== -1 && activeIdx < journeyState.steps.length - 1) {
      const nextSteps = [...journeyState.steps];
      nextSteps[activeIdx].status = 'completed';
      nextSteps[activeIdx + 1].status = 'active';
      setJourneyState({
        ...journeyState,
        steps: nextSteps
      });
    }
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans bg-slate-50">
      
      {/* 1. Active Pass Card */}
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Digital Referral Pass</span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-900">{journeyState.journeyId}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-jakarta">{journeyState.patientName}</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Corridor: <span className="font-semibold text-slate-800">{journeyState.origin} ? Ahmedabad</span>
            </p>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            className="p-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition active:scale-95 shadow-xs flex flex-col items-center gap-0.5"
            title="Scan QR Pass"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[8.5px] font-bold">QR Pass</span>
          </button>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs border border-slate-100">
          <span className="text-slate-500">Passcode: <strong className="text-slate-800 font-mono">{journeyState.qrPassCode}</strong></span>
          <span className="text-emerald-700 font-bold text-[10px]">Triage Gate Check-In</span>
        </div>
      </div>

      {/* 2. Step by Step Milestone Tracker */}
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider font-jakarta">Live Journey Milestones</h3>
          <button
            onClick={handleAdvanceStep}
            className="text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-0.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Simulate Advance</span>
          </button>
        </div>

        <div className="space-y-3 relative pl-2 pt-1">
          {journeyState.steps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isActive = step.status === 'active';
            return (
              <div key={step.id} className="flex gap-3 items-start relative">
                {/* Connector Line */}
                {idx < journeyState.steps.length - 1 && (
                  <div className={`absolute left-3 top-6 bottom-0 w-[1.5px] -ml-[0.75px] ${
                    isDone ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                )}

                {/* Circle Icon */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 z-10 ${
                  isDone 
                    ? 'bg-emerald-500 text-white' 
                    : isActive 
                    ? 'bg-slate-900 text-white ring-4 ring-slate-100' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}>
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold font-jakarta ${
                      isActive ? 'text-slate-900' : isDone ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">{step.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Modal Simulator */}
      {showQrModal && (
        <QrModal
          qrCode={journeyState.qrPassCode}
          patientName={journeyState.patientName}
          onClose={() => setShowQrModal(false)}
        />
      )}

    </div>
  );
}
