import React from 'react';
import { 
  AlertCircle, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileQuestion, 
  ShieldAlert, 
  Plus, 
  Info,
  Clock,
  MessageSquare
} from 'lucide-react';
import { EvidenceGap, EvidenceItem, WorkspaceMetrics } from '../../services/evidenceIntelligenceService';

interface EvidenceGapAnalysisProps {
  gaps: EvidenceGap[];
  metrics: WorkspaceMetrics;
  evidenceItems: EvidenceItem[];
  onAddEvidence: () => void;
  onSelectEvidenceById?: (id: string) => void;
}

export const EvidenceGapAnalysis: React.FC<EvidenceGapAnalysisProps> = ({
  gaps,
  metrics,
  evidenceItems,
  onAddEvidence,
  onSelectEvidenceById
}) => {
  return (
    <div className="w-full space-y-8">
      
      {/* 1. "YOUR EVIDENCE AT A GLANCE" */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Your Evidence at a Glance</span>
          </h3>
          <p className="text-xs text-slate-400">
            Categorization based strictly on documentation strength and context completeness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Strongly Documented */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Strongly Documented</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Facts directly supported by written physical notices, government stamped receipts, and clear message exports with dates.
            </p>
            <div className="text-[11px] font-mono text-emerald-300/90 pt-1">
              ✓ {metrics.totalDocuments} official documents & receipts preserved
            </div>
          </div>

          {/* Needs Clarification */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Needs Clarification</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Items where timestamps lack second-party verification, officer designation is unverified, or technical inconsistencies were flagged.
            </p>
            <div className="text-[11px] font-mono text-amber-300/90 pt-1">
              ⚠ {metrics.needsReviewCount} {metrics.needsReviewCount === 1 ? 'item requires' : 'items require'} manual confirmation
            </div>
          </div>

          {/* Missing Context */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-purple-400 font-extrabold text-xs uppercase tracking-wider">
              <FileQuestion className="w-4 h-4" />
              <span>Missing Context</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conversational or procedural gaps such as omitted earlier messages, missing visitor slips, or unrecorded oral requests.
            </p>
            <div className="text-[11px] font-mono text-purple-300/90 pt-1">
              🔍 {gaps.length} organizational observation gaps detected
            </div>
          </div>

        </div>
      </div>

      {/* 2. "WHAT MAY STILL BE MISSING?" */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-purple-400" />
            <span>What may still be missing?</span>
          </h3>
          <p className="text-xs text-slate-400">
            Organizational gap observations to help you build a complete, self-explanatory record
          </p>
        </div>

        {gaps.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 font-mono">
            No organizational gaps flagged. Evidence record is well-indexed.
          </div>
        ) : (
          <div className="space-y-3.5">
            {gaps.map((gap) => (
              <div
                key={gap.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        gap.severity === 'attention'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : gap.severity === 'missing-context'
                          ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                          : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                      }`}>
                        {gap.severity.replace('-', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {gap.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={onAddEvidence}
                    className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Proof</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {gap.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-200">Suggested Action:</strong> {gap.suggestedAction}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Principle */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Legal Boundary Disclaimer:</strong> This gap analysis notes organizational and record-keeping completeness. It never claims "you have enough evidence to win" or draws legal conclusions regarding guilt, innocence, or judicial admissibility.
        </p>
      </div>

    </div>
  );
};
