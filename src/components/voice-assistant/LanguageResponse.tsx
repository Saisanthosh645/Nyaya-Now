import React, { useState } from 'react';
import { 
  Sparkles, 
  Scale, 
  Copy, 
  Check, 
  Volume2, 
  BookOpen, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  MessageSquareQuote
} from 'lucide-react';
import { Language } from '../../types';
import { VoiceAssistantResponse, VoiceLanguageService } from '../../services/voiceLanguageService';
import { AudioResponsePlayer } from './AudioResponsePlayer';

interface LanguageResponseProps {
  response: VoiceAssistantResponse;
  activeLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  largeTextMode?: boolean;
}

export const LanguageResponse: React.FC<LanguageResponseProps> = ({
  response,
  activeLanguage,
  onLanguageChange,
  largeTextMode = false
}) => {
  const [copiedSayThis, setCopiedSayThis] = useState<boolean>(false);
  const [copiedFullAnswer, setCopiedFullAnswer] = useState<boolean>(false);

  const {
    detection,
    chatResponse,
    dossier,
    translatedResponses
  } = response;

  // Active displayed answer text based on toggle
  const currentText =
    activeLanguage === 'te'
      ? translatedResponses.te
      : activeLanguage === 'hi'
      ? translatedResponses.hi
      : translatedResponses.en;

  // Active "Say This Politely" script based on active language
  const getSayThisContent = () => {
    if (activeLanguage === 'te') {
      return {
        label: '🗣️ గౌరవంగా ఇలా చెప్పండి (Say This Politely)',
        script: dossier?.sayThis?.telugu ||
          '“అధికారి గారూ, నన్ను ఎందుకు ఆపారో మరియు నేను ఇక్కడ ఉండాల్సి ఉందా లేదా వెళ్లవచ్చా అనేది దయచేసి స్పష్టం చేయగలరా?”',
        langName: 'Telugu'
      };
    } else if (activeLanguage === 'hi') {
      return {
        label: '🗣️ विनम्रता से ऐसे कहें (Say This Politely)',
        script: dossier?.sayThis?.hindi ||
          '“अधिकारी महोदय, कृपया स्पष्ट करें कि मुझे क्यों रोका गया है और क्या मैं यहाँ रुकने के लिए बाध्य हूँ या जा सकता हूँ?”',
        langName: 'Hindi'
      };
    } else {
      return {
        label: '🗣️ Say This Politely to the Officer',
        script: dossier?.sayThis?.english ||
          '“Officer, could you please clarify why I am being stopped and whether I am under formal detention or free to go?”',
        langName: 'English'
      };
    }
  };

  const sayThisInfo = getSayThisContent();

  const handleCopySayThis = () => {
    navigator.clipboard.writeText(sayThisInfo.script);
    setCopiedSayThis(true);
    setTimeout(() => setCopiedSayThis(false), 2000);
  };

  const handleCopyFullAnswer = () => {
    navigator.clipboard.writeText(currentText);
    setCopiedFullAnswer(true);
    setTimeout(() => setCopiedFullAnswer(false), 2000);
  };

  const handleSpeakSayThis = () => {
    VoiceLanguageService.speakText(sayThisInfo.script, activeLanguage, 1.0);
  };

  // Render markdown text lines cleanly
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-base sm:text-lg font-black text-amber-400 mt-4 mb-2 tracking-tight">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-black text-white mt-5 mb-2.5 tracking-tight border-b border-slate-800 pb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemContent = trimmed.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
            <span className="text-slate-200 leading-relaxed font-normal">
              {renderBoldSegments(itemContent)}
            </span>
          </div>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        const num = trimmed.match(/^(\d+)\.\s/)?.[1] || '•';
        const content = trimmed.replace(/^\d+\.\s/, '');
        return (
          <div key={idx} className="flex items-start gap-2.5 my-2 pl-1">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[11px] font-bold shrink-0 mt-0.5">
              {num}
            </span>
            <span className="text-slate-200 leading-relaxed font-normal">
              {renderBoldSegments(content)}
            </span>
          </div>
        );
      }

      return (
        <p key={idx} className="text-slate-200 leading-relaxed my-2 font-normal">
          {renderBoldSegments(line)}
        </p>
      );
    });
  };

  const renderBoldSegments = (str: string) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-extrabold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={`w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-6 animate-in fade-in duration-300 ${
      largeTextMode ? 'text-lg' : 'text-sm'
    }`}>
      {/* 1. Header: NYAYA UNDERSTANDS & Telemetry Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
              🧠 NYAYA UNDERSTANDS
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Citizen situation mapped to codified Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)
          </p>
        </div>

        {/* Quick Language Toggle on the Response Card */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['te', 'hi', 'en'] as Language[]).map((lng) => (
            <button
              key={lng}
              type="button"
              onClick={() => onLanguageChange(lng)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLanguage === lng
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {lng === 'te' ? 'తెలుగు' : lng === 'hi' ? 'हिंदी' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Detected Situation & Language Metadata Pill Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400">Spoken Language:</span>
          <span className="font-bold text-amber-300">
            {detection.detectedLangMeta.name} ({detection.detectedLangMeta.nativeName})
          </span>
        </div>

        {dossier?.situationTitle && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>{dossier.situationTitle}</span>
          </div>
        )}

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>BNSS 2023 Verified</span>
        </div>
      </div>

      {/* 3. Audio Response Player (Listen to the answer in chosen language) */}
      <div>
        <AudioResponsePlayer
          textToSpeak={currentText}
          language={activeLanguage}
          largeTextMode={largeTextMode}
        />
      </div>

      {/* 4. Main Legal Guidance Body in User's Language */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 leading-relaxed space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
            {activeLanguage === 'te' ? 'న్యాయ సలహా' : activeLanguage === 'hi' ? 'कानूनी मार्गदर्शन' : 'Legal Explanation'}
          </span>
          <button
            type="button"
            onClick={handleCopyFullAnswer}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copiedFullAnswer ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFullAnswer ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className={`prose-invert max-w-none ${largeTextMode ? 'text-base sm:text-lg' : 'text-sm'}`}>
          {renderFormattedText(currentText)}
        </div>
      </div>

      {/* 5. "SAY THIS POLITELY" IN USER'S LANGUAGE */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 p-4 sm:p-5 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm sm:text-base font-extrabold text-white">
              {sayThisInfo.label}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakSayThis}
              className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              title="Speak phrase aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Listen Phrase</span>
            </button>

            <button
              type="button"
              onClick={handleCopySayThis}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedSayThis ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSayThis ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-amber-500/30 text-white">
          <p className="text-sm sm:text-base font-semibold leading-relaxed text-amber-100">
            {sayThisInfo.script}
          </p>
        </div>

        <p className="text-[11px] text-slate-400">
          💡 Calm, legally non-confrontational script designed to clarify your custodial status without aggravating the officer.
        </p>
      </div>

      {/* 6. Language-Aware Legal Basis & Statues */}
      {dossier?.legalContext && dossier.legalContext.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Traceable Statutory Authority (BNSS 2023 & Constitution)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {dossier.legalContext.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">{item.provision}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                    {item.badge}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
