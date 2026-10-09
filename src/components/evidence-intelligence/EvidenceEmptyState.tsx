import React from 'react';
import { 
  Plus, 
  Sparkles, 
  FolderPlus, 
  CalendarClock, 
  SearchCheck, 
  ShieldCheck, 
  FileText, 
  Image, 
  MessageSquare,
  Lock,
  ArrowRight
} from 'lucide-react';
import { AshokaChakra } from '../AshokaChakra';

interface EvidenceEmptyStateProps {
  onAddEvidence: () => void;
  onLoadDemoData: () => void;
}

export const EvidenceEmptyState: React.FC<EvidenceEmptyStateProps> = ({
  onAddEvidence,
  onLoadDemoData
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-14 space-y-12">
      {/* Central Empty Hero Card */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto shadow-xl">
          <FolderPlus className="w-8 h-8 stroke-[1.8]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Your evidence workspace is empty.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Add the files, messages and documents connected to your situation. Nyaya will transform them into an indexed, chronological record.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onAddEvidence}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-sm transition-all shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Evidence</span>
          </button>

          <button
            type="button"
            onClick={onLoadDemoData}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 font-bold text-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Try Sample Evidence (DEMO DATA)</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 font-mono">
          Supports: Screenshots, Photos, WhatsApp exports, PDFs, Notices, Inward Receipts
        </p>
      </div>

      {/* 3 Visual Stages: COLLECT → ORGANIZE → UNDERSTAND */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4">
        
        {/* STAGE 1: COLLECT */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-purple-400 uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
              Stage 01
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <FolderPlus className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-white tracking-tight">
            COLLECT
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload scattered proof: WhatsApp screenshots, police notices, photos taken at the station, and complaint receipts. Multi-file upload supported.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300 pt-2">
            <Image className="w-3.5 h-3.5" />
            <span>Images • PDFs • Chats • Audio</span>
          </div>
        </div>

        {/* STAGE 2: ORGANIZE */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              Stage 02
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-white tracking-tight">
            ORGANIZE
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Files are classified, stamped with cryptographic SHA-256 integrity hashes, and automatically ordered into a vertical chronological timeline.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300 pt-2">
            <Lock className="w-3.5 h-3.5" />
            <span>SHA-256 Hashes • Timestamps</span>
          </div>
        </div>

        {/* STAGE 3: UNDERSTAND */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Stage 03
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <SearchCheck className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-base font-extrabold text-white tracking-tight">
            UNDERSTAND
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Identify participating police officers, detect missing context gaps, explore connections, and export a clean structured index for your advocate.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 pt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Entity Maps • Gap Analysis • Export</span>
          </div>
        </div>

      </div>

      {/* Trust & Neutrality Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
        <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Neutral Organization Assistant:</strong> Nyaya Now organizes scattered material into structured records. It does not replace forensic authentication or legal counsel, and never alters your original files.
        </p>
      </div>
    </div>
  );
};
