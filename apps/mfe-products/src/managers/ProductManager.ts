import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type { Product } from '@miniecommerce-sysco/shared-types';

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export class ProductManager {
  async getProducts(
    page = 1,
    limit = 10,
    category?: string,
    search?: string
  ): Promise<PaginatedProducts> {
    const response = await apiClient.get<PaginatedProducts>(API_ENDPOINTS.PRODUCTS.LIST, {
      params: { page, limit, category, search },
    });
    return response.data;
  }

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<{ product: Product }>(API_ENDPOINTS.PRODUCTS.GET(id));
    return response.data.product;
  }
}

export const productManager = new ProductManager();
