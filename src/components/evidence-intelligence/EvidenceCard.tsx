import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  MessageSquare, 
  Receipt, 
  Mail, 
  Video, 
  Mic, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Edit3, 
  MoreVertical, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { EvidenceItem, EvidenceType } from '../../services/evidenceIntelligenceService';

interface EvidenceCardProps {
  item: EvidenceItem;
  onSelect: (item: EvidenceItem) => void;
  onChangeType: (itemId: string, newType: EvidenceType) => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  item,
  onSelect,
  onChangeType
}) => {
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const typeConfig: Record<EvidenceType, { label: string; icon: React.ReactNode; color: string }> = {
    screenshot: { label: 'Screenshot', icon: <Image className="w-3.5 h-3.5" />, color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' },
    photo: { label: 'Photo', icon: <Image className="w-3.5 h-3.5" />, color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' },
    document: { label: 'Document', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-blue-500/10 text-blue-300 border-blue-500/30' },
    notice: { label: 'Police Notice', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
    message: { label: 'Message / Chat', icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'bg-purple-500/10 text-purple-300 border-purple-500/30' },
    receipt: { label: 'Receipt / Inward', icon: <Receipt className="w-3.5 h-3.5" />, color: 'bg-teal-500/10 text-teal-300 border-teal-500/30' },
    email: { label: 'Email', icon: <Mail className="w-3.5 h-3.5" />, color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' },
    video: { label: 'Video', icon: <Video className="w-3.5 h-3.5" />, color: 'bg-rose-500/10 text-rose-300 border-rose-500/30' },
    audio: { label: 'Audio', icon: <Mic className="w-3.5 h-3.5" />, color: 'bg-orange-500/10 text-orange-300 border-orange-500/30' },
    other: { label: 'Other', icon: <Layers className="w-3.5 h-3.5" />, color: 'bg-slate-800 text-slate-300 border-slate-700' }
  };

  const currentTypeInfo = typeConfig[item.type] || typeConfig.other;
  const primaryDate = item.dates[0];

  const allTypes: EvidenceType[] = [
    'screenshot', 'photo', 'document', 'notice', 'message', 'receipt', 'email', 'video', 'audio', 'other'
  ];

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 p-4 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between gap-3"
    >
      {/* Top Meta Header */}
      <div className="flex items-start justify-between gap-2">
        
        {/* Type Badge with AI classifier pill */}
        <div className="relative">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${currentTypeInfo.color}`}>
              {currentTypeInfo.icon}
              <span>{currentTypeInfo.label}</span>
            </span>

            {item.isAiClassified && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTypeMenu(!showTypeMenu);
                }}
                className="text-[10px] text-slate-400 hover:text-purple-300 underline font-mono cursor-pointer"
                title="Change classification"
              >
                Change
              </button>
            )}
          </div>

          {/* Change Classification Dropdown */}
          {showTypeMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-7 z-20 w-44 rounded-xl bg-slate-950 border border-slate-700 shadow-2xl p-1.5 space-y-0.5 text-xs animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Select Type
              </div>
              {allTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    onChangeType(item.id, t);
                    setShowTypeMenu(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    item.type === t ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{typeConfig[t].label}</span>
                  {item.type === t && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1">
          {item.reviewStatus === 'needs-review' ? (
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              <AlertCircle className="w-3 h-3" />
              <span>Needs review</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>Reviewed</span>
            </span>
          )}

          {item.isDemoData && (
            <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              DEMO
            </span>
          )}
        </div>
      </div>

      {/* Main Info */}
      <div className="space-y-1.5 min-w-0">
        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate" title={item.filename}>
          {item.filename}
        </h4>

        {/* Date and Source basis */}
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">
            {primaryDate ? `${primaryDate.formattedDate}${primaryDate.time ? ` · ${primaryDate.time}` : ''}` : item.uploadedAt}
          </span>
        </div>

        {/* Extracted text snippet preview */}
        {item.extractedText && (
          <p className="text-[11px] text-slate-400 font-mono line-clamp-2 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            {item.extractedText}
          </p>
        )}
      </div>

      {/* Footer tags */}
      <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span>{item.fileSize}</span>
          <span>•</span>
          <span className="text-purple-300">
            {item.entities.length} {item.entities.length === 1 ? 'entity' : 'entities'}
          </span>
          {item.userNotes.length > 0 && (
            <>
              <span>•</span>
              <span className="text-amber-300">{item.userNotes.length} note</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 text-slate-400 group-hover:text-purple-300 transition-colors">
          <span>Details</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

    </div>
  );
};
