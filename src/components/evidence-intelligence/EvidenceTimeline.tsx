import React from 'react';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Image, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { EvidenceEvent, EvidenceItem } from '../../services/evidenceIntelligenceService';

interface EvidenceTimelineProps {
  events: EvidenceEvent[];
  evidenceItems: EvidenceItem[];
  onSelectEvidence: (item: EvidenceItem) => void;
}

export const EvidenceTimeline: React.FC<EvidenceTimelineProps> = ({
  events,
  evidenceItems,
  onSelectEvidence
}) => {
  return (
    <div className="w-full space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Evidence Timeline</span>
          </h3>
          <p className="text-xs text-slate-400">
            Chronological reconstruction derived from document dates, message timestamps and file metadata
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{events.length} chronological events mapped</span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
          <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-400 font-mono">No timeline events detected yet.</p>
          <p className="text-[11px] text-slate-500">Upload documents or screenshots with timestamps to build the timeline.</p>
        </div>
      ) : (
        /* Vertical Timeline */
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-amber-500 before:to-emerald-500">
          {events.map((evt, idx) => {
            const supportingItems = evidenceItems.filter((it) => evt.evidenceIds.includes(it.id));

            return (
              <div key={evt.id} className="relative group">
                
                {/* Timeline Node Dot */}
                <div className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-purple-400 flex items-center justify-center text-[10px] font-mono font-black text-purple-300 shadow-md group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>

                {/* Event Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 shadow-lg">
                  
                  {/* Date & Time Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-black font-mono text-amber-300">
                        {evt.formattedDateTime}
                      </span>

                      {evt.confidence === 'high' && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          High Confidence
                        </span>
                      )}
                    </div>

                    {/* Basis Label */}
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {evt.sourceNote}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-white">
                      {evt.title}
                    </h4>
                    {evt.description && (
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {evt.description}
                      </p>
                    )}
                  </div>

                  {/* Supporting Evidence Pills */}
                  {supportingItems.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        Linked Evidence:
                      </span>

                      {supportingItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onSelectEvidence(item)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-purple-950/40 text-purple-300 hover:text-white border border-slate-800 hover:border-purple-500/40 text-xs font-mono font-semibold transition-all cursor-pointer group/pill"
                        >
                          {item.type === 'message' ? (
                            <MessageSquare className="w-3 h-3 text-purple-400" />
                          ) : item.type === 'photo' || item.type === 'screenshot' ? (
                            <Image className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <FileText className="w-3 h-3 text-blue-400" />
                          )}
                          <span>{item.filename}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/pill:opacity-100" />
                        </button>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Date Basis Explanation Footer */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Date Intelligence Distinction:</strong> Document dates indicate when an official notice was signed. Message timestamps record exact communication timing. Photo EXIF metadata records when a photo was captured. These are explicitly tagged by their individual source.
        </p>
      </div>

    </div>
  );
};
