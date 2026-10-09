import React from 'react';
import { BookOpen, HelpCircle, Info, ChevronRight } from 'lucide-react';
import { ExplainedLegalTerm } from '../../services/documentIntelligenceService';

interface LegalTermsExplainedProps {
  terms: ExplainedLegalTerm[];
}

export const LegalTermsExplained: React.FC<LegalTermsExplainedProps> = ({ terms }) => {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            Legal terms, explained
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Demystifying Legalese
        </span>
      </div>

      {/* Grid of Legal Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {terms.map((t, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-2.5 hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-amber-300">
                {t.term}
              </h4>
              <span className="text-[10px] font-mono text-slate-500">
                {t.sourceReference}
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {t.explanation}
            </p>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1 text-[11px]">
              <div className="text-slate-400">
                <span className="font-bold text-slate-300">Context: </span>
                <span>{t.contextualMeaning}</span>
              </div>
              <div className="text-emerald-400/90">
                <span className="font-bold text-emerald-300">Why it matters: </span>
                <span>{t.whyItMatters}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
