import React, { useState } from 'react';
import { DIAGNOSTIC_TESTS } from '../data/mockData';
import { Microscope, ShieldCheck, Clock, Home, CheckCircle2, ChevronRight, Sparkles, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Diagnostics({ onBookingSuccess }) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [homePickup, setHomePickup] = useState(true);
  const [testConfirmed, setTestConfirmed] = useState(false);

  const handleBookTest = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 60, spread: 50 }); } catch (err) {}

    setTestConfirmed(true);
    if (onBookingSuccess) {
      onBookingSuccess(`Diagnostic Test Booked: ${selectedTest.name}! Express report in ${selectedTest.reportTime}.`);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#062A4E] to-[#1E1B4B] text-white rounded-3xl p-4 shadow-xl border border-indigo-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-indigo-400" />
            <h1 className="font-bold text-base font-jakarta">Pathology & Diagnostics</h1>
          </div>
          <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-indigo-500/30">
            NABL Accredited
          </span>
        </div>
        <p className="text-xs text-sky-200/80 mt-1">
          Express high-precision MRI, PET-CT & Pathology tests for Heartland patients.
        </p>
      </div>

      {/* Home Sample Collection Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 p-3.5 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-white">Heartland Home Sample Collection</h3>
            <p className="text-[10px] text-slate-300">Phlebotomist visits your doorstep in Mehsana, Palitana, Konkan.</p>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-1 rounded-full shrink-0">FREE</span>
      </div>

      {/* Diagnostic Catalog Cards */}
      <div className="space-y-3">
        {DIAGNOSTIC_TESTS.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition space-y-2.5"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                  {test.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 font-jakarta mt-1">{test.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through block">₹{test.cost}</span>
                <span className="text-sm font-extrabold text-emerald-600 font-jakarta">₹{test.discountCost}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">{test.description}</p>

            <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Clock className="w-3 h-3 text-indigo-600" />
                <span>{test.reportTime}</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{test.fastingRequired}</span>
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-400">Lab Fee: <strong className="text-slate-700">₹10-50</strong></span>
              <button
                onClick={() => { setSelectedTest(test); setTestConfirmed(false); }}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 shadow-sm"
              >
                <span>Book Test</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Test Booking Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-[55] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-4 w-full max-w-sm shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto no-scrollbar">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white font-jakarta">{selectedTest.name}</h3>
                <p className="text-xs text-indigo-400">Express Pathology Booking</p>
              </div>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {testConfirmed ? (
              <div className="space-y-4 text-center py-3 animate-scaleUp">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-white">Diagnostic Appointment Confirmed!</h4>
                <p className="text-xs text-slate-300">
                  Phlebotomist assigned for home sample collection in Mehsana. Digital report will be ready in {selectedTest.reportTime}.
                </p>

                <button
                  onClick={() => setSelectedTest(null)}
                  className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookTest} className="space-y-4 text-xs">
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1 border border-slate-700">
                  <div className="flex justify-between text-slate-300">
                    <span>Test Price:</span>
                    <span className="font-bold text-emerald-400">₹{selectedTest.discountCost}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Sample Collection:</span>
                    <span className="text-white">Free Doorstep Pickup</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-medium text-slate-300 block">Select Preferred Date:</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700">
                  <input
                    type="checkbox"
                    id="homePickup"
                    checked={homePickup}
                    onChange={(e) => setHomePickup(e.target.checked)}
                    className="rounded text-indigo-500 focus:ring-0"
                  />
                  <label htmlFor="homePickup" className="text-slate-300 text-xs cursor-pointer">
                    Enable Free Doorstep Sample Pickup in Heartland Region
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Confirm Diagnostic Booking (₹{selectedTest.discountCost})
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
