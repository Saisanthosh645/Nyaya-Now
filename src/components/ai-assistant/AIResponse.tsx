import React from 'react';
import { Scale, CheckCircle2, Clock } from 'lucide-react';
import { AIResponseData } from '../../services/aiLegalService';
import { Language } from '../../types';
import { ActionCards } from './ActionCards';
import { SayThisPolitely } from './SayThisPolitely';
import { LegalContext } from './LegalContext';
import { FollowUpQuestion } from './FollowUpQuestion';

interface AIResponseProps {
  data: AIResponseData;
  language: Language;
  onFollowUpSelect: (optionValue: string, optionLabel: string) => void;
  isFollowUpDisabled?: boolean;
}

export const AIResponse: React.FC<AIResponseProps> = ({
  data,
  language,
  onFollowUpSelect,
  isFollowUpDisabled = false,
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Main Assessment Card */}
      <div className="rounded-3xl bg-slate-950/80 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl shadow-black/40">
        {/* Scenario Badge & Timestamp */}
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>{data.scenarioTag}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{data.timestamp}</span>
          </div>
        </div>

        {/* Primary Understanding Header */}
        <div className="space-y-1.5 mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isHi ? 'मैं आपकी स्थिति को समझता हूँ।' : isTe ? 'నేను మీ పరిస్థితిని అర్థం చేసుకున్నాను.' : 'I understand your situation.'}
          </h2>
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent">
            {data.primaryAssessment}
          </h3>
        </div>

        {/* Concise Legal Framing Explanation */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
          {data.conciseExplanation}
        </p>
      </div>

      {/* 1. What You Should Consider Action Cards */}
      <ActionCards actions={data.actions} language={language} />

      {/* 2. Signature "SAY THIS POLITELY" Card */}
      <SayThisPolitely script={data.sayThis} defaultLanguage={language} />

      {/* 3. Relevant Legal Context (BNSS, Constitution, Safeguards) */}
      <LegalContext items={data.legalContext} language={language} />

      {/* 4. Follow-Up Question */}
      <FollowUpQuestion
        followUp={data.followUp}
        language={language}
        onSelectOption={onFollowUpSelect}
        disabled={isFollowUpDisabled}
      />
    </div>
  );
};
