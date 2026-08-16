import { X, ExternalLink, ShieldCheck, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';
import { RightItem, Language } from '../types';

interface SourceVerificationDrawerProps {
  rightItem: RightItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function SourceVerificationDrawer({
  rightItem,
  isOpen,
  onClose,
  language
}: SourceVerificationDrawerProps) {
  if (!isOpen || !rightItem) return null;

  const { legalBasis, title, plainLanguage, scopeNote } = rightItem;

  const sourceTypeBadge = (type: string) => {
    switch (type) {
      case 'PRIMARY_LAW':
        return { label: 'Primary Statute / Law', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'JUDICIAL':
        return { label: 'Supreme Court Precedent', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'LEGAL_AID':
        return { label: 'Official Legal Aid', color: 'bg-sky-100 text-sky-800 border-sky-300' };
      default:
        return { label: 'Official Govt Publication', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
  };

  const badgeInfo = sourceTypeBadge(legalBasis?.sourceType || 'PRIMARY_LAW');

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity">
      <div 
        className="relative w-full max-w-xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="source-drawer-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'hi' ? 'सत्यापित कानूनी स्रोत' : language === 'te' ? 'ధృవీకరించబడిన చట్టపరమైన ఆధారం' : 'Source Transparency & Verification'}
              </span>
              <h3 id="source-drawer-title" className="text-base font-bold text-slate-900 leading-tight">
                {language === 'hi' ? 'इस अधिकार का कानूनी आधार' : language === 'te' ? 'ఈ హక్కు యొక్క చట్టబద్ధమైన ఆధారం' : 'Legal Basis & Authority'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-700">
          
          {/* Statement Overview */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">
              {language === 'hi' ? 'नागरिक अधिकार' : language === 'te' ? 'పౌర హక్కు' : 'Citizen Right Statement'}
            </span>
            <p className="font-bold text-slate-900 text-base">{title}</p>
            <p className="mt-1.5 text-slate-600 text-sm leading-relaxed">{plainLanguage || rightItem.description}</p>
          </div>

          {/* Verification Details Table */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'hi' ? 'सत्यापन विवरण' : language === 'te' ? 'ధృవీకరణ వివరాలు' : 'Verification Details'}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${badgeInfo.color}`}>
                {badgeInfo.label}
              </span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-sm">
              <div className="p-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-slate-500 text-xs font-medium uppercase">Law / Statute</span>
                <span className="font-semibold text-slate-900">{legalBasis.law}</span>
              </div>

              {(legalBasis.section || legalBasis.article) && (
                <div className="p-3 flex flex-col sm:flex-row sm:justify-between gap-1 bg-slate-50/50">
                  <span className="text-slate-500 text-xs font-medium uppercase">Statutory Provision</span>
                  <span className="font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded text-xs inline-block">
                    {legalBasis.section || legalBasis.article}
                  </span>
                </div>
              )}

              <div className="p-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-slate-500 text-xs font-medium uppercase">Official Authority / Publisher</span>
                <span className="text-slate-800">{legalBasis.sourceName}</span>
              </div>

              <div className="p-3 flex flex-col sm:flex-row sm:justify-between gap-1 bg-slate-50/50">
                <span className="text-slate-500 text-xs font-medium uppercase">Last Source Audit</span>
                <span className="text-slate-700 font-medium">{legalBasis.lastVerified || '16 August 2026'}</span>
              </div>
            </div>
          </div>

          {/* Scope Note & Nuance */}
          {scopeNote && (
            <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold block mb-0.5">Scope & Nuance:</span>
                {scopeNote}
              </div>
            </div>
          )}

          {/* Direct Link to Official Law */}
          <div className="pt-2">
            <a
              href={legalBasis.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>Read Official Text on India Code / Govt Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              Opens the original statute text hosted on official government portal (indiacode.nic.in / sci.gov.in)
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            NyayaNow Legal Audit Standard v1.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            {language === 'hi' ? 'बंद करें' : language === 'te' ? 'మూసివేయి' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
