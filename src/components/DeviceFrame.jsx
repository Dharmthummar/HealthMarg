import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Wifi, Battery } from 'lucide-react';

export default function DeviceFrame({ children, viewMode, setViewMode }) {
  const [timeStr, setTimeStr] = useState("09:41");
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Detect real mobile devices or small viewports <= 768px
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileViewport(mobile);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // If opened directly on a REAL MOBILE PHONE or if fullscreen mode is toggled
  if (isMobileViewport || viewMode === 'fullscreen') {
    return (
      <div className="w-full min-h-dvh bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden flex flex-col">
        {/* On desktop fullscreen view, provide a floating frame toggle button */}
        {!isMobileViewport && (
          <div className="fixed top-3 right-3 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-white/80 px-3 py-1.5 rounded-full shadow-lg">
            <button
              onClick={() => setViewMode('frame')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 px-2 py-1 rounded-full transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>iPhone Frame</span>
            </button>
          </div>
        )}

        {/* Native Mobile Content Viewport */}
        <div className="w-full min-h-dvh max-w-md mx-auto bg-slate-50 relative flex flex-col shadow-none sm:shadow-lg">
          {children}
        </div>
      </div>
    );
  }

  // On Desktop screens (>768px): Show iPhone 16 Pro Frame Mockup
  return (
    <div className="min-h-screen bg-slate-100/90 flex flex-col items-center justify-center p-2 sm:p-6 text-slate-900 font-sans relative overflow-x-hidden">
      {/* Background Refraction Blobs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none animate-refract" />
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-[100px] pointer-events-none animate-refract" />

      {/* Desktop View Switcher */}
      <div className="mb-4 flex items-center justify-center z-30">
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-white/80 p-1 rounded-full shadow-md">
          <button
            onClick={() => setViewMode('frame')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              viewMode === 'frame'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 16 Pro Frame</span>
          </button>

          <button
            onClick={() => setViewMode('fullscreen')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              viewMode === 'fullscreen'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen App</span>
          </button>
        </div>
      </div>

      {/* iPhone 16 Pro Mockup Casing */}
      <div className="relative w-[385px] h-[815px] max-w-full bg-slate-200/90 rounded-[52px] p-[12px] shadow-[0_20px_50px_rgba(7,45,75,0.12),0_0_30px_rgba(255,255,255,0.8)] border-[3px] border-white/90 ring-1 ring-slate-300 flex flex-col z-20">
        
        {/* Side Buttons */}
        <div className="absolute top-[100px] -left-[6px] w-[6px] h-[26px] bg-slate-300 rounded-l-md" />
        <div className="absolute top-[145px] -left-[6px] w-[6px] h-[48px] bg-slate-300 rounded-l-md" />
        <div className="absolute top-[205px] -left-[6px] w-[6px] h-[48px] bg-slate-300 rounded-l-md" />
        <div className="absolute top-[160px] -right-[6px] w-[6px] h-[65px] bg-slate-300 rounded-r-md" />

        {/* Screen Container */}
        <div className="w-full h-full bg-slate-50 text-slate-900 rounded-[42px] overflow-hidden flex flex-col relative border border-slate-200 shadow-inner">
          
          {/* Status Bar */}
          <div className="w-full h-11 bg-white/80 backdrop-blur-md text-slate-900 flex items-center justify-between px-6 select-none shrink-0 z-40 relative border-b border-slate-100">
            <span className="text-xs font-semibold tracking-tight font-mono text-slate-900">{timeStr}</span>

            {/* Dynamic Island Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[115px] h-[26px] bg-slate-950 rounded-full flex items-center justify-between px-2.5 shadow-sm">
              <div className="w-2.5 h-2.5 bg-[#0D1520] rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-1 h-1 bg-sky-500 rounded-full" />
              </div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-800 font-mono">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono font-bold">98%</span>
                <Battery className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              </div>
            </div>
          </div>

          {/* Viewport */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col bg-slate-50">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-full h-5 bg-white flex items-center justify-center shrink-0 z-40 border-t border-slate-100">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
