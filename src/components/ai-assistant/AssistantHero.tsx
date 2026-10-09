import React from 'react';
import { Sparkles, Scale, Shield } from 'lucide-react';
import { Language } from '../../types';

interface AssistantHeroProps {
  language: Language;
}

export const AssistantHero: React.FC<AssistantHeroProps> = ({ language }) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <div className="relative text-center max-w-4xl mx-auto pt-4 pb-8 sm:pb-10 px-4">
      {/* Feature 01 Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-5">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold tracking-wider border border-amber-500/40">
          01
        </span>
        <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {isHi ? 'एआई कानूनी सहायक' : isTe ? 'ఏఐ న్యాయ సహాయకుడు' : 'AI LEGAL ASSISTANT'}
        </span>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Main Feature Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
        <span className="block text-slate-100">
          {isHi ? 'न्याय एआई सहायक' : isTe ? 'న్యాయ ఏఐ సహాయకుడు' : 'AI LEGAL ASSISTANT'}
        </span>
        <span className="block text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400 bg-clip-text text-transparent mt-2">
          {isHi 
            ? 'अपनी समस्या स्वाभाविक रूप से बताएं। न्याय स्थिति को समझता है।' 
            : isTe 
            ? 'మీ సమస్యను సహజంగా వివరించండి. న్యాయ పరిస్థితిని అర్థం చేసుకుంటుంది.' 
            : 'Describe your problem naturally. Nyaya understands the situation.'}
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal">
        {isHi
          ? 'न्याय को अपने शब्दों में बताएं कि क्या हुआ। अपनी स्थिति की स्पष्ट, शांत व्याख्या और उन संभावित कदमों की जानकारी प्राप्त करें जिन पर आपको विचार करना चाहिए।'
          : isTe
          ? 'మీ మాటల్లో ఏం జరిగిందో న్యాయకు చెప్పండి. మీ పరిస్థితిపై స్పష్టమైన, ప్రశాంతమైన వివరణ మరియు మీరు పరిగణించవలసిన తదుపరి చర్యలను పొందండి.'
          : 'Tell Nyaya what happened in your own words. Get a clear, calm explanation of your situation and the next steps you may need to consider.'}
      </p>

      {/* Ambient decorative subtle glow behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[220px] bg-gradient-to-r from-amber-500/10 via-blue-600/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />
    </div>
  );
};
