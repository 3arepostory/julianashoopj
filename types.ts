
export enum Emotion {
  CALM = 'calm',
  ANXIOUS = 'anxious',
  FRUSTRATED = 'frustrated',
  CONFUSED = 'confused',
  ANGRY = 'angry'
}

export enum IssueType {
  DELIVERY = 'delivery',
  DAMAGED = 'damaged',
  WRONG = 'wrong',
  MISSING = 'missing',
  REFUND = 'refund',
  EXCHANGE = 'exchange',
  TRACKING = 'tracking',
  OTHER = 'other'
}

export enum Platform {
  SHOPEE = 'shopee',
  MERCADOLIVRE = 'mercadolivre',
  AMAZON = 'amazon',
  SITE = 'site'
}

export type CaseStatus = 'pending' | 'in_progress' | 'human_assigned' | 'resolved' | 'closed';

export interface AIAnalysis {
  sentiment: string;
  intent: string;
  urgency: 'low' | 'medium' | 'high';
  topics: string[];
  suggested_response: string;
  needs_human: boolean;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'ai' | 'human' | 'system' | 'email';
  senderName?: string; // Nome do atendente humano
  message: string;
  timestamp: string;
  analysis?: AIAnalysis;
}

export interface Case {
  id: string;
  protocol: string;
  customerName: string;
  email: string;
  orderNumber: string;
  issue: IssueType;
  emotion: Emotion;
  platform: Platform;
  details: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  aiAnalysis?: AIAnalysis;
  messages: ChatMessage[];
  assignedAgent?: string;
  resolutionNote?: string;
}

export interface TrainingData {
  issue: string;
  solution: string;
  date: string;
}
