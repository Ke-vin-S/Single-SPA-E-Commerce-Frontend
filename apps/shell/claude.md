# Shell App (Host) - Claude Code Context

## Purpose
Host application that:
- Creates Redux store with **headerSlice**
- Provides `window.injectReducer()` for domains
- Renders Header (controlled by Redux - can hide/show fields)
- Loads all MFEs with single-spa
- Never unmounts - all state persists

## Key: Header State in Redux

Shell owns ALL header state. Any MFE can dispatch to it.

## Folder Structure
```
apps/shell/src/
├── App.tsx
├── index.tsx
├── bootstrap.ts
├── store.ts                  ← Redux store with headerSlice
├── mfe-registration.ts       ← Register all MFEs
├── layout/
│   ├── Header.tsx            ← Reads headerSlice from Redux
│   ├── Footer.tsx
│   └── Layout.tsx
└── redux/
    ├── headerSlice.ts        ← SHELL OWNS HEADER STATE
    └── index.ts
```

## Critical: store.ts

```typescript
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { headerSlice } from './redux/headerSlice';

// Base reducers (shell owns these)
const baseReducers = {
  header: headerSlice.reducer,
};

const store = configureStore({
  reducer: combineReducers(baseReducers),
});

// Domains will inject their reducers here
export const injectReducer = (key: string, reducer: any) => {
  store.replaceReducer(
    combineReducers({
      ...baseReducers,
      [key]: reducer,
    })
  );
};

// Expose on window for domains
window.reduxStore = store;
window.injectReducer = injectReducer;

export const {
  setHeaderVisibility,
  updateHeaderFields,
  toggleHeaderField,
} = headerSlice.actions;

export default store;
```

## Critical: headerSlice.ts

```typescript
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    isVisible: true,
    showSearch: true,
    showNotifications: true,
    showCart: true,
    showUser: true,
    fields: {
      title: 'E-Commerce',
      subtitle: '',
    },
  },
  reducers: {
    // Hide/show entire header
    setHeaderVisibility: (state, action) => {
      state.isVisible = action.payload;
    },

    // Update title and subtitle
    updateHeaderFields: (state, action) => {
      state.fields = { ...state.fields, ...action.payload };
    },

    // Toggle individual fields
    toggleHeaderField: (state, action) => {
      const field = action.payload; // 'showCart', 'showSearch', etc
      state[field] = !state[field];
    },
  },
});

export const {
  setHeaderVisibility,
  updateHeaderFields,
  toggleHeaderField,
} = headerSlice.actions;
export const selectHeader = (state) => state.header;
```

## Header Component (Reads Redux)

```typescript
import { useSelector } from 'react-redux';
import { useAuth } from '@myapp/mfe-domain-auth';
import { useCart } from '@myapp/mfe-domain-cart';
import { Button } from '@myapp/mfe-design-system';

export const Header = () => {
  const header = useSelector((state) => state?.header);
  const { user } = useAuth();
  const { itemCount } = useCart();

  if (!header?.isVisible) {
    return null; // Header hidden
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Title */}
        <div>
          <h1 className="text-xl font-bold">{header.fields.title}</h1>
          {header.fields.subtitle && (
            <p className="text-sm text-gray-500">{header.fields.subtitle}</p>
          )}
        </div>

        {/* Search */}
        {header.showSearch && (
          <SearchBox />
        )}

        {/* Right side */}
        <div className="flex gap-4">
          {header.showNotifications && <NotificationBell />}
          {header.showCart && (
            <Button onClick={() => window.location.href = '/cart'}>
              Cart ({itemCount})
            </Button>
          )}
          {header.showUser && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};
```

## How MFEs Update Header

```typescript
// mfe-checkout/src/App.tsx
import { useDispatch } from 'react-redux';
import { updateHeaderFields, toggleHeaderField } from '@shell/store';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Update header when checkout loads
    dispatch(updateHeaderFields({
      title: 'Checkout',
      subtitle: 'Complete your purchase',
    }));

    // Hide cart button (don't confuse user)
    dispatch(toggleHeaderField('showCart'));

    // Cleanup on unmount
    return () => {
      dispatch(updateHeaderFields({
        title: 'E-Commerce',
        subtitle: '',
      }));
      dispatch(toggleHeaderField('showCart'));
    };
  }, [dispatch]);

  return <CheckoutPage />;
};
```

## Key Concepts
- ✅ Shell creates Redux with headerSlice
- ✅ Header reads from state.header
- ✅ Any MFE can dispatch to update header
- ✅ Header adapts to context
- ✅ Domains inject their reducers too

## Dependencies
- react, react-dom
- react-redux, redux-toolkit
- single-spa
- @myapp/mfe-design-system

## Export headerSlice Actions

```typescript
// shell/src/index.ts or shell/public/index.html
// MFEs need to access these actions

export {
  setHeaderVisibility,
  updateHeaderFields,
  toggleHeaderField,
} from './redux/headerSlice';
```
