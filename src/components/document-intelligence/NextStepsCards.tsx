import React from 'react';
import { CheckSquare, ArrowRight, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { ActionStepDoc } from '../../services/documentIntelligenceService';

interface NextStepsCardsProps {
  actions: ActionStepDoc[];
}

export const NextStepsCards: React.FC<NextStepsCardsProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckSquare className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            Your next steps
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Actionable Guidance
        </span>
      </div>

      {/* Numbered Action Cards */}
      <div className="space-y-3">
        {actions.map((item) => (
          <div
            key={item.number}
            className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2 group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-black">
                  {item.number.toString().padStart(2, '0')}
                </span>
                <h5 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.action}
                </h5>
              </div>

              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold shrink-0 ${
                item.priority === 'high'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {item.priority} Priority
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pl-8">
              {item.reason}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 pl-8 text-[11px] text-slate-400 font-mono">
              {item.deadline && (
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Due: {item.deadline}</span>
                </div>
              )}
              <span className="text-slate-500">{item.sourceReference}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
