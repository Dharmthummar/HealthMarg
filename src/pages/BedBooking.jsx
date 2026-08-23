import React, { useState } from 'react';
import { HOSPITALS, AHMEDABAD_SPECIALTIES } from '../data/mockData';
import { Bed, Star, CheckCircle2, MapPin, Phone, Check, Search, Filter, Building2, ChevronDown } from 'lucide-react';
import useGeolocation from '../hooks/useGeolocation';
import confetti from 'canvas-confetti';

export default function BedBooking({ onBookingSuccess, selectedHospital: initialHospital }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchQuery, setSearchQuery]             = useState('');
  const [filterType, setFilterType]               = useState('all');
  const [bookingModal, setBookingModal]            = useState(initialHospital || null);
  const [selectedBedId, setSelectedBedId]         = useState('icu');
  const [patientName, setPatientName]             = useState('');
  const [patientContact, setPatientContact]       = useState('');
  const [bookingConfirmed, setBookingConfirmed]   = useState(null);
  const [visibleCount, setVisibleCount]           = useState(10);
  const geo = useGeolocation();

  // Filter 322 Ahmedabad hospitals
  const filteredHospitals = HOSPITALS.filter(h => {
    if (filterType === 'icu' && h.icuVacant === 0) return false;
    if (selectedSpecialty !== 'All Specialties' && h.specialty !== selectedSpecialty) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        h.name.toLowerCase().includes(q) ||
        h.area.toLowerCase().includes(q) ||
        h.detailAddress.toLowerCase().includes(q) ||
        h.specialty.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const displayedHospitals = filteredHospitals.slice(0, visibleCount);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !patientContact.trim()) return;
    const code = `HM-AHMD-${Math.floor(100000 + Math.random() * 900000)}`;
    const bed = bookingModal.bedCategories.find(b => b.id === selectedBedId) || bookingModal.bedCategories[0];
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch {}
    setBookingConfirmed({
      code,
      hospitalName: bookingModal.name,
      bedType: bed?.type,
      price: bed?.price,
      patientName,
      contact: patientContact
    });
    if (onBookingSuccess) onBookingSuccess(`Bed Reserved at ${bookingModal.name}! Pass Code: ${code}`);
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans bg-slate-50">

      {/* Filter & Search Header Card */}
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-extrabold text-slate-900 font-jakarta">Ahmedabad Hospitals</h1>
            <p className="text-[10.5px] text-slate-500">322 Verified Centers &bull; Live Bed Availability</p>
          </div>
          <span className="text-[10.5px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            {filteredHospitals.length} Found
          </span>
        </div>

        {geo.distanceKm && (
          <div className="flex items-center gap-2 text-[10.5px] text-slate-600 bg-slate-50 border border-slate-200/70 px-3 py-1.5 rounded-xl">
            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="font-medium truncate">{geo.city}</span>
            <span className="ml-auto font-bold text-emerald-700 shrink-0">{geo.distanceKm} km to Ahmedabad</span>
          </div>
        )}

        {/* Search by hospital name, area, or road */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Saviour, Bodakdev, Naroda, Ortho..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(10); }}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">?</button>
          )}
        </div>

        {/* Specialty Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedSpecialty}
            onChange={(e) => { setSelectedSpecialty(e.target.value); setVisibleCount(10); }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-slate-900"
          >
            {AHMEDABAD_SPECIALTIES.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Bed Filter Tabs */}
        <div className="flex gap-1.5">
          {[{ id: 'all', label: 'All Beds' }, { id: 'icu', label: 'ICU Available' }].map(f => (
            <button
              key={f.id}
              onClick={() => { setFilterType(f.id); setVisibleCount(10); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                filterType === f.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards List */}
      {displayedHospitals.length === 0 ? (
        <div className="hm-card p-8 text-center space-y-2">
          <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-700 font-semibold">No hospitals match your search filters.</p>
          <button
            onClick={() => { setSelectedSpecialty('All Specialties'); setSearchQuery(''); }}
            className="text-xs text-emerald-700 font-bold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        displayedHospitals.map((h) => (
          <div key={h.id} className="hm-card overflow-hidden transition-all hover:border-slate-300">
            {/* Visual Hospital Header */}
            <div className="relative h-40">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

              <div className="absolute top-2.5 left-2.5">
                <span className="bg-slate-900/90 text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                  {h.specialty}
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5">
                <span className="bg-white/95 text-slate-800 text-[8.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {h.accreditation}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-[14px] text-white font-jakarta leading-tight truncate">{h.name}</h3>
                    <p className="text-[10px] text-white/80 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{h.area}, Ahmedabad</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{h.rating}</span>
                  </div>
                </div>

                <div className="flex gap-1.5 mt-2 flex-wrap">
                  <span className="bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {h.vacantBeds} Beds Free
                  </span>
                  <span className="bg-rose-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {h.icuVacant} ICU
                  </span>
                  <span className="bg-slate-800/90 text-white/90 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                    Cap: {h.capacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Hospital Body */}
            <div className="p-4 space-y-3">
              {/* Full Address */}
              <div className="p-2.5 bg-slate-50 rounded-xl text-[10.5px] text-slate-600 border border-slate-100 leading-snug">
                <span className="font-semibold text-slate-800">Address: </span>{h.detailAddress}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={`tel:${h.contactNo}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Hospital</span>
                </a>
                <button
                  onClick={() => { setBookingModal(h); setSelectedBedId('icu'); setBookingConfirmed(null); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition active:scale-95 cursor-pointer shadow-xs"
                >
                  <Bed className="w-3.5 h-3.5" />
                  <span>Reserve Bed</span>
                </button>
              </div>

              {/* Bed Types & Rates Grid */}
              <div>
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Available Categories &amp; Rates:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {h.bedCategories.map(bed => (
                    <div
                      key={bed.id}
                      onClick={() => { setBookingModal(h); setSelectedBedId(bed.id); setBookingConfirmed(null); }}
                      className="relative h-18 rounded-xl overflow-hidden cursor-pointer active:scale-98 transition-transform"
                    >
                      <img src={bed.image} alt={bed.type} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-1.5">
                        <div className="text-[10px] font-bold text-white leading-tight">{bed.type}</div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[9.5px] text-emerald-400 font-mono font-bold">
                            {'\u20B9'}{bed.price.toLocaleString('en-IN')}/d
                          </span>
                          <span className="text-[8.5px] text-white/80">{bed.vacant} free</span>
                        </div>
                      </div>
                      {bed.id === 'icu' && (
                        <div className="absolute top-1 right-1 bg-rose-500 text-white text-[7.5px] font-bold px-1 py-0.2 rounded">
                          ICU
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Load More Button for 322 hospitals */}
      {displayedHospitals.length < filteredHospitals.length && (
        <button
          onClick={() => setVisibleCount(v => v + 15)}
          className="w-full py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl transition shadow-xs flex items-center justify-center gap-1.5"
        >
          <span>View More Hospitals ({filteredHospitals.length - displayedHospitals.length} remaining)</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Bed Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl max-h-[90vh] overflow-y-auto no-scrollbar animate-scaleIn border border-slate-100">

            <div className="relative h-32 rounded-t-3xl overflow-hidden">
              <img src={bookingModal.image} alt={bookingModal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <h3 className="font-bold text-sm text-white font-jakarta truncate">{bookingModal.name}</h3>
                <p className="text-[10.5px] text-white/80 truncate">{bookingModal.detailAddress}</p>
              </div>
              <button
                onClick={() => { setBookingModal(null); setBookingConfirmed(null); }}
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-white text-xs"
              >?</button>
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
                    <div className="flex justify-between"><span className="text-slate-500">Hospital:</span><span className="font-semibold truncate max-w-[170px]">{bookingConfirmed.hospitalName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Patient:</span><span className="font-semibold">{bookingConfirmed.patientName}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Bed:</span><span className="font-semibold text-emerald-700">{bookingConfirmed.bedType}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Rate:</span><span className="font-bold font-mono">{'\u20B9'}{bookingConfirmed.price.toLocaleString('en-IN')}/day</span></div>
                  </div>
                  <p className="text-[9.5px] text-slate-400">Show this code at hospital emergency desk for priority triage.</p>
                  <button
                    onClick={() => { setBookingModal(null); setBookingConfirmed(null); }}
                    className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 block">Select Bed Category:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {bookingModal.bedCategories.map(bed => (
                        <button
                          type="button" key={bed.id} onClick={() => setSelectedBedId(bed.id)}
                          className={`relative h-16 rounded-xl overflow-hidden ring-2 transition ${selectedBedId === bed.id ? 'ring-emerald-500 shadow-xs' : 'ring-transparent'}`}
                        >
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
                    <input
                      required type="text" placeholder="Full Patient Name" value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                    />
                    <input
                      required type="tel" placeholder="Contact Mobile (+91)" value={patientContact}
                      onChange={(e) => setPatientContact(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900"
                    />
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl text-xs border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Bed Hold Deposit:</span>
                      <span className="font-bold text-slate-900 font-mono">{'\u20B9'}{bookingModal.bookingFee}</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">100% refundable on admission</div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                  >
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
