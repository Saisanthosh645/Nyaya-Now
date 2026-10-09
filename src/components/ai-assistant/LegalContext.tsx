import React from 'react';
import { Scale, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { LegalContextItem } from '../../services/aiLegalService';
import { Language } from '../../types';

interface LegalContextProps {
  items: LegalContextItem[];
  language: Language;
}

export const LegalContext: React.FC<LegalContextProps> = ({ items, language }) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  const title = isHi
    ? 'प्रासंगिक कानूनी संदर्भ'
    : isTe
    ? 'సంబంధిత చట్టపరమైన సందర్భం'
    : 'Relevant Legal Context';

  return (
    <div className="w-full my-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">⚖️</span>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          {isHi ? 'सत्यापित वैधानिक प्रावधान' : isTe ? 'ధృవీకరించబడిన చట్టపరమైన నిబంధనలు' : 'VERIFIED STATUTORY PROVISIONS'}
        </span>
      </div>

      {/* Grid of Legal Provisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 hover:border-slate-700 transition-colors"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">
                  {item.category}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              </div>

              {/* Provision Name */}
              <h4 className="text-sm font-bold text-slate-100 mb-1 leading-snug">
                {item.provision}
              </h4>

              {/* Concise Explanation */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.explanation}
              </p>
            </div>

            {/* Source Link / Verification Status */}
            <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-xs">
              {item.isVerified && item.sourceUrl ? (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  <span>{isHi ? 'स्रोत देखें' : isTe ? 'మూలం చూడండి' : 'View source'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-slate-500 italic text-[11px]">
                  <AlertCircle className="w-3 h-3 text-slate-500" />
                  {isHi ? 'स्रोत सत्यापन उपलब्ध नहीं है' : isTe ? 'మూల ధృవీకరణ అందుబాటులో లేదు' : 'Source verification unavailable'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
