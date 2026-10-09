import React from 'react';
import { Users, User, Building, Shield, CheckCircle } from 'lucide-react';
import { ExtractedPerson } from '../../services/documentIntelligenceService';

interface EntitiesInvolvedProps {
  people: ExtractedPerson[];
}

export const EntitiesInvolved: React.FC<EntitiesInvolvedProps> = ({ people }) => {
  if (!people || people.length === 0) return null;

  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            Who is involved?
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Named Entities
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {people.map((p, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h5 className="text-xs sm:text-sm font-bold text-white truncate">
                  {p.name}
                </h5>
                <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                  ✓ High
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-normal line-clamp-1">
                {p.role}
              </p>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                {p.sourceReference}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
