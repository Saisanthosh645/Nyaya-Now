import React from 'react';
import { 
  Building2, 
  Scale, 
  UserCheck, 
  Phone, 
  ExternalLink, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { HelpDestination } from '../../services/lawyerAuthorityService';

interface SecondaryOptionsGridProps {
  options: HelpDestination[];
  onSelectOption: (destination: HelpDestination) => void;
}

export const SecondaryOptionsGrid: React.FC<SecondaryOptionsGridProps> = ({
  options,
  onSelectOption
}) => {
  if (options.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
          You may also consider these alternative options
        </h3>
        <p className="text-xs text-slate-400">
          Depending on your specific goals, these institutional or professional channels may also be relevant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((dest) => (
          <div
            key={dest.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  dest.type === 'lawyer'
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                    : dest.type === 'police-authority'
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                    : 'bg-teal-500/10 text-teal-300 border-teal-500/20'
                }`}>
                  {dest.type.replace('-', ' ')}
                </span>

                <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  {dest.name}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {dest.location.city}, {dest.location.state}
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                {dest.description}
              </p>

              {/* Why & When Appropriate */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <strong className="text-slate-200 block">When appropriate:</strong>
                <p className="leading-normal">{dest.whyRecommended}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              {dest.contact.phone && (
                <a
                  href={`tel:${dest.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-teal-400" />
                  <span>Call</span>
                </a>
              )}

              {dest.contact.website && (
                <a
                  href={dest.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                  <span>Website</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => onSelectOption(dest)}
                className="ml-auto text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
