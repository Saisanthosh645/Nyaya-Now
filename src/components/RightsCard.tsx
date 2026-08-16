import React from 'react';
import { CheckCircle2, BookOpen, ExternalLink, ShieldCheck, Scale } from 'lucide-react';
import { RightItem, LegalSource } from '../types';
import { legalSources } from '../data/sources';

interface RightsCardProps {
  right: RightItem;
  onSelectSource?: (sourceId: string) => void;
}

export const RightsCard: React.FC<RightsCardProps> = ({ right, onSelectSource }) => {
  const source: LegalSource | undefined = legalSources[right.sourceId];

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:border-emerald-200 transition-colors">
      
      {/* Header: Title & Checkmark */}
      <div className="flex items-start space-x-3 mb-2.5">
        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-slate-900 leading-snug">
            {right.title}
          </h4>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed pl-9 mb-3">
        {right.description}
      </p>

      {/* Legal Section Badges & Source Indicator */}
      <div className="pl-9 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
        
        {/* BNSS Tag */}
        {right.bnssSection && (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 font-bold">
            <Scale className="w-3 h-3 text-amber-700" />
            <span>{right.bnssSection}</span>
          </span>
        )}

        {/* Previous CrPC Equivalent */}
        {right.crpcEquivalent && (
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-medium">
            Prev: {right.crpcEquivalent}
          </span>
        )}

        {/* Constitution Article */}
        {right.constitutionArticle && (
          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
            {right.constitutionArticle}
          </span>
        )}

        {/* Landmark Case */}
        {right.landmarkCase && (
          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
            {right.landmarkCase}
          </span>
        )}

        {/* Official Source link */}
        {source && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-slate-500 hover:text-amber-700 font-semibold ml-auto transition-colors"
            title={source.title}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="underline underline-offset-2">Official Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
