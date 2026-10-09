import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Edit2, Check, FileCheck, Building2, Calendar, Hash, User, MapPin } from 'lucide-react';
import { DocumentAnalysis } from '../../services/documentIntelligenceService';

interface DocumentIdentityCardProps {
  document: DocumentAnalysis;
  onUpdateField?: (field: keyof DocumentAnalysis, value: string) => void;
}

export const DocumentIdentityCard: React.FC<DocumentIdentityCardProps> = ({
  document,
  onUpdateField
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedDocType, setEditedDocType] = useState<string>(document.documentType);
  const [editedIssuer, setEditedIssuer] = useState<string>(document.issuer);
  const [editedDate, setEditedDate] = useState<string>(document.date);
  const [editedRef, setEditedRef] = useState<string>(document.referenceNumber);
  const [editedPerson, setEditedPerson] = useState<string>(document.personNamed);
  const [editedJurisdiction, setEditedJurisdiction] = useState<string>(document.jurisdiction);

  const handleSave = () => {
    if (onUpdateField) {
      onUpdateField('documentType', editedDocType);
      onUpdateField('issuer', editedIssuer);
      onUpdateField('date', editedDate);
      onUpdateField('referenceNumber', editedRef);
      onUpdateField('personNamed', editedPerson);
      onUpdateField('jurisdiction', editedJurisdiction);
    }
    setIsEditing(false);
  };

  const isHighConfidence = document.confidence === 'high';

  return (
    <div className="w-full rounded-3xl bg-slate-950/95 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header with Title and Confidence Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileCheck className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
              What is this document?
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Verified statutory identification & metadata
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Confidence Badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isHighConfidence
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
          }`}>
            {isHighConfidence ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{isHighConfidence ? 'Extraction confidence: High' : 'Some details need confirmation'}</span>
          </div>

          {/* Edit / Correct button */}
          <button
            type="button"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Edit extracted metadata"
          >
            {isEditing ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Edit2 className="w-3 h-3 text-slate-400" />}
            <span>{isEditing ? 'Save' : 'Correct'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Extracted Metadata Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        
        {/* 1. Document Type */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Document Type</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedDocType}
              onChange={(e) => setEditedDocType(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
          ) : (
            <p className="text-sm font-extrabold text-amber-300 truncate">
              {document.documentType || 'Not found in document'}
            </p>
          )}
        </div>

        {/* 2. Issued By */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Issued By</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedIssuer}
              onChange={(e) => setEditedIssuer(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
          ) : (
            <p className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-1" title={document.issuer}>
              {document.issuer || 'Not found in document'}
            </p>
          )}
        </div>

        {/* 3. Document Date */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Document Date</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
          ) : (
            <p className="text-sm font-bold text-slate-100">
              {document.date || 'Not found in document'}
            </p>
          )}
        </div>

        {/* 4. Reference / Case Number */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <Hash className="w-3.5 h-3.5 text-amber-400" />
            <span>Reference / Case No.</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedRef}
              onChange={(e) => setEditedRef(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
            />
          ) : (
            <p className="text-xs sm:text-sm font-mono font-bold text-amber-200 truncate">
              {document.referenceNumber || 'Not found in document'}
            </p>
          )}
        </div>

        {/* 5. Person Named */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>Person Named</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedPerson}
              onChange={(e) => setEditedPerson(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
          ) : (
            <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
              {document.personNamed || 'Not found in document'}
            </p>
          )}
        </div>

        {/* 6. Jurisdiction */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Jurisdiction</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedJurisdiction}
              onChange={(e) => setEditedJurisdiction(e.target.value)}
              className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
            />
          ) : (
            <p className="text-xs sm:text-sm font-semibold text-slate-300 truncate" title={document.jurisdiction}>
              {document.jurisdiction || 'Not found in document'}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
