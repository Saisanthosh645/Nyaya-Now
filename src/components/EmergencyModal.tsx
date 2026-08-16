import React, { useState } from 'react';
import { 
  AlertCircle, 
  X, 
  PhoneCall, 
  MessageSquareQuote, 
  Share2, 
  BookOpen, 
  Check, 
  Volume2, 
  VolumeX, 
  Copy,
  ChevronRight,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { Situation, Language } from '../types';
import { situations } from '../data/situations';
import { translations } from '../data/translations';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectSituationDetail: (slug: string) => void;
  onShowToast: (msg: string) => void;
  onOpenSos: () => void;
}

const emergencyScenarios = [
  { id: 'stopped-questioned', label: '🚔 Police stopped me', short: 'Questioned on street / traffic' },
  { id: 'arrest-detention', label: "🔒 I'm being arrested", short: 'Taken to police station / detained' },
  { id: 'fir-refusal', label: '📝 FIR is being refused', short: 'Police refuse to take complaint' },
  { id: 'search-property', label: "🔍 I'm being searched", short: 'Home, vehicle or bag search' },
  { id: 'threatened-assaulted', label: "⚠️ I'm being threatened / hurt", short: 'Physical abuse or assault' },
  { id: 'bribe-corruption', label: "💰 They're asking for money", short: 'Extortion or bribe demand' }
];

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectSituationDetail,
  onShowToast,
  onOpenSos
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('arrest-detention');
  const [showSayThis, setShowSayThis] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = translations[language];
  const activeSituation = situations.find(s => s.id === selectedScenarioId) || situations[1];

  const handleShare = () => {
    const text = `🚨 NyayaNow 30-Sec Emergency Guide: ${activeSituation.title}\n\n` +
      activeSituation.quick30SecSummary.map((s, idx) => `${idx + 1}. ${s}`).join('\n') +
      `\n\nVerified legal safeguards under BNSS 2023. More at: ${window.location.origin}`;

    if (navigator.share) {
      navigator.share({
        title: `NyayaNow - ${activeSituation.title}`,
        text: text,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(text);
        onShowToast(t.copied);
      });
    } else {
      navigator.clipboard.writeText(text);
      onShowToast(t.copied);
    }
  };

  const handleCopyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onShowToast(t.copied);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Audio not supported');
      return;
    }
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div id="emergency-mode-modal" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200">
      
      {/* Top Emergency Red Bar */}
      <div className="bg-red-600 text-white px-4 py-3 sm:py-4 shadow-lg sticky top-0 z-10 border-b border-red-700 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center animate-pulse">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold tracking-tight leading-tight">
              EMERGENCY RIGHTS GUIDE
            </h2>
            <p className="text-[11px] text-red-100 font-medium">
              Simplified Stress-Reduced View • BNSS 2023 Safeguards
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick SOS Dial */}
          <a
            href="tel:112"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white text-red-700 font-extrabold text-xs shadow-sm hover:bg-red-50 active:scale-95 transition-all"
            title="Call National Emergency 112"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>Call 112</span>
          </a>

          {/* Close Emergency Mode */}
          <button
            id="close-emergency-mode-btn"
            onClick={onClose}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-red-700/80 hover:bg-red-800 text-white text-xs font-bold transition-colors flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t.exitEmergency}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Step 1: Scenario Chooser */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
            {t.emergencyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            Tap the button that matches your immediate situation:
          </p>

          {/* 6 Large One-Tap Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {emergencyScenarios.map((sc) => {
              const isSelected = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioId(sc.id);
                    setShowSayThis(false);
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[85px] active:scale-[0.98] ${
                    isSelected
                      ? 'bg-red-600 border-white text-white shadow-xl shadow-red-600/30 scale-[1.02]'
                      : 'bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <span className="font-extrabold text-sm sm:text-base leading-snug">
                    {sc.label}
                  </span>
                  <span className={`text-[11px] font-medium mt-1 ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                    {sc.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: "DO THIS NOW" Action Block */}
        <div className="bg-slate-900 border-2 border-red-500/80 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-5">
          
          {/* Active Situation Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-800">
                🚨 {t.doThisNow}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-2">
                {activeSituation.title}
              </h4>
            </div>
            
            {/* Direct SOS helpline tag */}
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>National Helpline: <strong className="text-white">112</strong></span>
            </div>
          </div>

          {/* Large Numbered Steps (3-5 immediate steps) */}
          <div className="space-y-3.5">
            {activeSituation.quick30SecSummary.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3.5 bg-slate-950/80 rounded-xl p-3.5 sm:p-4 border border-slate-800"
              >
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-md">
                  {idx + 1}
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Polite Speech Quick Drawer */}
          {showSayThis && (
            <div className="mt-4 p-4 sm:p-5 rounded-xl bg-amber-950/40 border border-amber-600/50 space-y-3 animate-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Exact Phrases to Speak Calmly</span>
                </div>
                <button
                  onClick={() => setShowSayThis(false)}
                  className="text-xs text-amber-300 hover:underline"
                >
                  Hide
                </button>
              </div>

              <div className="space-y-2.5">
                {activeSituation.sayThis.map((ph) => {
                  const speechText = language === 'hi' ? ph.hindi : language === 'te' ? ph.telugu : ph.english;
                  const isCopied = copiedId === ph.id;
                  const isSpeaking = speakingId === ph.id;

                  return (
                    <div key={ph.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                      <p className="text-sm font-semibold text-white mb-2 leading-snug">
                        “{speechText}”
                      </p>
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleSpeak(speechText, ph.id)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1"
                        >
                          {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-amber-400" />}
                          <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                        </button>
                        <button
                          onClick={() => handleCopyScript(speechText, ph.id)}
                          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center space-x-1"
                        >
                          {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? t.copied : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Row: 3 Required Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            
            {/* Show me what to say */}
            <button
              id="emergency-what-to-say-btn"
              onClick={() => setShowSayThis(!showSayThis)}
              className={`py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all border ${
                showSayThis 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md' 
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-amber-500/40'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>{t.showWhatToSay}</span>
            </button>

            {/* Share these steps */}
            <button
              id="emergency-share-steps-btn"
              onClick={handleShare}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center space-x-2 border border-slate-700 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>{t.shareTheseSteps}</span>
            </button>

            {/* Read full rights */}
            <button
              id="emergency-full-rights-btn"
              onClick={() => {
                onClose();
                onSelectSituationDetail(activeSituation.slug);
              }}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center space-x-2 border border-slate-700 transition-all hover:border-slate-500"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>{t.readFullRights}</span>
            </button>
          </div>
        </div>

        {/* Safety Note */}
        <div className="text-center text-xs text-slate-400 py-2">
          <span>⚠️ Do not physically resist or confront police officers. Stay calm and insist politely on your legal rights.</span>
        </div>

      </div>
    </div>
  );
};
