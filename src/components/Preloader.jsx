import React, { useState, useEffect } from 'react';
import LogoSvg from './LogoSvg';
import { Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing HealthMarg Ecosystem...");

  useEffect(() => {
    const textSequence = [
      { at: 15, text: "Connecting Heartland Clinics to Tier-1 Tertiary Hubs..." },
      { at: 45, text: "Fetching Real-time ICU & Ward Bed Availability..." },
      { at: 75, text: "Loading Family Lodging & Medical Equipment Fleet..." },
      { at: 95, text: "Ecosystem Ready!" }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }

        const next = prev + 4;
        const matchText = textSequence.find(item => item.at <= next);
        if (matchText) {
          setStatusText(matchText.text);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 flex flex-col items-center justify-between p-6 text-slate-900 font-sans overflow-hidden select-none animate-fadeIn">
      {/* Liquid Refraction Ambient Blobs */}
      <div className="absolute top-10 -left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-refract" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none animate-refract" />

      {/* Top Header Tag */}
      <div className="w-full flex items-center justify-between text-xs text-slate-700 font-medium tracking-wide">
        <div className="flex items-center gap-1.5 liquid-glass px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-900 font-jakarta">WellViva HealthTech India</span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-[11px] font-bold border border-emerald-200">
          <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
          <span>Heartland Care</span>
        </div>
      </div>

      {/* Center Logo & Animation */}
      <div className="flex flex-col items-center justify-center my-auto text-center z-10 scale-105 transition-transform duration-500">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-2xl animate-pulse" />
          <LogoSvg width={210} height={210} animated={true} showText={false} />
        </div>

        {/* Brand Name */}
        <div className="flex items-center justify-center tracking-tight mb-2">
          <span className="font-extrabold text-4xl text-[#072D4B] font-jakarta">Health</span>
          <span className="font-extrabold text-4xl text-emerald-600 font-jakarta">Marg</span>
        </div>
        <p className="text-slate-600 text-sm font-medium tracking-wide max-w-xs leading-relaxed font-jakarta">
          Connecting India’s Heartland to Urban Healthcare
        </p>
      </div>

      {/* Bottom Progress Bar & Info */}
      <div className="w-full max-w-sm flex flex-col items-center gap-4 z-10 mb-4">
        <div className="w-full liquid-glass p-4 rounded-2xl border border-white/90 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-700 mb-2 font-medium">
            <span className="truncate pr-2 font-jakarta">{statusText}</span>
            <span className="font-mono text-emerald-600 font-bold">{progress}%</span>
          </div>

          {/* Progress track */}
          <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-white">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-emerald-500 to-teal-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(34,197,94,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Instant Launch Button */}
        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white border border-white px-4 py-2 rounded-full shadow-xs transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Enter App Instantly</span>
        </button>
      </div>
    </div>
  );
}
