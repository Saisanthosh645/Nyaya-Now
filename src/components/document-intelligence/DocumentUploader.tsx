import React, { useRef, useState } from 'react';
import { 
  Upload, 
  FileText, 
  Camera, 
  Sparkles, 
  Shield, 
  AlertCircle, 
  ArrowRight, 
  FileCheck, 
  Lock,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { DocumentAnalysis, SAMPLE_DOCUMENTS } from '../../services/documentIntelligenceService';
import { Language } from '../../types';

interface DocumentUploaderProps {
  onFileSelected: (file: File) => void;
  onSampleSelected: (sample: DocumentAnalysis) => void;
  onTextPasted?: (text: string, title?: string) => void;
  language: Language;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onFileSelected,
  onSampleSelected,
  onTextPasted,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [pastedContent, setPastedContent] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedContent.trim() && onTextPasted) {
      onTextPasted(pastedContent.trim(), customTitle.trim() || 'Pasted_Legal_Notice.txt');
    }
  };

  return (
    <div className="w-full space-y-8 max-w-4xl mx-auto">
      {/* Hidden native inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File or Photo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'paste'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste Notice Text directly</span>
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        /* Main Drag-and-Drop Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative rounded-3xl border-2 border-dashed p-8 sm:p-14 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
            isDragOver
              ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.25)] scale-[1.01]'
              : 'border-slate-800 hover:border-amber-500/50 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 shadow-2xl hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]'
          }`}
        >
          {/* Subtle decorative background ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            {/* Animated Central Document Icon */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-amber-400 shadow-xl group-hover:scale-105 group-hover:border-amber-500/50 group-hover:shadow-amber-500/20 transition-all duration-300">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.75]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Upload className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            {/* Primary Text */}
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                Drop your document here
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                PDF, JPG, PNG supported • Maximum file size: 10 MB
              </p>
            </div>

            {/* Action Button Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Upload Document</span>
              </button>

              {/* Take Photo button for Mobile */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cameraInputRef.current?.click();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Take Photo (Camera)</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Scanned notices, phone photos of notices, FIR copies, or court summons.
            </p>
          </div>
        </div>
      ) : (
        /* Paste Document Form */
        <form onSubmit={handlePasteSubmit} className="rounded-3xl bg-slate-950/90 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Paste Real Notice or Legal Document Text</span>
            </h4>
            <p className="text-xs text-slate-400">
              Paste the text of any police notice, WhatsApp message, summons, or email you received. Nyaya extracts real dates, case numbers & BNSS rights.
            </p>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Document Title / Reference (optional, e.g. Notice_PS_Cyber_2026)"
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <textarea
              value={pastedContent}
              onChange={(e) => setPastedContent(e.target.value)}
              rows={8}
              placeholder="Paste the full text of your legal notice, FIR, or summons here..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-y"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              {pastedContent.length} characters entered
            </span>
            <button
              type="submit"
              disabled={!pastedContent.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Extract & Analyze Real Notice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* SAMPLE DEMO DOCUMENTS SECTION (1-Click Evaluation) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Try a Sample Legal Document (1-Click Hackathon Demo)
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Pre-loaded Indian legal specimens
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_DOCUMENTS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSampleSelected(sample)}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/60 text-left transition-all group cursor-pointer shadow-md active:scale-98 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[10px] font-mono font-bold uppercase">
                    {sample.documentType.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {sample.fileSize}
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {sample.documentType}
                </h5>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {sample.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>Analyze this specimen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* PRIVACY & DATA HANDLING STATEMENT */}
      <div className="rounded-2xl bg-slate-900/50 border border-slate-800/80 p-4 flex items-start gap-3 text-xs text-slate-400">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-300">
            Privacy & Data Confidentiality Notice
          </p>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Your document may contain sensitive personal information. Upload only documents you are comfortable processing through this service. Your document is processed transiently according to Nyaya Now's configured data-handling policy. Never upload bank passwords, card numbers, or OTPs.
          </p>
        </div>
      </div>
    </div>
  );
};
