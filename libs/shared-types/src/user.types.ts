export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UserProfile {
  phone?: string;
  avatarUrl?: string;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
  theme: 'light' | 'dark';
}

export interface UserState {
  profile: UserProfile | null;
  addresses: Address[];
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
}
