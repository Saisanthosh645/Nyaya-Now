import React from 'react';
import { ShieldCheck, BookOpen, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { VerifiedLegalStatute, DocumentClaimSource } from '../../services/documentIntelligenceService';

interface SourceTraceabilityCardProps {
  documentSources: DocumentClaimSource[];
  legalSources: VerifiedLegalStatute[];
}

export const SourceTraceabilityCard: React.FC<SourceTraceabilityCardProps> = ({
  documentSources,
  legalSources
}) => {
  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            Why Nyaya says this
          </h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 font-bold">
          Verified Legal Traceability
        </span>
      </div>

      <div className="space-y-4">
        {/* Document Quotes */}
        {documentSources && documentSources.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Exact Document Citations</span>
            </h5>
            <div className="space-y-2">
              {documentSources.map((ds, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="font-bold text-slate-300">Page {ds.page} • {ds.paragraph || 'Notice'}</span>
                    <span className="text-emerald-400">Direct String Match</span>
                  </div>
                  <p className="text-slate-300 italic font-mono text-[11px] leading-relaxed">
                    {ds.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verifiable Statutes */}
        {legalSources && legalSources.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Codified Statutory Authority</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {legalSources.map((ls, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-300">{ls.section}</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                      ✓ Verified
                    </span>
                  </div>
                  <h6 className="font-bold text-white text-xs">{ls.title}</h6>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {ls.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
