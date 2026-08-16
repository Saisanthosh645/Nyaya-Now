import React from 'react';
import { AlertCircle, ArrowRight, ShieldCheck, Zap, Lock, BookOpen, Sparkles, Smartphone, Download, Scale } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { AshokaChakra } from './AshokaChakra';
import { LegalScalesAnimation } from './LegalScalesAnimation';

interface HeroProps {
  language: Language;
  onOpenEmergency: () => void;
  onExploreRights: () => void;
  onOpenDownloadModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  language, 
  onOpenEmergency, 
  onExploreRights,
  onOpenDownloadModal 
}) => {
  const t = translations[language];

  return (
    <section id="hero-section" className="relative bg-[#070D18] text-white overflow-hidden pt-10 pb-14 sm:py-16 md:py-20 border-b border-slate-800/80">
      
      {/* Background Graphic: Soft Indian Tricolor Ambient Glow Orbs */}
      <div className="absolute -top-28 -left-28 w-[420px] h-[420px] bg-amber-500/12 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] bg-emerald-500/12 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-500/6 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Sparkle Elements */}
      <div className="absolute top-16 left-12 sm:left-24 text-amber-400 opacity-60 animate-twinkle pointer-events-none">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute top-28 right-12 sm:right-28 text-emerald-400 opacity-60 animate-twinkle-delay-1 pointer-events-none">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-20 left-1/4 text-sky-400 opacity-40 animate-twinkle-delay-2 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      {/* Primary HD Rotating Ashoka Chakra Watermark - Centered & Right Offset */}
      <div className="absolute -right-20 sm:right-8 -top-12 sm:top-1/2 sm:-translate-y-1/2 opacity-[0.15] pointer-events-none z-0">
        <AshokaChakra
          size={460}
          speed="slow"
          color="#38bdf8"
          strokeWidth={1.7}
          glow={true}
        />
      </div>

      {/* Secondary Counter-Rotating Ashoka Chakra - Subtle Bottom Left */}
      <div className="hidden lg:block absolute -left-20 -bottom-20 opacity-[0.09] pointer-events-none z-0">
        <AshokaChakra
          size={340}
          speed="slow"
          reverse={true}
          color="#f59e0b"
          strokeWidth={1.5}
        />
      </div>

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Foreground Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Floating Pill: Sovereign Civic Badge + Download App Quick Action */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/90 text-xs font-bold text-amber-300 shadow-lg backdrop-blur-md animate-badge-glow">
            <AshokaChakra size={16} speed="medium" color="#38bdf8" strokeWidth={2.2} />
            <span>{t.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Small "Download App" button pill */}
          {onOpenDownloadModal && (
            <button
              id="hero-download-app-pill"
              onClick={onOpenDownloadModal}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/35 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer group shadow-sm hover:scale-105"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-bounce" />
              <span>Download Offline App</span>
              <Download className="w-3 h-3 text-emerald-400 opacity-75" />
            </button>
          )}
        </div>

        {/* Main Headings with balanced typography and glowing highlight */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-3 sm:mb-4 break-words">
          <span className="block">{t.heroHeading1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-emerald-400 drop-shadow-sm">
            {t.heroHeading2}
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-6 px-1 sm:px-0">
          {t.heroSubtext}
        </p>

        {/* Interactive Scales of Justice Emblem Animation */}
        <div className="flex justify-center mb-6">
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 border border-slate-700/70 shadow-xl backdrop-blur-md hover:border-amber-500/40 transition-colors">
            <LegalScalesAnimation size={170} interactive={true} />
          </div>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-6">
          
          {/* Primary large CTA with red urgency pulse */}
          <button
            id="hero-help-now-cta"
            onClick={onOpenEmergency}
            className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer group"
          >
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse text-white group-hover:scale-110 transition-transform" />
            <span>{t.helpNowBtn}</span>
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-explore-rights-cta"
            onClick={onExploreRights}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 active:bg-slate-700 text-slate-100 font-bold text-sm sm:text-base border border-slate-700 hover:border-slate-600 transition-all cursor-pointer backdrop-blur-xs group"
          >
            <span>{t.exploreRightsBtn}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subtext info */}
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 inline shrink-0" />
          <span>{t.heroFooter}</span>
        </div>

        {/* 30-Second Quick Features Strip */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-4 max-w-xl mx-auto mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-800/80 text-left">
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/50 xs:bg-transparent p-2.5 xs:p-0 rounded-lg border border-slate-700/50 xs:border-0 hover:border-amber-500/40 transition-colors">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold leading-tight">30-Second Quick Guides</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/50 xs:bg-transparent p-2.5 xs:p-0 rounded-lg border border-slate-700/50 xs:border-0 hover:border-emerald-500/40 transition-colors">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold leading-tight">BNSS 2023 Verified</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/50 xs:bg-transparent p-2.5 xs:p-0 rounded-lg border border-slate-700/50 xs:border-0 hover:border-sky-500/40 transition-colors">
            <Lock className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-semibold leading-tight">100% Offline & Private</span>
          </div>
        </div>

      </div>
    </section>
  );
};


