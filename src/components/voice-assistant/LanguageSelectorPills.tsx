import React, { useState } from 'react';
import { Globe, Sparkles, ChevronDown, ChevronUp, Check, Layers } from 'lucide-react';
import { SupportedVoiceLang, ALL_INDIAN_LANGUAGES, IndianLanguageMeta } from '../../services/voiceLanguageService';

interface LanguageSelectorPillsProps {
  selectedLanguage: SupportedVoiceLang;
  onSelectLanguage: (lang: SupportedVoiceLang) => void;
  disabled?: boolean;
}

export const LanguageSelectorPills: React.FC<LanguageSelectorPillsProps> = ({
  selectedLanguage,
  onSelectLanguage,
  disabled = false
}) => {
  const [showRoadmap, setShowRoadmap] = useState<boolean>(false);

  const activeLanguages: {
    id: SupportedVoiceLang;
    title: string;
    subtitle: string;
    flag: string;
    tag: string;
  }[] = [
    {
      id: 'auto',
      title: 'Auto Detect',
      subtitle: 'స్వయంచాలక · स्वतः',
      flag: '🌐',
      tag: 'AI Detection'
    },
    {
      id: 'te',
      title: 'తెలుగు',
      subtitle: 'Telugu',
      flag: '🇮🇳',
      tag: 'Native Speech'
    },
    {
      id: 'hi',
      title: 'हिंदी',
      subtitle: 'Hindi',
      flag: '🇮🇳',
      tag: 'Native Speech'
    },
    {
      id: 'en',
      title: 'English',
      subtitle: 'Indian English',
      flag: '🇮🇳',
      tag: 'Full Audio'
    }
  ];

  const upcomingLanguages = ALL_INDIAN_LANGUAGES.filter(l => l.status === 'upcoming');

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>Voice & Response Language</span>
        </label>
        <span className="text-[11px] text-amber-400/90 font-medium">
          Multi-dialect + Code-mixing enabled
        </span>
      </div>

      {/* Language Cards / Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {activeLanguages.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectLanguage(lang.id)}
              className={`relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-500/15 via-slate-900 to-amber-950/20 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.2)] text-white scale-[1.02]'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 text-slate-300'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {/* Top Row: Flag & Indicator */}
              <div className="w-full flex items-center justify-between mb-1.5">
                <span className="text-lg leading-none">{lang.flag}</span>
                {isSelected ? (
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>

              {/* Main Language Name */}
              <span className="text-sm font-extrabold tracking-tight text-white block">
                {lang.title}
              </span>

              {/* Secondary Script / Native Name */}
              <span className="text-[11px] text-slate-400 font-medium truncate block">
                {lang.subtitle}
              </span>

              {/* Sub-tag badge */}
              <span className={`mt-2 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md font-semibold tracking-wider ${
                isSelected
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {lang.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Future-Ready Architecture Notice & Expander */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowRoadmap(!showRoadmap)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors font-medium cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400/80" />
          <span>
            {showRoadmap ? 'Hide future Indian languages roadmap' : '10+ More Indian Languages Architecture (Roadmap)'}
          </span>
          {showRoadmap ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {showRoadmap && (
          <div className="mt-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Extensible Multilingual Indian Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              The speech normalization and statutory translation engine is pre-architected to support all major Eighth Schedule Indian languages without restructuring the UI:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {upcomingLanguages.map((l) => (
                <div
                  key={l.code}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-slate-300 block text-[11px]">{l.nativeName}</span>
                    <span className="text-[10px] text-slate-500">{l.name}</span>
                  </div>
                  <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-slate-800 text-amber-400/70 border border-slate-700">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
