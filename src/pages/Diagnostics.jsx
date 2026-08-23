import React, { useState } from 'react';
import { DIAGNOSTIC_TESTS } from '../data/mockData';
import { Clock, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Diagnostics({ onBookingSuccess }) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [homePickup, setHomePickup]     = useState(true);
  const [patientName, setPatientName]   = useState('');
  const [contact, setContact]           = useState('');
  const [confirmed, setConfirmed]       = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 50, spread: 50 }); } catch {}
    setConfirmed(true);
    if (onBookingSuccess) onBookingSuccess(`Test scheduled: ${selectedTest.name}! Report in ${selectedTest.reportTime}`);
  };

  return (
    <div className="p-4 space-y-3 pb-8 font-sans bg-slate-50">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-sm font-extrabold text-slate-900 font-jakarta">Diagnostic Tests</h1>
        <span className="text-[10px] bg-sky-50 text-sky-800 font-bold px-2 py-0.5 rounded-full border border-sky-200">NABL Accredited</span>
      </div>

      {DIAGNOSTIC_TESTS.map(test => (
        <div key={test.id} className="hm-card overflow-hidden">
          {/* Image Header */}
          <div className="relative h-36">
            <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
            <div className="absolute top-2.5 left-2.5">
              <span className="bg-sky-500/90 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full">{test.category}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-bold text-[13px] text-white font-jakarta leading-tight">{test.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-400 font-mono font-bold text-sm">{'\u20B9'}{test.discountCost.toLocaleString('en-IN')}</span>
                <span className="text-white/50 line-through text-xs font-mono">{'\u20B9'}{test.cost.toLocaleString('en-IN')}</span>
                <span className="ml-auto bg-white/20 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full">
                  Save {'\u20B9'}{test.cost - test.discountCost}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-3.5 space-y-2.5">
            <p className="text-[10.5px] text-slate-600 leading-relaxed">{test.description}</p>
            <div className="flex gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{test.reportTime}</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{test.fastingRequired}</span>
            </div>
            <button onClick={() => { setSelectedTest(test); setConfirmed(false); }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition active:scale-95">
              Book for {'\u20B9'}{test.discountCost.toLocaleString('en-IN')}
            </button>
          </div>
        </div>
      ))}

      {/* Booking Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl overflow-hidden animate-scaleIn border border-slate-100">
            <div className="relative h-28">
              <img src={selectedTest.image} alt={selectedTest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-sm text-white font-jakarta">{selectedTest.name}</h3>
                <span className="text-emerald-400 font-mono font-bold text-xs">{'\u20B9'}{selectedTest.discountCost.toLocaleString('en-IN')}</span>
              </div>
              <button onClick={() => setSelectedTest(null)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white text-xs">?</button>
            </div>

            <div className="p-5 space-y-3.5">
              {confirmed ? (
                <div className="text-center space-y-3 py-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-jakarta">Test Slot Confirmed!</h4>
                  <p className="text-xs text-slate-500">Digital report sent to your WhatsApp in {selectedTest.reportTime}.</p>
                  <button onClick={() => setSelectedTest(null)} className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">Done</button>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setHomePickup(true)}
                      className={`p-2.5 rounded-xl border text-center font-semibold ${homePickup ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                      ?? Home Sample
                    </button>
                    <button type="button" onClick={() => setHomePickup(false)}
                      className={`p-2.5 rounded-xl border text-center font-semibold ${!homePickup ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                      ?? Visit Center
                    </button>
                  </div>
                  <input required type="text" placeholder="Patient Full Name" value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500" />
                  <input required type="tel" placeholder="Contact (+91)" value={contact}
                    onChange={e => setContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500" />
                  <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition active:scale-95">
                    Confirm Booking ({'\u20B9'}{selectedTest.discountCost.toLocaleString('en-IN')})
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
