import React from 'react';
import { 
  FileText, 
  Search, 
  CalendarClock, 
  Network, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Lock,
  Layers,
  Info
} from 'lucide-react';

interface EvidenceProcessingPipelineProps {
  fileName: string;
  currentStage: number;
  statusText?: string;
  progressPercent: number;
}

interface PipelineStage {
  id: number;
  number: string;
  label: string;
  subLabel: string;
  category: 'FACT' | 'INFERENCE';
  icon: React.ReactNode;
}

export const EvidenceProcessingPipeline: React.FC<EvidenceProcessingPipelineProps> = ({
  fileName,
  currentStage,
  statusText,
  progressPercent
}) => {
  const stages: PipelineStage[] = [
    {
      id: 1,
      number: '01',
      label: 'Reading & Hashing',
      subLabel: 'File detected, MIME validated, SHA-256 integrity hash calculated',
      category: 'FACT',
      icon: <Lock className="w-4 h-4 text-purple-400" />
    },
    {
      id: 2,
      number: '02',
      label: 'Extracting Raw Data',
      subLabel: 'OCR character recognition & embedded camera/file metadata identified',
      category: 'FACT',
      icon: <FileText className="w-4 h-4 text-blue-400" />
    },
    {
      id: 3,
      number: '03',
      label: 'Understanding Entities & Dates',
      subLabel: 'Identifying named officers, citizens, stations, reference numbers & timestamps',
      category: 'FACT',
      icon: <Search className="w-4 h-4 text-amber-400" />
    },
    {
      id: 4,
      number: '04',
      label: 'Connecting Related Items',
      subLabel: 'Detecting potential chronological & contextual connections across evidence',
      category: 'INFERENCE',
      icon: <Network className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 5,
      number: '05',
      label: 'Organizing Evidence Record',
      subLabel: 'Updating indexed timeline, entity directory, and gap analysis',
      category: 'FACT',
      icon: <ShieldCheck className="w-4 h-4 text-purple-400" />
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-slate-800 shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
          <span>{statusText || 'Processing evidence item…'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Ingesting into Evidence Record
        </h3>

        <p className="text-xs text-slate-400 font-mono truncate max-w-xs mx-auto">
          File: {fileName}
        </p>
      </div>

      {/* Real-time Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Evidence Pipeline</span>
          <span className="text-purple-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 5-Stage Checklist */}
      <div className="space-y-2.5 pt-2">
        {stages.map((stage) => {
          const isDone = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3 p-3 rounded-2xl border transition-all duration-200 ${
                isDone
                  ? 'bg-purple-950/20 border-purple-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-purple-500/10 border-purple-500/50 text-white shadow-lg'
                  : 'bg-slate-900/30 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-500">
                    {stage.number}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs sm:text-sm font-bold truncate">
                    {stage.label}
                  </h5>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${
                      stage.category === 'FACT'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    }`}>
                      {stage.category === 'FACT' ? 'Fact' : 'Inference'}
                    </span>

                    {isDone && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                        ✓ Done
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  {stage.subLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Architecture Rule: Fact vs Inference Notice */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Fact vs. Inference:</strong> Nyaya strictly labels direct extractions (text, metadata timestamps) as facts and highlights potential relationships as AI inferences that require your review.
        </p>
      </div>

    </div>
  );
};
