import React from 'react';
import { 
  FolderLock, 
  Sparkles, 
  Plus, 
  Download, 
  Trash2, 
  FileText, 
  Calendar, 
  Image, 
  AlertCircle, 
  CheckCircle2,
  Share2,
  RefreshCw,
  Layers
} from 'lucide-react';
import { WorkspaceMetrics } from '../../services/evidenceIntelligenceService';
import { Language } from '../../types';
import { AshokaChakra } from '../AshokaChakra';

interface EvidenceHeroProps {
  metrics: WorkspaceMetrics;
  onAddEvidence: () => void;
  onLoadDemoData: () => void;
  onExport: () => void;
  onClearWorkspace: () => void;
  language: Language;
  hasItems: boolean;
}

export const EvidenceHero: React.FC<EvidenceHeroProps> = ({
  metrics,
  onAddEvidence,
  onLoadDemoData,
  onExport,
  onClearWorkspace,
  language,
  hasItems
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Title & Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>04 / EVIDENCE INTELLIGENCE</span>
            <AshokaChakra size={12} color="#a855f7" speed="slow" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Turn scattered proof into a clear record.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Bring together screenshots, photos, messages and documents. Nyaya organizes them by date, type and context so you can understand what you have.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onAddEvidence}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Evidence</span>
          </button>

          {!hasItems ? (
            <button
              type="button"
              onClick={onLoadDemoData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Try Sample Evidence (DEMO)</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onExport}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                title="Export structured evidence record"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Export Record</span>
              </button>

              <button
                type="button"
                onClick={onClearWorkspace}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900 font-medium text-xs transition-colors cursor-pointer"
                title="Clear current workspace items"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Real-time Workspace Metrics Cards */}
      {hasItems && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Evidence Items</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{metrics.totalItems}</span>
              <span className="text-[10px] text-slate-500 font-mono">collected</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Timeline Events</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-300">{metrics.totalEvents}</span>
              <span className="text-[10px] text-slate-500 font-mono">chronological</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Documents</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-blue-300">{metrics.totalDocuments}</span>
              <span className="text-[10px] text-slate-500 font-mono">PDFs & notices</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-emerald-400" />
              <span>Screenshots</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-300">{metrics.totalScreenshots + metrics.totalMessages}</span>
              <span className="text-[10px] text-slate-500 font-mono">chats & photos</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Key Entities</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-cyan-300">{metrics.totalEntities}</span>
              <span className="text-[10px] text-slate-500 font-mono">parties & police</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border space-y-1 ${
            metrics.needsReviewCount > 0 
              ? 'bg-amber-500/10 border-amber-500/30' 
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 text-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Needs Review</span>
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-300">{metrics.needsReviewCount}</span>
              <span className="text-[10px] text-slate-400 font-mono">verify details</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
