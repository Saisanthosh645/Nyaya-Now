import React, { useState, useEffect } from 'react';
import { Copy, Check, Volume2, VolumeX, Languages, Sparkles, MessageSquareQuote } from 'lucide-react';
import { SayThisScript } from '../../services/aiLegalService';
import { Language } from '../../types';

interface SayThisPolitelyProps {
  script: SayThisScript;
  defaultLanguage: Language;
}

export const SayThisPolitely: React.FC<SayThisPolitelyProps> = ({
  script,
  defaultLanguage
}) => {
  const [activeLang, setActiveLang] = useState<Language>(defaultLanguage);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    setActiveLang(defaultLanguage);
  }, [defaultLanguage]);

  const isHi = activeLang === 'hi';
  const isTe = activeLang === 'te';

  // Determine current active script
  const currentText =
    activeLang === 'hi'
      ? script.hindi
      : activeLang === 'te'
      ? script.telugu
      : script.english;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert(isTe ? 'ఈ బ్రౌజర్‌లో స్పీచ్ సింథసిస్ సపోర్ట్ లేదు.' : isHi ? 'इस ब्राउज़र में स्पीच सिंथेसिस समर्थित नहीं है।' : 'Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.rate = 0.92; // Slightly measured, calm cadence
    utterance.pitch = 1.0;

    if (activeLang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (activeLang === 'te') {
      utterance.lang = 'te-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative w-full my-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-slate-950/80 border-2 border-amber-500/40 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_15px_40px_rgba(245,158,11,0.12)] overflow-hidden">
      {/* Decorative top illumination beam */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2.5">
          <span className="text-xl sm:text-2xl leading-none">🗣️</span>
          <div>
            <h3 className="text-base sm:text-lg font-black tracking-wide uppercase text-amber-300 flex items-center gap-2">
              {isTe ? 'మర్యాదగా ఇలా చెప్పండి' : isHi ? 'विनम्रता से यह कहें' : 'SAY THIS POLITELY'}
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                {isTe ? 'డీ-ఎస్కలేషన్ స్క్రిప్ట్' : isHi ? 'शांतिपूर्ण समाधान' : 'DE-ESCALATION SCRIPT'}
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              {isTe
                ? 'గౌరవప్రదమైన, ప్రశాంతమైన మరియు రాజ్యాంగ రక్షణతో కూడిన మాటలు'
                : isHi
                ? 'सम्मानजनक, शांत और संवैधानिक रूप से सुरक्षित भाषा'
                : 'Respectful, calm, and constitutionally protective phrasing'}
            </p>
          </div>
        </div>

        {/* Translation Language Selector */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-amber-500/30 self-start sm:self-auto">
          <Languages className="w-3.5 h-3.5 text-amber-400 ml-1.5 mr-0.5" />
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeLang === 'en'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('hi')}
            className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeLang === 'hi'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('te')}
            className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeLang === 'te'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            తెలుగు
          </button>
        </div>
      </div>

      {/* Signature Spoken Script Quote Box */}
      <div className="relative my-4 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30">
        <MessageSquareQuote className="absolute top-3 right-3 w-8 h-8 text-amber-500/15 pointer-events-none" />
        <p className="text-base sm:text-lg md:text-xl font-medium text-amber-100 leading-relaxed tracking-wide select-all">
          {currentText}
        </p>
      </div>

      {/* Action Buttons: Copy, Listen, Translate */}
      <div className="flex items-center flex-wrap gap-2.5 pt-2">
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-amber-400/50 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-bold">
                {isTe ? 'కాపీ చేయబడింది' : isHi ? 'कॉपी हो गया' : 'Copied to clipboard'}
              </span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{isTe ? 'కాపీ' : isHi ? 'कॉपी' : 'Copy'}</span>
            </>
          )}
        </button>

        {/* Listen (TTS) Button */}
        <button
          type="button"
          onClick={handleToggleAudio}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-95 ${
            isPlayingAudio
              ? 'bg-amber-500 text-slate-950 font-bold animate-pulse'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-amber-400/50'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-950" />
              <span>{isTe ? 'ఆపండి' : isHi ? 'रोकें' : 'Stop audio'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>{isTe ? 'వినండి' : isHi ? 'सुनें' : 'Listen'}</span>
            </>
          )}
        </button>

        <span className="text-[11px] text-amber-200/60 ml-auto hidden sm:inline">
          {isTe
            ? 'ఎప్పుడూ దూకుడుగా లేదా ఘర్షణాత్మకంగా మాట్లాడవద్దు'
            : isHi
            ? 'कभी भी आक्रामक या टकरावपूर्ण भाषा का प्रयोग न करें'
            : 'Never speak aggressively or confrontational'}
        </span>
      </div>
    </div>
  );
};
