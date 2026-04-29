import type { CartItem } from './cart.types';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  inStock: boolean;
  category?: string;
  tags?: string[];
  origin?: string;
  supplier?: string;
  sku?: string;
  packSize?: string;
  storage?: string;
  shelfLifeDays?: number;
  allergens?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
