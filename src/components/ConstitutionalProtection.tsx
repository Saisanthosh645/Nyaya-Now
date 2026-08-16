import { ExternalLink } from 'lucide-react';
import { ConstitutionalRight, Language } from '../types';

interface ConstitutionalProtectionProps {
  protection: ConstitutionalRight;
  language: Language;
}

export function ConstitutionalProtection({ protection, language }: ConstitutionalProtectionProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300/80 bg-linear-to-br from-amber-50/90 via-orange-50/40 to-amber-50/70 p-5 sm:p-6 shadow-xs">
      {/* Decorative top ribbon */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-amber-200/80">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇮🇳</span>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-900 block">
              {language === 'hi' ? 'संवैधानिक सुरक्षा' : language === 'te' ? 'రాజ్యాంగ రక్షణ' : 'Constitutional Protection'}
            </span>
            <span className="text-xs font-bold text-amber-800 font-mono">
              {protection.article}
            </span>
          </div>
        </div>

        <a
          href={protection.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors border border-amber-300/70"
        >
          <span>Constitution of India</span>
          <ExternalLink className="w-3 h-3 text-amber-800" />
        </a>
      </div>

      {/* Main explanation */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
        {protection.title}
      </h4>
      <p className="text-sm text-slate-700 leading-relaxed font-normal">
        {protection.plainExplanation}
      </p>

      {/* Scope & Exceptions */}
      {protection.scopeAndExceptions && (
        <div className="mt-3 pt-3 border-t border-amber-200/60 text-xs text-amber-950/80 flex items-start gap-2 bg-amber-100/40 p-2.5 rounded-xl">
          <span className="font-bold shrink-0">Scope & Exceptions:</span>
          <span>{protection.scopeAndExceptions}</span>
        </div>
      )}
    </div>
  );
}
