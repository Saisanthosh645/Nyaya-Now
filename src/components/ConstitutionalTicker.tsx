import React from 'react';
import { ShieldCheck, Scale, AlertCircle, PhoneCall, Sparkles, BookOpen, Clock, HeartHandshake } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { Language } from '../types';

interface ConstitutionalTickerProps {
  language: Language;
  onSelectTopic?: (topic: string) => void;
}

export const ConstitutionalTicker: React.FC<ConstitutionalTickerProps> = ({ language }) => {
  const tickerItems = [
    {
      icon: <AshokaChakra size={16} speed="slow" color="#000080" strokeWidth={2} />,
      label: 'Article 22(1) Constitution',
      highlight: 'Mandatory Grounds of Arrest',
      color: 'border-amber-400 bg-amber-50 text-amber-900',
    },
    {
      icon: <Scale className="w-3.5 h-3.5 text-sky-600" />,
      label: 'BNSS 2023 Sec 47',
      highlight: 'Mandatory Written Notice & Bail Info',
      color: 'border-sky-400 bg-sky-50 text-sky-900',
    },
    {
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      label: 'Women Safeguard Sec 43(5)',
      highlight: 'No Arrest After Sunset / Before Sunrise',
      color: 'border-emerald-400 bg-emerald-50 text-emerald-900',
    },
    {
      icon: <Clock className="w-3.5 h-3.5 text-purple-600" />,
      label: '24-Hour Rule (Sec 58 BNSS)',
      highlight: 'Must Produce Before Magistrate within 24h',
      color: 'border-purple-400 bg-purple-50 text-purple-900',
    },
    {
      icon: <PhoneCall className="w-3.5 h-3.5 text-red-600" />,
      label: 'NALSA Legal Aid 15100',
      highlight: 'Free Legal Defense Guaranteed by Law',
      color: 'border-red-400 bg-red-50 text-red-900',
    },
    {
      icon: <BookOpen className="w-3.5 h-3.5 text-indigo-600" />,
      label: 'D.K. Basu Guidelines',
      highlight: 'Mandatory Signed Arrest Memo & Family Notice',
      color: 'border-indigo-400 bg-indigo-50 text-indigo-900',
    },
  ];

  return (
    <div className="w-full bg-slate-900 border-y border-slate-800 py-2.5 overflow-hidden select-none relative z-20">
      {/* Subtle Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track with CSS Animation */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] space-x-6 items-center">
        {/* Double list for seamless infinite loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 backdrop-blur-xs transition-all hover:bg-slate-700/80 hover:border-amber-400/50 hover:scale-105 shrink-0"
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="font-bold text-amber-300">{item.label}:</span>
            <span className="text-slate-200 font-medium">{item.highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
