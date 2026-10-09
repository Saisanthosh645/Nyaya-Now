import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface EmergencyFloatingButtonProps {
  onOpenEmergency: () => void;
  language: Language;
}

export const EmergencyFloatingButton: React.FC<EmergencyFloatingButtonProps> = ({
  onOpenEmergency,
  language
}) => {
  const t = translations[language];

  return (
    <div className="md:hidden fixed bottom-4 right-3.5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <button
        id="floating-emergency-btn"
        onClick={onOpenEmergency}
        className="relative flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs shadow-xl shadow-red-600/50 border border-white/90 active:scale-95 transition-all cursor-pointer group"
        aria-label="Launch Emergency Rights Guide"
      >
        <span className="absolute -inset-0.5 rounded-full bg-red-500 animate-ping opacity-35 pointer-events-none"></span>
        <AlertCircle className="w-3.5 h-3.5 animate-pulse shrink-0 relative z-10" />
        <span className="tracking-wide relative z-10 text-[11px] font-extrabold">🚨 SOS</span>
      </button>
    </div>
  );
};

