import React, { useState } from 'react';
import { PhoneCall, X, Shield, AlertTriangle, ExternalLink, Search } from 'lucide-react';
import { nationalHelplines, stateAntiCorruptionList } from '../data/helplines';
import { Language } from '../types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, language }) => {
  const [selectedState, setSelectedState] = useState<string>('National');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  const filteredStates = stateAntiCorruptionList.filter(s => 
    s.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="sos-helpline-modal" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-white my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-600 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Official Emergency & Legal Helplines</h3>
              <p className="text-xs text-red-100 font-medium">Toll-Free Government Numbers • India</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* National Hotlines Grid */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center space-x-1.5">
              <Shield className="w-4 h-4" />
              <span>National 24x7 Helplines (Tap to Call)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nationalHelplines.map((hp) => (
                <a
                  key={hp.id}
                  href={`tel:${hp.number}`}
                  className="bg-slate-800/90 hover:bg-slate-750 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between group transition-all hover:border-amber-500/60"
                >
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">{hp.name}</span>
                    <strong className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {hp.number}
                    </strong>
                    <span className="text-[11px] text-emerald-400 block font-semibold">{hp.available}</span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* State Anti-Corruption Bureau Directory */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
                <span>State Police & Anti-Corruption Numbers</span>
              </h4>
              
              {/* Search State */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 text-xs px-3 py-1.5 pl-7 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-500 text-white placeholder:text-slate-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredStates.map((st, idx) => (
                <div key={idx} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/80 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <strong className="text-sm font-bold text-slate-100">{st.state}</strong>
                    {st.portalUrl && (
                      <a 
                        href={st.portalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[11px] text-amber-400 hover:underline flex items-center space-x-0.5"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Anti-Corruption (ACB):</span>
                      <a href={`tel:${st.acbTollFree.split('/')[0].trim()}`} className="font-bold text-amber-300 hover:underline">
                        {st.acbTollFree}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Women / Cyber:</span>
                      <span className="font-medium text-slate-200">
                        {st.womenHelpline} • {st.cyberCell}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              If you are in immediate physical danger or inside a police station facing unlawful violence, dial <strong>112</strong> or call the <strong>NALSA Legal Aid Helpline (15100)</strong> immediately.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
};
