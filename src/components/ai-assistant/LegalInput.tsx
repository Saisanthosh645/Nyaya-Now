import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Shield, Trash2, Send, Terminal, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { VoiceInput } from './VoiceInput';
import { LanguageSelector } from './LanguageSelector';

interface LegalInputProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSubmit: (text: string) => void;
  isLoading: boolean;
  onClear: () => void;
  hasMessages: boolean;
  value: string;
  onChange: (val: string) => void;
}

export const LegalInput: React.FC<LegalInputProps> = ({
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
  onClear,
  hasMessages,
  value,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Auto-resize textarea as text grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        Math.max(textareaRef.current.scrollHeight, 84),
        260
      )}px`;
    }
  }, [value]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isHi = language === 'hi';
  const isTe = language === 'te';

  const placeholder = isHi
    ? 'न्याय को बताएं क्या हुआ...'
    : isTe
    ? 'ఏం జరిగిందో న్యాయకు చెప్పండి...'
    : 'Tell Nyaya what happened…';

  const exampleSubtitle = isHi
    ? 'उदाहरण: “पुलिस ने मुझे सड़क पर रोका और थाने चलने को कहा। मुझे कारण नहीं पता।”'
    : isTe
    ? 'ఉదాహరణ: “పోలీసులు నన్ను రోడ్డుపై ఆపి స్టేషన్‌కు రమ్మన్నారు. ఎందుకో నాకు తెలియదు.”'
    : '“The police stopped me on the road and asked me to come to the station. I don\'t know why.”';

  return (
    <div className="relative w-full">
      {/* Background ambient glow behind input card */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-blue-600/20 to-orange-500/20 blur-xl opacity-60 transition duration-500 pointer-events-none ${
          isFocused ? 'opacity-100 scale-[1.01]' : 'opacity-40'
        }`}
      />

      {/* Main Glassmorphic Terminal Card */}
      <div
        className={`relative rounded-3xl bg-slate-950/85 backdrop-blur-2xl border transition-all duration-300 shadow-[0_20px_50px_rgba(2,6,23,0.7),0_0_30px_rgba(245,158,11,0.06)] overflow-hidden ${
          isFocused
            ? 'border-amber-500/60 shadow-[0_20px_60px_rgba(15,23,42,0.9),0_0_35px_rgba(245,158,11,0.18)]'
            : 'border-slate-800/80 hover:border-slate-700/90'
        }`}
      >
        {/* Subtle Terminal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900/60 border-b border-slate-800/60 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-slate-300 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              NYAYA LEGAL INTELLIGENCE TERMINAL
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-block text-[11px] font-mono text-slate-400">
              BNSS 2023 · CONSTITUTION OF INDIA
            </span>
          </div>

          {/* Top Right Controls: Language Selector & Session Clear */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />

            {hasMessages && (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 bg-slate-900/50 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/50 transition-colors cursor-pointer"
                title="Clear current conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isHi ? 'साफ करें' : isTe ? 'క్లియర్' : 'Clear'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Input Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder={placeholder}
              rows={3}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base sm:text-lg focus:outline-none resize-none leading-relaxed min-h-[84px] font-normal"
            />
          </div>

          {/* Example guidance prompt shown when empty */}
          {!value && (
            <div className="text-xs sm:text-sm text-slate-500 italic mt-1 select-none pointer-events-none">
              {exampleSubtitle}
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 sm:pt-5 mt-2 border-t border-slate-800/60">
            {/* Left Tools: Voice Input & Privacy Badge */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
              <VoiceInput
                language={language}
                onTranscript={(transcribed) => {
                  onChange(value ? `${value} ${transcribed}` : transcribed);
                }}
                disabled={isLoading}
              />

              <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/40 px-2.5 py-1 rounded-lg border border-slate-800/60">
                <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>
                  {isHi
                    ? 'गोपनीय: ओटीपी या पासवर्ड साझा न करें'
                    : isTe
                    ? 'ప్రైవేట్: ఓటీపీ లేదా పాస్‌వర్డ్ పంచుకోవద్దు'
                    : 'Confidential: No OTPs or passwords required'}
                </span>
              </div>
            </div>

            {/* Primary Action Button: "Ask Nyaya →" */}
            <button
              type="submit"
              disabled={!value.trim() || isLoading}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-2xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:via-orange-300 hover:to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>
                {isHi ? 'न्याय से पूछें' : isTe ? 'న్యాయను అడగండి' : 'Ask Nyaya'}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-950 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        {/* Subtle bottom grid overlay texture */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </div>
    </div>
  );
};
