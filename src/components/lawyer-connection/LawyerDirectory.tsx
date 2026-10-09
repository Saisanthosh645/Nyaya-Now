import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Scale, 
  Languages, 
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { HelpDestination, VERIFIED_DESTINATIONS } from '../../services/lawyerAuthorityService';

interface LawyerDirectoryProps {
  onSelectLawyer: (lawyer: HelpDestination) => void;
  onRequestBriefingForLawyer: (lawyer: HelpDestination) => void;
}

export const LawyerDirectory: React.FC<LawyerDirectoryProps> = ({
  onSelectLawyer,
  onRequestBriefingForLawyer
}) => {
  const [practiceFilter, setPracticeFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const lawyers = VERIFIED_DESTINATIONS.filter(d => d.type === 'lawyer');

  const filteredLawyers = lawyers.filter((lawyer) => {
    if (practiceFilter !== 'all' && !lawyer.practiceAreas?.some(p => p.toLowerCase().includes(practiceFilter))) {
      return false;
    }
    if (cityFilter !== 'all' && lawyer.location.city.toLowerCase() !== cityFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = lawyer.name.toLowerCase().includes(q);
      const matchCity = lawyer.location.city.toLowerCase().includes(q);
      const matchPractice = lawyer.practiceAreas?.some(p => p.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchPractice) return false;
    }
    return true;
  });

  return (
    <div className="w-full space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-400" />
            <span>Verified Lawyer Discovery</span>
          </h3>
          <p className="text-xs text-slate-400">
            Enrolled advocates practicing before High Courts and District Courts with verified Bar profiles
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search advocate, city or area…"
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[11px] font-mono text-slate-500 uppercase font-bold mr-1">
          City:
        </span>
        {['all', 'Hyderabad', 'New Delhi'].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCityFilter(c)}
            className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
              cityFilter === c
                ? 'bg-purple-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c === 'all' ? 'All Cities' : c}
          </button>
        ))}

        <span className="text-[11px] font-mono text-slate-500 uppercase font-bold ml-3 mr-1">
          Practice:
        </span>
        {[
          { id: 'all', label: 'All Specializations' },
          { id: 'criminal', label: 'Criminal Defense (BNSS 35)' },
          { id: 'bail', label: 'Anticipatory Bail' },
          { id: 'witness', label: 'Witness Representation' }
        ].map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPracticeFilter(p.id)}
            className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
              practiceFilter === p.id
                ? 'bg-purple-500 text-slate-950 font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Lawyer Cards Grid */}
      {filteredLawyers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 font-mono">
          No verified advocate profiles match your current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header with Verified Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-black text-white">
                      {lawyer.name}
                    </h4>
                    <p className="text-xs text-purple-300 font-mono mt-0.5">
                      {lawyer.designation}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Bar Verified</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {lawyer.description}
                </p>

                {/* Practice Areas */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lawyer.practiceAreas?.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                {/* Languages & Location */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    <span>{lawyer.location.address}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Languages className="w-3 h-3 text-teal-400" />
                    <span>{lawyer.languages?.join(' · ')}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  {lawyer.verification.source}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onRequestBriefingForLawyer(lawyer)}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Prepare Briefing
                  </button>

                  {lawyer.contact.phone && (
                    <a
                      href={`tel:${lawyer.contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 stroke-[3]" />
                      <span>Contact</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Trust Standard */}
      <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 leading-relaxed">
        <strong className="text-slate-200">Ethical Standards Notice:</strong> Advocates are listed in accordance with the Bar Council of India Rules. Nyaya does not solicit clients, collect commercial referral commissions, or promote individual counsel over others.
      </div>

    </div>
  );
};
