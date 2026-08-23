import React, { useState } from 'react';
import { Wallet, Phone } from 'lucide-react';

export default function Support() {
  const [amount, setAmount]   = useState(250000);
  const [tenure, setTenure]   = useState(12);

  const emi = Math.round(amount / tenure);

  return (
    <div className="p-4 space-y-4 pb-8 font-sans bg-slate-50">

      {/* EMI Calculator */}
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="p-2.5 bg-teal-50 border border-teal-100 rounded-2xl">
            <Wallet className="w-4.5 h-4.5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 font-jakarta">0% Medical EMI</h1>
            <p className="text-[10px] text-slate-500">Estimate your hospital loan repayment</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Loan Amount Required:</span>
              <span className="font-bold text-slate-900 font-mono">{'\u20B9'}{amount.toLocaleString('en-IN')}</span>
            </div>
            <input type="range" min="25000" max="1000000" step="25000" value={amount}
              onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Repayment Period:</span>
              <span className="font-bold text-slate-900">{tenure} months</span>
            </div>
            <input type="range" min="3" max="24" step="3" value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
            <div>
              <span className="text-[10px] text-slate-500 block">Monthly EMI:</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">
                {'\u20B9'}{emi.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal">/mo</span>
              </span>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-100">0% Interest</span>
          </div>
        </div>
      </div>

      {/* Contact for Loan */}
      <div className="hm-card p-4 space-y-2.5">
        <h3 className="text-xs font-bold text-slate-900 font-jakarta">Apply for Loan / NGO Grant</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Partnered with Tata Trusts, WellViva Seva Foundation & Reliance Foundation for pediatric cardiac & oncology surgical grants up to {'\u20B9'}3,00,000. For Ayushman Bharat TPA desk assistance, contact:
        </p>
        <div className="space-y-1.5">
          <a href="tel:+919820462984" className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>+91 9820462984 (Naresh Tawde)</span>
          </a>
          <a href="tel:+919537995556" className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>+91 9537995556 (WellViva Support)</span>
          </a>
        </div>
      </div>

    </div>
  );
}
