import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface ReportCorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSubmittedToast?: (msg: string) => void;
}

export function ReportCorrectionModal({
  isOpen,
  onClose,
  language,
  onSubmittedToast
}: ReportCorrectionModalProps) {
  const [sectionRef, setSectionRef] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSectionRef('');
      setDescription('');
      onClose();
      if (onSubmittedToast) {
        onSubmittedToast(
          language === 'hi'
            ? 'सुधार रिपोर्ट सबमिट हो गई है! धन्यवाद।'
            : language === 'te'
            ? 'సవరణ నివేదిక సమర్పించబడింది! ధన్యవాదాలు.'
            : 'Correction report submitted for review. Thank you!'
        );
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Public Review & Feedback
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? 'गलत या पुरानी जानकारी की रिपोर्ट करें' : language === 'te' ? 'సరికాని లేదా పాత సమాచారాన్ని నివేదించండి' : 'Report Legal Discrepancy'}
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

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Report Received</h4>
            <p className="text-xs text-slate-600">
              Our legal editorial team will audit this reference against the official gazette.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            <p className="text-xs text-slate-600">
              Help keep NyayaNow 100% accurate. If you spotted a statutory reference typo, an amended provision, or a nuanced exception that should be highlighted, let our legal review team know.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Affected Situation or Section
              </label>
              <input
                type="text"
                value={sectionRef}
                onChange={(e) => setSectionRef(e.target.value)}
                placeholder="e.g. BNSS Section 35 / Arrest of Women"
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Correction Details / Reference Link
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the discrepancy and provide the gazette/court citation if available..."
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
