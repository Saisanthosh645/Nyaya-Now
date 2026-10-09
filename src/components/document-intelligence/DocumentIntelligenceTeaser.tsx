import React from 'react';
import { FileText, Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface DocumentIntelligenceTeaserProps {
  language: Language;
  onOpenDocumentIntelligence: () => void;
}

export const DocumentIntelligenceTeaser: React.FC<DocumentIntelligenceTeaserProps> = ({
  language,
  onOpenDocumentIntelligence
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <section id="doc-intelligence-teaser" className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,6,23,0.8),0_0_30px_rgba(245,158,11,0.08)] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            {/* Feature 03 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-md">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
                03
              </span>
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase tracking-wider">
                {isHi ? 'दस्तावेज़ विश्लेषण' : isTe ? 'పత్ర విశ్లేషణ' : 'DOCUMENT INTELLIGENCE'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isHi
                ? 'नोटिस और कानूनी दस्तावेज़ अपलोड करें। अर्थ, तिथियां और कदम समझें।'
                : isTe
                ? 'నోటీసులు మరియు న్యాయ పత్రాలను అప్‌లోడ్ చేయండి. అర్థం, తేదీలు మరియు తదుపరి చర్యలను పొందండి.'
                : 'Upload notices and legal documents. Extract meaning, dates and actions.'}
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              {isHi
                ? 'पुलिस नोटिस, कोर्ट समन, एफआईआर या कानूनी कागजात अपलोड करें। न्याय महत्वपूर्ण विवरण निकालता है और सरल भाषा में समझाता है।'
                : isTe
                ? 'పోలీస్ నోటీసు, కోర్టు సమన్లు, ఎఫ్ఐఆర్ లేదా లీగల్ పత్రాలను అప్‌లోడ్ చేయండి. న్యాయ ముఖ్యమైన వివరాలను సంగ్రహించి సరళమైన భాషలో వివరిస్తుంది.'
                : 'Upload a police notice, summons, FIR copy, or legal paper. Nyaya transforms a difficult document into plain understanding, critical deadlines, and a step-by-step action plan.'}
            </p>

            {/* Supported Document Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
                🚨 Police Notices (BNSS § 35)
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
                ⚖️ Court Summons
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
                📄 FIR Copies
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                🔒 PII Privacy Shield
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenDocumentIntelligence}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer group active:scale-95"
              >
                <FileText className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <span>
                  {isHi ? 'दस्तावेज़ की जांच करें' : isTe ? 'పత్రాన్ని విశ్లేషించండి' : 'Analyze Legal Document'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Mock Document Preview */}
          <div className="w-full lg:w-96 p-5 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="font-mono text-slate-400">Notice_BNSS_35.pdf</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                ✓ High Confidence
              </span>
            </div>

            {/* Miniature Extraction Cards */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-[10px] font-mono text-slate-500 block">DOCUMENT TYPE</span>
                <span className="font-bold text-amber-300">Police Notice of Appearance</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 block">MANDATORY DATE</span>
                  <span className="font-bold text-white">18 OCT 2026, 10:30 AM</span>
                </div>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                <span className="text-[10px] font-mono text-emerald-400 block">YOUR PROTECTION</span>
                <span className="font-medium text-slate-200 text-[11px]">Cannot be arrested under BNSS § 35(5) upon compliance.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
