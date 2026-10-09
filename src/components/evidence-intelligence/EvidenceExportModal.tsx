import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Printer, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';
import { 
  EvidenceItem, 
  EvidenceEvent, 
  EvidenceGap, 
  EvidenceIntelligenceService 
} from '../../services/evidenceIntelligenceService';

interface EvidenceExportModalProps {
  evidenceItems: EvidenceItem[];
  events: EvidenceEvent[];
  gaps: EvidenceGap[];
  onClose: () => void;
  onNavigateToLawyerConnection?: () => void;
}

export const EvidenceExportModal: React.FC<EvidenceExportModalProps> = ({
  evidenceItems,
  events,
  gaps,
  onClose,
  onNavigateToLawyerConnection
}) => {
  const [copied, setCopied] = useState(false);
  const exportText = EvidenceIntelligenceService.generateExportText(evidenceItems, events, gaps);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([exportText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nyaya_Evidence_Record_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Nyaya Now — Structured Evidence Record</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 40px; color: #111; }
            h1, h2, h3 { color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            th { background: #f8fafc; font-weight: bold; }
            pre { background: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 12px; white-space: pre-wrap; }
            .badge { font-size: 11px; padding: 2px 6px; border-radius: 4px; background: #e2e8f0; }
          </style>
        </head>
        <body>
          <pre>${exportText}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-400" />
              <span>Export Structured Evidence Record</span>
            </h3>
            <p className="text-xs text-slate-400">
              Formatted markdown index suitable for advocates, legal filing annexures, or backup
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed select-text border-b border-slate-800">
          {exportText}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Includes cryptographic SHA-256 integrity hashes</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToLawyerConnection && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToLawyerConnection();
                }}
                className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Take to Lawyer / Authority →</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print View</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadFile}
              className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.md)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
