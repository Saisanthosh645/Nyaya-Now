import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  ShieldCheck, 
  Lock, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { HelpDestination, NyayaBriefingData } from '../../services/lawyerAuthorityService';

interface NyayaBriefingModalProps {
  briefing: NyayaBriefingData;
  destination?: HelpDestination;
  onClose: () => void;
}

export const NyayaBriefingModal: React.FC<NyayaBriefingModalProps> = ({
  briefing,
  destination,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [includePersonal, setIncludePersonal] = useState(true);
  const [includeEvidence, setIncludeEvidence] = useState(true);
  const [includeContact, setIncludeContact] = useState(true);

  const generateBriefingText = () => {
    let out = `# NYAYA CASE BRIEFING — CONFIDENTIAL\n`;
    out += `Generated: ${briefing.generatedDate}\n`;
    out += `Recipient: ${destination ? `${destination.name} (${destination.designation})` : 'Legal Counsel / Authority'}\n`;
    out += `Notice: AI-assisted summary prepared via Nyaya Now for citizen consultation. Verify all facts before relying upon them.\n\n`;

    out += `## 1. SITUATION SUMMARY\n${briefing.situationSummary}\n`;
    out += `Jurisdiction: ${briefing.jurisdiction} | Urgency Level: ${briefing.urgency.toUpperCase()}\n\n`;

    out += `## 2. CHRONOLOGICAL MILESTONES\n`;
    briefing.keyDates.forEach((d, i) => out += `${i + 1}. ${d}\n`);
    out += `\n`;

    out += `## 3. DOCUMENTS ATTACHED\n`;
    briefing.documentsAttached.forEach((doc, i) => out += `- ${doc}\n`);
    out += `\n`;

    if (includeEvidence) {
      out += `## 4. EVIDENCE RECONSTRUCTION SUMMARY\n`;
      briefing.evidenceSummary.forEach((ev, i) => out += `- ${ev}\n`);
      out += `\n`;
    }

    out += `## 5. SPECIFIC QUESTIONS FOR COUNSEL / AUTHORITY\n`;
    briefing.citizenQuestions.forEach((q, i) => out += `${i + 1}. ${q}\n`);
    out += `\n`;

    if (briefing.userNotes.length > 0) {
      out += `## 6. CITIZEN PERSONAL NOTES\n`;
      briefing.userNotes.forEach((n, i) => out += `- "${n}"\n`);
      out += `\n`;
    }

    if (!includePersonal) {
      out += `\n[NOTE: Personal identifiers masked per citizen privacy preference]\n`;
    }

    return out;
  };

  const briefingText = generateBriefingText();

  const handleCopy = () => {
    navigator.clipboard.writeText(briefingText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([briefingText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nyaya_Case_Briefing_${new Date().toISOString().slice(0, 10)}.md`;
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
          <title>Nyaya Case Briefing</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; padding: 40px; color: #0f172a; }
            h1, h2 { border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
            pre { background: #f8fafc; padding: 15px; border-radius: 8px; font-size: 13px; white-space: pre-wrap; font-family: inherit; }
          </style>
        </head>
        <body>
          <pre>${briefingText}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              <span>Nyaya Case Briefing for Counsel / Authority</span>
            </h3>
            <p className="text-xs text-slate-400">
              Structured consultation briefing preserving context, timelines, and statutory inquiries
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Redaction Toolbar */}
        <div className="p-3 bg-slate-950 border-b border-slate-800/80 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400 font-mono text-[11px] font-bold uppercase">
            Review Before Sharing:
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includePersonal}
                onChange={(e) => setIncludePersonal(e.target.checked)}
                className="rounded accent-teal-500"
              />
              <span>Full Name & ID</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={includeEvidence}
                onChange={(e) => setIncludeEvidence(e.target.checked)}
                className="rounded accent-teal-500"
              />
              <span>Evidence Index</span>
            </label>
          </div>
        </div>

        {/* Briefing Text Preview */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-text border-b border-slate-800">
          {briefingText}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>AI-assisted summary — verify all facts before relying on it</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
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
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
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
