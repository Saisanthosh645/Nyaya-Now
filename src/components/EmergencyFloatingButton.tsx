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
    <div className="md:hidden fixed bottom-5 right-4 z-40 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <button
        id="floating-emergency-btn"
        onClick={onOpenEmergency}
        className="relative flex items-center space-x-2 px-4 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-2xl shadow-red-600/60 border-2 border-white active:scale-95 transition-all cursor-pointer group"
        aria-label="Launch Emergency Rights Guide"
      >
        <span className="absolute -inset-0.5 rounded-full bg-red-500 animate-ping opacity-40 group-hover:opacity-75"></span>
        <AlertCircle className="w-4 h-4 animate-pulse shrink-0 relative z-10" />
        <span className="tracking-wide relative z-10">🚨 EMERGENCY GUIDE</span>
      </button>
    </div>
  );
};

