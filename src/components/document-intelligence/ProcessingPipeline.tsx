import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Sparkles, FileText, Search, ShieldCheck, Scale } from 'lucide-react';

interface ProcessingPipelineProps {
  fileName: string;
  currentStage?: number;
  statusText?: string;
  progressPercent?: number;
}

interface StageStep {
  id: number;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
}

export const ProcessingPipeline: React.FC<ProcessingPipelineProps> = ({
  fileName,
  currentStage = 1,
  statusText,
  progressPercent = 20
}) => {
  const stages: StageStep[] = [
    {
      id: 1,
      label: 'Reading document & Optical Character Recognition (OCR)',
      subLabel: 'Extracting text and scanning character shapes using Tesseract OCR',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 2,
      label: 'Identifying statutory entities & details',
      subLabel: 'Parsing police stations, courts, case numbers, dates & named parties',
      icon: <Search className="w-4 h-4" />
    },
    {
      id: 3,
      label: 'Understanding legal context & classification',
      subLabel: 'Classifying document type (BNSS § 35 Notice / Summons / FIR / Memo)',
      icon: <Scale className="w-4 h-4" />
    },
    {
      id: 4,
      label: 'Extracting mandatory actions and deadlines',
      subLabel: 'Determining required compliance window & citizen safeguards',
      icon: <Clock className="w-4 h-4" />
    },
    {
      id: 5,
      label: 'Verifying legal references against BNSS 2023',
      subLabel: 'Cross-checking citations against Bharatiya Nagarik Suraksha Sanhita & Constitution',
      icon: <ShieldCheck className="w-4 h-4" />
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Top Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold border border-amber-400/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>{statusText || 'Analyzing your document…'}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
          Extracting → Understanding → Verifying
        </h3>
        <p className="text-xs text-slate-400 font-mono truncate max-w-xs mx-auto">
          File: {fileName}
        </p>
      </div>

      {/* Real-time Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>AI Pipeline</span>
          <span className="text-amber-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 5-Stage Checklist */}
      <div className="space-y-3 pt-2">
        {stages.map((stage) => {
          const isDone = currentStage > stage.id;
          const isCurrent = currentStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex items-start gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-lg'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] font-mono">
                    {stage.id}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-bold truncate">
                    {stage.label}
                  </h5>
                  {isDone && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                      ✓ Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase animate-pulse">
                      Processing…
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  {stage.subLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
