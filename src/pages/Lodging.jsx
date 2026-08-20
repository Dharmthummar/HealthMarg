import React, { useState } from 'react';
import { FAMILY_LODGINGS } from '../data/mockData';
import { Hotel, ShieldCheck, MapPin, Star, Users, Home, CheckCircle2, ChevronRight, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Lodging({ onBookingSuccess }) {
  const [selectedLodge, setSelectedLodge] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [nights, setNights] = useState(3);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookLodge = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 65, spread: 50 }); } catch (err) {}

    setBookingConfirmed(true);
    if (onBookingSuccess) {
      onBookingSuccess(`Family Lodge Reserved: ${selectedLodge.name}! Room held with zero cancellation penalty.`);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#062A4E] to-[#7C2D12] text-white rounded-3xl p-4 shadow-xl border border-amber-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hotel className="w-5 h-5 text-amber-400" />
            <h1 className="font-bold text-base font-jakarta">Family Lodging & Homestays</h1>
          </div>
          <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-500/30">
            Near Hospitals
          </span>
        </div>
        <p className="text-xs text-sky-200/80 mt-1">
          Scouting economical, hygienic stay options for patient families right next to tertiary centers.
        </p>
      </div>

      {/* Lodgings List */}
      <div className="space-y-4">
        {FAMILY_LODGINGS.map((lodge) => (
          <div
            key={lodge.id}
            className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3"
          >
            <div className="flex gap-3">
              <img
                src={lodge.image}
                alt={lodge.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-100 bg-slate-100"
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'; }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 font-jakarta truncate">{lodge.name}</h3>
                  <div className="flex items-center text-amber-500 text-xs font-bold shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                    <span>{lodge.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-amber-700 font-medium mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate">{lodge.nearHospital}</span>
                </div>

                <div className="mt-2 space-y-1">
                  {lodge.types.map((type, i) => (
                    <div key={i} className="flex justify-between text-[11px]">
                      <span className="text-slate-600 truncate pr-1">{type.name}</span>
                      <span className="font-bold text-emerald-600 shrink-0 font-jakarta">₹{type.pricePerNight} <span className="font-normal text-[9px] text-slate-400">/night</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
              {lodge.amenities.map((amenity, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Utensils className="w-2.5 h-2.5 text-amber-600" />
                  <span>{amenity}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">Lodge Comm: <strong className="text-slate-700">5-10%</strong></span>

              <button
                onClick={() => {
                  setSelectedLodge(lodge);
                  setSelectedType(lodge.types[0]);
                  setBookingConfirmed(false);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
              >
                <span>Hold Room</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lodge Reservation Modal */}
      {selectedLodge && (
        <div className="fixed inset-0 z-[55] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-4 w-full max-w-sm shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto no-scrollbar">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white font-jakarta">{selectedLodge.name}</h3>
                <p className="text-xs text-amber-400">Family Stay Hold</p>
              </div>
              <button
                onClick={() => setSelectedLodge(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="space-y-4 text-center py-3 animate-scaleUp">
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-white">Family Lodge Reserved!</h4>
                <p className="text-xs text-slate-300">
                  Room held at {selectedLodge.name} for {nights} nights. Zero cancellation penalty.
                </p>

                <button
                  onClick={() => setSelectedLodge(null)}
                  className="w-full py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookLodge} className="space-y-4 text-xs">
                
                <div className="space-y-2">
                  <label className="text-slate-300 font-semibold block">Select Room Type:</label>
                  <div className="space-y-1.5">
                    {selectedLodge.types.map((type, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedType(type)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                          selectedType?.name === type.name
                            ? 'bg-amber-950/60 border-amber-500 text-white font-bold'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300'
                        }`}
                      >
                        <span>{type.name}</span>
                        <span className="text-emerald-400 font-mono">₹{type.pricePerNight} / night</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Number of Nights:</span>
                    <span className="font-bold text-white">{nights} Nights</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-800/90 rounded-xl space-y-1 border border-slate-700 font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Total Stay Fee:</span>
                    <span className="font-bold text-amber-400">₹{(selectedType?.pricePerNight || 0) * nights}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Pay at Lodge:</span>
                    <span className="text-emerald-400 font-sans">No Advance Required</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Hold Room Now (₹{(selectedType?.pricePerNight || 0) * nights})
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
