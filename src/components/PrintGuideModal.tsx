import React from 'react';
import { Printer, X, Shield, Check, Scale } from 'lucide-react';
import { Situation, Language } from '../types';

interface PrintGuideModalProps {
  situation: Situation;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PrintGuideModal: React.FC<PrintGuideModalProps> = ({
  situation,
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="print-guide-modal" className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-300">
        
        {/* Modal Action Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Print / Pocket Rights Card
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Card Area */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-amber-400 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">NyayaNow</h1>
                <p className="text-xs text-slate-500 font-medium">India's 30-Second Police Rights Guide • BNSS 2023</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded border border-slate-200">
                Official Guide
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Toll-Free: 112 / 15100</p>
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {situation.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {situation.shortDescription}
            </p>
          </div>

          {/* 30-Second Quick Steps */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center space-x-1.5">
              <span>⚡ 30-Second Action Checklist</span>
            </h3>
            <div className="space-y-1.5 text-xs text-slate-800">
              {situation.quick30SecSummary.map((s, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <strong className="text-slate-900 font-bold">{i + 1}.</strong>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Statutory Rights */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">
              Statutory Rights (BNSS 2023 & Constitution)
            </h3>
            <div className="space-y-2 text-xs">
              {situation.rights.slice(0, 3).map((r, i) => (
                <div key={i} className="border-l-2 border-slate-900 pl-3 py-0.5">
                  <div className="font-bold text-slate-900">
                    ✓ {r.title} ({r.bnssSection || r.constitutionArticle})
                  </div>
                  <div className="text-slate-600 text-[11px]">{r.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Polite Speech Script */}
          {situation.sayThis.length > 0 && (
            <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200 text-xs">
              <div className="font-bold text-amber-950 uppercase tracking-wider text-[10px] mb-1">
                Say this politely:
              </div>
              <p className="text-slate-900 font-bold italic">
                “{situation.sayThis[0].english}”
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
            <span>General legal information under Indian law. In emergency call 112.</span>
            <span>https://nyayanow.in</span>
          </div>

        </div>

      </div>
    </div>
  );
};
