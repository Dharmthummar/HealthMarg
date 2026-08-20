import React from 'react';
import { X, QrCode, ShieldCheck, Download, Share2, CheckCircle2 } from 'lucide-react';
import LogoSvg from './LogoSvg';

export default function QrModal({ isOpen, onClose, journeyData }) {
  if (!isOpen || !journeyData) return null;

  return (
    <div className="fixed inset-0 z-[55] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-5 text-center relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 via-emerald-400 to-teal-400" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center justify-center pt-2">
          <LogoSvg width={45} height={45} showText={false} />
          <h3 className="font-bold text-lg text-white font-jakarta mt-2">Digital Referral Pass</h3>
          <p className="text-xs text-emerald-400 font-medium">HealthMarg Heartland Priority Access</p>
        </div>

        {/* QR Code Container */}
        <div className="p-4 bg-white rounded-2xl shadow-inner inline-block border-4 border-slate-800">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(journeyData.qrPassCode)}`}
            alt="HealthMarg Priority QR Code"
            className="w-40 h-40 object-contain mx-auto"
          />
          <span className="block mt-2 font-mono text-xs font-bold text-slate-900 tracking-wider">
            {journeyData.qrPassCode}
          </span>
        </div>

        {/* Patient Details */}
        <div className="bg-slate-800/80 rounded-2xl p-3.5 text-left text-xs space-y-1.5 border border-slate-700/80">
          <div className="flex justify-between">
            <span className="text-slate-400">Patient:</span>
            <span className="font-bold text-white">{journeyData.patientName} ({journeyData.age} Yrs)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Origin:</span>
            <span className="text-slate-200">{journeyData.origin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reserved Bed:</span>
            <span className="text-emerald-400 font-bold">Apollo ICU Bed #304</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Digital Pass saved to phone gallery!")}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Save Pass</span>
          </button>
          <button
            onClick={() => alert("Share link copied to clipboard!")}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center justify-center transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
