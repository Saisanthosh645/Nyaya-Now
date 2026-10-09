import React from 'react';
import { Sparkles, ArrowRight, Shield, MessageSquare, Terminal } from 'lucide-react';
import { Language } from '../../types';

interface AILegalAssistantTeaserProps {
  language: Language;
  onOpenAssistant: (prompt?: string) => void;
}

interface PromptPill {
  id: string;
  icon: string;
  labelEn: string;
  labelHi: string;
  labelTe: string;
  promptEn: string;
  promptHi: string;
  promptTe: string;
}

const TEASER_PILLS: PromptPill[] = [
  {
    id: 'stopped',
    icon: '🚔',
    labelEn: 'Police stopped me',
    labelHi: 'पुलिस ने मुझे रोका',
    labelTe: 'పోలీసులు నన్ను ఆపారు',
    promptEn: 'Police stopped me on the road and asked me to come to the station. I don\'t know why.',
    promptHi: 'पुलिस ने मुझे सड़क पर रोका और थाने चलने को कहा। मुझे कारण नहीं पता।',
    promptTe: 'పోలీసులు నన్ను రోడ్డుపై ఆపి స్టేషన్‌కు రమ్మన్నారు. ఎందుకో నాకు తెలియదు.'
  },
  {
    id: 'fir',
    icon: '📄',
    labelEn: 'FIR was refused',
    labelHi: 'एफआईआर दर्ज नहीं की',
    labelTe: 'ఎఫ్ఐఆర్ తిరస్కరించారు',
    promptEn: 'I went to file an FIR at the police station for a serious incident, but the officers refused to register it.',
    promptHi: 'मैं थाने में एक गंभीर मामले की एफआईआर दर्ज कराने गया था, लेकिन पुलिस ने लिखने से मना कर दिया।',
    promptTe: 'నేను పోలీస్ స్టేషన్‌లో ఎఫ్ఐఆర్ నమోదు చేయడానికి వెళ్లాను, కానీ అధికారులు నమోదు చేయడానికి నిరాకరించారు.'
  },
  {
    id: 'phone',
    icon: '📱',
    labelEn: 'Police want to search my phone',
    labelHi: 'पुलिस मेरा फोन चेक करना चाहती है',
    labelTe: 'పోలీసులు నా ఫోన్ చూడాలనుకుంటున్నారు',
    promptEn: 'An officer is demanding that I unlock my phone and show my WhatsApp chats and photos.',
    promptHi: 'एक पुलिस अधिकारी मुझसे मेरा फोन अनलॉक करने और व्हाट्सएप चैट दिखाने की मांग कर रहा है।',
    promptTe: 'ఒక పోలీస్ అధికారి నా ఫోన్ అన్‌లాక్ చేసి వాట్సాప్ చాట్‌లు మరియు ఫోటోలు చూపించమని అడుగుతున్నారు.'
  },
  {
    id: 'bribe',
    icon: '💰',
    labelEn: 'Someone asked me for a bribe',
    labelHi: 'मुझसे रिश्वत मांगी जा रही है',
    labelTe: 'లంచం డిమాండ్ చేస్తున్నారు',
    promptEn: 'A police officer is demanding cash money to release my vehicle / not file a false charge.',
    promptHi: 'पुलिस अधिकारी वाहन छोड़ने या झूठा केस न लगाने के नाम पर नकद रिश्वत मांग रहा है।',
    promptTe: 'వాహనాన్ని విడిచిపెట్టడానికి పోలీస్ అధికారి లంచం డిమాండ్ చేస్తున్నారు.'
  }
];

export const AILegalAssistantTeaser: React.FC<AILegalAssistantTeaserProps> = ({
  language,
  onOpenAssistant
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <section id="ai-legal-assistant-teaser" className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,6,23,0.8),0_0_30px_rgba(245,158,11,0.08)] overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Feature Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-md mb-4">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
              01
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider">
              {isHi ? 'एआई एवं वॉयस कानूनी सहायक' : isTe ? 'ఏఐ & వాయిస్ న్యాయ సహాయకుడు' : 'AI & VOICE LEGAL ASSISTANT'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>

          {/* Heading & Tagline */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            {isHi 
              ? 'बोलकर या लिखकर अपनी समस्या बताएं। न्याय तुरंत समाधान देगा।' 
              : isTe 
              ? 'మాట్లాడి లేదా టైప్ చేసి వివరించండి. న్యాయ తక్షణ సమాధానం ఇస్తుంది.' 
              : 'Talk with voice or type naturally. Nyaya answers instantly.'}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {isHi
              ? 'हिंदी, अंग्रेजी या तेलुगु में सीधे बोलें या चैट करें। तत्काल बीएनएसएस धाराएं, पुलिस से बोलने हेतु सटीक शब्द एवं कानूनी अधिकार प्राप्त करें।'
              : isTe
              ? 'తెలుగు, హిందీ లేదా ఇంగ్లీషులో నేరుగా మాట్లాడండి లేదా చాట్ చేయండి. తక్షణ బీఎన్ఎస్ఎస్ చట్టాలు మరియు హక్కుల మార్గదర్శకత్వం పొందండి.'
              : 'Speak hands-free with real-time voice in Hindi, Telugu, or English, or chat with text. Get verified BNSS citations, spoken audio advice, and calm de-escalation scripts.'}
          </p>

          {/* Clickable Interactive Prompt Bar */}
          <div 
            onClick={() => onOpenAssistant()}
            className="group cursor-pointer rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-amber-500/60 p-3 sm:p-4 mb-6 flex items-center justify-between gap-3 shadow-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3 text-left pl-2">
              <MessageSquare className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-sm sm:text-base text-slate-400 group-hover:text-slate-200 transition-colors">
                {isHi ? 'न्याय को बताएं क्या हुआ... (पूरा एआई चैट खोलने के लिए क्लिक करें)' : isTe ? 'ఏం జరిగిందో న్యాయకు చెప్పండి... (పూర్తి ఏఐ తెరవడానికి క్లిక్ చేయండి)' : 'Tell Nyaya what happened… (Click to open full AI terminal)'}
              </span>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:from-amber-300 group-hover:to-orange-300 shadow-md transition-all shrink-0 pointer-events-none"
            >
              <span>{isHi ? 'खोलें' : isTe ? 'ఓపెన్' : 'Ask Nyaya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Clickable Quick Topic Pills that launch into dedicated page */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
              {isHi ? 'सुझाए गए विषय:' : isTe ? 'ప్రయత్నించండి:' : 'Try asking:'}
            </span>
            {TEASER_PILLS.map((pill) => {
              const label = isHi ? pill.labelHi : isTe ? pill.labelTe : pill.labelEn;
              const prompt = isHi ? pill.promptHi : isTe ? pill.promptTe : pill.promptEn;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => onOpenAssistant(prompt)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/50 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  <span>{pill.icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
