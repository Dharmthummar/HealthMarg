import React, { useState } from 'react';
import { FAMILY_LODGINGS } from '../data/mockData';
import { MapPin, Star, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Lodging({ onBookingSuccess }) {
  const [selectedLodge, setSelectedLodge] = useState(null);
  const [selectedType, setSelectedType]   = useState(null);
  const [nights, setNights]               = useState(3);
  const [patientName, setPatientName]     = useState('');
  const [contact, setContact]             = useState('');
  const [confirmed, setConfirmed]         = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 55, spread: 50 }); } catch {}
    setConfirmed(true);
    if (onBookingSuccess) onBookingSuccess(`Family Lodge Reserved: ${selectedLodge.name}! ${nights} nights.`);
  };

  return (
    <div className="p-4 space-y-3 pb-8 font-sans bg-slate-50">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-sm font-extrabold text-slate-900 font-jakarta">Family Lodging</h1>
        <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">From {'\u20B9'}300/night</span>
      </div>

      {FAMILY_LODGINGS.map(lodge => (
        <div key={lodge.id} className="hm-card overflow-hidden">
          <div className="relative h-40">
            <img src={lodge.image} alt={lodge.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-bold text-[13px] text-white font-jakarta leading-tight">{lodge.name}</h3>
                  <p className="text-[10px] text-white/80 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />{lodge.distance}
                  </p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />{lodge.rating}
                </div>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {lodge.amenities.slice(0,3).map((a, i) => (
                  <span key={i} className="bg-white/20 backdrop-blur-sm text-white text-[8.5px] font-semibold px-1.5 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Room type quick chips */}
          <div className="p-3.5 space-y-2.5">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {lodge.types.map((t, i) => (
                <div key={i} className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-center">
                  <div className="text-[10px] font-semibold text-slate-800 whitespace-nowrap">{t.name}</div>
                  <div className="text-[10.5px] font-bold text-emerald-700 font-mono">
                    {t.pricePerNight === 0 ? 'FREE' : `\u20B9${t.pricePerNight}`}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { setSelectedLodge(lodge); setSelectedType(lodge.types[0]); setConfirmed(false); }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition active:scale-95">
              Book Stay
            </button>
          </div>
        </div>
      ))}

      {selectedLodge && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl overflow-hidden animate-scaleIn border border-slate-100">
            <div className="relative h-28">
              <img src={selectedLodge.image} alt={selectedLodge.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-sm text-white font-jakarta">{selectedLodge.name}</h3>
                <span className="text-white/70 text-[10px]">{selectedLodge.distance}</span>
              </div>
              <button onClick={() => setSelectedLodge(null)}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white text-xs">?</button>
            </div>

            <div className="p-5 space-y-3.5">
              {confirmed ? (
                <div className="text-center space-y-3 py-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-jakarta">Stay Reserved!</h4>
                  <p className="text-xs text-slate-500">Room held for {nights} nights. Pure veg tiffin & hospital shuttle included.</p>
                  <button onClick={() => setSelectedLodge(null)} className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">Done</button>
                </div>
              ) : (
                <form onSubmit={handleBook} className="space-y-3 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 block">Room Type:</label>
                    <div className="space-y-1.5">
                      {selectedLodge.types.map((t, i) => (
                        <button type="button" key={i} onClick={() => setSelectedType(t)}
                          className={`w-full p-2.5 rounded-xl border flex justify-between items-center transition ${selectedType?.name === t.name ? 'bg-emerald-50 border-emerald-500 font-bold' : 'bg-slate-50 border-slate-200'}`}>
                          <span>{t.name}</span>
                          <span className="font-mono text-emerald-700 font-bold">{t.pricePerNight === 0 ? 'FREE' : `\u20B9${t.pricePerNight}/night`}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-600"><span>Nights:</span><span className="font-bold text-slate-900">{nights}</span></div>
                    <input type="range" min="1" max="14" value={nights} onChange={e => setNights(Number(e.target.value))} className="w-full" />
                  </div>
                  <input required type="text" placeholder="Patient / Caregiver Name" value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500" />
                  <input required type="tel" placeholder="Contact (+91)" value={contact}
                    onChange={e => setContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500" />
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-slate-600"><span>Total Stay:</span>
                      <span className="font-bold font-mono text-slate-900">
                        {(selectedType?.pricePerNight ?? 0) === 0 ? 'FREE' : `\u20B9${(selectedType?.pricePerNight ?? 0) * nights}`}
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition active:scale-95">
                    Reserve Family Stay
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
