import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { ActionItem } from '../../services/aiLegalService';
import { Language } from '../../types';

interface ActionCardsProps {
  actions: ActionItem[];
  language: Language;
}

export const ActionCards: React.FC<ActionCardsProps> = ({ actions, language }) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  const title = isHi
    ? 'आपको क्या ध्यान में रखना चाहिए'
    : isTe
    ? 'మీరు పరిగణించవలసిన ముఖ్యమైన అంశాలు'
    : 'What you should consider';

  return (
    <div className="w-full my-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-7 backdrop-blur-xl shadow-lg shadow-black/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800/80">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Shield className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>🛡️</span>
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isHi
              ? 'संवैधानिक व वैधानिक सुरक्षा पर आधारित अनुशंसित कदम'
              : isTe
              ? 'రాజ్యాంగ మరియు చట్టపరమైన రక్షణల ఆధారంగా సిఫార్సు చేయబడిన చర్యలు'
              : 'Recommended actionable safeguards based on statutory law'}
          </p>
        </div>
      </div>

      {/* Sequential Action List */}
      <div className="grid grid-cols-1 gap-3 sm:gap-3.5">
        {actions.map((act, index) => (
          <div
            key={index}
            className="group flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700 hover:bg-slate-950/90 transition-all duration-200"
          >
            {/* Number Pill */}
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-sm">
              {act.number}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                {act.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {act.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
