import { X, CheckCircle, Calendar, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface VersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function VersionModal({ isOpen, onClose, language }: VersionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Release Metadata
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? 'कानूनी सामग्री संस्करण' : language === 'te' ? 'చట్టపరమైన కంటెంట్ వెర్షన్' : 'Legal Content Version & Audit Log'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-slate-700">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Current Version</span>
              <span className="text-base font-bold text-slate-900 font-mono">v1.0 (Public Release)</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified Current
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Statutory Frameworks Audited</span>
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-800 font-medium">Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023</span>
                <span className="text-emerald-700 font-semibold font-mono">In Effect</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-800 font-medium">Constitution of India (Articles 20, 21, 22)</span>
                <span className="text-emerald-700 font-semibold font-mono">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-800 font-medium">Legal Services Authorities Act, 1987 (NALSA)</span>
                <span className="text-emerald-700 font-semibold font-mono">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-800 font-medium">Prevention of Corruption Act, 1988 (Amended 2018)</span>
                <span className="text-emerald-700 font-semibold font-mono">Verified</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Last comprehensive statutory audit: <strong>16 August 2026</strong></span>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            {language === 'hi' ? 'बंद करें' : language === 'te' ? 'మూసివేయి' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
