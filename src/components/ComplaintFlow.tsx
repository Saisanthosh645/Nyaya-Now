import React from 'react';
import { EscalationNode } from '../types';
import { ArrowDown, Clock, ShieldCheck, Building } from 'lucide-react';

interface ComplaintFlowProps {
  nodes: EscalationNode[];
}

export const ComplaintFlow: React.FC<ComplaintFlowProps> = ({ nodes }) => {
  return (
    <div className="space-y-3">
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;

        return (
          <React.Fragment key={node.level}>
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              
              {/* Level indicator strip */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {node.level}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {node.designation}
                  </span>
                </div>

                {node.timeframe && (
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{node.timeframe}</span>
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h4 className="text-base font-bold text-slate-900 mb-1">
                {node.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                {node.description}
              </p>

              {/* Recommended Action */}
              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-xs text-slate-700 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Next Action:</strong> {node.action}
                </span>
              </div>
            </div>

            {/* Downward arrow connector */}
            {!isLast && (
              <div className="flex justify-center py-1">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shadow-xs">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
