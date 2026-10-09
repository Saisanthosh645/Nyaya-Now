import React from 'react';
import { Activity, ShieldCheck, Scale, Cpu, FileText } from 'lucide-react';
import { AIResponseData } from '../../services/aiLegalService';
import { Language } from '../../types';

interface IntelligenceTelemetryProps {
  currentResponse: AIResponseData | null;
  language: Language;
}

export const IntelligenceTelemetry: React.FC<IntelligenceTelemetryProps> = ({
  currentResponse,
  language
}) => {
  const isHi = language === 'hi';
  const isTe = language === 'te';

  return (
    <div className="w-full rounded-3xl bg-slate-950/70 border border-slate-800/80 p-5 backdrop-blur-xl text-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span className="font-mono font-bold text-slate-200 tracking-wider">
            {isTe ? 'న్యాయ ఇంటెలిజెన్స్' : isHi ? 'न्याय इंटेलिजेंस' : 'NYAYA INTELLIGENCE'}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {isTe ? 'ఆన్‌లైన్' : isHi ? 'ऑनलाइन' : 'ONLINE'}
        </span>
      </div>

      {/* Understanding status */}
      <div className="space-y-1">
        <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-amber-400" />
          <span>{isTe ? 'పరిస్థితి అవగాహన' : isHi ? 'स्थिति समझ' : 'Understanding'}</span>
        </div>
        <p className="text-slate-300 font-medium">
          {currentResponse 
            ? currentResponse.scenarioTag 
            : (isTe ? 'పౌరుడి ప్రశ్న కోసం వేచి ఉంది...' : isHi ? 'नागरिक के प्रश्न की प्रतीक्षा...' : 'Awaiting citizen prompt...')}
        </p>
      </div>

      {/* Scenario status */}
      <div className="space-y-1">
        <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
          <Scale className="w-3 h-3 text-amber-400" />
          <span>{isTe ? 'చట్టపరమైన సందర్భం' : isHi ? 'कानूनी परिदृश्य' : 'Scenario'}</span>
        </div>
        <p className="text-slate-300 font-medium truncate">
          {currentResponse 
            ? currentResponse.situationTitle 
            : (isTe ? 'వివరణను అంచనా వేయడానికి సిద్ధంగా ఉంది' : isHi ? 'विवरण का मूल्यांकन करने के लिए तैयार' : 'Ready to evaluate description')}
        </p>
      </div>

      {/* Guidance statutory basis */}
      <div className="space-y-1">
        <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
          <FileText className="w-3 h-3 text-amber-400" />
          <span>{isTe ? 'చట్టపరమైన ఆధారం' : isHi ? 'कानूनी आधार' : 'Guidance'}</span>
        </div>
        <p className="text-slate-300 font-medium">
          {currentResponse 
            ? currentResponse.telemetry.governingAct 
            : (isTe ? 'BNSS 2023 & భారత రాజ్యాంగం' : isHi ? 'BNSS 2023 और भारतीय संविधान' : 'BNSS 2023 & Constitution of India')}
        </p>
      </div>

      {/* Risk / Priority Badge */}
      {currentResponse && (
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">
            {isTe ? 'రిస్క్ అంచనా:' : isHi ? 'जोखिम मूल्यांकन:' : 'Risk Assessment:'}
          </span>
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded-md ${
              currentResponse.telemetry.riskLevel === 'CRITICAL'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : currentResponse.telemetry.riskLevel === 'HIGH'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {isTe 
              ? (currentResponse.telemetry.riskLevel === 'CRITICAL' ? 'తీవ్రమైనది (CRITICAL)' : currentResponse.telemetry.riskLevel === 'HIGH' ? 'ఎక్కువ (HIGH)' : 'సాధారణం (NORMAL)') 
              : currentResponse.telemetry.riskLevel}
          </span>
        </div>
      )}
    </div>
  );
};
