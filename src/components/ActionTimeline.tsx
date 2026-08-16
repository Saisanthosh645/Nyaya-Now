import React from 'react';
import { ActionStep } from '../types';
import { AlertCircle } from 'lucide-react';

interface ActionTimelineProps {
  actions: ActionStep[];
}

export const ActionTimeline: React.FC<ActionTimelineProps> = ({ actions }) => {
  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {actions.map((act) => (
        <div key={act.number} className="relative group">
          
          {/* Step Number Circle */}
          <div className={`absolute -left-6 sm:-left-8 top-0 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
            act.urgent
              ? 'bg-red-600 text-white ring-4 ring-red-100'
              : 'bg-slate-900 text-white ring-4 ring-slate-100'
          }`}>
            {act.number}
          </div>

          {/* Action Step Card */}
          <div className={`bg-white rounded-xl p-4 sm:p-5 border transition-all ${
            act.urgent
              ? 'border-red-200 bg-gradient-to-r from-red-50/30 to-white'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}>
            <div className="flex items-center space-x-2 mb-1.5">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {act.title}
              </h4>
              {act.urgent && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-red-100 text-red-700">
                  <AlertCircle className="w-3 h-3" />
                  <span>Immediate</span>
                </span>
              )}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {act.instruction}
            </p>

            {act.detail && (
              <p className="text-xs text-slate-500 mt-2 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                💡 {act.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
