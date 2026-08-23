import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { ChevronRight, ShieldCheck, MapPin, Phone, AlertCircle } from 'lucide-react';
import { HOSPITALS } from '../data/mockData';
import confetti from 'canvas-confetti';

const logoBase = import.meta.env.BASE_URL || './';
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// Decode Google JWT credential (no backend needed)
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
  const [googleError, setGoogleError] = useState(null);
  const hosp = HOSPITALS[0];
  const totalVacant = hosp.bedCategories.reduce((s, b) => s + b.vacant, 0);
  const icuVacant = hosp.bedCategories.find(b => b.id === 'icu')?.vacant ?? 0;
  const needsClientId = !CLIENT_ID || CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE';

  const handleGoogleSuccess = (credentialResponse) => {
    const payload = decodeGoogleJWT(credentialResponse.credential);
    if (!payload) { setGoogleError('Failed to decode Google credentials. Please try again.'); return; }

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
    <div className="min-h-full bg-slate-50 p-4 space-y-4 pb-8 font-sans">

      {/* Brand Header */}
      <div className="text-center pt-4 space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 rounded-2xl shadow-xs mb-1">
          <img
            src={`${logoBase}LOGO.png`} alt="HealthMarg"
            className="w-10 h-10 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
          />
        </div>
        <div>
          <div className="flex items-center justify-center gap-1">
            <span className="font-extrabold text-2xl text-slate-900 font-jakarta tracking-tight">Health</span>
            <span className="font-extrabold text-2xl text-emerald-600 font-jakarta tracking-tight">Marg</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Connecting India's Heartland to Urban Healthcare
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            WellViva HealthTech India Pvt. Ltd. &bull; CIN: U62011GJ2025PTC164160
          </p>
        </div>
      </div>

      {/* Main Sign-in Card */}
      <div className="hm-card p-5 space-y-4">
        <div className="text-center">
          <h2 className="text-sm font-bold text-slate-900 font-jakarta">Sign in to continue</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time bed reservation &bull; Family stays &bull; Digital referral pass</p>
        </div>

        {needsClientId ? (
          /* Setup Required State */
          <div className="space-y-3">
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-amber-900">Google Sign-In Setup Required</span>
              </div>
              <p className="text-[10.5px] text-amber-800 leading-relaxed">
                To enable real Google login, add your Client ID to <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">E:\HealthMarg\.env</code>:
              </p>
              <code className="block text-[9.5px] bg-amber-100 border border-amber-200 text-amber-900 px-2 py-1.5 rounded-lg font-mono break-all">
                VITE_GOOGLE_CLIENT_ID=123...apps.googleusercontent.com
              </code>
              <p className="text-[9.5px] text-amber-700 leading-relaxed">
                Get one free at <strong>console.cloud.google.com</strong> &rarr; APIs &amp; Services &rarr; Credentials &rarr; OAuth 2.0 Client ID. Authorized origin: <code>http://localhost:5173</code>
              </p>
            </div>

            <button
              onClick={onExploreGuest}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-1"
            >
              <span>Explore as Guest (No Login)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Real Google Sign-In */
          <div className="space-y-3">
            {googleError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                {googleError}
              </div>
            )}

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setGoogleError('Google Sign-In failed. Please try again.')}
                shape="rectangular"
                size="large"
                width="320"
                text="continue_with"
                logo_alignment="left"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                onClick={onExploreGuest}
                className="text-xs text-slate-400 hover:text-slate-700 transition inline-flex items-center gap-1"
              >
                <span>Skip &amp; Explore as Guest</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sterling Hospitals Spotlight ? from Excel */}
      <div className="hm-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 font-jakarta">Our Tertiary Care Partner</span>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded border border-emerald-100">
            NABH &amp; NABL Accredited
          </span>
        </div>

        <div className="flex gap-3 items-center">
          <img
            src={hosp.image} alt={hosp.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-100"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-slate-900 font-jakarta">{hosp.name}</h3>
            <p className="text-[10.5px] text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{hosp.detailAddress}</span>
            </p>
            <div className="flex gap-1.5 mt-1.5">
              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100">
                {totalVacant} Beds Live
              </span>
              <span className="bg-rose-50 text-rose-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-rose-100">
                {icuVacant} ICU
              </span>
              <span className="bg-slate-100 text-slate-600 text-[9px] font-semibold px-1.5 py-0.5 rounded">
                53 Specialties
              </span>
            </div>
          </div>
        </div>

        <a
          href={`tel:${hosp.contactNo}`}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Call Sterling Hospitals: +91 {hosp.contactNo}</span>
        </a>
      </div>

      {/* Privacy & Compliance Notice */}
      <p className="text-center text-[9.5px] text-slate-400 leading-relaxed px-2">
        By signing in you agree to HealthMarg's Terms of Service &amp; Privacy Policy.
        Your Google profile (name, email, photo) is stored only in your browser session.
        We do not share your data with third parties.
      </p>
    </div>
  );
}
