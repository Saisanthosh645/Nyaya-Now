import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2, Sparkles, Scale } from 'lucide-react';
import { Language } from '../../types';

interface AnalysisStateProps {
  language: Language;
  onComplete: () => void;
}

interface StepInfo {
  labelEn: string;
  labelHi: string;
  labelTe: string;
}

const STEPS: StepInfo[] = [
  {
    labelEn: 'Understanding your description',
    labelHi: 'आपके विवरण को समझा जा रहा है',
    labelTe: 'మీ వివరణను అర్థం చేసుకుంటోంది'
  },
  {
    labelEn: 'Identifying the situation',
    labelHi: 'परिस्थिति की पहचान की जा रही है',
    labelTe: 'పరిస్థితిని గుర్తిస్తోంది'
  },
  {
    labelEn: 'Finding relevant guidance',
    labelHi: 'प्रासंगिक कानूनी मार्गदर्शन खोजा जा रहा है',
    labelTe: 'సంబంధిత చట్టపరమైన మార్గదర్శకాలను అన్వేషిస్తోంది'
  },
  {
    labelEn: 'Preparing your response',
    labelHi: 'आपकी प्रतिक्रिया तैयार की जा रही है',
    labelTe: 'మీ ప్రతిస్పందనను సిద్ధం చేస్తోంది'
  }
];

export const AnalysisState: React.FC<AnalysisStateProps> = ({
  language,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    // Progress through steps every 450ms
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-amber-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,6,23,0.8),0_0_40px_rgba(245,158,11,0.08)] max-w-3xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Scale className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                NYAYA INTELLIGENCE
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
              {isHi
                ? 'आपकी स्थिति का विश्लेषण किया जा रहा है'
                : isTe
                ? 'మీ పరిస్థితిని విశ్లేషిస్తోంది'
                : 'Understanding your situation'}
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>BNSS LEGAL ENGINE</span>
        </div>
      </div>

      {/* Sequential Animated Steps */}
      <div className="space-y-3.5">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          const label = isHi ? step.labelHi : isTe ? step.labelTe : step.labelEn;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-amber-500/10 border border-amber-500/40 text-amber-200'
                  : isDone
                  ? 'bg-slate-900/40 border border-slate-800/60 text-slate-300'
                  : 'bg-transparent text-slate-600 opacity-40'
              }`}
            >
              {/* Icon status */}
              <div className="shrink-0 flex items-center justify-center w-6 h-6">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in-75 duration-200" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>

              {/* Step Text */}
              <div className="flex-1 text-sm sm:text-base font-medium">
                {label}
              </div>

              {/* Step indicator */}
              <div className="text-xs font-mono text-slate-500">
                0{idx + 1}/04
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-6 border border-slate-800">
        <div
          className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
