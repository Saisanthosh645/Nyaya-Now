import React, { useRef, useState } from 'react';
import { 
  Upload, 
  Camera, 
  FileText, 
  Image, 
  MessageSquare, 
  Sparkles, 
  Shield, 
  X,
  FileCheck,
  Plus
} from 'lucide-react';
import { Language } from '../../types';

interface EvidenceUploaderProps {
  onFilesSelected: (files: File[]) => void;
  onTextImported: (text: string, title?: string) => void;
  onClose?: () => void;
  language: Language;
}

export const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  onFilesSelected,
  onTextImported,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [pastedText, setPastedText] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');

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
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(filesArray);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedText.trim()) {
      onTextImported(pastedText.trim(), customTitle.trim() || 'Imported_Evidence_Text.txt');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
      
      {/* Hidden inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept="image/*,.pdf,.txt,.docx,video/*,audio/*"
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

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="space-y-0.5">
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Upload className="w-5 h-5 text-purple-400" />
            <span>Add Evidence</span>
          </h3>
          <p className="text-xs text-slate-400">
            Select one or multiple screenshots, photos, PDFs or documents
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'upload'
              ? 'bg-purple-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Files or Photo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'paste'
              ? 'bg-purple-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Import / Paste Text</span>
        </button>
      </div>

      {/* TAB 1: FILE / CAMERA DROPZONE */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
              isDragOver
                ? 'border-purple-400 bg-purple-500/10 scale-[1.01]'
                : 'border-slate-700 bg-slate-900/40 hover:bg-slate-900 hover:border-purple-500/50'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center shadow-inner">
              <Upload className="w-8 h-8 stroke-[1.8]" />
            </div>

            <div className="space-y-1 max-w-sm">
              <h4 className="text-base font-bold text-white">
                Drop multiple files here
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Screenshots, photos, PDFs and documents. You can select multiple files at once.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Upload Files</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cameraInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-purple-400" />
                <span>Take Photo</span>
              </button>
            </div>

            <span className="text-[10px] text-slate-500 font-mono">
              Formats: PNG, JPG, WEBP, PDF, TXT • Max 50MB per file
            </span>
          </div>

          {/* Prominent Mobile Take Photo Bar */}
          <div className="block sm:hidden">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Camera className="w-5 h-5" />
              <span>Take Photo of Physical Document / Screen</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PASTE / IMPORT TEXT */}
      {activeTab === 'paste' && (
        <form onSubmit={handlePasteSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Evidence Title / Descriptor (Optional)
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. WhatsApp_Chat_SubInspector_18Oct.txt"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Paste Chat Transcript, SMS, Email, or Notice Content
            </label>
            <textarea
              rows={8}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste raw WhatsApp text export, notice transcript, or SMS messages here..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!pastedText.trim()}
            className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Import as Evidence Item
          </button>
        </form>
      )}

      {/* Privacy note */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500">
        <Shield className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span>Original files remain untouched. Cryptographic SHA-256 hashes are calculated client-side.</span>
      </div>

    </div>
  );
};
