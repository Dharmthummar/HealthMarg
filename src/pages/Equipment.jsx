import React, { useState } from 'react';
import { MEDICAL_EQUIPMENT } from '../data/mockData';
import { Clock, Wrench, Star, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Equipment({ onBookingSuccess }) {
  const [selectedEq, setSelectedEq]       = useState(null);
  const [rentalDays, setRentalDays]       = useState(15);
  const [address, setAddress]             = useState('');
  const [contact, setContact]             = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 50, spread: 50 }); } catch {}
    setBookingConfirmed(true);
    if (onBookingSuccess) onBookingSuccess(`${selectedEq.name} dispatched! Dealer delivery scheduled.`);
  };

  return (
    <div className="p-4 space-y-3 pb-8 font-sans bg-slate-50">
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-sm font-extrabold text-slate-900 font-jakarta">Medical Equipment Rentals</h1>
          <p className="text-[10px] text-slate-500">Direct from Authorized Medical Equipment Dealers</p>
        </div>
        <span className="text-[10px] bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
          Sanitized &amp; Tested
        </span>
      </div>

      {MEDICAL_EQUIPMENT.map(eq => (
        <div key={eq.id} className="hm-card overflow-hidden">
          {/* Visual Rectangular Image Box */}
          <div className="relative h-40">
            <img src={eq.image} alt={eq.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
            
            <div className="absolute top-2.5 left-2.5 flex gap-1.5">
              <span className="bg-indigo-500/90 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                {eq.category}
              </span>
            </div>

            {/* Dealer Verified Badge */}
            <div className="absolute top-2.5 right-2.5">
              <span className="bg-white/95 text-slate-800 text-[8px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Dealer
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-bold text-[13.5px] text-white font-jakarta leading-tight">{eq.name}</h3>
              <p className="text-[9.5px] text-emerald-300 font-medium mt-0.5">{eq.dealer}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-emerald-400 font-mono font-bold text-sm">{'\u20B9'}{eq.rentalPerDay}/day</span>
                <span className="text-white/70 text-[10px]"> | {'\u20B9'}{eq.rentalPerMonth.toLocaleString('en-IN')}/mo</span>
                <span className="flex items-center gap-0.5 text-amber-400 text-[10px] font-bold ml-auto">
                  <Star className="w-3 h-3 fill-amber-400" />{eq.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 space-y-2.5">
            <p className="text-[10.5px] text-slate-600 leading-relaxed">{eq.specs}</p>
            <div className="flex gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-600" />{eq.deliveryTime}</span>
              <span className="flex items-center gap-1"><Wrench className="w-3 h-3 text-emerald-600" />Free Demo &amp; Setup</span>
            </div>
            <button
              onClick={() => { setSelectedEq(eq); setBookingConfirmed(false); }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Rent for {'\u20B9'}{eq.rentalPerDay}/day</span>
            </button>
          </div>
        </div>
      ))}

      {/* Rental Modal */}
      {selectedEq && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl overflow-hidden animate-scaleIn border border-slate-100">
            <div className="relative h-28">
              <img src={selectedEq.image} alt={selectedEq.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-sm text-white font-jakarta">{selectedEq.name}</h3>
                <span className="text-emerald-400 font-mono font-bold text-xs">{'\u20B9'}{selectedEq.rentalPerDay}/day</span>
              </div>
              <button
                onClick={() => setSelectedEq(null)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white text-xs"
              >?</button>
            </div>

            <div className="p-5 space-y-3.5">
              {bookingConfirmed ? (
                <div className="text-center space-y-3 py-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-jakarta">Equipment Dispatched!</h4>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">Dealer Order #HM-EQ-{Math.floor(1000 + Math.random()*9000)}</p>
                  </div>
                  <p className="text-xs text-slate-500">Sanitized unit + certified technician en route to your location.</p>
                  <button onClick={() => setSelectedEq(null)} className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Rental Duration:</span>
                      <span className="font-bold text-slate-900">{rentalDays} Days</span>
                    </div>
                    <input
                      type="range" min="3" max="60" value={rentalDays}
                      onChange={e => setRentalDays(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <input
                    required type="text" placeholder="Patient / Delivery Address" value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    required type="tel" placeholder="Contact Mobile (+91)" value={contact}
                    onChange={e => setContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <div className="p-2.5 bg-slate-50 rounded-xl space-y-1 border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Rental:</span>
                      <span className="font-bold font-mono text-slate-900">{'\u20B9'}{(selectedEq.rentalPerDay * rentalDays).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[10px]">
                      <span>Security Deposit (Refundable):</span>
                      <span className="font-mono">{'\u20B9'}{selectedEq.deposit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95"
                  >
                    Confirm Dealer Delivery ({'\u20B9'}{(selectedEq.rentalPerDay * rentalDays).toLocaleString('en-IN')})
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
