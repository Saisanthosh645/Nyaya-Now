import React from 'react';
import { CheckCircle2, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
import { RightItem } from '../types';

interface RightsCardProps {
  right: RightItem;
  onVerifyClick?: (right: RightItem) => void;
}

export const RightsCard: React.FC<RightsCardProps> = ({ right, onVerifyClick }) => {
  const { legalBasis } = right;

  const getSourceBadge = () => {
    if (!legalBasis?.sourceType) return null;
    switch (legalBasis.sourceType) {
      case 'PRIMARY_LAW':
        return { label: 'Primary Statute', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'JUDICIAL':
        return { label: 'Supreme Court', cls: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      case 'LEGAL_AID':
        return { label: 'Legal Aid Authority', cls: 'bg-sky-50 text-sky-800 border-sky-200' };
      default:
        return { label: 'Official Govt', cls: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const badge = getSourceBadge();

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all">
      
      {/* Header: Title & Checkmark */}
      <div className="flex items-start space-x-3 mb-2.5">
        <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base font-bold text-slate-900 leading-snug">
              {right.title}
            </h4>
            {badge && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${badge.cls}`}>
                {badge.label}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description / Plain language */}
      <p className="text-sm text-slate-600 leading-relaxed pl-9 mb-3">
        {right.plainLanguage || right.description}
      </p>

      {/* Scope Note if available */}
      {right.scopeNote && (
        <div className="ml-9 mb-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <span><strong>Scope & Condition:</strong> {right.scopeNote}</span>
        </div>
      )}

      {/* Legal Section Badges & Verification Button */}
      <div className="pl-9 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs">
        
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Statutory Section */}
          {(legalBasis?.section || right.bnssSection) && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 font-bold">
              <Scale className="w-3 h-3 text-amber-700" />
              <span>{legalBasis?.section || right.bnssSection}</span>
            </span>
          )}

          {/* Constitution Article */}
          {(legalBasis?.article || right.constitutionArticle) && (
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-bold">
              {legalBasis?.article || right.constitutionArticle}
            </span>
          )}

          {/* Landmark Case */}
          {right.landmarkCase && (
            <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-medium">
              {right.landmarkCase}
            </span>
          )}
        </div>

        {/* Source Verified Popover Trigger */}
        <button
          type="button"
          onClick={() => onVerifyClick && onVerifyClick(right)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 font-semibold transition-colors ml-auto text-xs"
          title="Inspect statutory authority, publisher, and official gazette link"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>✓ Source verified</span>
        </button>

      </div>
    </div>
  );
};
