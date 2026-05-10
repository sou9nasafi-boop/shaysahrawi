export interface Product {
  id: string;
  name: string;
  category: 'tea' | 'perfume' | 'sahrawi';
  prices: Record<string, number>;
  description: string;
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  features?: string[];
}

export type Category = 'all' | 'tea' | 'perfume' | 'sahrawi';

export interface Message {
  id: string;
  name: string;
  phone: string;
  content: string;
  city?: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}
