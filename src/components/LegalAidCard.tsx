import { Phone, ExternalLink, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface LegalAidCardProps {
  language: Language;
}

export function LegalAidCard({ language }: LegalAidCardProps) {
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-linear-to-br from-sky-50/90 via-blue-50/40 to-slate-50 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/90 px-2 py-0.5 rounded border border-sky-200">
                {language === 'hi' ? 'निःशुल्क कानूनी सहायता' : language === 'te' ? 'ఉచిత న్యాయ సహాయం' : 'Free Legal Aid'}
              </span>
              <span className="text-xs font-mono text-slate-500">NALSA • 15100</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {language === 'hi' ? 'क्या आपको कानूनी सहायता की आवश्यकता है?' : language === 'te' ? 'మీకు న్యాయ సహాయం అవసరమా?' : 'Need Free Legal Assistance?'}
            </h4>
          </div>
        </div>

        {/* Big Call Button */}
        <a
          href="tel:15100"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Phone className="w-4 h-4" />
          <span>Call 15100 (Toll Free)</span>
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
        <div>
          <span className="font-bold text-slate-900 block mb-1">
            {language === 'hi' ? 'पात्रता (धारा 12, विधिक सेवा प्राधिकरण अधिनियम):' : language === 'te' ? 'అర్హత (సెక్షన్ 12, లీగల్ సర్వీసెస్ యాక్ట్):' : 'Statutory Eligibility (Section 12, LSA Act):'}
          </span>
          <p className="text-slate-600 leading-relaxed">
            Free legal aid and lawyer representation is provided to <strong>women, children, persons in police custody</strong>, members of SC/ST, victims of disasters/trafficking, disabled persons, and low-income individuals.
          </p>
        </div>

        <div>
          <span className="font-bold text-slate-900 block mb-1">
            {language === 'hi' ? 'न्यायालयीन कानूनी सहायता रक्षा परामर्शदाता (LADC):' : language === 'te' ? 'డిస్ట్రిక్ట్ లీగల్ సర్వీసెస్ అథారిటీ (DLSA):' : 'Where to approach:'}
          </span>
          <p className="text-slate-600 leading-relaxed">
            Visit the <strong>District Legal Services Authority (DLSA)</strong> at your local District Court complex, or request the Duty Magistrate to assign a Legal Aid Defense Counsel.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
          <span>Emergency Police: <strong>112</strong> • Free Legal Aid: <strong>15100</strong></span>
        </span>
        <a
          href="https://nalsa.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-900 hover:underline"
        >
          <span>Official NALSA Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
