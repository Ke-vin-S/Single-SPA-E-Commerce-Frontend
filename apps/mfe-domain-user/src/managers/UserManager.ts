import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type { Address, UserProfile, UserPreferences } from '@miniecommerce-sysco/shared-types';
import {
  setProfile,
  setAddresses,
  setPreferences,
  setLoading,
  setError,
} from '../redux/userReducer';

const dispatch = (action: { type: string; payload?: unknown }): void => {
  window.reduxStore?.dispatch?.(action);
};

interface BffUserProfile {
  user: {
    phone?: string;
    avatarUrl?: string;
    addresses?: unknown[];
    preferences?: Record<string, unknown>;
  };
}

const toUserProfile = (data: BffUserProfile['user']): UserProfile => ({
  phone: data.phone,
  avatarUrl: data.avatarUrl,
});

export class UserManager {
  async fetchProfile(): Promise<UserProfile | null> {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get<BffUserProfile>(API_ENDPOINTS.USER.PROFILE);
      const raw = response.data.user;
      const profile = toUserProfile(raw);
      dispatch(setProfile(profile));
      if (raw.addresses) {
        dispatch(setAddresses(raw.addresses as Address[]));
      }
      if (raw.preferences) {
        dispatch(setPreferences(raw.preferences as Partial<UserPreferences>));
      }
      return profile;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch profile';
      dispatch(setError(message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async updateProfile(payload: Partial<UserProfile>): Promise<UserProfile | null> {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.put<BffUserProfile>(
        API_ENDPOINTS.USER.UPDATE_PROFILE,
        payload
      );
      const raw = response.data.user;
      const profile = toUserProfile(raw);
      dispatch(setProfile(profile));
      if (raw.addresses) {
        dispatch(setAddresses(raw.addresses as Address[]));
      }
      if (raw.preferences) {
        dispatch(setPreferences(raw.preferences as Partial<UserPreferences>));
      }
      return profile;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      dispatch(setError(message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const userManager = new UserManager();
