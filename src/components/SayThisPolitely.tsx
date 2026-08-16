import React, { useState } from 'react';
import { MessageSquareQuote, Copy, Check, Volume2, VolumeX, Sparkles, Share2 } from 'lucide-react';
import { SayThisPhrase, Language } from '../types';
import { translations } from '../data/translations';

interface SayThisPolitelyProps {
  phrases: SayThisPhrase[];
  language: Language;
  onShowToast: (msg: string) => void;
}

export const SayThisPolitely: React.FC<SayThisPolitelyProps> = ({ phrases, language, onShowToast }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const t = translations[language];

  const handleCopy = (phrase: SayThisPhrase) => {
    const textToCopy = language === 'hi' 
      ? phrase.hindi 
      : language === 'te' 
      ? phrase.telugu 
      : phrase.english;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(phrase.id);
    onShowToast(t.copied);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeak = (phrase: SayThisPhrase) => {
    if (!('speechSynthesis' in window)) {
      onShowToast('Audio not supported on this browser');
      return;
    }

    if (speakingId === phrase.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    let text = phrase.english;
    let langCode = 'en-IN';

    if (language === 'hi') {
      text = phrase.hindi;
      langCode = 'hi-IN';
    } else if (language === 'te') {
      text = phrase.telugu;
      langCode = 'te-IN';
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9; // Measured polite pace

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(phrase.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div id="say-this-politely-section" className="bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white rounded-2xl p-5 sm:p-6 border border-amber-200/80 shadow-sm mb-10">
      
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20">
          <MessageSquareQuote className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <span>{t.notSureWhatToSay}</span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
              Polite Scripts
            </span>
          </h3>
          <p className="text-xs text-slate-600">
            Use these respectful, non-confrontational phrases to assert your rights calmly.
          </p>
        </div>
      </div>

      {/* Speech bubbles list */}
      <div className="space-y-4">
        {phrases.map((phrase) => {
          const isCopied = copiedId === phrase.id;
          const isSpeaking = speakingId === phrase.id;

          const primaryText = language === 'hi' 
            ? phrase.hindi 
            : language === 'te' 
            ? phrase.telugu 
            : phrase.english;

          const secondaryEnglish = language !== 'en' ? phrase.english : null;

          return (
            <div
              key={phrase.id}
              className="bg-white rounded-xl p-4 sm:p-5 border border-amber-200 shadow-sm transition-all hover:border-amber-300"
            >
              {/* Context Tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                  {phrase.situation}
                </span>
                <span className="text-xs text-slate-400 italic">
                  {phrase.context}
                </span>
              </div>

              {/* Main Speech Quote */}
              <div className="relative pl-3 border-l-3 border-amber-500 my-3">
                <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                  “{primaryText}”
                </p>
                {secondaryEnglish && (
                  <p className="text-xs text-slate-500 mt-1 font-medium italic">
                    (English: “{secondaryEnglish}”)
                  </p>
                )}
              </div>

              {/* Action Buttons: Copy & Audio */}
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                
                {/* Audio read-aloud button */}
                <button
                  onClick={() => handleSpeak(phrase)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    isSpeaking 
                      ? 'bg-amber-600 text-white border-amber-600' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title="Listen to polite pronunciation"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600" />}
                  <span>{isSpeaking ? 'Stop' : t.listen}</span>
                </button>

                {/* Copy script button */}
                <button
                  onClick={() => handleCopy(phrase)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? t.copied : t.copySpeech}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
