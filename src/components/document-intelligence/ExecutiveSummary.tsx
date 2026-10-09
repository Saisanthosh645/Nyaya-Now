import React from 'react';
import { Sparkles, AlertTriangle, Info, Bell, CheckCircle2 } from 'lucide-react';
import { DocumentAnalysis } from '../../services/documentIntelligenceService';
import { Language } from '../../types';

interface ExecutiveSummaryProps {
  document: DocumentAnalysis;
  language: Language;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  document,
  language
}) => {
  // Localized plain explanation
  const getPlainWords = () => {
    if (language === 'hi' && document.summaryTranslations?.hi) {
      return document.summaryTranslations.hi;
    }
    if (language === 'te' && document.summaryTranslations?.te) {
      return document.summaryTranslations.te;
    }
    return document.summaryTranslations?.en || document.summary;
  };

  const plainWords = getPlainWords();
  const dontMiss = document.dontMissThis;

  return (
    <div className="w-full space-y-4">
      {/* 1. "In Simple Words" Executive Card */}
      <div className="rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
              In simple words
            </h3>
          </div>
          <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase">
            {language === 'te' ? 'సాధారణ వివరణ' : language === 'hi' ? 'सरल भाषा में' : 'Plain-Language Digest'}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
          {plainWords}
        </p>

        <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Note: Plain summary based strictly on text identified within {document.fileName}.</span>
        </div>
      </div>

      {/* 2. "Don't Miss This" Highlighted Alert Card */}
      {dontMiss && (
        <div className="rounded-3xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 p-5 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300">
              <div className="w-6 h-6 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                Don't miss this
              </h4>
            </div>

            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {dontMiss.sourceReference}
            </span>
          </div>

          <div className="space-y-1">
            <h5 className="text-sm sm:text-base font-bold text-amber-200">
              {dontMiss.heading}
            </h5>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {dontMiss.detail}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
