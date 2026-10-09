import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Phone, 
  ExternalLink, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Search
} from 'lucide-react';
import { HelpDestination, VERIFIED_DESTINATIONS, DestinationType } from '../../services/lawyerAuthorityService';

interface AuthorityDirectoryProps {
  onSelectAuthority: (destination: HelpDestination) => void;
  onCreateBriefingForAuthority: (destination: HelpDestination) => void;
}

export const AuthorityDirectory: React.FC<AuthorityDirectoryProps> = ({
  onSelectAuthority,
  onCreateBriefingForAuthority
}) => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const authorities = VERIFIED_DESTINATIONS.filter(d => d.type !== 'lawyer');

  const filteredAuthorities = authorities.filter((auth) => {
    if (typeFilter !== 'all' && auth.type !== typeFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = auth.name.toLowerCase().includes(q);
      const matchCity = auth.location.city.toLowerCase().includes(q);
      const matchDesc = auth.description.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="w-full space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <span>Verified Official Authorities</span>
          </h3>
          <p className="text-xs text-slate-400">
            Government administrative bodies, legal aid institutions, and statutory grievance mechanisms
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search authority, portal, or station…"
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {[
          { id: 'all', label: 'All Authorities' },
          { id: 'legal-aid', label: 'Legal Services Authorities (DLSA/NALSA)' },
          { id: 'police-authority', label: 'Police Supervisory Bodies (SP/CP)' },
          { id: 'government-authority', label: 'Cyber Crime & Central Portals' },
          { id: 'emergency', label: 'Emergency Services (112)' }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTypeFilter(t.id)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              typeFilter === t.id
                ? 'bg-teal-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAuthorities.map((auth) => (
          <div
            key={auth.id}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-teal-400 uppercase font-bold block">
                    {auth.designation}
                  </span>
                  <h4 className="text-base font-black text-white mt-0.5">
                    {auth.name}
                  </h4>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Official Gov Source</span>
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {auth.description}
              </p>

              {/* Location & Jurisdiction */}
              <div className="space-y-1 text-xs text-slate-400 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="truncate">{auth.location.address}</span>
                </div>
                <div>Jurisdiction: <strong className="text-slate-200">{auth.jurisdiction}</strong></div>
                {auth.eligibility && (
                  <div className="text-[11px] text-teal-300 pt-1 border-t border-slate-800/80 mt-1 font-sans">
                    <strong>Eligibility:</strong> {auth.eligibility}
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Verification */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 font-mono">
                Verified: {auth.verification.lastVerified}
              </span>

              <div className="flex items-center gap-2">
                {auth.contact.website && (
                  <a
                    href={auth.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}

                {auth.contact.phone && (
                  <a
                    href={`tel:${auth.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 stroke-[3]" />
                    <span>Call</span>
                  </a>
                )}

                {auth.contact.helpline && (
                  <a
                    href={`tel:${auth.contact.helpline}`}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 stroke-[3]" />
                    <span>Dial {auth.contact.helpline}</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
