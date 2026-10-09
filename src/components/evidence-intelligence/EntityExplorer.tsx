import React from 'react';
import { 
  User, 
  Building2, 
  Phone, 
  MapPin, 
  Hash, 
  Layers, 
  Search,
  Filter,
  Check,
  ShieldAlert
} from 'lucide-react';
import { EvidenceItem, ExtractedEntity } from '../../services/evidenceIntelligenceService';

interface EntityExplorerProps {
  evidenceItems: EvidenceItem[];
  selectedEntityValue: string | null;
  onSelectEntity: (entityValue: string | null) => void;
}

export const EntityExplorer: React.FC<EntityExplorerProps> = ({
  evidenceItems,
  selectedEntityValue,
  onSelectEntity
}) => {
  // Aggregate all unique entities across items with counts
  const entityMap = new Map<string, { entity: ExtractedEntity; count: number; items: EvidenceItem[] }>();

  evidenceItems.forEach((item) => {
    item.entities.forEach((ent) => {
      const key = `${ent.type}:${ent.value.toLowerCase()}`;
      if (entityMap.has(key)) {
        const existing = entityMap.get(key)!;
        existing.count += 1;
        if (!existing.items.some(i => i.id === item.id)) {
          existing.items.push(item);
        }
      } else {
        entityMap.set(key, { entity: ent, count: 1, items: [item] });
      }
    });
  });

  const entityList = Array.from(entityMap.values()).sort((a, b) => b.count - a.count);

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'police': return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      case 'person': return <User className="w-3.5 h-3.5 text-purple-400" />;
      case 'phone': return <Phone className="w-3.5 h-3.5 text-emerald-400" />;
      case 'location': return <MapPin className="w-3.5 h-3.5 text-rose-400" />;
      case 'reference': return <Hash className="w-3.5 h-3.5 text-amber-400" />;
      default: return <Layers className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>People & Entities</span>
          </h3>
          <p className="text-xs text-slate-400">
            Click any entity to filter the evidence library
          </p>
        </div>

        {selectedEntityValue && (
          <button
            type="button"
            onClick={() => onSelectEntity(null)}
            className="text-xs font-mono text-purple-400 hover:text-white underline cursor-pointer"
          >
            Clear Filter
          </button>
        )}
      </div>

      {entityList.length === 0 ? (
        <div className="p-6 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-500">
          No extracted entities found yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {entityList.map(({ entity, count, items }) => {
            const isSelected = selectedEntityValue === entity.value;

            return (
              <button
                key={entity.id}
                type="button"
                onClick={() => onSelectEntity(isSelected ? null : entity.value)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    {getEntityIcon(entity.type)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">
                      {entity.type}
                    </span>
                    <p className="text-xs font-bold truncate">
                      {entity.value}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {count} {count === 1 ? 'file' : 'files'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
