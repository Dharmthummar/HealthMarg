import React from 'react';

export default function LogoSvg({ width = 180, height = 180, animated = false, showText = true, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Animated Glow aura during preloader */}
        {animated && (
          <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-2xl animate-pulse" />
        )}

        {/* Pixel-perfect exact LOGO.png image */}
        <img
          src="/LOGO.png"
          alt="HealthMarg Logo"
          style={{ width: `${width}px`, height: `${height}px` }}
          className={`object-contain drop-shadow-md relative z-10 transition-transform ${
            animated ? 'animate-pulseGlow' : ''
          }`}
        />
      </div>

      {/* Brand Text below logo if showText is true */}
      {showText && (
        <div className="flex items-center tracking-tight mt-1">
          <span className="font-extrabold text-2xl sm:text-3xl text-[#072D4B] font-jakarta">Health</span>
          <span className="font-extrabold text-2xl sm:text-3xl text-emerald-600 font-jakarta">Marg</span>
        </div>
      )}
    </div>
  );
}
