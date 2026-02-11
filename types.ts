
export enum EmailCategory {
  GENUINE = 'Genuine',
  SPAM = 'Spam',
  PROMOTIONS = 'Promotions'
}

export enum RiskLevel {
  SAFE = 'Safe',
  MEDIUM = 'Medium Risk',
  HIGH = 'High Risk'
}

export interface LinkAnalysis {
  url: string;
  risk: 'Low' | 'Medium' | 'High';
  reason: string;
}

export interface EmotionalTriggers {
  urgency: number;
  fear: number;
  greed: number;
  authority: number;
}

export interface AnalysisResult {
  category: EmailCategory;
  risk_score: number;
  risk_level: RiskLevel;
  confidence: string;
  reasons: string[];
  detected_threats: string[];
  suggested_action: string;
  impersonation_target?: string;
  emotional_triggers: EmotionalTriggers;
  link_analysis: LinkAnalysis[];
  simplified_explanation: string;
}

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  preview: string;
  date: string;
  initialCategory: EmailCategory;
  analysis?: AnalysisResult;
}

export type ViewType = 'inbox' | 'spam' | 'promotions' | 'high-risk' | 'dashboard' | 'compose';
