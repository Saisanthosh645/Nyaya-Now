import React, { useState } from 'react';
import { Search, X, Sparkles, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  language: Language;
  onQuickQuerySelect: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  language,
  onQuickQuerySelect
}) => {
  const t = translations[language];

  const quickPills = [
    { label: "Police won't register my FIR", query: "fir refused" },
    { label: "Police want to search my phone", query: "phone seized" },
    { label: "My friend has been detained", query: "arrested detained" },
    { label: "Asked for a bribe", query: "bribe money" },
    { label: "Police stopped me at night", query: "stopped questioned" }
  ];

  return (
    <div id="search-component" className="w-full max-w-3xl mx-auto mb-8 sm:mb-10">
      
      {/* Input box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          id="situation-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium shadow-sm transition-all outline-none"
        />

        {searchTerm && (
          <button
            id="clear-search-btn"
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Quick Queries */}
      <div className="mt-3 flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-500 font-semibold shrink-0 flex items-center space-x-1 pl-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick queries:</span>
        </span>
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => onQuickQuerySelect(pill.query)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors border border-slate-200/60 active:scale-95"
          >
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
};
