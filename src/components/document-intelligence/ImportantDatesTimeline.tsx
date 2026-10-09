import React from 'react';
import { Calendar, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { ImportantDate } from '../../services/documentIntelligenceService';

interface ImportantDatesTimelineProps {
  dates: ImportantDate[];
  onDateClick?: (date: ImportantDate) => void;
}

export const ImportantDatesTimeline: React.FC<ImportantDatesTimelineProps> = ({
  dates,
  onDateClick
}) => {
  if (!dates || dates.length === 0) {
    return (
      <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 text-center text-xs text-slate-400">
        <Calendar className="w-6 h-6 text-slate-500 mx-auto mb-2" />
        <p className="font-semibold text-slate-300">No clear deadline found in the document.</p>
        <p className="text-[11px] text-slate-500">Dates are only listed when explicitly printed on the document.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            Important dates
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Chronological Timeline
        </span>
      </div>

      {/* Timeline items */}
      <div className="relative pl-4 sm:pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {dates.map((dt, idx) => (
          <div
            key={idx}
            onClick={() => onDateClick && onDateClick(dt)}
            className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
              dt.isDeadline
                ? 'bg-amber-500/10 border-amber-500/40 hover:border-amber-400 text-white shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
            }`}
          >
            {/* Timeline Dot Indicator */}
            <div
              className={`absolute -left-[21px] sm:-left-[29px] top-4 w-3.5 h-3.5 rounded-full border-2 ${
                dt.isDeadline
                  ? 'bg-amber-400 border-slate-950 ring-4 ring-amber-400/20 animate-pulse'
                  : 'bg-slate-600 border-slate-950'
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md font-mono text-xs font-black uppercase ${
                  dt.isDeadline
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {dt.formattedDate}
                </span>
                <span className="text-sm font-bold text-white">
                  {dt.label}
                </span>
              </div>

              <span className="text-[10px] font-mono text-slate-500 self-start sm:self-auto">
                {dt.sourceReference}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {dt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
