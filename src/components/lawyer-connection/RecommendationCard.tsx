import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Phone, 
  ExternalLink, 
  MapPin, 
  FileText, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Info,
  Clock,
  Printer
} from 'lucide-react';
import { HelpDestination, RoutingResult } from '../../services/lawyerAuthorityService';

interface RecommendationCardProps {
  routingResult: RoutingResult;
  onCreateBriefing: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  routingResult,
  onCreateBriefing
}) => {
  const dest = routingResult.primaryRecommendation;
  const why = routingResult.whyRecommendation;
  
  // State for preparation checklist
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: false,
    c3: false
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full rounded-3xl bg-slate-950 border-2 border-teal-500/50 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Recommended Eyebrow & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Next Destination</span>
          </span>

          {dest.badge && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700">
              {dest.badge}
            </span>
          )}
        </div>

        {/* Verification Status */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{dest.verification.source}</span>
        </div>
      </div>

      {/* Destination Main Info */}
      <div className="space-y-3 relative z-10">
        <div>
          <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block">
            {dest.designation || 'Institutional Legal Channel'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            {dest.name}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {dest.description}
        </p>

        {/* Location & Jurisdiction Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
          <span className="flex items-center gap-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{dest.location.address}</span>
          </span>
          <span>•</span>
          <span>Jurisdiction: <strong className="text-slate-200">{dest.jurisdiction}</strong></span>
        </div>
      </div>

      {/* WHY NYAYA SUGGESTED THIS (Explainable Routing Card) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why Nyaya suggested this</span>
          </h4>
          <span className="text-[10px] font-mono text-slate-500">
            Explainable AI Routing
          </span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed font-sans">
          {why.explanation}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 font-mono block">Categorization Basis:</span>
            <span className="text-slate-200 font-bold">{why.categoryMatch}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 font-mono block">Statutory Advantage:</span>
            <span className="text-teal-300 font-bold">{why.urgencyReason}</span>
          </div>
        </div>

        {dest.eligibility && (
          <div className="text-[11px] text-teal-300/90 bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20 leading-relaxed">
            <strong>Eligibility Note:</strong> {dest.eligibility}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS (One-tap verified connections) */}
      <div className="flex flex-wrap items-center gap-2.5 relative z-10 pt-1">
        {dest.contact.phone && (
          <a
            href={`tel:${dest.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 stroke-[2.5]" />
            <span>Call {dest.contact.phone}</span>
          </a>
        )}

        {dest.contact.helpline && (
          <a
            href={`tel:${dest.contact.helpline}`}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 stroke-[2.5]" />
            <span>Dial Helpline {dest.contact.helpline}</span>
          </a>
        )}

        {dest.contact.website && (
          <a
            href={dest.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Open Official Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        )}

        <button
          type="button"
          onClick={onCreateBriefing}
          className="px-4 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          title="Generate printable case briefing"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Case Briefing</span>
        </button>
      </div>

      {/* DYNAMIC CHECKLIST: WHAT TO TAKE WITH YOU */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-teal-400" />
            <span>Prepare before you contact them</span>
          </h4>
          <span className="text-[10px] font-mono text-slate-400">
            Interactive Checklist
          </span>
        </div>

        <div className="space-y-2">
          {routingResult.preparationChecklist.map((item) => {
            const isChecked = !!checkedItems[item.id];

            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-2.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                  isChecked
                    ? 'bg-teal-950/20 border-teal-500/30 text-slate-200'
                    : 'bg-slate-950/70 border-slate-800/80 text-slate-400'
                }`}
              >
                <button type="button" className="mt-0.5 text-teal-400 shrink-0">
                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-600" />}
                </button>
                <div className="flex-1 min-w-0">
                  <span className={`font-bold block ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block leading-normal">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-500 font-mono pt-1">
          Notice: Bringing these items helps counsel understand your matter immediately without administrative delay.
        </p>
      </div>

    </div>
  );
};
