import { useSelector } from 'react-redux';
import type {
  Address,
  UserPreferences,
  UserProfile,
  UserState,
} from '@miniecommerce-sysco/shared-types';
import { userManager } from '../managers/UserManager';

interface UseUserReturn {
  profile: UserProfile | null;
  addresses: Address[];
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<UserProfile | null>;
  updateProfile: (payload: Partial<UserProfile>) => Promise<UserProfile | null>;
}

const defaultPrefs: UserPreferences = {
  newsletter: false,
  notifications: true,
  theme: 'light',
};

export const useUser = (): UseUserReturn => {
  const user = useSelector((state: { user?: UserState }) => state.user);

  return {
    profile: user?.profile ?? null,
    addresses: user?.addresses ?? [],
    preferences: user?.preferences ?? defaultPrefs,
    isLoading: user?.isLoading ?? false,
    error: user?.error ?? null,
    fetchProfile: () => userManager.fetchProfile(),
    updateProfile: (payload) => userManager.updateProfile(payload),
  };
};
