import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Scale, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  Filter, 
  Search,
  AlertTriangle
} from 'lucide-react';
import { Language, ActiveView } from '../types';
import { legalSources } from '../data/sources';
import { translations } from '../data/translations';

interface SourcesPageProps {
  language: Language;
  onNavigate: (view: ActiveView) => void;
}

export const SourcesPage: React.FC<SourcesPageProps> = ({ language, onNavigate }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = translations[language];

  const allSources = Object.values(legalSources);

  const filteredSources = allSources.filter(src => {
    const matchesFilter = filterType === 'all' || src.type === filterType;
    const matchesQuery = 
      src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (src.legalSection && src.legalSection.toLowerCase().includes(searchQuery.toLowerCase())) ||
      src.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div id="sources-library-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="hover:text-amber-600 transition-colors"
        >
          {t.home}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Verified Sources Library</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Verified Sources
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Statutory Law • Constitutional Provisions • Supreme Court Judgments
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
          NyayaNow prioritises official statutes and authoritative government sources. Every legal claim on this platform is backed by official Acts of Parliament, Constitution of India, or binding Supreme Court precedents.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All ({allSources.length})
          </button>
          <button
            onClick={() => setFilterType('statute')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'statute'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Statutes (BNSS / Constitution)
          </button>
          <button
            onClick={() => setFilterType('judgment')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'judgment'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Supreme Court Judgments
          </button>
          <button
            onClick={() => setFilterType('guideline')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'guideline'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            NHRC Directives
          </button>
          <button
            onClick={() => setFilterType('portal')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'portal'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Govt Portals
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-1.5 pl-8 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-4 mb-10">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {source.type.toUpperCase()}
                  </span>
                  {source.legalSection && (
                    <span className="text-xs font-bold text-amber-800">
                      {source.legalSection}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {source.title}
                </h3>
              </div>

              {source.officialBadge && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Official Source</span>
                </span>
              )}
            </div>

            {/* Organisation & Purpose */}
            <div className="text-xs text-slate-500 font-semibold">
              Publishing Authority: <span className="text-slate-800">{source.organization}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {source.summary}
            </p>

            {/* Footer row: Reviewed date & external link */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">
                Last reviewed: <strong className="text-slate-600">{source.lastReviewed}</strong>
              </span>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-colors"
              >
                <span>Official Document Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}

        {filteredSources.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
            No legal sources found matching "{searchQuery}".
          </div>
        )}
      </div>

      {/* Comprehensive Legal Disclaimer */}
      <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-200 mb-10 text-xs text-amber-950 leading-relaxed space-y-2">
        <div className="flex items-center space-x-2 font-bold text-amber-900 uppercase tracking-wider text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Full Legal & Informational Disclaimer</span>
        </div>
        <p>
          NyayaNow provides curated general legal information derived from the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, Bharatiya Nyaya Sanhita (BNS), 2023, the Constitution of India, and binding rulings of the Supreme Court of India.
        </p>
        <p>
          This application does not constitute formal legal advice, legal opinion, or legal representation. Application of the law depends upon the specific facts, circumstances, and procedural context of each individual case. For urgent criminal matters or court appearances, citizens are strongly urged to consult a qualified legal practitioner or approach their District Legal Services Authority (DLSA) for free representation under the Legal Services Authorities Act.
        </p>
      </div>

      {/* Bottom Back Button */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>
      </div>

    </div>
  );
};
