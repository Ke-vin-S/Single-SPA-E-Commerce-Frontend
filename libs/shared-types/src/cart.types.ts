export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
}
