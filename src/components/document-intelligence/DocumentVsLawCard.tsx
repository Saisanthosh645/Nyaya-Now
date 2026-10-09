import React from 'react';
import { FileText, Scale, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface DocumentVsLawCardProps {
  whatDocumentSays: string[];
  whatLawSays: string[];
}

export const DocumentVsLawCard: React.FC<DocumentVsLawCardProps> = ({
  whatDocumentSays,
  whatLawSays
}) => {
  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="space-y-1 border-b border-slate-800/80 pb-3">
        <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Document Evidence vs Statutory Law</span>
        </h3>
        <p className="text-xs text-slate-400">
          Crucial distinction: what the issuing officer printed versus what India's legal statutes actually mandate
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* COLUMN 1: WHAT YOUR DOCUMENT SAYS */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>DOCUMENT SAYS</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Direct Extract</span>
          </div>

          <div className="space-y-2">
            {whatDocumentSays.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
            Source: Text explicitly found in the uploaded file.
          </p>
        </div>

        {/* COLUMN 2: WHAT THE LAW SAYS */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE LAW SAYS</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">BNSS 2023 Verified</span>
          </div>

          <div className="space-y-2">
            {whatLawSays.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800">
            Source: Codified statutory rights & Supreme Court precedents.
          </p>
        </div>

      </div>
    </div>
  );
};
