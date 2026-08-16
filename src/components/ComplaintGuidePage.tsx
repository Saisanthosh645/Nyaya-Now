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
  ChevronRight,
  FileCheck2,
  FileText,
  Lock,
  Coins,
  Phone
} from 'lucide-react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';
import { stateAntiCorruptionList } from '../data/helplines';

interface ComplaintGuidePageProps {
  language: Language;
  onNavigate: (view: ActiveView) => void;
  onOpenSos: () => void;
}

type EscalationCategory = 'fir-refusal' | 'misconduct' | 'bribe' | 'unlawful-detention' | 'custodial-violence' | 'legal-aid';

export const ComplaintGuidePage: React.FC<ComplaintGuidePageProps> = ({
  language,
  onNavigate,
  onOpenSos
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EscalationCategory>('fir-refusal');
  const [searchState, setSearchState] = useState<string>('');
  const t = translations[language];

  const filteredStates = stateAntiCorruptionList.filter(s =>
    s.state.toLowerCase().includes(searchState.toLowerCase())
  );

  const categories = [
    {
      id: 'fir-refusal' as EscalationCategory,
      title: 'FIR Refused / Not Registered',
      icon: FileText,
      badge: 'BNSS 173(4) & 175(3)',
      color: 'border-blue-300 bg-blue-50/70 text-blue-950'
    },
    {
      id: 'misconduct' as EscalationCategory,
      title: 'Police Misconduct / Harassment',
      icon: UserCheck,
      badge: 'Police Complaints Authority',
      color: 'border-indigo-300 bg-indigo-50/70 text-indigo-950'
    },
    {
      id: 'bribe' as EscalationCategory,
      title: 'Bribe Demand / Extortion',
      icon: Coins,
      badge: 'ACB Toll Free 1064',
      color: 'border-amber-300 bg-amber-50/70 text-amber-950'
    },
    {
      id: 'unlawful-detention' as EscalationCategory,
      title: 'Unlawful Detention (24h+)',
      icon: Lock,
      badge: 'Habeas Corpus / CJM',
      color: 'border-rose-300 bg-rose-50/70 text-rose-950'
    },
    {
      id: 'custodial-violence' as EscalationCategory,
      title: 'Custodial Violence / Torture',
      icon: AlertTriangle,
      badge: 'BNSS 196 & NHRC 14433',
      color: 'border-red-300 bg-red-50/70 text-red-950'
    },
    {
      id: 'legal-aid' as EscalationCategory,
      title: 'Need Free Legal Representation',
      icon: Scale,
      badge: 'NALSA 15100 / DLSA',
      color: 'border-sky-300 bg-sky-50/70 text-sky-950'
    }
  ];

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
        <span className="text-slate-900 font-bold">Complaint & Escalation Guide</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Where can I complain?
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Smart Complaint Escalation & Statutory Oversight
            </p>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">
          Different police grievances require different legal and statutory authorities. Select your exact situation below to see the statutory escalation pathway.
        </p>
      </div>

      {/* SMART COMPLAINT TRIAGE SELECTOR */}
      <section className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Step 1: Select What Happened
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {cat.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm leading-snug">{cat.title}</h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* DYNAMIC PATHWAY DISPLAY */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Recommended Statutory Pathway for:{' '}
            <span className="text-amber-800">
              {categories.find(c => c.id === selectedCategory)?.title}
            </span>
          </h2>
        </div>

        {/* 1. FIR REFUSAL PATHWAY */}
        {selectedCategory === 'fir-refusal' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase">
                Step 1: Local Station
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Station House Officer (SHO / Inspector)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Submit two copies of your written complaint. Request a stamped receiving copy or CSR number. If jurisdiction is cited as an issue, request a <strong>Zero FIR</strong> under Section 173(1) BNSS.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase">
                Step 2: Statutory Escalation (Section 173(4) BNSS)
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Superintendent of Police (SP / DCP)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Send the substance of your complaint by Speed Post / Registered Post to the District SP/DCP. Retain the postal tracking receipt as statutory proof of delivery.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded uppercase">
                Step 3: Judicial Remedy (Section 175(3) BNSS)
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Judicial Magistrate First Class (JMFC)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                If the SP does not direct investigation, apply to the Judicial Magistrate under Section 175(3) BNSS with proof of your Section 173(4) postal receipt. The Magistrate can direct police to register the FIR and investigate.
              </p>
            </div>
          </div>
        )}

        {/* 2. POLICE MISCONDUCT / ABUSE PATHWAY */}
        {selectedCategory === 'misconduct' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded uppercase">
                Level 1: Sub-Divisional Supervisory Officer
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Assistant Commissioner of Police / DSP</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Submit a written complaint detailing officer badge number, date, time, and specific misconduct.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
              <span className="text-[11px] font-bold text-indigo-900 bg-indigo-200 px-2 py-0.5 rounded uppercase">
                Level 2: Independent Statutory Body
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Police Complaints Authority (PCA)</h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Established under Supreme Court directives (Prakash Singh case). Headed by retired High Court / District Judges to independently investigate serious police misconduct, abuse of authority, and extortion.
              </p>
            </div>
          </div>
        )}

        {/* 3. BRIBE DEMAND PATHWAY */}
        {selectedCategory === 'bribe' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded uppercase">
                Immediate Action: 7-Day Protection
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Section 8 Immunity, Prevention of Corruption Act</h4>
              <p className="text-xs text-amber-950 mt-1 leading-relaxed">
                Do not pay the bribe. If compelled, report the demand within 7 days to the Anti-Corruption Bureau to receive complete statutory immunity from prosecution.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded uppercase">
                  National Anti-Corruption Helpline
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-1">Call 1064 (Toll-Free) or State ACB</h4>
                <p className="text-xs text-slate-600 mt-1">
                  State Anti-Corruption Bureaus (ACB / DVAC / Vigilance) are specialized agencies independent of local police.
                </p>
              </div>
              <a
                href="tel:1064"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 1064</span>
              </a>
            </div>
          </div>
        )}

        {/* 4. UNLAWFUL DETENTION PATHWAY */}
        {selectedCategory === 'unlawful-detention' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200">
              <span className="text-[11px] font-bold text-rose-900 bg-rose-200 px-2 py-0.5 rounded uppercase">
                Constitutional Limit: 24 Hours
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Article 22(2) & Section 58 BNSS</h4>
              <p className="text-xs text-rose-950 mt-1 leading-relaxed">
                Detention beyond 24 hours without Magisterial remand is unconstitutional, illegal, and constitutes wrongful confinement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded uppercase">
                Emergency Constitutional Remedy
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Writ of Habeas Corpus (High Court / Supreme Court)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Family members or advocates can file an urgent Writ of Habeas Corpus under Article 226 before the High Court. The High Court can appoint an advocate-commissioner to conduct a surprise lockup inspection.
              </p>
            </div>
          </div>
        )}

        {/* 5. CUSTODIAL VIOLENCE PATHWAY */}
        {selectedCategory === 'custodial-violence' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-50/80 border border-red-200">
              <span className="text-[11px] font-bold text-red-900 bg-red-200 px-2 py-0.5 rounded uppercase">
                Step 1: Immediate Medico-Legal Certificate (MLC)
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">Section 53 BNSS Medical Examination</h4>
              <p className="text-xs text-red-950 mt-1 leading-relaxed">
                Demand examination at a government hospital to document all injuries on an official Medico-Legal Certificate (MLC). Show injuries directly to the Magistrate during the 24-hour production hearing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                  National Human Rights Commission (NHRC)
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-1">24x7 Portal & Helpline 14433</h4>
                <p className="text-xs text-slate-600 mt-1">
                  File complaint online on hrcnet.nic.in to assign an immediate tracking number.
                </p>
              </div>
              <a
                href="https://hrcnet.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>NHRC Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* 6. FREE LEGAL AID PATHWAY */}
        {selectedCategory === 'legal-aid' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-sky-900 bg-sky-200 px-2 py-0.5 rounded uppercase">
                  National Legal Services Authority (NALSA)
                </span>
                <h4 className="font-bold text-slate-900 text-base mt-1">Call 15100 (Toll-Free)</h4>
                <p className="text-xs text-sky-950 mt-1">
                  Free legal representation under Section 12 of the Legal Services Authorities Act, 1987 for women, children, persons in custody, and low-income citizens.
                </p>
              </div>
              <a
                href="tel:15100"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 15100</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded uppercase">
                Local Representation
              </span>
              <h4 className="font-bold text-slate-900 text-base mt-1">District Legal Services Authority (DLSA)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Visit the DLSA office at your local District Court complex, or request the Duty Magistrate to assign a Legal Aid Defense Counsel (LADC).
              </p>
            </div>
          </div>
        )}

      </section>

      {/* Section 2: Police Supervisory Hierarchy */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center space-x-2.5 mb-4">
          <Building className="w-5 h-5 text-slate-700" />
          <h2 className="text-xl font-bold text-slate-900">
            Internal Police Supervisory Hierarchy
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

      {/* Section 3: Central Grievance Mechanism (CPGRAMS) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center space-x-2.5 mb-3">
          <FileCheck2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Central Public Grievance Portal (CPGRAMS)
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
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0 transition-colors shadow-xs"
          >
            <span>Visit pgportal.gov.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Section 4: State Anti-Corruption Authority Finder */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              State Anti-Corruption Bureau Directory
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
              className="px-3.5 py-2 pl-8 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:border-amber-500 w-48"
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
