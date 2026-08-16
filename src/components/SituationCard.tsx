import React from 'react';
import { 
  ShieldAlert, 
  Lock, 
  FileText, 
  Search, 
  Smartphone, 
  AlertTriangle, 
  Coins, 
  Scale, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { Situation, Language } from '../types';
import { translations } from '../data/translations';
import { AshokaChakra } from './AshokaChakra';

interface SituationCardProps {
  situation: Situation;
  onSelect: (slug: string) => void;
  language: Language;
}

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-amber-600" />,
  Lock: <Lock className="w-6 h-6 text-red-600" />,
  FileText: <FileText className="w-6 h-6 text-blue-600" />,
  Search: <Search className="w-6 h-6 text-indigo-600" />,
  Smartphone: <Smartphone className="w-6 h-6 text-purple-600" />,
  AlertTriangle: <AlertTriangle className="w-6 h-6 text-rose-600" />,
  Coins: <Coins className="w-6 h-6 text-emerald-600" />,
  Scale: <Scale className="w-6 h-6 text-slate-700" />
};

export const SituationCard: React.FC<SituationCardProps> = ({ situation, onSelect, language }) => {
  const t = translations[language];

  // Specific CTA text based on situation type
  const getCtaText = () => {
    switch (situation.slug) {
      case 'arrest-detention':
        return t.helpMeNow;
      case 'fir-refusal':
        return t.whatShouldIDo;
      case 'threatened-assaulted':
        return t.helpMeNow;
      case 'bribe-corruption':
        return t.reportSafely;
      case 'police-misconduct':
        return t.complaintGuide;
      default:
        return t.viewMyRights;
    }
  };

  const isImportant = situation.emergencyTag || situation.badgeText === 'Important';

  return (
    <div
      id={`situation-card-${situation.slug}`}
      onClick={() => onSelect(situation.slug)}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 active:scale-[0.99] focus-within:ring-2 focus-within:ring-amber-500 overflow-hidden ${
        isImportant 
          ? 'border-red-200/90 hover:border-red-400 bg-gradient-to-b from-white to-red-50/25 shadow-red-500/5' 
          : 'border-slate-200/90 hover:border-amber-400/80 bg-gradient-to-b from-white to-slate-50/30'
      }`}
    >
      {/* Top Border Shimmer Highlight on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Subtle Background Ashoka Chakra on card hover */}
      <div className="absolute -right-8 -bottom-8 opacity-0 group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none group-hover:rotate-12">
        <AshokaChakra size={160} speed="slow" color="#0284c7" strokeWidth={1.5} />
      </div>

      <div className="relative z-10">
        {/* Top Icon & Badge Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:-rotate-2 ${
            isImportant ? 'bg-red-50 border border-red-100 text-red-600' : 'bg-slate-100/90 border border-slate-200/80'
          }`}>
            {iconMap[situation.icon] || <ShieldAlert className="w-6 h-6 text-slate-700" />}
          </div>

          {situation.emergencyTag ? (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span>{situation.emergencyTag}</span>
            </span>
          ) : situation.badgeText ? (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-amber-300 transition-colors">
              {situation.badgeText}
            </span>
          ) : null}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-2">
          {situation.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {situation.shortDescription}
        </p>

        {/* 30-Sec Quick Action Highlights Pill */}
        <div className="bg-slate-50/90 group-hover:bg-amber-50/60 rounded-xl p-2.5 mb-4 border border-slate-100 group-hover:border-amber-200/70 text-xs text-slate-700 transition-colors flex items-start space-x-2">
          <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
          <span className="line-clamp-2 font-medium">
            {situation.quick30SecSummary[0]}
          </span>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="relative z-10 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className={`text-sm font-bold flex items-center space-x-1.5 transition-colors ${
          isImportant ? 'text-red-600 group-hover:text-red-700' : 'text-slate-900 group-hover:text-amber-600'
        }`}>
          <span>{getCtaText()}</span>
        </span>
        <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </div>
  );
};

