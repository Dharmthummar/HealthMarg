import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm bg-slate-900/95 text-white border border-slate-700/90 rounded-2xl shadow-2xl p-3.5 flex items-center justify-between gap-3 animate-slideUp backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
        <p className="text-xs font-medium leading-snug">{message}</p>
      </div>

      <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
