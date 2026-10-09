import React from 'react';
import { 
  Network, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Image, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { EvidenceConnection, EvidenceItem } from '../../services/evidenceIntelligenceService';

interface EvidenceRelationshipMapProps {
  connections: EvidenceConnection[];
  evidenceItems: EvidenceItem[];
  onSelectEvidence: (item: EvidenceItem) => void;
}

export const EvidenceRelationshipMap: React.FC<EvidenceRelationshipMapProps> = ({
  connections,
  evidenceItems,
  onSelectEvidence
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-400" />
            <span>Evidence Connections</span>
          </h3>
          <p className="text-xs text-slate-400">
            Detected relationships between notices, messages, incident photos and formal filings
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{connections.length} connections detected</span>
        </div>
      </div>

      {connections.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
          <Network className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-400 font-mono">No connected items detected yet.</p>
          <p className="text-[11px] text-slate-500">Upload multiple related documents and screenshots to generate relationship maps.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {connections.map((conn) => {
            const sourceItem = evidenceItems.find(i => i.id === conn.sourceId);
            const targetItem = evidenceItems.find(i => i.id === conn.targetId);

            return (
              <div
                key={conn.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3 shadow-lg"
              >
                {/* Nature Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    conn.nature === 'explicit'
                      ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                      : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                  }`}>
                    {conn.nature === 'explicit' ? 'Explicit Citation Connection' : 'Potential Contextual Connection'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    ID: {conn.id}
                  </span>
                </div>

                {/* Connection Nodes Flow */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  
                  {/* Source Node */}
                  <div
                    onClick={() => sourceItem && onSelectEvidence(sourceItem)}
                    className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-400 cursor-pointer transition-colors space-y-1"
                  >
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                      Primary Source File
                    </span>
                    <h5 className="text-xs font-black text-white truncate">
                      {conn.sourceTitle}
                    </h5>
                  </div>

                  {/* Middle Arrow with Relationship note */}
                  <div className="flex flex-col items-center justify-center shrink-0 px-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shadow-inner">
                      <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
                    </div>
                  </div>

                  {/* Target Node */}
                  <div
                    onClick={() => targetItem && onSelectEvidence(targetItem)}
                    className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-400 cursor-pointer transition-colors space-y-1"
                  >
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                      Connected File
                    </span>
                    <h5 className="text-xs font-black text-white truncate">
                      {conn.targetTitle}
                    </h5>
                  </div>

                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong className="text-purple-300">Relationship:</strong> {conn.relationship}
                </p>

              </div>
            );
          })}
        </div>
      )}

      {/* Critical Legal Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Legal Safety Principle:</strong> Connections flagged by Nyaya communicate that items <em>may be related</em> by date, reference number, or subject matter. They do not constitute judicial proof of causal link.
        </p>
      </div>

    </div>
  );
};
