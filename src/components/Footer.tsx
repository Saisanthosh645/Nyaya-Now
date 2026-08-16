import React from 'react';
import { Shield, ExternalLink, Heart, AlertTriangle, PhoneCall, Scale, BookOpen } from 'lucide-react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
  language: Language;
  onOpenSos: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language, onOpenSos }) => {
  const t = translations[language];

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">NyayaNow</span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Civic Tech • India
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              India's 30-Second Police Rights Guide — empowering citizens with immediate, verified legal safeguards under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.
            </p>
            
            {/* Direct Emergency Numbers Pill Bar */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>National Emergency Hotlines</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="tel:112" className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold flex items-center space-x-1 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span>Police/Emergency: <strong>112</strong></span>
                </a>
                <a href="tel:1091" className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold flex items-center space-x-1 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  <span>Women Helpline: <strong>1091</strong></span>
                </a>
                <a href="tel:1064" className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold flex items-center space-x-1 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Anti-Corruption: <strong>1064</strong></span>
                </a>
                <a href="tel:15100" className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold flex items-center space-x-1 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Legal Aid (NALSA): <strong>15100</strong></span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    onNavigate({ type: 'home' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate({ type: 'home' });
                    setTimeout(() => {
                      const el = document.getElementById('situation-selector');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  8 Primary Situations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'assessment' })}
                  className="hover:text-amber-400 transition-colors flex items-center space-x-1"
                >
                  <span>Diagnostic Tool: Am I Detained?</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'complaints' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Where Can I Complain?
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'sources' })}
                  className="hover:text-amber-400 transition-colors"
                >
                  Verified Source Library
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSos}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  All Emergency Numbers Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Legal Frameworks */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              Legal Frameworks
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>BNSS, 2023 (Current Criminal Procedure)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Constitution of India (Articles 20, 21, 22)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>D.K. Basu Custodial Guidelines (SC)</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Lalita Kumari Mandatory FIR Ruling</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span>NHRC Custodial Directives</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="bg-slate-900/90 rounded-xl p-4 sm:p-5 border border-slate-800 mb-8 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start space-x-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">Statutory Legal Disclaimer:</strong> {t.disclaimerText}
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span>Built for India</span>
            <span className="inline-block">🇮🇳</span>
            <span>•</span>
            <span>NyayaNow Civic Initiative</span>
          </div>
          <div>
            <span>General legal information • No account or personal data collected</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
