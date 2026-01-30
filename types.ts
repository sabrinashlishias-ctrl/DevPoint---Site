export interface Plan {
  id: string;
  name: string;
  priceImplementation: string;
  priceMaintenance: string;
  description: string;
  targetAudience: string;
  includes: string[];
  excludes: string[];
  limits: string[];
  estimatedTime: string;
  highlight?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  type?: 'text' | 'options';
  options?: string[];
}