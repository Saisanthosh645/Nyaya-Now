import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-inner">
      <div className="pl-2 pr-1 text-slate-400 flex items-center">
        <Globe className="w-3.5 h-3.5 text-slate-400" />
      </div>
      <div className="flex items-center gap-1">
        {LANGUAGES.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              title={lang.label}
            >
              {lang.nativeLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};
