import React from 'react';
import { AlertCircle, ArrowRight, ShieldCheck, Zap, Lock, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  language: Language;
  onOpenEmergency: () => void;
  onExploreRights: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenEmergency, onExploreRights }) => {
  const t = translations[language];

  return (
    <section id="hero-section" className="relative bg-slate-900 text-white overflow-hidden py-12 sm:py-16 md:py-20 border-b border-slate-800">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Small pill / badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-bold text-amber-400 mb-6 shadow-sm">
          <span>{t.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Main Headings */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 sm:mb-5 break-words">
          <span className="block">{t.heroHeading1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400">
            {t.heroHeading2}
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-6 sm:mb-10 px-1 sm:px-0">
          {t.heroSubtext}
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-6">
          
          {/* Primary large CTA */}
          <button
            id="hero-help-now-cta"
            onClick={onOpenEmergency}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
          >
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span>{t.helpNowBtn}</span>
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-explore-rights-cta"
            onClick={onExploreRights}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:bg-slate-700 text-slate-100 font-bold text-sm sm:text-base border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
          >
            <span>{t.exploreRightsBtn}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Subtext info */}
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 inline shrink-0" />
          <span>{t.heroFooter}</span>
        </div>

        {/* 30-Second Quick Features Strip */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-4 max-w-xl mx-auto mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-800/80 text-left">
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/40 xs:bg-transparent p-2 xs:p-0 rounded-lg">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold leading-tight">30-Second Quick Guides</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/40 xs:bg-transparent p-2 xs:p-0 rounded-lg">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold leading-tight">BNSS 2023 Verified</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/40 xs:bg-transparent p-2 xs:p-0 rounded-lg">
            <Lock className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-semibold leading-tight">100% Offline & Private</span>
          </div>
        </div>

      </div>
    </section>
  );
};
