import React from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { FollowUpQuestionData } from '../../services/aiLegalService';
import { Language } from '../../types';

interface FollowUpQuestionProps {
  followUp: FollowUpQuestionData;
  language: Language;
  onSelectOption: (optionValue: string, optionLabel: string) => void;
  disabled?: boolean;
}

export const FollowUpQuestion: React.FC<FollowUpQuestionProps> = ({
  followUp,
  language,
  onSelectOption,
  disabled = false
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  const heading = isHi
    ? 'क्या आप स्थिति को और बेहतर समझना चाहते हैं?'
    : isTe
    ? 'పరిస్థితిని మరింత బాగా అర్థం చేసుకోవాలనుకుంటున్నారా?'
    : 'Want me to understand the situation better?';

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-amber-500/30 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-4 h-4 text-amber-400" />
        <h4 className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-amber-400">
          {heading}
        </h4>
      </div>

      <p className="text-base sm:text-lg font-semibold text-slate-100 mb-4">
        {followUp.question}
      </p>

      {/* Interactive Selection Buttons */}
      <div className="flex flex-wrap gap-2.5 sm:gap-3">
        {followUp.options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onSelectOption(opt.value, opt.label)}
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-950/80 hover:bg-amber-500 hover:text-slate-950 border border-slate-700 hover:border-amber-400 transition-all duration-200 shadow-sm cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{opt.label}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
