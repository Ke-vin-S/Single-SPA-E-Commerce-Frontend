export { bootstrap, mount, unmount } from './bootstrap';

export { UserManager, userManager } from './managers/UserManager';
export { useUser } from './hooks/useUser';
export {
  userReducer,
  setProfile,
  setAddresses,
  setPreferences,
  setLoading,
  setError,
  clearUser,
  selectUser,
} from './redux/userReducer';

export type {
  UserProfile,
  UserPreferences,
  UserState,
} from '@miniecommerce-sysco/shared-types';
