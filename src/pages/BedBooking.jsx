import React, { useState } from 'react';
import { HOSPITALS, AHMEDABAD_SPECIALTIES } from '../data/mockData';
import { Bed, Star, CheckCircle2, MapPin, Phone, Check, Search, Filter } from 'lucide-react';
import useGeolocation from '../hooks/useGeolocation';
import confetti from 'canvas-confetti';

export default function BedBooking({ onBookingSuccess }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchQuery, setSearchQuery]             = useState('');
  const [filterType, setFilterType]               = useState('all');
  const [bookingModal, setBookingModal]            = useState(null);
  const [selectedBedId, setSelectedBedId]         = useState('icu');
  const [patientName, setPatientName]             = useState('');
  const [patientContact, setPatientContact]       = useState('');
  const [bookingConfirmed, setBookingConfirmed]   = useState(null);
  const geo = useGeolocation();

  const hospitals = HOSPITALS.filter(h => {
    if (filterType === 'icu' && (h.bedCategories.find(b => b.id === 'icu')?.vacant ?? 0) === 0) return false;
    if (selectedSpecialty !== 'All Specialties' && !h.specialties.some(s => s === selectedSpecialty)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.specialties.some(s => s.toLowerCase().includes(q));
    }
    return true;
  });

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientContact.trim()) return;
    const code = `HM-BED-${Math.floor(100000 + Math.random() * 900000)}`;
    const bed = bookingModal.bedCategories.find(b => b.id === selectedBedId);
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch {}
    setBookingConfirmed({ code, bedType: bed?.type, price: bed?.price, patientName, contact: patientContact });
    if (onBookingSuccess) onBookingSuccess(`Bed Reserved at ${bookingModal.name}! Code: ${code}`);
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans bg-slate-50">

      {/* Filter Card */}
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-extrabold text-slate-900 font-jakarta">Bed Availability</h1>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            {HOSPITALS.reduce((s, h) => s + h.bedCategories.reduce((a, b) => a + b.vacant, 0), 0)} Beds Live
          </span>
        </div>

        {geo.distanceKm && (
          <div className="flex items-center gap-2 text-[10.5px] text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="font-medium truncate">{geo.city}</span>
            <span className="ml-auto font-bold text-emerald-700 shrink-0">{geo.distanceKm} km away</span>
          </div>
        )}

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search Sterling, Cardiology, Memnagar..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition" />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">?</button>}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-500">
            {AHMEDABAD_SPECIALTIES.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex gap-1.5">
          {[{ id: 'all', label: 'All Beds' }, { id: 'icu', label: 'ICU Only' }].map(f => (
            <button key={f.id} onClick={() => setFilterType(f.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition active:scale-95 ${filterType === f.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards ? Image-forward visual layout */}
      {hospitals.map(h => {
        const totalVacant = h.bedCategories.reduce((s, b) => s + b.vacant, 0);
        const icuVacant = h.bedCategories.find(b => b.id === 'icu')?.vacant ?? 0;
        return (
          <div key={h.id} className="hm-card overflow-hidden">

            {/* Full-width Image Header with gradient overlay */}
            <div className="relative h-44">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />

              {/* Text overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[15px] text-white font-jakarta leading-tight">{h.name}</h3>
                    <p className="text-[10.5px] text-white/80 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{h.location}</span>
                      {geo.distanceKm && <span className="text-emerald-400 font-bold"> | {geo.distanceKm} km</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />{h.rating}
                    </span>
                  </div>
                </div>

                {/* Live Bed Badges */}
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                    {totalVacant} Beds Vacant
                  </span>
                  <span className="bg-rose-500/90 backdrop-blur-sm text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full">
                    {icuVacant} ICU Free
                  </span>
                  <span className="bg-slate-800/80 backdrop-blur-sm text-white/90 text-[9.5px] font-semibold px-2 py-0.5 rounded-full">
                    53 Specialties
                  </span>
                </div>
              </div>

              {/* Accreditation top-right badge */}
              <div className="absolute top-2.5 right-2.5">
                <span className="bg-white/95 text-slate-800 text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  NABH & NABL
                </span>
              </div>
            </div>

            {/* Details below image */}
            <div className="p-4 space-y-3">

              {/* Contact + Address strip */}
              <div className="flex gap-2">
                <a href={`tel:${h.contactNo}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl transition">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 {h.contactNo}</span>
                </a>
                <button
                  onClick={() => { setBookingModal(h); setSelectedBedId('icu'); setBookingConfirmed(null); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition active:scale-95">
                  <Bed className="w-3.5 h-3.5" />
                  <span>Reserve Bed</span>
                </button>
              </div>

              {/* Facilities as horizontal scroll chips */}
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Verified Facilities:</span>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {Object.values(h.facilities).map((f, i) => (
                    <span key={i} className="flex items-center gap-1 bg-slate-50 text-slate-700 text-[9.5px] px-2 py-0.5 rounded-lg border border-slate-200 whitespace-nowrap shrink-0">
                      <Check className="w-2.5 h-2.5 text-emerald-600" />{f.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bed Type Image Cards ? visual rectangle grid */}
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Bed Types & Rates:</span>
                <div className="grid grid-cols-2 gap-2">
                  {h.bedCategories.map(bed => (
                    <div key={bed.id} className="relative h-20 rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => { setBookingModal(h); setSelectedBedId(bed.id); setBookingConfirmed(null); }}>
                      <img src={bed.image} alt={bed.type} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-1.5">
                        <div className="text-[10px] font-bold text-white leading-tight">{bed.type}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] text-emerald-400 font-mono font-bold">{'\u20B9'}{bed.price.toLocaleString('en-IN')}/d</span>
                          <span className="text-[8.5px] text-white/70">{bed.vacant} free</span>
                        </div>
                      </div>
                      {bed.id === 'icu' && (
                        <div className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[7.5px] font-bold px-1 py-0.5 rounded">ICU</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        );
      })}

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl max-h-[90vh] overflow-y-auto no-scrollbar animate-scaleIn border border-slate-100">

            {/* Modal Image Header */}
            <div className="relative h-32 rounded-t-3xl overflow-hidden">
              <img src={bookingModal.image} alt={bookingModal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-bold text-sm text-white font-jakarta">{bookingModal.name}</h3>
                <p className="text-[10px] text-white/70">Memnagar, Ahmedabad-380052</p>
              </div>
              <button onClick={() => { setBookingModal(null); setBookingConfirmed(null); }}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white text-xs">?</button>
            </div>

            <div className="p-5 space-y-4">
              {bookingConfirmed ? (
                <div className="text-center space-y-3 py-2">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-jakarta">Bed Hold Confirmed!</h4>
                    <p className="text-xs text-emerald-700 font-mono font-bold mt-0.5">{bookingConfirmed.code}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1.5 text-left border border-slate-100">
                    <div className="flex justify-between"><span className="text-slate-500">Patient:</span><span className="font-semibold">{bookingConfirmed.patientName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Bed:</span><span className="font-semibold text-emerald-700">{bookingConfirmed.bedType}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Rate:</span><span className="font-bold font-mono">{'\u20B9'}{bookingConfirmed.price.toLocaleString('en-IN')}/day</span></div>
                  </div>
                  <p className="text-[9.5px] text-slate-400">Show this code at Sterling Hospital triage gate.</p>
                  <button onClick={() => { setBookingModal(null); setBookingConfirmed(null); }}
                    className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">Done</button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                  {/* Bed Category Image Grid */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 block">Select Bed:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {bookingModal.bedCategories.map(bed => (
                        <button type="button" key={bed.id} onClick={() => setSelectedBedId(bed.id)}
                          className={`relative h-16 rounded-xl overflow-hidden ring-2 transition ${selectedBedId === bed.id ? 'ring-emerald-500' : 'ring-transparent'}`}>
                          <img src={bed.image} alt={bed.type} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-1.5">
                            <div className="text-[9.5px] font-bold text-white truncate">{bed.type}</div>
                            <div className="text-[9px] text-emerald-400 font-mono">{'\u20B9'}{bed.price.toLocaleString('en-IN')}/d</div>
                          </div>
                          {selectedBedId === bed.id && (
                            <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Check className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                    <label className="text-[11px] font-semibold text-slate-700 block">Patient Details:</label>
                    <input required type="text" placeholder="Full Patient Name" value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500" />
                    <input required type="tel" placeholder="Contact Mobile (+91)" value={patientContact}
                      onChange={(e) => setPatientContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500" />
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Booking Deposit:</span>
                      <span className="font-bold text-slate-900 font-mono">{'\u20B9'}{bookingModal.bookingFee}</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">100% refundable within 2 hours</div>
                  </div>

                  <button type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95">
                    Confirm Bed Reservation ({'\u20B9'}{bookingModal.bookingFee})
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
