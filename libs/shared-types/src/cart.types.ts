export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Cart {
  id?: string;
  items: CartItem[];
  total: number;
  itemCount?: number;
}

import type { Order } from './common.types';

export interface CartState {
  cartId: string | null;
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
}
