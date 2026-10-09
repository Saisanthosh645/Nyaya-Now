import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  Scale, 
  ShieldCheck, 
  Sparkles,
  Lock
} from 'lucide-react';
import { HelpRequest, UrgencyLevel } from '../../services/lawyerAuthorityService';
import { Language } from '../../types';

interface SituationIntakeProps {
  onSubmit: (request: HelpRequest) => void;
  onClose: () => void;
  language: Language;
}

export const SituationIntake: React.FC<SituationIntakeProps> = ({
  onSubmit,
  onClose,
  language
}) => {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<string>('police');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('today');
  const [state, setState] = useState<string>('Telangana');
  const [district, setDistrict] = useState<string>('Hyderabad');
  const [city, setCity] = useState<string>('Hyderabad');
  const [isRouting, setIsRouting] = useState<boolean>(false);

  const categories = [
    { id: 'police', label: 'Police / Complaint', sub: 'Police inquiry, FIR registration, or reporting' },
    { id: 'notice', label: 'Legal Notice / Summons', sub: 'Received notice under BNSS § 35 or court summons' },
    { id: 'arrest', label: 'Arrest / Custody Risk', sub: 'Threat of detention, bailable / non-bailable inquiry' },
    { id: 'cyber', label: 'Cybercrime / Fraud', sub: 'Banking fraud, online harassment, or unauthorized alerts' },
    { id: 'court', label: 'Court / Magistrate Matter', sub: 'Pending judicial trial, witness summons, or bail' },
    { id: 'family', label: 'Family / Civil Dispute', sub: 'Matrimonial dispute, domestic complaint, or property' },
    { id: 'consumer', label: 'Consumer / Commercial', sub: 'Cheating by merchant, warranty, or financial fraud' },
    { id: 'other', label: 'Describe Something Else', sub: 'Specific or unlisted statutory situation' }
  ];

  const urgencyOptions: { id: UrgencyLevel; label: string; sub: string; highlight: string }[] = [
    { 
      id: 'immediate', 
      label: 'NOW', 
      sub: 'Someone may be in immediate physical danger or facing unlawful violence.', 
      highlight: 'border-rose-500/50 bg-rose-500/10 text-rose-300' 
    },
    { 
      id: 'today', 
      label: 'TODAY', 
      sub: 'I need to take action or attend an inquiry soon.', 
      highlight: 'border-amber-500/50 bg-amber-500/10 text-amber-300' 
    },
    { 
      id: 'this-week', 
      label: 'THIS WEEK', 
      sub: 'I need legal guidance, but there is no emergency today.', 
      highlight: 'border-teal-500/50 bg-teal-500/10 text-teal-300' 
    },
    { 
      id: 'information', 
      label: 'INFORMATION', 
      sub: 'I mainly want to understand rights and available options.', 
      highlight: 'border-blue-500/50 bg-blue-500/10 text-blue-300' 
    }
  ];

  const popularLocations = [
    { state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad' },
    { state: 'Delhi', district: 'New Delhi', city: 'New Delhi' },
    { state: 'Karnataka', district: 'Bengaluru Urban', city: 'Bengaluru' },
    { state: 'Maharashtra', district: 'Mumbai', city: 'Mumbai' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Trigger Smart Routing Animation
      setIsRouting(true);
      setTimeout(() => {
        onSubmit({
          category: category === 'other' ? customDescription || 'Custom situation' : category,
          description: customDescription,
          urgency,
          location: {
            state,
            district,
            city
          },
          language
        });
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Bar with Step Progress */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest">
              Guided Intake • Step {step} of 3
            </span>
            <h3 className="text-base sm:text-lg font-black text-white">
              {step === 1 && 'What kind of help do you need?'}
              {step === 2 && 'How urgent is this situation?'}
              {step === 3 && 'Where do you need help?'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SMART ROUTING ANIMATION VIEW */}
        {isRouting ? (
          <div className="py-12 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full border-4 border-teal-400 border-t-transparent animate-spin mx-auto" />
            
            <div className="space-y-2">
              <h4 className="text-lg font-black text-white">
                Nyaya Smart Routing in progress…
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Matching: Situation → Urgency ({urgency}) → Jurisdiction ({district}, {state}) → Best next destinations
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-teal-300 font-mono">
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>Prioritizing Legal Services Authorities & Verified Channels</span>
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1: CATEGORY SELECTION */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        category === cat.id
                          ? 'bg-teal-500/20 border-teal-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <h5 className="text-xs font-extrabold truncate">{cat.label}</h5>
                      <p className="text-[11px] text-slate-400 leading-snug mt-1">{cat.sub}</p>
                    </button>
                  ))}
                </div>

                {category === 'other' && (
                  <textarea
                    rows={3}
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Describe what happened in plain words (e.g. Police called my shop about a tenant dispute)..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none font-sans"
                  />
                )}
              </div>
            )}

            {/* STEP 2: URGENCY SELECTION */}
            {step === 2 && (
              <div className="space-y-3">
                {urgencyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setUrgency(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                      urgency === opt.id
                        ? `${opt.highlight} shadow-md`
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center font-mono font-black text-xs shrink-0 mt-0.5">
                      {opt.id === 'immediate' ? '🚨' : opt.id === 'today' ? '⚡' : opt.id === 'this-week' ? '📅' : 'ℹ️'}
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold">{opt.label}</h5>
                      <p className="text-[11px] text-slate-300/80 leading-normal mt-0.5">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3: LOCATION SELECTION */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Select your jurisdiction so we can route you to the appropriate local District Legal Services Authority and verified authorities.
                </p>

                {/* Quick location presets */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    Quick Select Major Cities:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {popularLocations.map((loc) => (
                      <button
                        key={loc.city}
                        type="button"
                        onClick={() => {
                          setState(loc.state);
                          setDistrict(loc.district);
                          setCity(loc.city);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                          district === loc.district
                            ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{loc.city} ({loc.state})</span>
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom inputs */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300">District / City</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setCity(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <Lock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Location is used only to identify relevant local services. Never tracked or stored.</span>
                </div>
              </div>
            )}

            {/* Bottom Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-teal-500/20 cursor-pointer"
              >
                <span>{step === 3 ? 'Find Best Next Step' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
