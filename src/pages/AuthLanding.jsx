import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Lock, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const logoBase = import.meta.env.BASE_URL || './';
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

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
  const [authMode, setAuthMode] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone]       = useState('');
  const [otp, setOtp]           = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(null);
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
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
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
      try { confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } }); } catch {}
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

    try { confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } }); } catch {}
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-full bg-[#090D16] text-white flex flex-col justify-between p-6 select-none font-sans relative overflow-hidden">

      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <div className="text-center pt-6 relative z-10 space-y-3">
        <div className="inline-flex items-center justify-center p-3.5 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-xl shadow-black/40 backdrop-blur-xl">
          <img
            src={`${logoBase}LOGO.png`}
            alt="HealthMarg"
            className="w-10 h-10 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
          />
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-extrabold text-2xl tracking-tight text-white font-jakarta">Health</span>
            <span className="font-extrabold text-2xl tracking-tight text-emerald-400 font-jakarta">Marg</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">
            Instant Bed Reservation &bull; Healthcare Corridors
          </p>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="my-auto py-4 relative z-10">
        <div className="bg-slate-900/80 border border-slate-800/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl shadow-black/60 space-y-5">

          {authMode === 'phone' ? (
            /* STEP 1: Enter Phone Number */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white font-jakarta">Login with Mobile</h2>
                <p className="text-xs text-slate-400">Enter your 10-digit phone number to receive OTP</p>
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                  {otpError}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex rounded-2xl bg-slate-950/80 border border-slate-800 focus-within:border-emerald-500 transition-all overflow-hidden">
                  <div className="flex items-center gap-1 px-3.5 bg-slate-900/90 text-slate-300 text-xs font-bold border-r border-slate-800">
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
                    className="flex-1 bg-transparent px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending || phone.length < 10}
                className={`w-full py-3 rounded-2xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  phone.length === 10
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{isSending ? 'Sending OTP...' : 'Get OTP Verification'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: Enter OTP */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h2 className="text-base font-bold text-white font-jakarta">Enter 4-Digit OTP</h2>
                  <p className="text-xs text-slate-400">Sent to +91 {phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode('phone'); setOtp(['', '', '', '']); setOtpError(null); }}
                  className="text-[11px] text-emerald-400 hover:underline font-medium"
                >
                  Edit
                </button>
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                  {otpError}
                </div>
              )}

              {/* OTP 4 Input Boxes */}
              <div className="flex justify-center gap-2.5 my-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && idx > 0) {
                        const prev = document.getElementById(`otp-input-${idx - 1}`);
                        if (prev) prev.focus();
                      }
                    }}
                    className="w-12 h-13 text-center text-lg font-extrabold font-mono rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition"
                  />
                ))}
              </div>

              {/* Demo OTP Helper Pill */}
              <div
                onClick={autofillDemoOtp}
                className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition group"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-[11px] text-slate-300 font-medium">Demo OTP Code: <strong className="text-emerald-400 font-mono font-bold">1234</strong></span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold underline">Auto-fill</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 transition active:scale-98 flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Verify &amp; Continue</span>
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="w-full border-t border-slate-800" />
            <span className="bg-slate-900 px-3 text-[10px] uppercase font-bold tracking-wider text-slate-500 absolute">
              or
            </span>
          </div>

          {/* Google Sign-In */}
          {googleError && (
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
              {googleError}
            </div>
          )}

          <div className="flex justify-center">
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

      {/* Bottom Guest Action */}
      <div className="text-center pb-2 relative z-10 space-y-2">
        <button
          onClick={onExploreGuest}
          className="text-xs text-slate-400 hover:text-white transition inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-slate-800/60"
        >
          <span>Skip &amp; Explore as Guest</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <p className="text-[10px] text-slate-600">
          Encrypted &bull; 100% Private HealthMarg Session
        </p>
      </div>

    </div>
  );
}
