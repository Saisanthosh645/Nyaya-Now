export type Language = 'en' | 'hi' | 'te';

export interface LegalSource {
  id: string;
  title: string;
  organization: string;
  legalSection?: string;
  url: string;
  type: 'statute' | 'judgment' | 'guideline' | 'portal';
  officialBadge?: boolean;
  summary: string;
  lastReviewed: string;
}

export interface SayThisPhrase {
  id: string;
  situation: string;
  english: string;
  hindi: string;
  telugu: string;
  context: string;
}

export interface RightItem {
  id: string;
  title: string;
  description: string;
  bnssSection?: string;
  crpcEquivalent?: string;
  constitutionArticle?: string;
  sourceId: string;
  landmarkCase?: string;
  legalSection?: string;
  organization?: string;
  portal?: string;
  specialNote?: string;
}

export interface ActionStep {
  number: number;
  title: string;
  instruction: string;
  detail?: string;
  urgent?: boolean;
}

export interface DontItem {
  text: string;
  reason: string;
}

export interface EscalationNode {
  level: number;
  title: string;
  designation: string;
  description: string;
  action: string;
  timeframe?: string;
}

export interface Situation {
  id: string;
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  emergencyTag?: string;
  badgeText?: string;
  quick30SecSummary: string[];
  rights: RightItem[];
  actions: ActionStep[];
  donts: DontItem[];
  sayThis: SayThisPhrase[];
  escalationPath: EscalationNode[];
  sourceIds: string[];
  specialGuide?: {
    title: string;
    content: string;
    points: string[];
  };
  keywords: string[];
}

export interface StateHelpline {
  state: string;
  policeControlRoom: string;
  acbTollFree: string;
  womenHelpline: string;
  cyberCell: string;
  portalUrl?: string;
}

export type ActiveView = 
  | { type: 'home' }
  | { type: 'situation'; slug: string }
  | { type: 'complaints' }
  | { type: 'sources' }
  | { type: 'assessment' }
  | { type: 'helplines' };
