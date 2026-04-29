import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type { Cart, CartItem, Product } from '@miniecommerce-sysco/shared-types';
import {
  setCart,
  addItemLocal,
  removeItemLocal,
  updateQuantityLocal,
  clearCart,
  setLoading,
  setError,
} from '../redux/cartReducer';

const dispatch = (action: { type: string; payload?: unknown }): void => {
  window.reduxStore?.dispatch?.(action);
};

const toCartItem = (product: Product, quantity = 1): CartItem => ({
  id: `${product.id}-${Date.now()}`,
  productId: product.id,
  name: product.name,
  price: product.price,
  quantity,
  image: product.image,
});

export class CartManager {
  async fetchCart(): Promise<Cart | null> {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get<Cart>(API_ENDPOINTS.CART.GET);
      dispatch(setCart(response.data.items));
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch cart';
      dispatch(setError(message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async addItem(product: Product, quantity = 1): Promise<void> {
    const item = toCartItem(product, quantity);
    dispatch(addItemLocal(item));
    try {
      await apiClient.post(API_ENDPOINTS.CART.ADD, {
        productId: product.id,
        quantity,
      });
    } catch (error) {
      console.error('Cart sync failed (addItem):', error);
    }
  }

  async removeItem(id: string): Promise<void> {
    dispatch(removeItemLocal(id));
    try {
      await apiClient.delete(API_ENDPOINTS.CART.REMOVE(id));
    } catch (error) {
      console.error('Cart sync failed (removeItem):', error);
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<void> {
    dispatch(updateQuantityLocal({ id, quantity }));
    try {
      await apiClient.put(API_ENDPOINTS.CART.UPDATE(id), { quantity });
    } catch (error) {
      console.error('Cart sync failed (updateQuantity):', error);
    }
  }

  async clear(): Promise<void> {
    dispatch(clearCart());
    try {
      await apiClient.post(API_ENDPOINTS.CART.CLEAR);
    } catch (error) {
      console.error('Cart sync failed (clear):', error);
    }
  }
}

export const cartManager = new CartManager();
