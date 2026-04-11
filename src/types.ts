export interface Product {
  id: string;
  name: string;
  category: 'tea' | 'perfume' | 'melhafa';
  prices: Record<string, number>;
  description: string;
  image: string;
  secondaryImage?: string;
  features?: string[];
}

export type Category = 'all' | 'tea' | 'perfume' | 'melhafa';
