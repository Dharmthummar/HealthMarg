import React, { useState } from 'react';
import { MEDICAL_EQUIPMENT } from '../data/mockData';
import { Truck, ShieldCheck, Clock, CheckCircle2, Star, ChevronRight, Calculator, Wrench } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Equipment({ onBookingSuccess }) {
  const [selectedEq, setSelectedEq] = useState(null);
  const [rentalDays, setRentalDays] = useState(15);
  const [isMonthly, setIsMonthly] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleOrderEquipment = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 70, spread: 55 }); } catch (err) {}

    setBookingConfirmed(true);
    if (onBookingSuccess) {
      onBookingSuccess(`Equipment Rental Reserved: ${selectedEq.name}! Technician dispatch en route.`);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#062A4E] to-[#0A4423] text-white rounded-3xl p-4 shadow-xl border border-emerald-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" />
            <h1 className="font-bold text-base font-jakarta">Medical Equipment Rentals</h1>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/30">
            4-Hr Express Fleet
          </span>
        </div>
        <p className="text-xs text-sky-200/80 mt-1">
          Rent BiPAP, Oxygen Concentrators & ICU Beds with free home installation & technician support.
        </p>
      </div>

      {/* Equipment List */}
      <div className="space-y-4">
        {MEDICAL_EQUIPMENT.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3"
          >
            <div className="flex gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-100"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    {item.category}
                  </span>
                  <div className="flex items-center text-amber-500 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 font-jakarta mt-1 truncate">{item.name}</h3>
                
                <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>Delivery: {item.deliveryTime}</span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Daily Rental</span>
                    <span className="text-sm font-extrabold text-emerald-600 font-jakarta">₹{item.rentalPerDay} <span className="text-[10px] font-normal text-slate-500">/day</span></span>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    Buy: ₹{item.outrightBuy.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">{item.specs}</p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Wrench className="w-3 h-3 text-sky-600" />
                <span>Free Technician Setup</span>
              </div>

              <button
                onClick={() => { setSelectedEq(item); setBookingConfirmed(false); }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
              >
                <span>Calculate & Rent</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Equipment Rental Modal */}
      {selectedEq && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-5 w-full max-w-sm shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white font-jakarta">{selectedEq.name}</h3>
                <p className="text-xs text-emerald-400">Rental Calculator & Technician Order</p>
              </div>
              <button
                onClick={() => setSelectedEq(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="space-y-4 text-center py-3 animate-scaleUp">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-white">Equipment Rental Order Placed!</h4>
                <p className="text-xs text-slate-300">
                  Sanitized equipment and biomedical technician dispatched to your location. Expected delivery in {selectedEq.deliveryTime}.
                </p>

                <button
                  onClick={() => setSelectedEq(null)}
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderEquipment} className="space-y-4 text-xs">
                
                {/* Mode toggle */}
                <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsMonthly(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                      !isMonthly ? 'bg-emerald-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Daily Rental (₹{selectedEq.rentalPerDay}/day)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMonthly(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isMonthly ? 'bg-emerald-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Monthly (₹{selectedEq.rentalPerMonth}/mo)
                  </button>
                </div>

                {!isMonthly && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Rental Duration:</span>
                      <span className="font-bold text-white">{rentalDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="60"
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Pricing Box */}
                <div className="p-3.5 bg-slate-800/90 rounded-2xl space-y-2 border border-slate-700">
                  <div className="flex justify-between text-slate-300">
                    <span>Equipment Rental Fee:</span>
                    <span className="font-extrabold text-emerald-400 text-sm font-mono">
                      ₹{isMonthly ? selectedEq.rentalPerMonth : selectedEq.rentalPerDay * rentalDays}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Security Deposit (Refundable):</span>
                    <span className="text-white font-mono">₹{selectedEq.deposit}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>HealthMarg Rental Fee:</span>
                    <span className="text-emerald-400 font-mono font-bold">₹150</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Confirm Equipment Delivery & Setup
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
