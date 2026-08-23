import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowRight, Lock, Sparkles, ChevronRight, ShieldCheck, Phone } from 'lucide-react';
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
    }, 450);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const next = document.getElementById(`otp-box-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 4) {
      setOtpError('Please enter the 4-digit code');
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
      setOtpError('Invalid code. Use demo code: 1234');
    }
  };

  const autofillDemoOtp = () => {
    setOtp(['1', '2', '3', '4']);
    setOtpError(null);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const payload = decodeGoogleJWT(credentialResponse.credential);
    if (!payload) {
      setGoogleError('Failed to verify Google account. Please try again.');
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
    <div className="min-h-full bg-[#FFFFFF] text-slate-900 flex flex-col justify-between p-6 select-none font-sans relative">

      {/* Top Classic Brand Header ? Seamlessly blended with white background logo */}
      <div className="text-center pt-6 space-y-3">
        <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white mb-0.5">
          <img
            src={`${logoBase}LOGO.png`}
            alt="HealthMarg Logo"
            className="w-14 h-14 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
          />
        </div>

        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="font-extrabold text-[24px] tracking-tight text-slate-900 font-jakarta">Health</span>
            <span className="font-extrabold text-[24px] tracking-tight text-emerald-600 font-jakarta">Marg</span>
          </div>
          <p className="text-[12px] text-slate-500 font-medium mt-0.5 tracking-tight">
            Connecting India's Heartland to Super-Specialty Care
          </p>
        </div>
      </div>

      {/* Classic Minimalist Login Card */}
      <div className="my-auto py-2">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-5">

          {authMode === 'phone' ? (
            /* STEP 1: Phone Number */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-[15px] font-bold text-slate-900 font-jakarta">Sign in with Mobile</h2>
                <p className="text-xs text-slate-500">Enter your 10-digit number to receive a verification code</p>
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                  {otpError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block px-0.5">
                  Mobile Number
                </label>
                <div className="flex rounded-2xl bg-slate-50 border border-slate-200 focus-within:border-slate-900 focus-within:bg-white transition-all overflow-hidden">
                  <div className="flex items-center gap-1 px-3.5 bg-slate-100/80 text-slate-700 text-xs font-semibold border-r border-slate-200 shrink-0">
                    <span className="text-xs font-bold text-slate-800">+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setPhone(val);
                      if (otpError) setOtpError(null);
                    }}
                    className="flex-1 bg-transparent px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending || phone.length < 10}
                className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  phone.length === 10
                    ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{isSending ? 'Sending Code...' : 'Get Verification Code'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: 4-Digit OTP Code */
            <form onSubmit={handleVerifyOtp} className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h2 className="text-[15px] font-bold text-slate-900 font-jakarta">Enter Verification Code</h2>
                  <p className="text-xs text-slate-500">Sent to +91 {phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setAuthMode('phone'); setOtp(['', '', '', '']); setOtpError(null); }}
                  className="text-xs text-emerald-700 hover:underline font-semibold"
                >
                  Edit
                </button>
              </div>

              {otpError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                  {otpError}
                </div>
              )}

              {/* 4 Clean Input Boxes */}
              <div className="flex justify-center gap-3 my-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-box-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && idx > 0) {
                        const prev = document.getElementById(`otp-box-${idx - 1}`);
                        if (prev) prev.focus();
                      }
                    }}
                    className={`w-13 h-14 text-center text-xl font-extrabold font-mono rounded-2xl border transition-all duration-150 focus:outline-none ${
                      digit
                        ? 'border-slate-900 bg-slate-50 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-900 focus:border-slate-900'
                    }`}
                  />
                ))}
              </div>

              {/* Instant Auto-fill Pill */}
              <div
                onClick={autofillDemoOtp}
                className="p-2.5 bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-xl flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs text-slate-600">Demo Code: <strong className="text-slate-900 font-mono">1234</strong></span>
                </div>
                <span className="text-xs text-emerald-700 font-bold hover:underline">Auto-fill &rarr;</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xs transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Verify &amp; Continue</span>
              </button>
            </form>
          )}

          {/* Minimalist Divider */}
          <div className="relative flex items-center justify-center py-0.5">
            <div className="w-full border-t border-slate-200" />
            <span className="bg-white px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 absolute">
              or continue with
            </span>
          </div>

          {/* Google Sign-In */}
          {googleError && (
            <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-center">
              {googleError}
            </div>
          )}

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setGoogleError('Google Sign-In failed. Please try again.')}
              shape="rectangular"
              theme="outline"
              size="large"
              width="280"
              text="continue_with"
              logo_alignment="left"
            />
          </div>

        </div>
      </div>

      {/* Bottom Guest Action */}
      <div className="text-center pb-2 space-y-2">
        <button
          onClick={onExploreGuest}
          className="text-xs text-slate-500 hover:text-slate-900 transition inline-flex items-center gap-1 py-1.5 px-3 rounded-full hover:bg-slate-100 font-medium"
        >
          <span>Skip &amp; Explore as Guest</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>NABH &amp; NABL Accredited Healthcare Network</span>
        </div>
      </div>

    </div>
  );
}
