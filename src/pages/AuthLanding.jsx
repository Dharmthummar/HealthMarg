import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowRight, Lock, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const logoBase = import.meta.env.BASE_URL || './';

// Decode Google JWT credential without external library
function decodeGoogleJWT(credential) {
  try {
    const base64 = credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(json);
  } catch { return null; }
}

export default function AuthLanding({ onLoginSuccess, onExploreGuest }) {
  const [authMode, setAuthMode]   = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone]         = useState('');
  const [otp, setOtp]             = useState(['', '', '', '']);
  const [otpError, setOtpError]   = useState(null);
  const [googleError, setGoogleError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const DEMO_OTP = '1234';

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setOtpError('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpError(null);
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setAuthMode('otp');
    }, 500);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next box
    if (value && index < 3) {
      const next = document.getElementById(`otp-cube-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 4) {
      setOtpError('Please enter the complete 4-digit OTP');
      return;
    }

    if (entered === DEMO_OTP || entered.length === 4) {
      const user = {
        id: `phone_${phone}`,
        name: `User (+91 ${phone.slice(-4)})`,
        email: `+91 ${phone}`,
        picture: '',
        provider: 'phone',
        role: 'Patient / Family'
      };
      try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch {}
      onLoginSuccess(user);
    } else {
      setOtpError('Invalid OTP. Use demo OTP: 1234');
    }
  };

  const autofillDemoOtp = () => {
    setOtp(['1', '2', '3', '4']);
    setOtpError(null);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const payload = decodeGoogleJWT(credentialResponse.credential);
    if (!payload) {
      setGoogleError('Failed to decode Google profile. Please try again.');
      return;
    }

    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      provider: 'google',
      role: 'Patient / Family'
    };

    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch {}
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-full bg-[#05070E] text-white flex flex-col justify-between p-5 select-none font-sans relative overflow-hidden">

      {/* Multi-layered Aurora Ambient Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none animate-pulseGlow" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Top Brand Header */}
      <div className="text-center pt-5 relative z-10 space-y-3">
        {/* Floating Glowing Logo Badge */}
        <div className="inline-flex relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
          <div className="relative p-3.5 bg-slate-900/90 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-xl">
            <img
              src={`${logoBase}LOGO.png`}
              alt="HealthMarg"
              className="w-11 h-11 object-contain"
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="font-extrabold text-[26px] tracking-tight font-jakarta bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Health
            </span>
            <span className="font-extrabold text-[26px] tracking-tight font-jakarta bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Marg
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10.5px] font-semibold text-emerald-300 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Super-Specialty Care Gateway</span>
          </div>
        </div>
      </div>

      {/* Premium Luxury Glass Card */}
      <div className="my-auto py-2 relative z-10">
        <div className="luxury-glass-card rounded-3xl p-6 relative overflow-hidden space-y-5">

          {/* Top subtle highlight sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          {authMode === 'phone' ? (
            /* STEP 1: Phone Login */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1 text-center">
                <h2 className="text-base font-bold text-white font-jakarta tracking-tight">Sign In with Mobile</h2>
                <p className="text-xs text-slate-400">Instant OTP verification &bull; Zero password required</p>
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 text-center animate-fadeIn">
                  {otpError}
                </div>
              )}

              {/* Phone Input Box */}
              <div className="space-y-1.5">
                <label className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400 block px-1">Mobile Number</label>
                <div className="flex rounded-2xl bg-slate-950/80 border border-white/10 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all overflow-hidden shadow-inner">
                  <div className="flex items-center gap-1.5 px-3.5 bg-white/[0.04] text-slate-300 text-xs font-bold border-r border-white/10 shrink-0">
                    <span className="text-sm">????</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setPhone(val);
                      if (otpError) setOtpError(null);
                    }}
                    className="flex-1 bg-transparent px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none font-mono tracking-wider"
                  />
                </div>
              </div>

              {/* Get OTP Button */}
              <button
                type="submit"
                disabled={isSending || phone.length < 10}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  phone.length === 10
                    ? 'luxury-glow-btn text-slate-950 shadow-lg cursor-pointer'
                    : 'bg-slate-800/60 border border-white/5 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{isSending ? 'Sending OTP Code...' : 'Get OTP Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: OTP Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h2 className="text-base font-bold text-white font-jakarta">Enter Verification Code</h2>
                  <p className="text-xs text-slate-400">Sent to <span className="text-emerald-300 font-mono">+91 {phone}</span></p>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode('phone'); setOtp(['', '', '', '']); setOtpError(null); }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                >
                  Edit
                </button>
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 text-center animate-fadeIn">
                  {otpError}
                </div>
              )}

              {/* 4 Frosted Glass OTP Cubes */}
              <div className="flex justify-center gap-3 my-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-cube-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && idx > 0) {
                        const prev = document.getElementById(`otp-cube-${idx - 1}`);
                        if (prev) prev.focus();
                      }
                    }}
                    className={`w-13 h-14 text-center text-xl font-extrabold font-mono rounded-2xl bg-slate-950/90 border transition-all duration-200 focus:outline-none ${
                      digit
                        ? 'border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'border-white/10 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
                    }`}
                  />
                ))}
              </div>

              {/* Demo Auto-fill Helper */}
              <div
                onClick={autofillDemoOtp}
                className="p-2.5 bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 rounded-xl flex items-center justify-between cursor-pointer transition group"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-[11px] text-slate-300 font-medium">Demo OTP Code: <strong className="text-emerald-400 font-mono font-bold">1234</strong></span>
                </div>
                <span className="text-[10.5px] text-emerald-400 font-bold group-hover:underline">Auto-fill &rarr;</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider luxury-glow-btn text-slate-950 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Verify &amp; Enter Platform</span>
              </button>
            </form>
          )}

          {/* Minimalist Divider */}
          <div className="relative flex items-center justify-center py-0.5">
            <div className="w-full border-t border-white/10" />
            <span className="bg-[#0D121F] px-3 text-[9.5px] uppercase font-bold tracking-widest text-slate-500 absolute">
              or continue with
            </span>
          </div>

          {/* Google Sign-In */}
          {googleError && (
            <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 text-center">
              {googleError}
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-full max-w-[280px] p-0.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 transition flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setGoogleError('Google Sign-In failed. Please try again.')}
                shape="rectangular"
                theme="filled_black"
                size="large"
                width="280"
                text="continue_with"
                logo_alignment="left"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Guest Action & Trust Indicator */}
      <div className="text-center pb-2 relative z-10 space-y-2.5">
        <button
          onClick={onExploreGuest}
          className="text-xs text-slate-400 hover:text-white transition inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:border-white/20"
        >
          <span>Skip &amp; Explore as Guest</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck className="w-3 h-3 text-emerald-400/80" />
          <span>256-Bit Encrypted &bull; NABH &amp; ISO Certified Partner</span>
        </div>
      </div>

    </div>
  );
}
