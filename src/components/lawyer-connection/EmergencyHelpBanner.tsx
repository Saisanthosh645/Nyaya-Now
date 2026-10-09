import React from 'react';
import { PhoneCall, AlertTriangle, ShieldAlert } from 'lucide-react';

interface EmergencyHelpBannerProps {
  onDismiss?: () => void;
}

export const EmergencyHelpBanner: React.FC<EmergencyHelpBannerProps> = ({ onDismiss }) => {
  const numbers = [
    { label: 'All-India Police & Emergency', number: '112', highlight: true },
    { label: 'Police Control Room', number: '100', highlight: false },
    { label: 'Women Emergency Helpline', number: '1091', highlight: false },
    { label: 'Cyber Financial Fraud (1930)', number: '1930', highlight: false },
    { label: 'NALSA Legal Aid (Free)', number: '15100', highlight: false }
  ];

  return (
    <div className="w-full rounded-3xl bg-rose-950/40 border-2 border-rose-500/50 p-5 sm:p-7 shadow-2xl space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-rose-300">
              Immediate Safety First
            </h3>
            <p className="text-xs text-slate-300">
              If someone is in active physical danger, unlawful violence, or medical crisis, contact emergency services immediately.
            </p>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs text-rose-400 hover:text-white font-mono cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
        {numbers.map((item) => (
          <a
            key={item.number}
            href={`tel:${item.number}`}
            className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
              item.highlight
                ? 'bg-rose-500 text-slate-950 font-black border-rose-400 shadow-lg shadow-rose-500/20'
                : 'bg-slate-900/80 border-rose-500/30 text-rose-200 hover:bg-slate-800'
            }`}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider block opacity-90 truncate max-w-full">
              {item.label}
            </span>
            <span className="text-base sm:text-lg font-black flex items-center gap-1">
              <PhoneCall className="w-4 h-4" />
              <span>{item.number}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
