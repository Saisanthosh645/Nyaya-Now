import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Image, 
  Copy, 
  Check, 
  Lock, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Hash, 
  Clock, 
  MessageSquare, 
  Plus, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { EvidenceItem, EvidenceType, SourceLabelType } from '../../services/evidenceIntelligenceService';

interface EvidenceDetailPanelProps {
  item: EvidenceItem;
  onClose: () => void;
  onAddNote: (itemId: string, note: string) => void;
  onToggleReviewStatus: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onChangeType: (itemId: string, newType: EvidenceType) => void;
  onNavigateToDocumentIntelligence?: () => void;
}

export const EvidenceDetailPanel: React.FC<EvidenceDetailPanelProps> = ({
  item,
  onClose,
  onAddNote,
  onToggleReviewStatus,
  onDeleteItem,
  onChangeType,
  onNavigateToDocumentIntelligence
}) => {
  const [activeTab, setActiveTab] = useState<'extracted' | 'original' | 'notes'>('extracted');
  const [copiedHash, setCopiedHash] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCopyHash = () => {
    if (item.metadata?.hash) {
      navigator.clipboard.writeText(item.metadata.hash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(item.id, newNote.trim());
      setNewNote('');
    }
  };

  const renderSourceBadge = (source: SourceLabelType) => {
    const config: Record<SourceLabelType, { label: string; color: string }> = {
      DOCUMENT_TEXT: { label: 'DOCUMENT TEXT', color: 'bg-blue-500/10 text-blue-300 border-blue-500/30' },
      OCR: { label: 'OCR EXTRACTION', color: 'bg-purple-500/10 text-purple-300 border-purple-500/30' },
      FILE_METADATA: { label: 'FILE METADATA', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
      USER_PROVIDED: { label: 'USER PROVIDED', color: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
      AI_INFERENCE: { label: 'AI INFERENCE', color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' },
      USER_NOTE: { label: 'USER NOTE', color: 'bg-teal-500/10 text-teal-300 border-teal-500/30' }
    };

    const c = config[source] || config.DOCUMENT_TEXT;
    return (
      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${c.color}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
      
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 uppercase">
              {item.type}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {item.fileSize}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-black text-white truncate mt-1" title={item.filename}>
            {item.filename}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-800 bg-slate-950/80 px-4 pt-2 gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('extracted')}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'extracted'
              ? 'border-purple-500 text-purple-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Extracted Intelligence
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('original')}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'original'
              ? 'border-purple-500 text-purple-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Original Evidence
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('notes')}
          className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'notes'
              ? 'border-purple-500 text-purple-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          User Notes ({item.userNotes.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        
        {/* INCONSISTENCY ALERT IF PRESENT */}
        {item.potentialInconsistencies.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Potential Inconsistency Detected</span>
            </div>
            {item.potentialInconsistencies.map((inc, i) => (
              <p key={i} className="text-slate-300 text-[11px] leading-relaxed">
                • {inc}
              </p>
            ))}
            <p className="text-[10px] text-amber-400/80 font-mono pt-1">
              Note: This is a technical observation for your review, not an allegation of forgery.
            </p>
          </div>
        )}

        {/* TAB 1: EXTRACTED INTELLIGENCE */}
        {activeTab === 'extracted' && (
          <div className="space-y-6">
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Created Timestamp</span>
                <p className="font-semibold text-slate-200 mt-0.5">{item.metadata?.createdAt || 'Not embedded'}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Added to Record</span>
                <p className="font-semibold text-slate-200 mt-0.5">{item.uploadedAt}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Evidence Source</span>
                <p className="font-semibold text-slate-200 mt-0.5">{item.metadata?.source || 'Direct upload'}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Classification</span>
                <p className="font-semibold text-purple-300 mt-0.5 capitalize">{item.type}</p>
              </div>
            </div>

            {/* Cryptographic SHA-256 Hash */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>SHA-256 File Integrity Hash</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] font-mono text-purple-300/90 break-all bg-slate-950 p-2 rounded-lg border border-slate-800">
                {item.metadata?.hash || 'Calculating hash…'}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                Cryptographic hash verifies the original file has not been altered since upload. Does not imply statutory admissibility.
              </p>
            </div>

            {/* Extracted Entities */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>Entities Detected ({item.entities.length})</span>
              </h4>

              {item.entities.length === 0 ? (
                <p className="text-xs text-slate-500 italic p-3 rounded-xl bg-slate-900/40">
                  No explicit entities identified in text.
                </p>
              ) : (
                <div className="space-y-1.5">
                  {item.entities.map((ent) => (
                    <div
                      key={ent.id}
                      className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
                          {ent.type}
                        </span>
                        <p className="text-xs font-bold text-white truncate">
                          {ent.value}
                        </p>
                      </div>
                      {renderSourceBadge(ent.sourceLabel)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Extracted Dates */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Dates & Timestamps ({item.dates.length})</span>
              </h4>

              <div className="space-y-1.5">
                {item.dates.map((d, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                        {d.label || 'Timestamp'}
                      </span>
                      <p className="text-xs font-bold text-white">
                        {d.formattedDate}{d.time ? ` · ${d.time}` : ''}
                      </p>
                    </div>
                    {renderSourceBadge(d.sourceLabel)}
                  </div>
                ))}
              </div>
            </div>

            {/* Relevant Raw Extracted Text */}
            {item.extractedText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                    Extracted Text / OCR Transcript
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">
                    {item.ocrConfidence ? `${item.ocrConfidence}% OCR confidence` : 'Direct stream'}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto select-text">
                  {item.extractedText}
                </div>
              </div>
            )}

            {/* Document Intelligence CTA if document */}
            {(item.type === 'document' || item.type === 'notice') && onNavigateToDocumentIntelligence && (
              <button
                type="button"
                onClick={onNavigateToDocumentIntelligence}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Analyze in Feature 03 — Document Intelligence</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        )}

        {/* TAB 2: ORIGINAL UNTOUCHED EVIDENCE */}
        {activeTab === 'original' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Untouched Original:</strong> Nyaya strictly preserves the pristine original bytes of your uploaded file without alterations.
            </div>

            {item.previewUrl ? (
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center p-2">
                <img
                  src={item.previewUrl}
                  alt={item.filename}
                  className="max-h-96 w-auto object-contain rounded-xl shadow-lg"
                />
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 font-mono">
                  Original file: {item.filename} ({item.fileSize})
                </p>
                <p className="text-[11px] text-slate-500">
                  Document text has been indexed and preserved.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: USER NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-200 text-xs leading-relaxed">
              <strong className="text-teal-300">[USER NOTE]:</strong> Notes added here are strictly tagged as citizen input and are never confused with objective extracted facts.
            </div>

            {/* Existing notes */}
            {item.userNotes.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 text-center">
                No user notes added yet. Record context like "Received from X on date" below.
              </p>
            ) : (
              <div className="space-y-2.5">
                {item.userNotes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-teal-400 uppercase">
                        User Note #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      "{note}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Add note form */}
            <form onSubmit={handleNoteSubmit} className="space-y-2 pt-2">
              <textarea
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add context (e.g. Received this message while waiting at Cyber Crime PS)..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Add User Note
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Footer Controls */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
        {/* Toggle Review status */}
        <button
          type="button"
          onClick={() => onToggleReviewStatus(item.id)}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            item.reviewStatus === 'reviewed'
              ? 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          <span>{item.reviewStatus === 'reviewed' ? 'Mark as Needs Review' : 'Mark as Reviewed'}</span>
        </button>

        {/* Delete Item */}
        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Delete evidence item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onDeleteItem(item.id)}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-[11px] cursor-pointer"
            >
              Confirm Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-[11px] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
