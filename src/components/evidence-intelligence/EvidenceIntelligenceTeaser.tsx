import React from 'react';
import { FolderLock, Sparkles, ArrowRight, ShieldCheck, Calendar, Layers, Image, MessageSquare } from 'lucide-react';
import { Language } from '../../types';

interface EvidenceIntelligenceTeaserProps {
  language: Language;
  onOpenEvidenceIntelligence: () => void;
}

export const EvidenceIntelligenceTeaser: React.FC<EvidenceIntelligenceTeaserProps> = ({
  language,
  onOpenEvidenceIntelligence
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <section id="evidence-intelligence-teaser" className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-purple-500/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,6,23,0.8),0_0_30px_rgba(168,85,247,0.08)] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            {/* Feature 04 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 text-xs font-bold shadow-md">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                04
              </span>
              <FolderLock className="w-3.5 h-3.5 text-purple-400" />
              <span className="uppercase tracking-wider">
                {isHi ? 'सबूत प्रबंधन' : isTe ? 'సాక్ష్యాల నిర్వహణ' : 'EVIDENCE INTELLIGENCE'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {isHi
                ? 'स्क्रीनशॉट, फोटो, संदेश और दस्तावेज़ों को व्यवस्थित सबूत में बदलें।'
                : isTe
                ? 'స్క్రీన్ షాట్లు, ఫోటోలు, మెసేజ్‌లు మరియు పత్రాలను సమగ్ర సాక్ష్య రికార్డుగా మార్చండి.'
                : 'Organize screenshots, photos, messages and documents into structured evidence.'}
            </h2>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              {isHi
                ? 'अपने बिखरे हुए स्क्रीनशॉट, कॉल मैसेज और नोटिस अपलोड करें। न्याय उन्हें कालानुक्रमिक समयरेखा, व्यक्तियों और स्पष्ट रिकॉर्ड में व्यवस्थित करता है।'
                : isTe
                ? 'మీ వద్ద ఉన్న స్క్రీన్‌షాట్లు, మెసేజ్‌లు మరియు నోటీసులను అప్‌లోడ్ చేయండి. న్యాయ వాటిని తేదీల ప్రకారం సమగ్ర కాలక్రమం మరియు స్పష్టమైన రికార్డుగా మారుస్తుంది.'
                : 'Bring together screenshots, photos, WhatsApp chats, and notices. Nyaya creates an indexed chronological timeline, maps involved entities, and generates an advocate-ready evidence index.'}
            </p>

            {/* Supported Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-purple-300 font-semibold flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" />
                <span>Screenshots & Photos</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-emerald-300 font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp & SMS Chats</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Chronological Timeline</span>
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SHA-256 Hashes</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive CTA Card */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenEvidenceIntelligence}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer group"
            >
              <span>{isHi ? 'सबूत रूम खोलें' : isTe ? 'సాక్ష్యాల వర్క్‌స్పేస్ తెరవండి' : 'Open Evidence Workspace'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-[11px] text-slate-400 font-mono mt-2">
              FILES → EVENTS → TIMELINE → PEOPLE → CLARITY
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
