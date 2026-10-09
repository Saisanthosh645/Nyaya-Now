import { Language } from '../types';
import Tesseract from 'tesseract.js';

export type EvidenceType = 
  | 'screenshot'
  | 'photo'
  | 'document'
  | 'notice'
  | 'message'
  | 'receipt'
  | 'email'
  | 'video'
  | 'audio'
  | 'other';

export type SourceLabelType = 
  | 'USER_PROVIDED'
  | 'FILE_METADATA'
  | 'DOCUMENT_TEXT'
  | 'OCR'
  | 'AI_INFERENCE'
  | 'USER_NOTE';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface ExtractedEntity {
  id: string;
  type: 'person' | 'police' | 'court' | 'phone' | 'email' | 'location' | 'reference' | 'organization';
  value: string;
  confidence: ConfidenceLevel;
  sourceLabel: SourceLabelType;
  sourceReference?: string;
  occurrenceCount?: number;
}

export interface ExtractedDate {
  value: string;
  formattedDate: string;
  time?: string;
  source: 'metadata' | 'document' | 'ocr' | 'message' | 'user';
  confidence: ConfidenceLevel;
  label?: string;
  sourceLabel: SourceLabelType;
}

export interface EvidenceItem {
  id: string;
  filename: string;
  type: EvidenceType;
  aiSuggestedType?: EvidenceType;
  isAiClassified?: boolean;
  fileSize: string;
  fileSizeBytes: number;
  uploadedAt: string;
  previewUrl?: string;
  originalFile?: File;
  
  metadata?: {
    createdAt?: string;
    modifiedAt?: string;
    source?: string;
    hash?: string;
    mimeType?: string;
    dimensions?: string;
  };

  extractedText?: string;
  hasExtractedText?: boolean;
  ocrConfidence?: number;

  entities: ExtractedEntity[];
  dates: ExtractedDate[];

  linkedEvents: string[];
  userNotes: string[];
  aiInferences: string[];
  potentialInconsistencies: string[];

  reviewStatus: 'reviewed' | 'needs-review' | 'unreviewed';
  collectionIds: string[];
  isDuplicateOf?: string;
  isDemoData?: boolean;
}

export interface EvidenceEvent {
  id: string;
  date?: string;
  time?: string;
  formattedDateTime: string;
  title: string;
  description?: string;
  evidenceIds: string[];
  confidence: ConfidenceLevel;
  basis: 'document' | 'message' | 'metadata' | 'user-input' | 'ai-inference';
  sourceNote: string;
  isDemoData?: boolean;
}

export interface EvidenceCollection {
  id: string;
  name: string;
  description: string;
  color: string;
  evidenceCount: number;
}

export interface EvidenceGap {
  id: string;
  title: string;
  description: string;
  severity: 'attention' | 'missing-context' | 'observation';
  suggestedAction: string;
  relatedEvidenceId?: string;
}

export interface EvidenceConnection {
  id: string;
  sourceId: string;
  targetId: string;
  sourceTitle: string;
  targetTitle: string;
  relationship: string;
  nature: 'potential' | 'explicit';
}

export interface WorkspaceMetrics {
  totalItems: number;
  totalEvents: number;
  totalDocuments: number;
  totalScreenshots: number;
  totalMessages: number;
  totalPhotos: number;
  needsReviewCount: number;
  totalEntities: number;
}

// ── SAMPLE HACKATHON EVIDENCE DATASET (Strictly labeled DEMO DATA) ───────────
export const SAMPLE_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'demo-ev-01',
    filename: 'police_notice.pdf',
    type: 'notice',
    aiSuggestedType: 'notice',
    isAiClassified: true,
    fileSize: '1.2 MB',
    fileSizeBytes: 1258291,
    uploadedAt: '16 Oct 2026 · 10:15 AM',
    metadata: {
      createdAt: '16 Oct 2026 · 09:30 AM',
      source: 'Direct Notice Scan',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      mimeType: 'application/pdf'
    },
    extractedText: `OFFICE OF THE STATION HOUSE OFFICER
CYBER CRIME POLICE STATION, HYDERABAD COMMISSIONERATE
NOTICE UNDER SECTION 35(3) BNSS, 2023 (FORMERLY 41A CrPC)

Notice Ref: HYD/CYBER/CR-419/2026
Date of Issue: 16 October 2026

To,
Sri Vikram Sharma,
Resident of Jubilee Hills, Hyderabad.

WHEREAS, an inquiry is ongoing regarding unauthorized banking alert dispute (Crime No. 419/2026 u/s 318 BNS & 66D IT Act).
You are hereby required to appear before the undersigned at Cyber Crime PS on 18 October 2026 at 11:00 AM.
Take notice that compliance with this notice protects you from coercive custody under Section 35(5) BNSS.

Sd/-
Inspector of Police, Cyber Crime PS`,
    hasExtractedText: true,
    ocrConfidence: 96,
    entities: [
      { id: 'ent-1', type: 'police', value: 'Cyber Crime Police Station, Hyderabad', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' },
      { id: 'ent-2', type: 'person', value: 'Sri Vikram Sharma', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' },
      { id: 'ent-3', type: 'reference', value: 'Crime No. 419/2026 (Ref: HYD/CYBER/CR-419/2026)', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' },
      { id: 'ent-4', type: 'reference', value: 'Section 35(3) BNSS & Section 318 BNS', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' }
    ],
    dates: [
      { value: '2026-10-16', formattedDate: '16 Oct 2026', source: 'document', confidence: 'high', label: 'Notice Issuance Date', sourceLabel: 'DOCUMENT_TEXT' },
      { value: '2026-10-18', formattedDate: '18 Oct 2026', time: '11:00 AM', source: 'document', confidence: 'high', label: 'Mandatory Appearance Date', sourceLabel: 'DOCUMENT_TEXT' }
    ],
    linkedEvents: ['demo-event-01'],
    userNotes: ['Notice delivered physically at my home address by Constable on Friday morning.'],
    aiInferences: [
      'Document is a statutory Notice of Appearance under BNSS § 35(3). Police have invoked non-custodial inquiry procedure.'
    ],
    potentialInconsistencies: [],
    reviewStatus: 'reviewed',
    collectionIds: ['col-police-interaction'],
    isDemoData: true
  },
  {
    id: 'demo-ev-02',
    filename: 'whatsapp_message.png',
    type: 'message',
    aiSuggestedType: 'message',
    isAiClassified: true,
    fileSize: '480 KB',
    fileSizeBytes: 491520,
    uploadedAt: '18 Oct 2026 · 08:00 PM',
    metadata: {
      createdAt: '18 Oct 2026 · 07:42 PM',
      source: 'Mobile Screenshot',
      hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      mimeType: 'image/png',
      dimensions: '1080 x 2400 px'
    },
    extractedText: `[WhatsApp Messenger - 18 Oct 2026]
Sub-Inspector Rao (+91 9440X XXXXX):
"Sharma ji, regarding notice HYD/CYBER/CR-419, bring your bank statement and laptop to Cyber Crime PS immediately. If you don't come today before 8 PM we will register FIR."

Vikram Sharma:
"Sir, the notice gave me date of 18 Oct 11:00 AM. I was at the station at 11 AM as recorded in the register, but you were on bandobast duty. I will submit written reply tomorrow morning with my advocate as per BNSS Section 38."

Sub-Inspector Rao:
"Come to PS right now."`,
    hasExtractedText: true,
    ocrConfidence: 94,
    entities: [
      { id: 'ent-5', type: 'person', value: 'Sub-Inspector Rao', confidence: 'high', sourceLabel: 'OCR' },
      { id: 'ent-6', type: 'phone', value: '+91 9440X XXXXX', confidence: 'high', sourceLabel: 'OCR' },
      { id: 'ent-7', type: 'reference', value: 'HYD/CYBER/CR-419', confidence: 'high', sourceLabel: 'OCR' }
    ],
    dates: [
      { value: '2026-10-18', formattedDate: '18 Oct 2026', time: '07:42 PM', source: 'message', confidence: 'high', label: 'Message Exchange Timestamp', sourceLabel: 'OCR' }
    ],
    linkedEvents: ['demo-event-02'],
    userNotes: ['Officer sent messages threatening FIR despite my attendance at 11:00 AM in the visitors register.'],
    aiInferences: [
      'The message exchange references attendance at Cyber Crime PS and mentions prior notice HYD/CYBER/CR-419.',
      'Citizen asserted statutory right to legal consultation under BNSS Section 38 & Article 22.'
    ],
    potentialInconsistencies: [
      'The officer claims non-attendance, while the citizen text asserts registration at 11:00 AM in the PS register.'
    ],
    reviewStatus: 'needs-review',
    collectionIds: ['col-police-interaction', 'col-phone-messages'],
    isDemoData: true
  },
  {
    id: 'demo-ev-03',
    filename: 'incident_photo.jpg',
    type: 'photo',
    aiSuggestedType: 'photo',
    isAiClassified: true,
    fileSize: '2.1 MB',
    fileSizeBytes: 2202009,
    uploadedAt: '18 Oct 2026 · 08:30 PM',
    metadata: {
      createdAt: '18 Oct 2026 · 08:15 PM',
      source: 'Smartphone Camera (EXIF Geotagged)',
      hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      mimeType: 'image/jpeg',
      dimensions: '4032 x 3024 px'
    },
    extractedText: `[Photo of Cyber Crime Police Station Reception Desk]
Notice board visible: "Citizens entering for inquiry must sign General Diary / Visitor Register at Desk."
Timestamp embedded in image watermark: 18/10/2026 20:15 IST`,
    hasExtractedText: true,
    ocrConfidence: 89,
    entities: [
      { id: 'ent-8', type: 'location', value: 'Cyber Crime Police Station Reception, Gachibowli', confidence: 'medium', sourceLabel: 'FILE_METADATA' },
      { id: 'ent-9', type: 'organization', value: 'Hyderabad City Police', confidence: 'high', sourceLabel: 'OCR' }
    ],
    dates: [
      { value: '2026-10-18', formattedDate: '18 Oct 2026', time: '08:15 PM', source: 'metadata', confidence: 'high', label: 'Photo EXIF Timestamp', sourceLabel: 'FILE_METADATA' }
    ],
    linkedEvents: ['demo-event-03'],
    userNotes: ['Captured geo-tagged photo outside the reception lobby to establish physical presence.'],
    aiInferences: [
      'Geotag and EXIF confirm physical presence in the vicinity of Cyber Crime Police Station on evening of 18 Oct 2026.'
    ],
    potentialInconsistencies: [],
    reviewStatus: 'reviewed',
    collectionIds: ['col-police-interaction'],
    isDemoData: true
  },
  {
    id: 'demo-ev-04',
    filename: 'complaint_receipt.pdf',
    type: 'document',
    aiSuggestedType: 'document',
    isAiClassified: true,
    fileSize: '820 KB',
    fileSizeBytes: 839680,
    uploadedAt: '19 Oct 2026 · 11:30 AM',
    metadata: {
      createdAt: '19 Oct 2026 · 10:45 AM',
      source: 'Government Citizen Portal / Inward Acknowledgment',
      hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      mimeType: 'application/pdf'
    },
    extractedText: `GOVERNMENT OF TELANGANA - POLICE DEPARTMENT
OFFICIAL INWARD ACKNOWLEDGMENT OF WRITTEN SUBMISSION

Acknowledgment Ref: ACK-CYBER-9912/2026
Date & Time: 19 October 2026, 10:45 AM

Received from: Sri Vikram Sharma
Subject: Written reply and explanation in compliance with Section 35(3) BNSS Notice (Ref: HYD/CYBER/CR-419/2026).
Annexures attached: Bank statements, IT returns, Affidavit of non-involvement.
Received By: Duty Officer, O/o Commissioner of Police, Hyderabad.
Stamp: "RECEIVED - INWARD NO. 9912 - OFFICIAL SEAL"`,
    hasExtractedText: true,
    ocrConfidence: 98,
    entities: [
      { id: 'ent-10', type: 'reference', value: 'ACK-CYBER-9912/2026', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' },
      { id: 'ent-11', type: 'police', value: 'O/o Commissioner of Police, Hyderabad', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' },
      { id: 'ent-12', type: 'person', value: 'Sri Vikram Sharma', confidence: 'high', sourceLabel: 'DOCUMENT_TEXT' }
    ],
    dates: [
      { value: '2026-10-19', formattedDate: '19 Oct 2026', time: '10:45 AM', source: 'document', confidence: 'high', label: 'Formal Inward Filing Timestamp', sourceLabel: 'DOCUMENT_TEXT' }
    ],
    linkedEvents: ['demo-event-04'],
    userNotes: ['Official stamped acknowledgment proving timely compliance with the BNSS Section 35 notice.'],
    aiInferences: [
      'Document provides statutory proof of compliance under BNSS Section 35(4). Under Section 35(5), police cannot arrest a compliant noticee without recorded reasons and Magistrate permission.'
    ],
    potentialInconsistencies: [],
    reviewStatus: 'reviewed',
    collectionIds: ['col-police-interaction', 'col-court-docs'],
    isDemoData: true
  }
];

export const SAMPLE_TIMELINE_EVENTS: EvidenceEvent[] = [
  {
    id: 'demo-event-01',
    date: '2026-10-16',
    time: '09:30 AM',
    formattedDateTime: '16 Oct 2026 · 09:30 AM',
    title: 'Police Notice of Appearance Issued',
    description: 'Cyber Crime PS Hyderabad issues statutory appearance notice under Section 35(3) BNSS directing attendance on 18 Oct.',
    evidenceIds: ['demo-ev-01'],
    confidence: 'high',
    basis: 'document',
    sourceNote: 'Source: Official notice date & seal on police_notice.pdf',
    isDemoData: true
  },
  {
    id: 'demo-event-02',
    date: '2026-10-18',
    time: '07:42 PM',
    formattedDateTime: '18 Oct 2026 · 07:42 PM',
    title: 'Urgent WhatsApp Demand from Sub-Inspector',
    description: 'Message exchange where officer demands immediate arrival under threat of FIR; citizen notes prior morning attendance and requests advocate consultation under BNSS § 38.',
    evidenceIds: ['demo-ev-02'],
    confidence: 'high',
    basis: 'message',
    sourceNote: 'Source: WhatsApp message timestamp extracted from screenshot',
    isDemoData: true
  },
  {
    id: 'demo-event-03',
    date: '2026-10-18',
    time: '08:15 PM',
    formattedDateTime: '18 Oct 2026 · 08:15 PM',
    title: 'Physical Presence at Cyber Crime PS Lobby',
    description: 'Geo-tagged photograph taken in front of station reception counter documenting presence.',
    evidenceIds: ['demo-ev-03'],
    confidence: 'medium',
    basis: 'metadata',
    sourceNote: 'Source: EXIF camera timestamp & geotag on incident_photo.jpg',
    isDemoData: true
  },
  {
    id: 'demo-event-04',
    date: '2026-10-19',
    time: '10:45 AM',
    formattedDateTime: '19 Oct 2026 · 10:45 AM',
    title: 'Official Written Reply Filed & Acknowledged',
    description: 'Formal submission delivered to Office of the Commissioner of Police, obtaining official stamped acknowledgment ACK-CYBER-9912.',
    evidenceIds: ['demo-ev-04'],
    confidence: 'high',
    basis: 'document',
    sourceNote: 'Source: Stamped inward acknowledgment receipt on complaint_receipt.pdf',
    isDemoData: true
  }
];

export const SAMPLE_COLLECTIONS: EvidenceCollection[] = [
  { id: 'col-police-interaction', name: 'Police Interaction & Notice', description: 'Notices, messages, and acknowledgments related to Cyber Crime PS', color: '#f59e0b', evidenceCount: 4 },
  { id: 'col-phone-messages', name: 'WhatsApp & SMS Messages', description: 'Chat threads, screenshots, and call records', color: '#10b981', evidenceCount: 1 },
  { id: 'col-court-docs', name: 'Formal Filings & Receipts', description: 'Inward acknowledgments, affidavits, and submissions', color: '#3b82f6', evidenceCount: 1 }
];

export const SAMPLE_EVIDENCE_GAPS: EvidenceGap[] = [
  {
    id: 'gap-01',
    title: 'Surrounding message context not included',
    description: 'The WhatsApp screenshot shows messages from 7:42 PM, but earlier text messages from the same morning or prior days are missing.',
    severity: 'missing-context',
    suggestedAction: 'Export full chat transcript (.txt) or add earlier screenshots to establish complete conversation context.',
    relatedEvidenceId: 'demo-ev-02'
  },
  {
    id: 'gap-02',
    title: 'Proof of morning attendance register entry',
    description: 'Citizen text states attendance was signed at 11:00 AM on 18 Oct in the visitors book. A photo of the visitor slip or entry token is not yet uploaded.',
    severity: 'attention',
    suggestedAction: 'If you have a visitor gate pass, entry slip, or CCTV timestamp, add it to strongly substantiate morning attendance.'
  },
  {
    id: 'gap-03',
    title: 'Annexure copies not attached to acknowledgment',
    description: 'The acknowledgment mentions bank statements and affidavits were annexed, but those supplementary attachments are not saved in this workspace.',
    severity: 'observation',
    suggestedAction: 'Upload the bank statement copy submitted to police to ensure complete digital evidence parity.'
  }
];

export const SAMPLE_CONNECTIONS: EvidenceConnection[] = [
  {
    id: 'conn-1',
    sourceId: 'demo-ev-01',
    targetId: 'demo-ev-02',
    sourceTitle: 'police_notice.pdf',
    targetTitle: 'whatsapp_message.png',
    relationship: 'Message references Notice Ref HYD/CYBER/CR-419/2026',
    nature: 'explicit'
  },
  {
    id: 'conn-2',
    sourceId: 'demo-ev-02',
    targetId: 'demo-ev-03',
    sourceTitle: 'whatsapp_message.png',
    targetTitle: 'incident_photo.jpg',
    relationship: 'Photo captured 33 minutes after urgent WhatsApp exchange at PS lobby',
    nature: 'potential'
  },
  {
    id: 'conn-3',
    sourceId: 'demo-ev-01',
    targetId: 'demo-ev-04',
    sourceTitle: 'police_notice.pdf',
    targetTitle: 'complaint_receipt.pdf',
    relationship: 'Acknowledgment formally replies to Notice Ref HYD/CYBER/CR-419 under BNSS § 35(4)',
    nature: 'explicit'
  }
];

export class EvidenceIntelligenceService {
  /**
   * Calculates cryptographic SHA-256 hash using Web Crypto API for file integrity
   */
  public static async calculateFileHash(file: File): Promise<string> {
    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return 'hash-unavailable-' + Date.now().toString(16);
    }
  }

  /**
   * Automatically classifies evidence file type based on mime, filename and content
   */
  public static detectEvidenceType(file: File, extractedText?: string): EvidenceType {
    const name = file.name.toLowerCase();
    const mime = file.type.toLowerCase();
    const text = (extractedText || '').toLowerCase();

    if (mime.startsWith('video/')) return 'video';
    if (mime.startsWith('audio/')) return 'audio';

    if (text.includes('whatsapp') || text.includes('today at') || text.includes('pm') && text.includes('am') && (name.includes('screenshot') || name.includes('screen') || name.includes('img_'))) {
      return 'screenshot';
    }

    if (text.includes('notice') || text.includes('summons') || text.includes('section 35') || text.includes('section 41a') || name.includes('notice') || name.includes('summons')) {
      return 'notice';
    }

    if (text.includes('receipt') || text.includes('acknowledgment') || text.includes('inward') || name.includes('receipt') || name.includes('bill')) {
      return 'receipt';
    }

    if (text.includes('to:') && text.includes('from:') && (text.includes('subject:') || text.includes('@'))) {
      return 'email';
    }

    if (name.includes('chat') || name.includes('message') || text.includes('sms')) {
      return 'message';
    }

    if (mime.startsWith('image/')) {
      if (name.includes('screenshot') || name.includes('screen_') || name.includes('capture')) {
        return 'screenshot';
      }
      return 'photo';
    }

    if (mime.includes('pdf') || mime.includes('document') || name.endsWith('.pdf') || name.endsWith('.docx') || name.endsWith('.doc')) {
      return 'document';
    }

    return 'other';
  }

  /**
   * Real entity extraction from text
   */
  public static extractEntitiesFromText(text: string): ExtractedEntity[] {
    const entities: ExtractedEntity[] = [];
    const clean = text.trim();

    // 1. Police Stations / Units
    const psRegex = /([A-Za-z\s]+(?:Police Station|PS|P\.S\.|Cyber Crime|Traffic PS|Thana|Commissionerate))/gi;
    let match;
    while ((match = psRegex.exec(clean)) !== null) {
      const val = match[1].trim();
      if (val.length > 5 && !entities.some(e => e.value.toLowerCase() === val.toLowerCase())) {
        entities.push({
          id: 'ent-' + Math.random().toString(36).substring(2, 7),
          type: 'police',
          value: val,
          confidence: 'high',
          sourceLabel: 'OCR'
        });
      }
    }

    // 2. Reference / Case / Crime / FIR numbers
    const refRegex = /\b(?:Crime|Cr\.?|FIR|CC|Notice|Ref|ACK|Inward)\s*(?:No\.?)?[\s/:-]*([A-Z0-9/_-]{3,35})\b/gi;
    while ((match = refRegex.exec(clean)) !== null) {
      const val = match[0].trim();
      if (!entities.some(e => e.value === val)) {
        entities.push({
          id: 'ent-' + Math.random().toString(36).substring(2, 7),
          type: 'reference',
          value: val,
          confidence: 'high',
          sourceLabel: 'DOCUMENT_TEXT'
        });
      }
    }

    // 3. Phone numbers (Indian 10-digit mobile or standard format)
    const phoneRegex = /(?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}\b/g;
    while ((match = phoneRegex.exec(clean)) !== null) {
      const val = match[0].trim();
      if (!entities.some(e => e.value === val)) {
        entities.push({
          id: 'ent-' + Math.random().toString(36).substring(2, 7),
          type: 'phone',
          value: val,
          confidence: 'high',
          sourceLabel: 'OCR'
        });
      }
    }

    // 4. Persons (To, Sri, Smt, Mr, Officer, Sub-Inspector)
    const personRegex = /(?:To|Sri|Smt|Mr|Ms|Shri|Sub-Inspector|Inspector|Advocate|Officer|SI|SHO)[\s:.-]+([A-Za-z\s.,]{3,30})/gi;
    while ((match = personRegex.exec(clean)) !== null) {
      const val = match[1].trim();
      if (val.length > 3 && !val.includes('Police') && !entities.some(e => e.value === val)) {
        entities.push({
          id: 'ent-' + Math.random().toString(36).substring(2, 7),
          type: 'person',
          value: val,
          confidence: 'medium',
          sourceLabel: 'DOCUMENT_TEXT'
        });
      }
    }

    return entities;
  }

  /**
   * Real date extraction from text and file
   */
  public static extractDatesFromText(text: string, fileCreatedAt?: string): ExtractedDate[] {
    const dates: ExtractedDate[] = [];
    const dateMatches = text.match(/\b(?:\d{1,2}(?:st|nd|rd|th)?[\s/-]+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s/-]+\d{2,4}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/gi) || [];
    
    // Time extraction
    const timeMatch = text.match(/\b(?:\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|am|pm|hrs|IST)?)\b/);
    const extractedTime = timeMatch ? timeMatch[0].trim() : undefined;

    Array.from(new Set(dateMatches)).forEach((d, idx) => {
      dates.push({
        value: d,
        formattedDate: d.toUpperCase(),
        time: idx === 0 ? extractedTime : undefined,
        source: 'document',
        confidence: 'high',
        label: idx === 0 ? 'Document Date' : `Mentioned Date ${idx + 1}`,
        sourceLabel: 'DOCUMENT_TEXT'
      });
    });

    if (fileCreatedAt && dates.length === 0) {
      dates.push({
        value: fileCreatedAt,
        formattedDate: fileCreatedAt,
        source: 'metadata',
        confidence: 'medium',
        label: 'File Metadata Creation Date',
        sourceLabel: 'FILE_METADATA'
      });
    }

    return dates;
  }

  /**
   * Complete multi-file ingestion pipeline
   */
  public static async processEvidenceFile(
    file: File,
    onProgress?: (stage: number, stageName: string) => void
  ): Promise<EvidenceItem> {
    const isImage = file.type.startsWith('image/');
    let rawText = '';
    let ocrConf = 85;
    let previewUrl: string | undefined = undefined;

    if (onProgress) onProgress(1, 'Reading file & calculating cryptographic SHA-256 hash…');
    const hash = await this.calculateFileHash(file);
    if (isImage) {
      previewUrl = URL.createObjectURL(file);
    }

    if (onProgress) onProgress(2, 'Extracting text, OCR character shapes & metadata…');
    if (isImage) {
      try {
        const result = await Tesseract.recognize(file, 'eng');
        rawText = (result.data.text || '').trim();
        ocrConf = Math.round(result.data.confidence) || 85;
      } catch (err) {
        console.warn('OCR error on evidence item:', err);
      }
    } else if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      rawText = await file.text();
    } else {
      rawText = `Evidence file: ${file.name}\nSize: ${(file.size / 1024).toFixed(0)} KB\nType: ${file.type}`;
    }

    if (onProgress) onProgress(3, 'Understanding dates, people and statutory entities…');
    await new Promise(r => setTimeout(r, 250));
    const entities = this.extractEntitiesFromText(rawText);
    const dates = this.extractDatesFromText(rawText, new Date().toLocaleDateString('en-GB'));

    if (onProgress) onProgress(4, 'Classifying media & detecting potential relationships…');
    await new Promise(r => setTimeout(r, 200));
    const detectedType = this.detectEvidenceType(file, rawText);

    if (onProgress) onProgress(5, 'Organizing item into structured evidence record…');
    await new Promise(r => setTimeout(r, 150));

    const item: EvidenceItem = {
      id: 'ev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      filename: file.name,
      type: detectedType,
      aiSuggestedType: detectedType,
      isAiClassified: true,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileSizeBytes: file.size,
      uploadedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      previewUrl: previewUrl,
      originalFile: file,
      metadata: {
        createdAt: new Date(file.lastModified).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        source: 'User Upload',
        hash: hash,
        mimeType: file.type || 'application/octet-stream'
      },
      extractedText: rawText || undefined,
      hasExtractedText: rawText.length > 5,
      ocrConfidence: isImage ? ocrConf : undefined,
      entities: entities,
      dates: dates,
      linkedEvents: [],
      userNotes: [],
      aiInferences: [
        `Nyaya detected ${entities.length} potential entities and ${dates.length} date references in this ${detectedType}.`
      ],
      potentialInconsistencies: [],
      reviewStatus: entities.length > 0 && dates.length > 0 ? 'reviewed' : 'needs-review',
      collectionIds: []
    };

    return item;
  }

  /**
   * Generates or updates timeline events based on the current evidence collection
   */
  public static buildTimelineFromEvidence(items: EvidenceItem[]): EvidenceEvent[] {
    const events: EvidenceEvent[] = [];

    items.forEach((item) => {
      const primaryDate = item.dates[0];
      const eventTitle = item.type === 'notice'
        ? `Notice received: ${item.filename}`
        : item.type === 'message'
        ? `Message exchange: ${item.filename}`
        : item.type === 'photo'
        ? `Photo captured: ${item.filename}`
        : item.type === 'receipt'
        ? `Acknowledgment / Receipt: ${item.filename}`
        : `Document recorded: ${item.filename}`;

      events.push({
        id: 'evt-' + item.id,
        date: primaryDate ? primaryDate.value : undefined,
        time: primaryDate?.time,
        formattedDateTime: primaryDate ? `${primaryDate.formattedDate}${primaryDate.time ? ` · ${primaryDate.time}` : ''}` : 'Date pending review',
        title: eventTitle,
        description: item.extractedText ? item.extractedText.slice(0, 160) + '…' : `Evidence item ${item.filename} added to record.`,
        evidenceIds: [item.id],
        confidence: primaryDate ? primaryDate.confidence : 'low',
        basis: primaryDate ? (primaryDate.source === 'message' ? 'message' : primaryDate.source === 'document' ? 'document' : 'metadata') : 'ai-inference',
        sourceNote: primaryDate ? `Source: ${primaryDate.sourceLabel}` : 'Basis: Upload time (date not identified in document)'
      });
    });

    return events;
  }

  /**
   * Derives real-time workspace metrics from state
   */
  public static calculateMetrics(items: EvidenceItem[], events: EvidenceEvent[]): WorkspaceMetrics {
    const totalItems = items.length;
    const totalEvents = events.length;
    const totalDocuments = items.filter(i => i.type === 'document' || i.type === 'notice').length;
    const totalScreenshots = items.filter(i => i.type === 'screenshot').length;
    const totalMessages = items.filter(i => i.type === 'message').length;
    const totalPhotos = items.filter(i => i.type === 'photo').length;
    const needsReviewCount = items.filter(i => i.reviewStatus === 'needs-review' || i.potentialInconsistencies.length > 0).length;
    
    const allEntities = new Set<string>();
    items.forEach(i => i.entities.forEach(e => allEntities.add(e.value.toLowerCase())));

    return {
      totalItems,
      totalEvents,
      totalDocuments,
      totalScreenshots,
      totalMessages,
      totalPhotos,
      needsReviewCount,
      totalEntities: allEntities.size
    };
  }

  /**
   * Generates formatted text export of the evidence record
   */
  public static generateExportText(
    items: EvidenceItem[],
    events: EvidenceEvent[],
    gaps: EvidenceGap[]
  ): string {
    const now = new Date().toLocaleString('en-IN');
    let out = `# NYAYA NOW — STRUCTURED EVIDENCE RECORD\n`;
    out += `Generated: ${now}\n`;
    out += `Integrity Notice: Prepared via Nyaya Now Evidence Intelligence Workspace. This is an organizational record; it does not replace forensic verification or legal advice.\n\n`;

    out += `## 1. EVIDENCE INVENTORY (${items.length} ITEMS)\n\n`;
    out += `| # | Filename | Type | Date/Time | SHA-256 Hash | Status |\n`;
    out += `|---|----------|------|-----------|--------------|--------|\n`;
    items.forEach((item, idx) => {
      const dateStr = item.dates[0]?.formattedDate || item.uploadedAt;
      const hashStr = item.metadata?.hash ? `${item.metadata.hash.slice(0, 10)}…` : 'N/A';
      out += `| ${idx + 1} | ${item.filename} | ${item.type.toUpperCase()} | ${dateStr} | ${hashStr} | ${item.reviewStatus} |\n`;
    });

    out += `\n## 2. CHRONOLOGICAL EVIDENCE TIMELINE (${events.length} EVENTS)\n\n`;
    events.forEach((evt, idx) => {
      out += `### Event ${idx + 1}: ${evt.formattedDateTime} — ${evt.title}\n`;
      out += `- **Basis**: ${evt.basis.toUpperCase()} (${evt.sourceNote})\n`;
      out += `- **Supporting Files**: ${evt.evidenceIds.join(', ')}\n`;
      if (evt.description) out += `- **Summary**: ${evt.description}\n`;
      out += `\n`;
    });

    out += `## 3. USER NOTES & OBSERVATIONS\n\n`;
    items.forEach((item) => {
      if (item.userNotes.length > 0) {
        out += `### [USER NOTE] File: ${item.filename}\n`;
        item.userNotes.forEach((n) => out += `- "${n}"\n`);
        out += `\n`;
      }
    });

    if (gaps.length > 0) {
      out += `## 4. IDENTIFIED ORGANIZATIONAL GAPS\n\n`;
      gaps.forEach((gap, idx) => {
        out += `### Gap ${idx + 1}: ${gap.title}\n`;
        out += `- Observation: ${gap.description}\n`;
        out += `- Suggested Action: ${gap.suggestedAction}\n\n`;
      });
    }

    return out;
  }
}
