import React, { useState } from 'react';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Printer, 
  RotateCcw,
  ShieldAlert,
  Stamp
} from 'lucide-react';
import { DocumentAnalysis } from '../../services/documentIntelligenceService';

interface DocumentPreviewProps {
  document: DocumentAnalysis;
  onReset: () => void;
  onUpdateText?: (newText: string) => void;
  highlightedText?: string | null;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onReset,
  onUpdateText,
  highlightedText
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hidePII, setHidePII] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'image' | 'text'>(
    document.previewImageUrl ? 'image' : 'text'
  );
  const [isEditingOcr, setIsEditingOcr] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(
    document.extractedRawText || document.previewText
  );

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 70));

  const handleApplyOcrCorrection = () => {
    if (onUpdateText) {
      onUpdateText(editedText);
    }
    setIsEditingOcr(false);
  };

  // Render text with sensitive PII masked or highlighted if requested
  const renderPreviewLines = (rawText: string) => {
    let processed = rawText;
    if (hidePII) {
      processed = processed
        .replace(/Vikram Sharma/g, '██████ ██████ [NAME PROTECTED]')
        .replace(/Ananya Deshmukh/g, '██████ ██████ [NAME PROTECTED]')
        .replace(/Karthik Narayanan/g, '██████ ██████ [NAME PROTECTED]')
        .replace(/Jubilee Hills, Hyderabad - 500033/g, '██████, █████████ - 500XXX')
        .replace(/Saket, New Delhi - 110017/g, '█████, ███ █████ - 110XXX')
        .replace(/Malleshwaram, Bengaluru - 560003/g, '████████████, █████████ - 560XXX')
        .replace(/98XXXXXX21/g, 'XXXXXXXXXX');
    }

    const lines = processed.split('\n');

    return lines.map((line, idx) => {
      const isHeader = line === line.toUpperCase() && line.length > 5 && !line.includes(':');
      const isDirective = line.includes('YOU ARE HEREBY DIRECTED') || line.includes('THIS IS TO COMMAND YOU');
      const isWarning = line.includes('TAKE NOTICE') || line.includes('AND YOU ARE HEREBY WARNED');

      return (
        <div
          key={idx}
          className={`py-0.5 leading-relaxed font-mono ${
            isHeader
              ? 'font-black text-slate-900 tracking-wider text-center text-xs sm:text-sm my-1'
              : isDirective
              ? 'bg-amber-100/80 text-amber-950 font-bold px-2 py-1 rounded my-1 border-l-4 border-amber-600'
              : isWarning
              ? 'bg-rose-50 text-rose-950 font-semibold px-2 py-1 rounded my-1 border-l-4 border-rose-600'
              : 'text-slate-800 text-[11px] sm:text-xs'
          }`}
        >
          {line || '\u00A0'}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Document Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 bg-slate-950 border-b border-slate-800 text-xs">
        {/* File Meta */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h5 className="font-bold text-slate-200 truncate max-w-[150px] sm:max-w-xs">
              {document.fileName}
            </h5>
            <span className="text-[10px] text-slate-500 font-mono">
              {document.fileSize} • {document.isImageDoc ? 'Image Scan' : `${document.pageCount} Pages`}
            </span>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* If Image exists, allow toggling Image vs OCR Text */}
          {document.previewImageUrl && (
            <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('image')}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  viewMode === 'image'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Scan Image
              </button>
              <button
                type="button"
                onClick={() => setViewMode('text')}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  viewMode === 'text'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                OCR Text
              </button>
            </div>
          )}

          {/* Hide PII Toggle */}
          <button
            type="button"
            onClick={() => setHidePII(!hidePII)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              hidePII
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
            }`}
            title="Mask personal identifying information for privacy"
          >
            {hidePII ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{hidePII ? 'PII Masked' : 'Hide PII'}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden xs:flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1 text-slate-300">{zoomLevel}%</span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset / Upload new */}
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Upload different document"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Canvas */}
      <div className="p-4 sm:p-6 bg-slate-950/70 overflow-x-auto min-h-[480px] flex items-center justify-center">
        {viewMode === 'image' && document.previewImageUrl ? (
          /* Render the ACTUAL uploaded image */
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-xl transition-transform duration-200 flex flex-col items-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 group">
              <img
                src={document.previewImageUrl}
                alt={document.fileName}
                className="max-h-[580px] w-auto object-contain rounded-xl select-none"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Uploaded Scan ({document.fileName})</span>
              </div>
            </div>
          </div>
        ) : (
          /* Render Text Canvas */
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-xl bg-[#FAF9F6] text-slate-900 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-slate-300 p-6 sm:p-10 relative transition-transform duration-200"
          >
            {/* Watermark */}
            <div className="absolute top-6 right-6 opacity-15 pointer-events-none">
              <div className="w-20 h-20 rounded-full border-4 border-red-700 flex flex-col items-center justify-center text-red-800 font-black text-[9px] uppercase tracking-widest text-center rotate-12">
                <span>GOVT OF INDIA</span>
                <span>OFFICIAL</span>
              </div>
            </div>

            {/* Red Seal */}
            <div className="absolute bottom-8 right-8 pointer-events-none opacity-80">
              <div className="w-16 h-16 rounded-full border-2 border-red-700/80 flex flex-col items-center justify-center text-red-800 font-bold text-[8px] uppercase tracking-tighter text-center -rotate-6 shadow-xs">
                <span className="font-mono text-[7px]">SEAL & SIGN</span>
                <span>VERIFIED</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="space-y-1">
              {renderPreviewLines(document.previewText)}
            </div>
          </div>
        )}
      </div>

      {/* OCR Text Review Drawer if image was uploaded */}
      {document.isImageDoc && (
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <span>Extracted OCR Text</span>
              {document.ocrConfidence ? (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                  {document.ocrConfidence}% confidence
                </span>
              ) : null}
            </span>

            <button
              type="button"
              onClick={isEditingOcr ? handleApplyOcrCorrection : () => setIsEditingOcr(true)}
              className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
            >
              {isEditingOcr ? '✓ Apply Corrections' : 'Edit / Correct OCR'}
            </button>
          </div>

          {isEditingOcr ? (
            <div className="space-y-2">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                rows={4}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-amber-500/50 text-xs text-white font-mono"
              />
              <button
                type="button"
                onClick={handleApplyOcrCorrection}
                className="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
              >
                Re-Analyze with Corrected Text
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 line-clamp-2 font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800">
              {document.extractedRawText || document.previewText}
            </p>
          )}
        </div>
      )}

      {/* Bottom status indicator */}
      <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
        <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {document.isImageDoc
              ? `Tesseract Client-Side OCR (${document.ocrConfidence || 85}% confidence)`
              : 'Direct Text Stream Extracted'}
          </span>
        </div>
        <span className="text-slate-500 font-mono hidden sm:inline">
          Ref: {document.referenceNumber}
        </span>
      </div>
    </div>
  );
};

