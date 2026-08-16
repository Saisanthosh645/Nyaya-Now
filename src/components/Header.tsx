import React, { useState } from 'react';
import { Shield, AlertCircle, Menu, X, PhoneCall, Scale, BookOpen, Compass, ChevronDown, Check } from 'lucide-react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEmergency: () => void;
  onOpenSos: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  language,
  onLanguageChange,
  onOpenEmergency,
  onOpenSos
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[language];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'EN' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  const handleNav = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 shadow-md">
      {/* Top subtle Indian tri-color indicator bar */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-amber-600"></div>
        <div className="flex-1 bg-slate-100"></div>
        <div className="flex-1 bg-emerald-600"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-18 gap-1 sm:gap-2">
          
          {/* Brand Logo & Title */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNav({ type: 'home' })}
            className="flex items-center space-x-2 sm:space-x-3 text-left group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1 shrink min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-bold group-hover:scale-105 transition-transform shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors truncate">
                  NyayaNow
                </span>
                <span className="hidden xs:inline-block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1 sm:px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                  BNSS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block truncate">
                Police Rights Guide • India
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              id="nav-home"
              onClick={() => handleNav({ type: 'home' })}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView.type === 'home'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.home}
            </button>

            <button
              id="nav-situations"
              onClick={() => {
                handleNav({ type: 'home' });
                setTimeout(() => {
                  const el = document.getElementById('situation-selector');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              {t.situations}
            </button>

            <button
              id="nav-diagnostic"
              onClick={() => handleNav({ type: 'assessment' })}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView.type === 'assessment'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t.diagnosticTool}</span>
            </button>

            <button
              id="nav-complaints"
              onClick={() => handleNav({ type: 'complaints' })}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView.type === 'complaints'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4 text-slate-400" />
              <span>{t.whereToComplain}</span>
            </button>

            <button
              id="nav-sources"
              onClick={() => handleNav({ type: 'sources' })}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentView.type === 'sources'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>{t.sources}</span>
            </button>
          </nav>

          {/* Right Action Controls: Language, SOS & Emergency Mode */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                aria-label="Select Language"
              >
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"></span>
                <span>{currentLangObj.native}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  id="lang-dropdown-menu"
                  className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Language / भाषा
                  </div>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-slate-800 transition-colors ${
                        language === lang.code ? 'text-amber-400 font-bold bg-slate-800/60' : 'text-slate-200'
                      }`}
                    >
                      <span>{lang.label} ({lang.native})</span>
                      {language === lang.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick SOS Helpline Trigger */}
            <button
              id="header-sos-btn"
              onClick={onOpenSos}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center space-x-1.5 transition-all shrink-0"
              title="Official Emergency Helplines (112, 1091, 1064)"
              aria-label="Helplines"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Helplines</span>
            </button>

            {/* Emergency Mode Button */}
            <button
              id="header-emergency-mode-btn"
              onClick={onOpenEmergency}
              className="flex items-center space-x-1 sm:space-x-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 transition-all shrink-0"
            >
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Emergency Mode</span>
              <span className="sm:hidden font-bold">Help 🚨</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none shrink-0"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleNav({ type: 'home' })}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                currentView.type === 'home' ? 'bg-slate-800 text-amber-400' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>{t.home}</span>
            </button>

            <button
              onClick={() => {
                handleNav({ type: 'home' });
                setTimeout(() => {
                  const el = document.getElementById('situation-selector');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800 text-left"
            >
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <span>{t.allRights}</span>
            </button>

            <button
              onClick={() => handleNav({ type: 'assessment' })}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                currentView.type === 'assessment' ? 'bg-slate-800 text-amber-400' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>{t.diagnosticTool}</span>
            </button>

            <button
              onClick={() => handleNav({ type: 'complaints' })}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                currentView.type === 'complaints' ? 'bg-slate-800 text-amber-400' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Scale className="w-4 h-4 text-slate-400" />
              <span>{t.whereToComplain}</span>
            </button>

            <button
              onClick={() => handleNav({ type: 'sources' })}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                currentView.type === 'sources' ? 'bg-slate-800 text-amber-400' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>{t.sources}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSos();
              }}
              className="flex-1 mr-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Emergency 112 / SOS</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Help Right Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
