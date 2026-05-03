# Domain MFE: Auth - Claude Code Context

## Purpose
Domain MFE that:
- Owns **ALL auth business logic**
- Exports authReducer (injected into shell's Redux)
- Provides useAuth hook for feature MFEs
- Has optional UI (LoginPage, RegisterPage)
- **Can dispatch to header** to control header appearance

## Folder Structure
```
apps/mfe-domain-auth/src/
├── App.tsx
├── bootstrap.ts              ← INJECTS authReducer
├── managers/
│   ├── AuthManager.ts        ← Business logic
│   └── index.ts
├── redux/
│   ├── authSlice.ts          ← Redux state definition
│   ├── authReducer.ts        ← Exported for injection
│   └── index.ts
├── hooks/
│   ├── useAuth.ts            ← For feature MFEs
│   └── index.ts
├── pages/
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── types/
│   ├── auth.types.ts
│   └── index.ts
└── index.ts
```

## Critical: bootstrap.ts (INJECT REDUCER)

```typescript
import { createRoot } from 'react-dom/client';
import { authReducer } from './redux/authReducer';
import { App } from './App';

let root;

export async function bootstrap() {
  console.log('Auth MFE bootstrapping...');

  // THIS IS CRITICAL: Inject reducer into shell's store
  if (window.injectReducer) {
    window.injectReducer('auth', authReducer);
    console.log('Auth reducer injected');
  }
}

export async function mount(props) {
  root = createRoot(props.domElement);
  root.render(<App />);
}

export async function unmount() {
  root?.unmount();
}
```

## Critical: authReducer.ts (EXPORTED)

```typescript
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// MUST EXPORT THIS (shell injects it)
export const authReducer = authSlice.reducer;
export const { setAuth, clearAuth, setLoading, setError } = authSlice.actions;
export const selectAuth = (state) => state?.auth;
```

## AuthManager.ts (Business Logic)

```typescript
import { apiClient } from '@shared/api';
import { setAuth, clearAuth, setLoading } from '../redux/authReducer';

export class AuthManager {
  async login(email: string, password: string) {
    window.reduxStore.dispatch(setLoading(true));

    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      window.reduxStore.dispatch(setAuth({ token, user }));

      return { token, user };
    } catch (error) {
      window.reduxStore.dispatch(setError(error.message));
      throw error;
    } finally {
      window.reduxStore.dispatch(setLoading(false));
    }
  }

  async logout() {
    try {
      await apiClient.post('/auth/logout');
      window.reduxStore.dispatch(clearAuth());
    } catch (error) {
      console.error('Logout failed:', error);
      window.reduxStore.dispatch(clearAuth());
    }
  }
}

export const authManager = new AuthManager();
```

## useAuth.ts (React Hook)

```typescript
import { useSelector } from 'react-redux';
import { authManager } from '../managers/AuthManager';

export const useAuth = () => {
  const auth = useSelector((state) => state?.auth);

  return {
    token: auth?.token,
    user: auth?.user,
    isAuthenticated: auth?.isAuthenticated,
    isLoading: auth?.isLoading,
    error: auth?.error,
    login: (email: string, password: string) =>
      authManager.login(email, password),
    logout: () => authManager.logout(),
  };
};
```

## Can Dispatch to Header

```typescript
// App.tsx or LoginPage.tsx
import { useDispatch } from 'react-redux';
import { updateHeaderFields, toggleHeaderField } from '@shell/store';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();

  useEffect(() => {
    // Tell shell to update header when login page loads
    dispatch(updateHeaderFields({
      title: 'Sign In',
      subtitle: 'Enter your credentials',
    }));

    // Hide cart during login
    dispatch(toggleHeaderField('showCart'));

    return () => {
      // Restore header on unmount
      dispatch(updateHeaderFields({
        title: 'E-Commerce',
        subtitle: '',
      }));
    };
  }, [dispatch]);

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await login(email, password);
    }}>
      {/* Form fields */}
    </form>
  );
};
```

## Main Export (index.ts)

```typescript
export { AuthManager, authManager } from './managers/AuthManager';
export { useAuth } from './hooks/useAuth';
export { authReducer, setAuth, clearAuth } from './redux/authReducer';
export type { User, AuthState } from './types/auth.types';
```

## Key Rules
- ✅ Inject authReducer in bootstrap()
- ✅ Use window.reduxStore to dispatch
- ✅ Provide useAuth hook
- ✅ Can dispatch to header
- ✅ AuthManager owns all logic
- ❌ Don't create own Redux store
- ❌ Don't import from shell directly

## Dependencies
- react, react-dom
- redux-toolkit
- @shared/api
- @shared/types
- single-spa
