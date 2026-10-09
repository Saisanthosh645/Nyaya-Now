import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Mic, 
  HelpCircle, 
  ShieldCheck, 
  Scale, 
  ExternalLink 
} from 'lucide-react';
import { Language } from '../../types';
import { EvidenceItem, EvidenceEvent } from '../../services/evidenceIntelligenceService';

interface AskNyayaEvidencePanelProps {
  evidenceItems: EvidenceItem[];
  events: EvidenceEvent[];
  onAskQuestion: (question: string) => void;
  onOpenAssistantWithContext: () => void;
  onOpenVoiceAssistant?: () => void;
  language: Language;
}

export const AskNyayaEvidencePanel: React.FC<AskNyayaEvidencePanelProps> = ({
  evidenceItems,
  events,
  onAskQuestion,
  onOpenAssistantWithContext,
  onOpenVoiceAssistant,
  language
}) => {
  const samplePrompts = [
    'What happened according to this evidence timeline?',
    'Which documents mention the police notice?',
    'Explain the WhatsApp message exchange in the context of BNSS Section 35.',
    'Which dates and appearance windows should I double-check?',
    'What rights do I have when police summon me after this written acknowledgment?'
  ];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>INTEGRATED WITH FEATURE 01 & 02</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Ask Nyaya about this evidence record
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Connect your structured evidence into Nyaya's AI Legal Assistant with full context preserved.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onOpenVoiceAssistant && (
            <button
              type="button"
              onClick={onOpenVoiceAssistant}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
              title="Speak in your language"
            >
              <Mic className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenAssistantWithContext}
            className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
          >
            <span>Open AI Assistant</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
          Suggested Evidence Inquiries:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onAskQuestion(prompt)}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 text-left text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center justify-between gap-2 group cursor-pointer"
            >
              <span className="truncate">{prompt}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Safety statement */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>Statutory advice provided under BNSS 2023 & Constitution of India</span>
        </span>
        <span className="font-mono text-slate-500">
          {evidenceItems.length} files attached as context
        </span>
      </div>

    </div>
  );
};
