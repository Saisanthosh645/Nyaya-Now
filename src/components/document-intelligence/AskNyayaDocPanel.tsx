import React from 'react';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { DocumentAnalysis } from '../../services/documentIntelligenceService';

interface AskNyayaDocPanelProps {
  document: DocumentAnalysis;
  onAskQuestion: (question: string) => void;
  onOpenAssistantWithContext: () => void;
}

export const AskNyayaDocPanel: React.FC<AskNyayaDocPanelProps> = ({
  document,
  onAskQuestion,
  onOpenAssistantWithContext
}) => {
  const defaultQuestions = [
    'What does this notice mean in simple terms?',
    'Do I legally have to appear on the specified date?',
    'What happens if I cannot attend on this date?',
    'What documents should I carry with me?',
    'Can police arrest me during this inquiry?'
  ];

  const questions =
    document.suggestedQuestions && document.suggestedQuestions.length > 0
      ? document.suggestedQuestions
      : defaultQuestions;

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 p-5 sm:p-6 shadow-2xl space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
            What would you like to understand?
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          Ask questions using this document ({document.referenceNumber}) as context in Feature 01 AI Assistant
        </p>
      </div>

      {/* Interactive Question Chips */}
      <div className="flex flex-wrap gap-2 pt-1">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onAskQuestion(q)}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/60 text-xs font-semibold text-slate-200 hover:text-white transition-all text-left cursor-pointer active:scale-95 shadow-sm"
          >
            + {q}
          </button>
        ))}
      </div>

      {/* Prominent CTA */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Connected to Nyaya Legal AI: </span>
          Full statutory conversational analysis with BNSS & Constitution guidance.
        </div>

        <button
          type="button"
          onClick={onOpenAssistantWithContext}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
        >
          <MessageSquare className="w-4 h-4 stroke-[2.5]" />
          <span>Ask Nyaya About This Document</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
