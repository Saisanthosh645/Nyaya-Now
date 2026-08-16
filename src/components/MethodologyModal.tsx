import { X, ShieldCheck, BookOpen, Scale, Search, CheckCircle2, FileCheck } from 'lucide-react';
import { Language } from '../types';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function MethodologyModal({ isOpen, onClose, language }: MethodologyModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      icon: BookOpen,
      title: '1. Primary Law & Statutory Gazette First',
      desc: 'All guidance is directly cross-referenced against the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, Bharatiya Nyaya Sanhita (BNS), 2023, Constitution of India, and official statutory acts published on India Code (indiacode.nic.in).'
    },
    {
      icon: Scale,
      title: '2. Judicial Precedents of Constitutional Benches',
      desc: 'Landmark Supreme Court and High Court rulings (e.g. Lalita Kumari v. Govt of UP, D.K. Basu v. State of WB, Arnesh Kumar v. State of Bihar) are used to clarify mandatory operational directions for police.'
    },
    {
      icon: Search,
      title: '3. Conservative & Nuanced Legal Interpretation',
      desc: 'Where statutory exceptions exist (e.g. search powers, bailable vs non-bailable offences, notice of appearance conditions), we state the nuances explicitly rather than making absolute or misleading claims.'
    },
    {
      icon: FileCheck,
      title: '4. Plain-Language Citizen Translation',
      desc: 'Complex legal jargon is converted into high-clarity, practical action steps designed to be comprehended within 30 seconds by a citizen under stress, without diluting legal precision.'
    },
    {
      icon: CheckCircle2,
      title: '5. Direct Official Source Traceability',
      desc: 'Every single right card in NyayaNow contains a transparent "✓ Source verified" drawer linking to the official government statute or court record.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Editorial & Legal Standards
              </span>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                {language === 'hi' ? 'कानूनी सत्यापन और कार्यप्रणाली' : language === 'te' ? 'చట్టపరమైన ధృవీకరణ విధానం' : 'Verification Methodology & Standards'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-600">
            <strong>Civic Mission:</strong> NyayaNow is an independent civic-tech legal awareness initiative developed to make fundamental constitutional and statutory protections accessible to every citizen in India.
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Our 5-Pillar Verification Process
            </h4>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{step.title}</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Important Legal Disclaimer:</strong> The content provided in NyayaNow is strictly for public legal awareness and education. It does not constitute formal legal advice or substitute for counsel representation by a licensed advocate. In formal criminal proceedings, always seek representation from a private advocate or free Legal Aid via NALSA (15100).
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Legal Content Version: 1.0 • Last Audit: 16 August 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
          >
            {language === 'hi' ? 'समझ गया' : language === 'te' ? 'అర్థమైంది' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
}
