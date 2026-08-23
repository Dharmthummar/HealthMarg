import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Wifi, Battery } from 'lucide-react';

export default function DeviceFrame({ children, viewMode, setViewMode }) {
  const [timeStr, setTimeStr] = useState('09:41');
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, '0');
      const m = d.getMinutes().toString().padStart(2, '0');
      setTimeStr(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Direct mobile viewport or desktop fullscreen view
  if (isMobileViewport || viewMode === 'fullscreen') {
    return (
      <div className="w-full min-h-dvh bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden flex flex-col">
        {!isMobileViewport && (
          <div className="fixed top-3 right-3 z-50">
            <button
              onClick={() => setViewMode('frame')}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white/95 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm hover:border-slate-300 transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mobile Frame</span>
            </button>
          </div>
        )}

        <div className="w-full min-h-dvh max-w-md mx-auto bg-slate-50 relative flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  // Desktop Studio Presentation Mode
  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col items-center justify-center p-3 sm:p-6 text-slate-900 font-sans relative overflow-x-hidden">
      
      {/* Top View Mode Switcher */}
      <div className="mb-4 flex items-center justify-center z-30">
        <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-full shadow-xs">
          <button
            onClick={() => setViewMode('frame')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              viewMode === 'frame'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile View</span>
          </button>

          <button
            onClick={() => setViewMode('fullscreen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              viewMode === 'fullscreen'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>
        </div>
      </div>

      {/* iPhone 16 Mockup Shell */}
      <div className="relative w-[380px] h-[790px] max-w-full bg-slate-900 rounded-[48px] p-[10px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] border border-slate-700/80 flex flex-col z-20">
        
        {/* Screen Container */}
        <div className="w-full h-full bg-slate-50 text-slate-900 rounded-[38px] overflow-hidden flex flex-col relative border border-slate-800/40">
          
          {/* Status Bar */}
          <div className="w-full h-10 bg-white text-slate-900 flex items-center justify-between px-6 select-none shrink-0 z-40 relative border-b border-slate-100/80">
            <span className="text-xs font-semibold tracking-tight font-mono text-slate-900">{timeStr}</span>

            {/* Dynamic Island Notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[22px] bg-slate-950 rounded-full flex items-center justify-between px-2.5 shadow-xs">
              <div className="w-2 h-2 bg-[#0F172A] rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-emerald-500 rounded-full" />
              </div>
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="text-[10px] font-bold text-slate-700 font-mono">5G</span>
              <Wifi className="w-3.5 h-3.5 text-slate-700" />
              <div className="flex items-center gap-0.5">
                <Battery className="w-4 h-4 text-slate-800 fill-slate-800" />
              </div>
            </div>
          </div>

          {/* Mobile Viewport */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative flex flex-col bg-slate-50">
            {children}
          </div>

          {/* Bottom Home Indicator */}
          <div className="w-full h-4 bg-white flex items-center justify-center shrink-0 z-40 border-t border-slate-100">
            <div className="w-28 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
