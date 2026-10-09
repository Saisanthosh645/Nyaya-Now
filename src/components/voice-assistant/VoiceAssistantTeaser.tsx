import React from 'react';
import { Mic, Sparkles, ArrowRight, Volume2, Globe, Shield } from 'lucide-react';
import { Language } from '../../types';
import { VoiceWaveform } from './VoiceWaveform';

interface VoiceAssistantTeaserProps {
  language: Language;
  onOpenVoiceAssistant: () => void;
}

export const VoiceAssistantTeaser: React.FC<VoiceAssistantTeaserProps> = ({
  language,
  onOpenVoiceAssistant
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <section id="voice-assistant-teaser" className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,6,23,0.8),0_0_30px_rgba(16,185,129,0.08)] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Copy & Tagline */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            {/* Feature 02 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-md">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                02
              </span>
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span className="uppercase tracking-wider">
                {isHi ? 'आवाज + भारतीय भाषाएँ' : isTe ? 'వాయిస్ + భారతీయ భాషలు' : 'VOICE + INDIAN LANGUAGES'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isHi
                ? 'अपनी भाषा में बोलें। अपनी भाषा में कानूनी सलाह पाएं।'
                : isTe
                ? 'మీ భాషలో మాట్లాడండి. మీ భాషలో చట్టపరమైన మార్గదర్శకత్వం పొందండి.'
                : 'Speak in your language. Get legal guidance in your language.'}
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              {isHi
                ? 'कानूनी शब्दों की आवश्यकता नहीं। हिंदी, तेलुगु या मिश्रित भाषा में स्वाभाविक रूप से बोलें। न्याय आपकी स्थिति को समझता है।'
                : isTe
                ? 'చట్టపరమైన పదాలు అవసరం లేదు. తెలుగు, హిందీ లేదా సహజమైన మిశ్రమ భాషలో మాట్లాడండి. న్యాయ మీ పరిస్థితిని స్పష్టంగా వివరిస్తుంది.'
                : "No legal vocabulary required. Speak naturally in Telugu, Hindi, English, or mixed Indian dialect. Nyaya understands your situation and speaks back to you."}
            </p>

            {/* Language support pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
                🇮🇳 తెలుగు · Telugu
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
                🇮🇳 हिंदी · Hindi
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold">
                🇮🇳 Indian English
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium">
                🌐 Auto Detect
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenVoiceAssistant}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all cursor-pointer group active:scale-95"
              >
                <Mic className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                <span>
                  {isHi ? 'आवाज से न्याय से पूछें' : isTe ? 'వాయిస్‌తో న్యాయను అడగండి' : 'Launch Voice Assistant'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Visualizer & Live Waveform Preview */}
          <div className="w-full lg:w-96 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Speech Engine</span>
            </div>

            <div className="w-full h-12">
              <VoiceWaveform isActive={true} color="emerald" height={48} barCount={24} />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 w-full text-center">
              <p className="text-xs text-slate-300 italic">
                “Police station ki vellali annaru but reason cheppaledu…”
              </p>
              <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold">
                <span>✓ Telugu detected</span>
                <span>•</span>
                <span>BNSS § 35 Notice required</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
