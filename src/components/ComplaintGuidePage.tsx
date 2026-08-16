import React, { useState } from 'react';
import { 
  Scale, 
  Building, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowLeft, 
  Search, 
  UserCheck, 
  BookOpen, 
  ChevronRight,
  FileCheck2
} from 'lucide-react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';
import { stateAntiCorruptionList, nationalHelplines } from '../data/helplines';

interface ComplaintGuidePageProps {
  language: Language;
  onNavigate: (view: ActiveView) => void;
  onOpenSos: () => void;
}

export const ComplaintGuidePage: React.FC<ComplaintGuidePageProps> = ({
  language,
  onNavigate,
  onOpenSos
}) => {
  const [searchState, setSearchState] = useState<string>('');
  const t = translations[language];

  const filteredStates = stateAntiCorruptionList.filter(s =>
    s.state.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <div id="complaint-guide-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-6">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="hover:text-amber-600 transition-colors"
        >
          {t.home}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">Complaint Guide</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Where can I complain?
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Escalation Pathways & Statutory Oversight Bodies
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
          Different situations require different authorities. Administrative structures vary by State and Commissionerate. Start with the most appropriate option below.
        </p>
      </div>

      {/* Section 1: Police Supervisory Hierarchy */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center space-x-2.5 mb-4">
          <Building className="w-5 h-5 text-slate-700" />
          <h2 className="text-xl font-bold text-slate-900">
            1. Police Supervisory Authorities
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Always begin by escalating internally through the administrative hierarchy. Keep written postal receipts (Speed Post / Registered Post) for every letter sent.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded">
              Level 1 • Local Police
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Station House Officer (SHO / Inspector)
            </h3>
            <p className="text-xs text-slate-600">
              In-charge of the local police station. Submit written complaint in duplicate and insist on a stamped receiving copy or CSR number.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded">
              Level 2 • Sub-Division
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">
              ACP / Deputy Superintendent (DSP)
            </h3>
            <p className="text-xs text-slate-600">
              Supervises a cluster of 3–5 police stations. Approach if the SHO refuses to act or is directly involved in misconduct.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded">
              Level 3 • District Chief
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Superintendent of Police (SP / DCP)
            </h3>
            <p className="text-xs text-slate-600">
              Statutory escalation under Section 173(4) BNSS for FIR refusals. Send written complaint via Speed Post with tracking proof.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/80 px-2 py-0.5 rounded">
              Level 4 • City / State
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">
              Commissioner of Police / DGP
            </h3>
            <p className="text-xs text-slate-600">
              In metropolitan commissionerates (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata), the Police Commissioner holds executive magisterial powers.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Police Complaints Authority (PCA) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center space-x-2.5 mb-3">
          <UserCheck className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900">
            2. Police Complaints Authority (PCA)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          Created under Supreme Court directives in the landmark <em>Prakash Singh (2006)</em> case. The PCA is an independent statutory oversight body headed by a retired High Court or District Judge.
        </p>

        <div className="bg-indigo-50/80 rounded-xl p-4 border border-indigo-200 text-xs text-indigo-950 space-y-2">
          <div className="font-bold uppercase tracking-wider text-[11px] text-indigo-900">
            Complaints entertained by PCA:
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            <li>Custodial death, grievous hurt, or custodial torture</li>
            <li>Rape or sexual harassment by police personnel</li>
            <li>Extortion, blackmail, or illegal land grabbing</li>
            <li>Arrest or detention without due process of law</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Human Rights Commissions (NHRC & SHRC) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">
              3. Human Rights Complaints (NHRC / SHRC)
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Toll-Free: 14433
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          For human rights violations, custodial violence, illegal detention beyond 24 hours, or physical assault by police.
        </p>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              National Human Rights Commission (NHRC Portal)
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              File complaints online 24x7. You receive an instant HRCNet tracking number.
            </p>
          </div>
          <a
            href="https://hrcnet.nic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0 transition-colors shadow-sm"
          >
            <span>Lodge on NHRC Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 4: Public Grievance Portal (CPGRAMS) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center space-x-2.5 mb-3">
          <FileCheck2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            4. Central Grievance Mechanism (CPGRAMS)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          The Centralised Public Grievance Redress and Monitoring System (CPGRAMS) is an online 24x7 platform for citizens to lodge grievances regarding public authorities and Union Territory police forces (like Delhi Police).
        </p>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              DARPG Grievance Portal (pgportal.gov.in)
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Provides mandated resolution timeframes and grievance tracking.
            </p>
          </div>
          <a
            href="https://pgportal.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0 transition-colors shadow-sm"
          >
            <span>Visit pgportal.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 5: State Anti-Corruption Authority Finder */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              5. Bribery & Anti-Corruption Bureau Finder
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              State Anti-Corruption Bureaus (ACB / DVAC / Vigilance) are specialized agencies independent of local police stations.
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search your State..."
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              className="px-3.5 py-2 pl-8 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 w-48"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
          </div>
        </div>

        <div className="space-y-3">
          {filteredStates.map((st, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <strong className="text-sm font-bold text-slate-900 block mb-1">
                  {st.state}
                </strong>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600">
                  <span>ACB Toll-Free: <strong className="text-amber-800">{st.acbTollFree}</strong></span>
                  <span>Police PCR: <strong>{st.policeControlRoom}</strong></span>
                  <span>Women Helpline: <strong>{st.womenHelpline}</strong></span>
                </div>
              </div>

              {st.portalUrl && (
                <a
                  href={st.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-semibold flex items-center justify-center space-x-1 shrink-0"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Back Button */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <button
          onClick={onOpenSos}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold shadow-md"
        >
          <PhoneCall className="w-4 h-4" />
          <span>View All Helplines</span>
        </button>
      </div>

    </div>
  );
};
