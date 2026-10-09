import React from 'react';
import { 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  BookOpen, 
  Sparkles, 
  Smartphone, 
  Download, 
  Scale, 
  Mic,
  Compass,
  FileText,
  FolderLock,
  Users,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';
import { AshokaChakra } from './AshokaChakra';
import { LegalScalesAnimation } from './LegalScalesAnimation';

interface HeroProps {
  language: Language;
  onOpenEmergency: () => void;
  onExploreRights: () => void;
  onOpenDownloadModal?: () => void;
  onOpenAiAssistant?: () => void;
  onNavigate?: (view: ActiveView) => void;
  onOpenSos?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  language, 
  onOpenEmergency, 
  onExploreRights,
  onOpenDownloadModal,
  onOpenAiAssistant,
  onNavigate,
  onOpenSos
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
      <div className="absolute -right-20 hidden xs:block xs:right-0 sm:right-8 -top-12 sm:top-1/2 sm:-translate-y-1/2 opacity-[0.15] pointer-events-none z-0">
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
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/90 text-xs font-bold text-amber-300 shadow-lg backdrop-blur-md animate-badge-glow">
            <AshokaChakra size={16} speed="medium" color="#38bdf8" strokeWidth={2.2} />
            <span>{t.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Small "Download App" button pill — Desktop */}
          {onOpenDownloadModal && (
            <button
              id="hero-download-app-pill"
              onClick={onOpenDownloadModal}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/35 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all cursor-pointer group shadow-sm hover:scale-105"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-bounce" />
              <span>Download Offline App</span>
              <Download className="w-3 h-3 text-emerald-400 opacity-75" />
            </button>
          )}

          {/* Quick jump to Feature 01 AI & Voice Legal Assistant — Desktop */}
          <button
            id="hero-ai-assistant-pill"
            onClick={() => {
              if (onOpenAiAssistant) {
                onOpenAiAssistant();
              } else if (onNavigate) {
                onNavigate({ type: 'ai-assistant' });
              } else {
                const el = document.getElementById('ai-legal-assistant');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 active:bg-amber-500/35 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all cursor-pointer group shadow-sm hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110" />
            <span>{language === 'hi' ? '01 एआई एवं वॉयस सहायक' : language === 'te' ? '01 ఏఐ & వాయిస్ అసిస్టెంట్' : '01 AI & Voice Legal Assistant'}</span>
            <Mic className="w-3 h-3 text-emerald-400 opacity-80" />
          </button>
        </div>

        {/* Main Headings with balanced typography and glowing highlight */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.2] mb-3 sm:mb-4 break-words">
          <span className="block">{t.heroHeading1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-emerald-400 drop-shadow-sm">
            {t.heroHeading2}
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-4 sm:mb-6 px-1 sm:px-0">
          {t.heroSubtext}
        </p>

        {/* Interactive Scales of Justice Emblem Animation */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="p-2 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 border border-slate-700/70 shadow-xl backdrop-blur-md hover:border-amber-500/40 transition-colors">
            <LegalScalesAnimation size={130} interactive={true} />
          </div>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-5">
          
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
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-400 inline shrink-0" />
          <span>{t.heroFooter}</span>
        </div>

        {/* ── ALL PLATFORM OPTIONS AT A GLANCE (MOBILE QUICK ACCESS HUB) ─────────── */}
        <div className="w-full max-w-4xl mx-auto pt-6 border-t border-slate-800/90 text-left">
          
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200">
                {language === 'hi' ? 'सभी कानूनी सुविधाएं एवं सेवाएं' : language === 'te' ? 'అన్ని చట్టపరమైన సేవలు & సాధనాలు' : 'All Citizen Services & Tools'}
              </h3>
            </div>
            <span className="text-[11px] text-amber-400/90 font-bold">1-Tap Access</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {/* Tool 1: AI Assistant */}
            <button
              onClick={() => onNavigate ? onNavigate({ type: 'ai-assistant' }) : (onOpenAiAssistant && onOpenAiAssistant())}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 border border-amber-500/30 hover:border-amber-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  VOICE + CHAT
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>AI Legal Assistant</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  24x7 Voice Room & Help
                </p>
              </div>
            </button>

            {/* Tool 2: Document Scanner */}
            <button
              onClick={() => onNavigate && onNavigate({ type: 'document-intelligence' })}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-slate-900/90 to-slate-950 border border-blue-500/30 hover:border-blue-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  OCR ANALYSIS
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-blue-300 transition-colors flex items-center gap-1">
                  <span>Docs Scanner</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  FIRs, Notices & Scans
                </p>
              </div>
            </button>

            {/* Tool 3: Evidence Workspace */}
            <button
              onClick={() => onNavigate && onNavigate({ type: 'evidence-intelligence' })}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-slate-900/90 to-slate-950 border border-purple-500/30 hover:border-purple-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <FolderLock className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SAFE VAULT
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  <span>Evidence Vault</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  Timestamps & Proof
                </p>
              </div>
            </button>

            {/* Tool 4: Lawyer & Authority Connect */}
            <button
              onClick={() => onNavigate && onNavigate({ type: 'lawyer-connection' })}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-teal-500/10 via-slate-900/90 to-slate-950 border border-teal-500/30 hover:border-teal-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  LEGAL AID
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-teal-300 transition-colors flex items-center gap-1">
                  <span>Connect Help</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  DLSA, PCA & Advocates
                </p>
              </div>
            </button>

            {/* Tool 5: 30-Sec Diagnostic */}
            <button
              onClick={() => onNavigate && onNavigate({ type: 'assessment' })}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900/90 to-slate-950 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  30 SECONDS
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Under Arrest?</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  Diagnostic Quiz
                </p>
              </div>
            </button>

            {/* Tool 6: Where to Complain */}
            <button
              onClick={() => onNavigate && onNavigate({ type: 'complaints' })}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 via-slate-900/90 to-slate-950 border border-rose-500/30 hover:border-rose-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  BNSS 173(4)
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-rose-300 transition-colors flex items-center gap-1">
                  <span>Complain Guide</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  SHO, SP & PCA Pathway
                </p>
              </div>
            </button>

            {/* Tool 7: SOS Helplines */}
            <button
              onClick={onOpenSos}
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-red-600/15 via-slate-900/90 to-slate-950 border border-red-500/40 hover:border-red-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
            >
              <div className="flex items-start justify-between">
                <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  DIAL 112
                </span>
              </div>
              <div className="mt-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-red-300 transition-colors flex items-center gap-1">
                  <span>Helplines</span>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  National 112 & 15100
                </p>
              </div>
            </button>

            {/* Tool 8: Offline App */}
            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900/90 to-slate-950 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all group cursor-pointer hover:scale-[1.02] shadow-sm flex flex-col justify-between min-h-[105px] sm:min-h-[125px]"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    OFFLINE
                  </span>
                </div>
                <div className="mt-2">
                  <h4 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <span>Offline App</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    Lockscreen Card & PWA
                  </p>
                </div>
              </button>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};


