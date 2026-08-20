import React, { useState } from 'react';
import { Wallet, ShieldCheck, Heart, Sparkles, CheckCircle2, ChevronRight, Calculator, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Support({ onBookingSuccess }) {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [loanTenure, setLoanTenure] = useState(12);
  const [approvedLoan, setApprovedLoan] = useState(false);

  const calculateEmi = () => {
    return Math.round(loanAmount / loanTenure);
  };

  const handleApplyLoan = (e) => {
    e.preventDefault();
    try { confetti({ particleCount: 70, spread: 60 }); } catch (err) {}

    setApprovedLoan(true);
    if (onBookingSuccess) {
      onBookingSuccess(`0% EMI Loan Pre-Approved for ₹${loanAmount.toLocaleString()}! Hospital bill payment guaranteed.`);
    }
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#062A4E] to-[#047857] text-white rounded-3xl p-4 shadow-xl border border-teal-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <h1 className="font-bold text-base font-jakarta">Financial & Counselling Support</h1>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/30">
            0% Interest EMI
          </span>
        </div>
        <p className="text-xs text-sky-200/80 mt-1">
          Instant medical financing, NGO trust grants & caregiver mental wellbeing support.
        </p>
      </div>

      {/* 1. Instant 0% EMI Loan Pre-Approval Calculator */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-jakarta">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <h3>Instant Medical Bill Loan Calculator</h3>
        </div>

        {approvedLoan ? (
          <div className="space-y-3 text-center py-2 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 animate-scaleUp">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 font-jakarta">Pre-Approval Granted!</h4>
            <p className="text-xs text-slate-600">
              ₹{loanAmount.toLocaleString()} loan approved at 0% EMI (₹{calculateEmi().toLocaleString()}/mo for {loanTenure} months). Direct hospital billing active.
            </p>

            <button
              onClick={() => setApprovedLoan(false)}
              className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
            >
              Recalculate Loan
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyLoan} className="space-y-4 text-xs">
            
            {/* Amount Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Hospital Expenses Amount:</span>
                <span className="font-extrabold text-slate-900 font-mono text-sm">₹{loanAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="500000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Tenure Selector */}
            <div className="space-y-1.5">
              <label className="text-slate-500 font-medium block">Select Tenure (0% EMI):</label>
              <div className="grid grid-cols-3 gap-2">
                {[6, 12, 24].map((tenure) => (
                  <button
                    type="button"
                    key={tenure}
                    onClick={() => setLoanTenure(tenure)}
                    className={`py-2 rounded-xl border text-xs font-bold transition ${
                      loanTenure === tenure
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tenure} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated EMI Display */}
            <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Monthly EMI (0% Interest)</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">₹{calculateEmi().toLocaleString()} <span className="text-[10px] font-normal text-slate-300">/month</span></span>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
              >
                Apply Pre-Approval
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. NGO Trust Financial Relief Aid */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-jakarta">
          <Heart className="w-4 h-4 text-rose-500" />
          <h3>NGO Trust Financial Aid Matcher</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          HealthMarg connects Heartland BPL & vulnerable families with Tata Trust, Being Human Foundation, and District Relief Funds to subsidize surgeries.
        </p>

        <button
          onClick={() => alert("NGO Matcher: 3 Trust Grant applications submitted for review!")}
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Check Eligible NGO Grants</span>
        </button>
      </div>

      {/* 3. Patient & Caregiver Mental Wellbeing Counselling */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-jakarta">
          <MessageSquare className="w-4 h-4 text-sky-600" />
          <h3>Mental Wellbeing & Counselling</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Connect with certified clinical counsellors for patients & relatives coping with critical illness anxiety, surgery fears, and recovery care.
        </p>

        <button
          onClick={() => alert("Counselling session booked with Senior Clinical Psychologist!")}
          className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition shadow"
        >
          Book 1-on-1 Support Session (Free)
        </button>
      </div>

    </div>
  );
}
