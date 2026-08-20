import React, { useState } from 'react';
import { HOSPITALS } from '../data/mockData';
import { 
  Bed, ShieldCheck, Filter, Star, CheckCircle2, X, ChevronRight, Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BedBooking({ selectedHospital, setSelectedHospital, onBookingSuccess }) {
  const [filterType, setFilterType] = useState('all'); // all, icu, ventilator
  const [bookingModalHosp, setBookingModalHosp] = useState(selectedHospital || null);
  const [selectedBedClass, setSelectedBedClass] = useState('icu');
  const [patientForm, setPatientForm] = useState({
    patientName: 'Rameshwar Patel',
    age: '58',
    gender: 'Male',
    contact: '9825091234',
    referralCity: 'Mehsana, Gujarat'
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const filteredHospitals = HOSPITALS.filter(hosp => {
    if (filterType === 'icu') return hosp.icuVacant > 0;
    if (filterType === 'ventilator') return hosp.ventilatorsVacant > 0;
    return true;
  });

  const handleConfirmBooking = (e) => {
    e.preventDefault();

    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const confirmationCode = `HM-BED-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmData = {
      code: confirmationCode,
      hospName: bookingModalHosp.name,
      bedClass: selectedBedClass.toUpperCase(),
      patientName: patientForm.patientName,
      contact: patientForm.contact,
      fee: bookingModalHosp.bookingFee,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setBookingConfirmed(confirmData);
    if (onBookingSuccess) {
      onBookingSuccess(`ICU Bed Reserved at ${bookingModalHosp.name}! Reference Code: ${confirmationCode}`);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans bg-slate-50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#062A4E] to-[#0A4423] text-white rounded-3xl p-4 shadow-md border border-sky-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-emerald-400" />
            <h1 className="font-bold text-base font-jakarta">Real-Time Wards & ICU Beds</h1>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/30 animate-pulse">
            LIVE SYNC
          </span>
        </div>
        <p className="text-xs text-sky-200/80 mt-1">
          Direct bed availability & transparent booking from Heartland towns to Tier-I hospitals.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-3 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full transition font-medium active:scale-95 ${
              filterType === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Beds
          </button>
          <button
            onClick={() => setFilterType('icu')}
            className={`px-3 py-1 rounded-full transition font-medium active:scale-95 ${
              filterType === 'icu'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ICU Available
          </button>
          <button
            onClick={() => setFilterType('ventilator')}
            className={`px-3 py-1 rounded-full transition font-medium active:scale-95 ${
              filterType === 'ventilator'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Ventilator Available
          </button>
        </div>
      </div>

      {/* Hospital List Cards */}
      <div className="space-y-4">
        {filteredHospitals.map((hosp) => {
          const vacantPercent = Math.round((hosp.vacantBeds / hosp.totalBeds) * 100);
          return (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3"
            >
              <div className="flex gap-3">
                <img
                  src={hosp.image}
                  alt={hosp.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-inner bg-slate-100"
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.style.background = 'linear-gradient(135deg, #f1f5f9, #e2e8f0)'; }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 font-jakarta truncate">{hosp.name}</h3>
                    <div className="flex items-center text-amber-500 text-xs font-bold shrink-0 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                      <span>{hosp.rating}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{hosp.location}</p>

                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-sky-800 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>{hosp.accreditation}</span>
                  </div>

                  {/* Bed Occupancy Meter */}
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span className="text-slate-600">Vacant Beds: <strong className="text-emerald-600">{hosp.vacantBeds}</strong> / {hosp.totalBeds}</span>
                      <span className="text-rose-600 font-bold">ICU: {hosp.icuVacant} Vacant</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${vacantPercent + 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties Tag Cloud */}
              <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100">
                {hosp.specialties.map((spec, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">Bed Pricing from</span>
                  <span className="text-xs font-extrabold text-slate-900 font-jakarta">₹{hosp.bedPrices.general} <span className="text-[10px] font-normal text-slate-500">/day</span></span>
                </div>

                <button
                  onClick={() => {
                    setBookingModalHosp(hosp);
                    setBookingConfirmed(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1 active:scale-95"
                >
                  <span>Reserve Bed</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bed Reservation Modal */}
      {bookingModalHosp && (
        <div className="fixed inset-0 z-[55] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-4 w-full max-w-sm shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto no-scrollbar animate-scaleIn">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-white font-jakarta">{bookingModalHosp.name}</h3>
                <p className="text-xs text-emerald-400">Real-time Bed Reservation</p>
              </div>
              <button
                onClick={() => { setBookingModalHosp(null); setBookingConfirmed(null); }}
                className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If Confirmed, Show Receipt */}
            {bookingConfirmed ? (
              <div className="space-y-4 text-center py-2 animate-scaleIn">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-extrabold text-lg text-white font-jakarta">Bed Reserved Successfully!</h4>
                  <p className="text-xs text-slate-300">Priority Admission Pass Generated</p>
                </div>

                <div className="bg-slate-800/90 rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-700 font-mono">
                  <div className="flex justify-between border-b border-slate-700 pb-2">
                    <span className="text-slate-400">Ref Code:</span>
                    <span className="text-emerald-400 font-bold">{bookingConfirmed.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <span className="text-white">{bookingConfirmed.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hospital:</span>
                    <span className="text-white">{bookingConfirmed.hospName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bed Category:</span>
                    <span className="text-emerald-400 font-bold">{bookingConfirmed.bedClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booking Fee:</span>
                    <span className="text-white font-bold">₹{bookingConfirmed.fee}</span>
                  </div>
                </div>

                {/* SMS Notification Simulator */}
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-left text-[11px] text-emerald-200 space-y-1">
                  <span className="font-bold block text-emerald-400">📱 SMS Sent to +91 {bookingConfirmed.contact}:</span>
                  <p>
                    "HealthMarg Pass: {bookingConfirmed.code} for {bookingConfirmed.patientName} reserved at {bookingConfirmed.hospName}. Show at Triage Gate."
                  </p>
                </div>

                <button
                  onClick={() => { setBookingModalHosp(null); setBookingConfirmed(null); }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95"
                >
                  Done & Close
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                
                {/* Select Bed Class */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Select Bed Category:</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'icu', label: 'ICU Bed', price: bookingModalHosp.bedPrices.icu, vacant: bookingModalHosp.icuVacant },
                      { id: 'general', label: 'General Ward', price: bookingModalHosp.bedPrices.general, vacant: bookingModalHosp.generalVacant },
                      { id: 'semiPrivate', label: 'Semi-Private', price: bookingModalHosp.bedPrices.semiPrivate, vacant: 4 },
                      { id: 'private', label: 'Private Room', price: bookingModalHosp.bedPrices.private, vacant: bookingModalHosp.deluxeVacant }
                    ].map(bed => (
                      <button
                        type="button"
                        key={bed.id}
                        onClick={() => setSelectedBedClass(bed.id)}
                        className={`p-2.5 rounded-xl border text-left transition active:scale-95 ${
                          selectedBedClass === bed.id
                            ? 'bg-emerald-950/60 border-emerald-500 text-white font-bold shadow-md'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-semibold text-white font-jakarta">{bed.label}</div>
                        <div className="text-[10px] text-emerald-400">₹{bed.price} / day</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">{bed.vacant} vacant</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attached Doctors Preview */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-sky-400" />
                    <span>On-Duty Super-Specialists:</span>
                  </label>
                  <div className="space-y-1">
                    {bookingModalHosp.doctors.map((doc, idx) => (
                      <div key={idx} className="p-2 bg-slate-800/50 rounded-lg text-[11px] flex justify-between">
                        <div>
                          <span className="font-bold text-white block">{doc.name}</span>
                          <span className="text-slate-400">{doc.spec} ({doc.exp})</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono self-center">{doc.opdTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Patient Form Details */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block">Patient Details:</label>
                  <input
                    type="text"
                    required
                    placeholder="Patient Full Name"
                    value={patientForm.patientName}
                    onChange={(e) => setPatientForm({ ...patientForm, patientName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Age (e.g. 58)"
                      value={patientForm.age}
                      onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                      className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Contact Mobile"
                      value={patientForm.contact}
                      onChange={(e) => setPatientForm({ ...patientForm, contact: e.target.value })}
                      className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Pricing & Fee Summary */}
                <div className="p-3 bg-slate-800/80 rounded-xl space-y-1 text-xs border border-slate-700">
                  <div className="flex justify-between text-slate-400">
                    <span>Hospital Bed Booking Fee:</span>
                    <span className="text-white font-mono font-bold">₹{bookingModalHosp.bookingFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[10px]">
                    <span>Refund Policy:</span>
                    <span className="text-emerald-400 font-semibold">100% Refundable within 2 hrs</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition active:scale-95"
                >
                  Confirm Bed Hold & Generate Pass (₹{bookingModalHosp.bookingFee})
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
