import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type {
  Address,
  UserPreferences,
  UserProfile,
} from '@miniecommerce-sysco/shared-types';
import {
  setProfile,
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setPreferences,
  setLoading,
  setError,
} from '../redux/userReducer';

const dispatch = (action: { type: string; payload?: unknown }): void => {
  window.reduxStore?.dispatch?.(action);
};

export class UserManager {
  async fetchProfile(): Promise<UserProfile | null> {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
      dispatch(setProfile(response.data));
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch profile';
      dispatch(setError(message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async updateProfile(payload: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const response = await apiClient.put<UserProfile>(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        payload
      );
      dispatch(setProfile(response.data));
      return response.data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      dispatch(setError(message));
      return null;
    }
  }

  async fetchAddresses(): Promise<Address[]> {
    try {
      const response = await apiClient.get<Address[]>(API_ENDPOINTS.USER.ADDRESSES);
      dispatch(setAddresses(response.data));
      return response.data;
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      return [];
    }
  }

  async createAddress(payload: Omit<Address, 'id'>): Promise<Address | null> {
    try {
      const response = await apiClient.post<Address>(
        API_ENDPOINTS.USER.ADD_ADDRESS,
        payload
      );
      dispatch(addAddress(response.data));
      return response.data;
    } catch (error) {
      console.error('Failed to create address:', error);
      return null;
    }
  }

  async updateAddress(id: string, payload: Partial<Address>): Promise<Address | null> {
    try {
      const response = await apiClient.put<Address>(
        API_ENDPOINTS.USER.UPDATE_ADDRESS(id),
        payload
      );
      dispatch(updateAddress(response.data));
      return response.data;
    } catch (error) {
      console.error('Failed to update address:', error);
      return null;
    }
  }

  async deleteAddress(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.USER.DELETE_ADDRESS(id));
      dispatch(removeAddress(id));
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  }

  async updatePreferences(payload: Partial<UserPreferences>): Promise<void> {
    dispatch(setPreferences(payload));
    try {
      await apiClient.put(API_ENDPOINTS.USER.PREFERENCES, payload);
    } catch (error) {
      console.error('Preferences sync failed:', error);
    }
  }
}

export const userManager = new UserManager();
