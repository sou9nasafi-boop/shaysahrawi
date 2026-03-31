export interface WeightOption {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  options: WeightOption[];
  sales?: number;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + option.label)
  productId: string;
  name: string;
  image: string;
  selectedOption: WeightOption;
  quantity: number;
}
