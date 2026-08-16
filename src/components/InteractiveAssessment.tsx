import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck, Lock, PhoneCall } from 'lucide-react';
import { Language, ActiveView } from '../types';
import { translations } from '../data/translations';
import { AshokaChakra } from './AshokaChakra';

interface InteractiveAssessmentProps {
  language: Language;
  onNavigate: (view: ActiveView) => void;
  onOpenEmergency: () => void;
}

export const InteractiveAssessment: React.FC<InteractiveAssessmentProps> = ({
  language,
  onNavigate,
  onOpenEmergency
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    freeToLeave?: boolean;
    location?: 'street' | 'station' | 'patrol_vehicle';
    groundsGiven?: boolean;
  }>({});

  const t = translations[language];

  const handleReset = () => {
    setCurrentStep(1);
    setAnswers({});
  };

  // Determine diagnostic status based on answers
  const getDiagnosis = () => {
    if (answers.freeToLeave === true) {
      return {
        status: 'Casual Interaction / Free to Leave',
        tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        summary: 'You are NOT under arrest and NOT detained.',
        explanation: 'Police may casually ask questions during routine patrol. If you are free to leave, you can politely excuse yourself and carry on.',
        recommendedSay: '“Officer, thank you for clarifying. If I am not required for any formal proceeding, I will be on my way now.”',
        actionSlug: 'stopped-questioned',
        primaryAdvice: 'Verify officer identity if needed, keep interaction polite, and do not make provocative remarks.'
      };
    }

    if (answers.location === 'street' && answers.groundsGiven === false) {
      return {
        status: 'Street Questioning / Potential Informal Restraint',
        tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
        summary: 'You are being restrained, but formal arrest has not been declared.',
        explanation: 'Police cannot hold you indefinitely without declaring whether you are detained. For offences punishable up to 7 years, they must issue a formal Notice of Appearance under Section 35 BNSS.',
        recommendedSay: '“Officer, am I legally detained, or am I free to go? If there is an inquiry, please issue me a written Notice of Appearance under Section 35 BNSS.”',
        actionSlug: 'stopped-questioned',
        primaryAdvice: 'Ask clearly whether you are free to leave. Do not run or resist physically.'
      };
    }

    if (answers.location === 'station' || answers.groundsGiven === true) {
      return {
        status: 'Formal Custody / Arrest in Progress',
        tagColor: 'bg-red-100 text-red-800 border-red-300',
        summary: 'You are legally under arrest or in police custody.',
        explanation: 'Full statutory safeguards under the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 and Constitution of India apply to you immediately.',
        recommendedSay: '“Under Section 47 and 48 BNSS, please give me the written grounds of arrest, prepare the Arrest Memo, and inform my family member [Name/Number] immediately.”',
        actionSlug: 'arrest-detention',
        primaryAdvice: 'Insist on: (1) Grounds of arrest, (2) Family notification (Sec 48), (3) Lawyer access (Sec 38), (4) Production before Magistrate within 24h (Sec 58).'
      };
    }

    return {
      status: 'Informal Detention / Custody',
      tagColor: 'bg-red-100 text-red-800 border-red-300',
      summary: 'You are being restricted without formal procedure.',
      explanation: 'Informal detention in police stations without recording or arrest memos is illegal under Supreme Court D.K. Basu guidelines.',
      recommendedSay: '“I would like to contact my family and advocate immediately to inform them of my whereabouts under Section 48 BNSS.”',
      actionSlug: 'arrest-detention',
      primaryAdvice: 'Ensure relatives know where you are located. Note officer names and time.'
    };
  };

  const diagnosis = getDiagnosis();

  return (
    <div id="diagnostic-tool-page" className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-bold mb-3 border border-amber-300/80 shadow-xs">
          <AshokaChakra size={16} speed="slow" color="#000080" strokeWidth={2} />
          <span>30-Second Legal Diagnostic • BNSS 2023</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Am I Under Arrest or Detained?
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2">
          Answer 3 quick questions to instantly identify your exact legal status and which statutory protections apply right now.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-amber-500 h-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>

      {/* Question 1 */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Step 1 of 3</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            Did the police officer tell you that you are NOT free to leave?
          </h3>

          <p className="text-xs sm:text-sm text-slate-600">
            If you politely asked "Am I free to go?" and they said no, or if they have physically prevented you from leaving.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                setAnswers({ ...answers, freeToLeave: false });
                setCurrentStep(2);
              }}
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-red-500 hover:bg-red-50/30 text-left transition-all active:scale-[0.99] group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-red-700 text-base">
                No, I am NOT free to leave
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Police have stopped me or instructed me to stay.
              </div>
            </button>

            <button
              onClick={() => {
                setAnswers({ ...answers, freeToLeave: true });
                setCurrentStep(4); // Instant resolution: Casual inquiry
              }}
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-left transition-all active:scale-[0.99] group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-emerald-700 text-base">
                Yes, I am free to leave
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Officer is just casually asking questions or checking papers.
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Question 2 */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Step 2 of 3</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            Where are you currently located?
          </h3>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                setAnswers({ ...answers, location: 'street' });
                setCurrentStep(3);
              }}
              className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-all group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-amber-700 text-base">
                On the street / public road / traffic check
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Standing outside, in my vehicle, or public place.
              </div>
            </button>

            <button
              onClick={() => {
                setAnswers({ ...answers, location: 'station' });
                setCurrentStep(3);
              }}
              className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-red-500 hover:bg-red-50/30 text-left transition-all group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-red-700 text-base">
                Inside a Police Station / Police Outpost (Chowki)
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Brought into the police station premises or lockup area.
              </div>
            </button>

            <button
              onClick={() => {
                setAnswers({ ...answers, location: 'patrol_vehicle' });
                setCurrentStep(3);
              }}
              className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-red-500 hover:bg-red-50/30 text-left transition-all group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-red-700 text-base">
                Inside a Police Patrol Van / Vehicle
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Being transported in a government vehicle.
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Question 3 */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Step 3 of 3</span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            Has the police officer given you the specific grounds (offence/section) or an Arrest Memo?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                setAnswers({ ...answers, groundsGiven: true });
                setCurrentStep(4);
              }}
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-red-500 hover:bg-red-50/30 text-left transition-all group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-red-700 text-base">
                Yes, they stated reasons or filed an arrest memo
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Officer mentioned an FIR, warrant, or specific criminal offence.
              </div>
            </button>

            <button
              onClick={() => {
                setAnswers({ ...answers, groundsGiven: false });
                setCurrentStep(4);
              }}
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-all group cursor-pointer"
            >
              <div className="font-bold text-slate-900 group-hover:text-amber-700 text-base">
                No, they have not given any written grounds or memo
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Just holding me or questioning without formal explanation.
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Diagnosis Result Card */}
      {currentStep === 4 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-900 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${diagnosis.tagColor}`}>
              {diagnosis.status}
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center space-x-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {diagnosis.summary}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {diagnosis.explanation}
            </p>
          </div>

          {/* Primary Advice */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Immediate Next Step</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {diagnosis.primaryAdvice}
            </p>
          </div>

          {/* Recommended Speech Quote */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
              Say this politely to the officer:
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 italic">
              {diagnosis.recommendedSay}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate({ type: 'situation', slug: diagnosis.actionSlug })}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <span>View Full Legal Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenEmergency}
              className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Open Emergency Mode</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
