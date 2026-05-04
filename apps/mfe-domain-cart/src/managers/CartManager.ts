import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type { Cart, CartItem, CartState, Order, Product } from '@miniecommerce-sysco/shared-types';
import {
  setCartId,
  setCart,
  addItemLocal,
  removeItemLocal,
  updateQuantityLocal,
  clearCart,
  setLoading,
  setError,
  setOrders,
  setOrdersLoading,
  setOrdersError,
} from '../redux/cartReducer';

const dispatch = (action: { type: string; payload?: unknown }): void => {
  window.reduxStore?.dispatch?.(action);
};

const getCartId = (): string | null => {
  const state = window.reduxStore?.getState() as { cart?: CartState } | undefined;
  return state?.cart?.cartId ?? null;
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
      dispatch(setCartId(response.data.id ?? null));
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

  private async ensureCartId(): Promise<string | null> {
    let cartId = getCartId();
    if (!cartId) {
      const cart = await this.fetchCart();
      cartId = cart?.id ?? null;
    }
    return cartId;
  }

  async addItem(product: Product, quantity = 1): Promise<void> {
    const cartId = await this.ensureCartId();
    if (!cartId) {
      console.warn('Cart ID not available; skipping server sync for addItem');
      return;
    }
    const item = toCartItem(product, quantity);
    dispatch(addItemLocal(item));
    try {
      const response = await apiClient.post<{ item: CartItem; cart: Cart }>(
        API_ENDPOINTS.CART.ADD(cartId),
        { productId: product.id, quantity }
      );
      if (response.data.cart.items) {
        dispatch(setCart(response.data.cart.items));
      }
    } catch (error) {
      console.error('Cart sync failed (addItem):', error);
    }
  }

  async removeItem(id: string): Promise<void> {
    const cartId = await this.ensureCartId();
    if (!cartId) {
      console.warn('Cart ID not available; skipping server sync for removeItem');
      return;
    }
    dispatch(removeItemLocal(id));
    try {
      const response = await apiClient.delete<{ cart: Cart }>(
        API_ENDPOINTS.CART.REMOVE(cartId, id)
      );
      if (response.data.cart.items) {
        dispatch(setCart(response.data.cart.items));
      }
    } catch (error) {
      console.error('Cart sync failed (removeItem):', error);
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<void> {
    const cartId = await this.ensureCartId();
    if (!cartId) {
      console.warn('Cart ID not available; skipping server sync for updateQuantity');
      return;
    }
    dispatch(updateQuantityLocal({ id, quantity }));
    try {
      const response = await apiClient.put<{ item: CartItem; cart: Cart }>(
        API_ENDPOINTS.CART.UPDATE(cartId, id),
        { quantity }
      );
      if (response.data.cart.items) {
        dispatch(setCart(response.data.cart.items));
      }
    } catch (error) {
      console.error('Cart sync failed (updateQuantity):', error);
    }
  }

  async clear(): Promise<void> {
    const cartId = await this.ensureCartId();
    if (!cartId) {
      console.warn('Cart ID not available; skipping server sync for clear');
      return;
    }
    dispatch(clearCart());
    try {
      const response = await apiClient.post<{ cart: Cart }>(
        API_ENDPOINTS.CART.CLEAR(cartId)
      );
      if (response.data.cart.items) {
        dispatch(setCart(response.data.cart.items));
      }
    } catch (error) {
      console.error('Cart sync failed (clear):', error);
    }
  }

  async fetchOrders(): Promise<Order[]> {
    dispatch(setOrdersLoading(true));
    dispatch(setOrdersError(null));
    try {
      const response = await apiClient.get<Order[]>(API_ENDPOINTS.ORDERS.LIST);
      dispatch(setOrders(response.data));
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch orders';
      dispatch(setOrdersError(message));
      return [];
    } finally {
      dispatch(setOrdersLoading(false));
    }
  }
}

export const cartManager = new CartManager();
