import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../../types';

interface SuggestionItem {
  id: string;
  icon: string;
  textEn: string;
  textHi: string;
  textTe: string;
  promptValueEn: string;
  promptValueHi: string;
  promptValueTe: string;
}

const SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'stopped',
    icon: '🚔',
    textEn: 'Police stopped me',
    textHi: 'पुलिस ने मुझे रोका',
    textTe: 'పోలీసులు నన్ను ఆపారు',
    promptValueEn: 'Police stopped me on the road and asked me to come to the station. I don\'t know why.',
    promptValueHi: 'पुलिस ने मुझे सड़क पर रोका और थाने चलने को कहा। मुझे कारण नहीं पता।',
    promptValueTe: 'పోలీసులు నన్ను రోడ్డుపై ఆపి స్టేషన్‌కు రమ్మన్నారు. ఎందుకో నాకు తెలియదు.'
  },
  {
    id: 'fir',
    icon: '📄',
    textEn: 'FIR was refused',
    textHi: 'एफआईआर दर्ज नहीं की',
    textTe: 'ఎఫ్ఐఆర్ తిరస్కరించారు',
    promptValueEn: 'I went to file an FIR at the police station for a serious incident, but the officers refused to register it.',
    promptValueHi: 'मैं थाने में एक गंभीर मामले की एफआईआर दर्ज कराने गया था, लेकिन पुलिस ने लिखने से मना कर दिया।',
    promptValueTe: 'నేను పోలీస్ స్టేషన్‌లో ఎఫ్ఐఆర్ నమోదు చేయడానికి వెళ్లాను, కానీ అధికారులు నమోదు చేయడానికి నిరాకరించారు.'
  },
  {
    id: 'arrested',
    icon: '🔒',
    textEn: 'I was arrested',
    textHi: 'मुझे हिरासत में लिया',
    textTe: 'నన్ను అరెస్ట్ చేశారు',
    promptValueEn: 'Police have taken me into custody without explaining the charges or informing my family.',
    promptValueHi: 'पुलिस ने मुझे बिना आरोप बताए और परिवार को बिना सूचित किए हिरासत में ले लिया है।',
    promptValueTe: 'పోలీసులు నేరం ఏంటో చెప్పకుండా, కుటుంబానికి సమాచారం ఇవ్వకుండా నన్ను కస్టడీలోకి తీసుకున్నారు.'
  },
  {
    id: 'phone-search',
    icon: '📱',
    textEn: 'Police want to search my phone',
    textHi: 'पुलिस मेरा फोन चेक करना चाहती है',
    textTe: 'పోలీసులు నా ఫోన్ చూడాలనుకుంటున్నారు',
    promptValueEn: 'An officer is demanding that I unlock my phone and show my WhatsApp chats and photos.',
    promptValueHi: 'एक पुलिस अधिकारी मुझसे मेरा फोन अनलॉक करने और व्हाट्सएप चैट दिखाने की मांग कर रहा है।',
    promptValueTe: 'ఒక పోలీస్ అధికారి నా ఫోన్ అన్‌లాక్ చేసి వాట్సాప్ చాట్‌లు మరియు ఫోటోలు చూపించమని అడుగుతున్నారు.'
  },
  {
    id: 'bribe',
    icon: '💰',
    textEn: 'Someone asked me for a bribe',
    textHi: 'मुझसे रिश्वत मांगी जा रही है',
    textTe: 'లంచం డిమాండ్ చేస్తున్నారు',
    promptValueEn: 'A police officer is demanding cash money to release my vehicle / not file a false charge.',
    promptValueHi: 'पुलिस अधिकारी वाहन छोड़ने या झूठा केस न लगाने के नाम पर नकद रिश्वत मांग रहा है।',
    promptValueTe: 'వాహనాన్ని విడిచిపెట్టడానికి పోలీస్ అధికారి లంచం డిమాండ్ చేస్తున్నారు.'
  },
  {
    id: 'threatened',
    icon: '⚠️',
    textEn: 'I am being threatened',
    textHi: 'मुझे धमकाया जा रहा है',
    textTe: 'నన్ను బెదిరిస్తున్నారు',
    promptValueEn: 'Officers are using abusive language and threatening violence or false implication against me.',
    promptValueHi: 'पुलिसकर्मी अपशब्दों का प्रयोग कर रहे हैं और शारीरिक हिंसा या झूठे केस में फंसाने की धमकी दे रहे हैं।',
    promptValueTe: 'పోలీసులు అసభ్యకరంగా మాట్లాడుతూ, హింస చేస్తామని లేదా తప్పుడు కేసు పెడతామని బెదిరిస్తున్నారు.'
  }
];

interface PromptSuggestionsProps {
  language: Language;
  onSelectSuggestion: (text: string) => void;
}

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({
  language,
  onSelectSuggestion
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  const label = isHi ? 'सुझाए गए विषय:' : isTe ? 'ప్రయత్నించండి:' : 'Try asking:';

  return (
    <div className="w-full mt-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {SUGGESTIONS.map((sug) => {
          const pillText = isHi ? sug.textHi : isTe ? sug.textTe : sug.textEn;
          const promptContent = isHi ? sug.promptValueHi : isTe ? sug.promptValueTe : sug.promptValueEn;

          return (
            <button
              key={sug.id}
              type="button"
              onClick={() => onSelectSuggestion(promptContent)}
              className="group inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/60 hover:bg-slate-800/90 border border-slate-700/60 hover:border-amber-500/50 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-amber-500/10 cursor-pointer active:scale-[0.98]"
            >
              <span className="text-sm sm:text-base leading-none transition-transform group-hover:scale-110">
                {sug.icon}
              </span>
              <span>{pillText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
