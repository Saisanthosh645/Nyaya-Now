import React from 'react';
import { SpecialSafeguard, Language } from '../types';

interface SpecialSafeguardsProps {
  safeguards: SpecialSafeguard[];
  language: Language;
}

export function SpecialSafeguards({ safeguards, language }: SpecialSafeguardsProps) {
  if (!safeguards || safeguards.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          {language === 'hi' ? 'विशेष सुरक्षा और प्रावधान' : language === 'te' ? 'ప్రత్యేక రక్షణలు మరియు నిబంధనలు' : 'Special Safeguards for Vulnerable Groups'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {safeguards.map((sg, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-wide">
                {sg.title}
              </span>
              <span className="font-mono text-[11px] text-slate-500 font-semibold">
                {sg.statutoryProvision}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {sg.protection}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
