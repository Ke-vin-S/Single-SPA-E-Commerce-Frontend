# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **Single-SPA micro-frontend e-commerce monorepo**. The repository currently contains architecture documentation and claude.md blueprints for each module — no source code has been written yet. Use the per-module `claude.md` files as implementation specs when building each module.

## Repository Structure

```
apps/
├── shell/                  # Host application — creates Redux store, loads all MFEs
├── mfe-design-system/      # Shared UI component library (Button, Card, Input, Modal)
├── mfe-domain-auth/        # Auth domain — owns auth state, exports useAuth hook
├── mfe-domain-cart/        # Cart domain — owns cart state, exports useCart hook
└── mfe-checkout/           # Checkout feature MFE

libs/
├── shared-api/             # Axios client with auth interceptors (npm package)
├── shared-code/            # Utilities, hooks, constants (npm package)
└── shared-types/           # TypeScript interfaces and enums (npm package)
```

Additional modules documented but not yet scaffolded: `mfe-domain-user`, `mfe-products`, `mfe-admin`.

## Expected Commands (npm workspaces)

```bash
# Install all dependencies
npm install

# Build a specific workspace
npm run build -w apps/shell
npm run build -w libs/shared-api

# Run dev server for a specific workspace
npm run dev -w apps/shell

# Test a specific workspace
npm run test -w apps/mfe-domain-auth

# Lint a specific workspace
npm run lint -w apps/mfe-domain-auth

# Build and publish shared libraries
npm run build -w libs/shared-api && npm publish -w libs/shared-api

# Storybook (design system)
npm run storybook -w apps/mfe-design-system
```

> These commands reflect the documented intent. Actual `package.json` scripts must be created during implementation.

## Implementation Order

Build modules in this sequence to resolve dependencies correctly:

1. **Shell** — creates the Redux store with `headerSlice`, provides `window.reduxStore` and `window.injectReducer`
2. **Shared libraries** — `shared-types`, `shared-code`, `shared-api` (publish to npm registry)
3. **Design system** — deploy independently; no business logic
4. **Domain MFEs** — `mfe-domain-auth`, `mfe-domain-cart`, `mfe-domain-user` (inject reducers at bootstrap)
5. **Feature MFEs** — `mfe-products`, `mfe-checkout`, `mfe-admin` (consume domain hooks)

## Architecture: Cross-MFE State & Communication

### Shared Redux Store (via `window`)

Shell creates the Redux store and exposes it globally:

```typescript
window.reduxStore = store;            // All MFEs read/dispatch here
window.injectReducer = injectReducer; // Domains call this in bootstrap()
```

Shell owns `state.header`. Domains inject their own slices (`state.auth`, `state.cart`, `state.user`) at bootstrap time using `window.injectReducer('auth', authReducer)`.

### Domain Hook Pattern

Feature MFEs never touch Redux or the API client directly. They use hooks exported by domain MFEs:

```typescript
// ✅ Feature MFE usage
const { user, isAuthenticated, login } = useAuth();   // from @myapp/mfe-domain-auth
const { items, itemCount, addItem } = useCart();       // from @myapp/mfe-domain-cart
```

### API Access

`apiClient` from `@myapp/shared-api` is used **only inside domain managers**, never in components. The request interceptor auto-injects `Bearer` tokens from `window.reduxStore.getState().auth.token`. The response interceptor handles 401s with a token refresh flow.

### Header Control

Any MFE can dispatch to `state.header` to update the shell's header:

```typescript
import { updateHeaderFields, toggleHeaderField } from '@shell/store';
dispatch(updateHeaderFields({ title: 'Checkout', subtitle: 'Complete your purchase' }));
dispatch(toggleHeaderField('showCart')); // hide cart icon during checkout
```

Always restore header state in the cleanup function of `useEffect` on unmount.

## Key Rules

| Rule | Applies to |
|------|-----------|
| Domains inject their reducer in `bootstrap()` | All domain MFEs |
| Feature MFEs use domain hooks, never `apiClient` directly | Feature MFEs |
| `apiClient` used only in domain `*Manager.ts` files | Domain MFEs |
| Design system has zero business logic | `mfe-design-system` |
| Shell owns only `headerSlice`; no business logic | Shell |
| All MFEs share `window.reduxStore`; no MFE creates its own store | All MFEs |

## Package Naming Convention

Published npm packages use the `@myapp/` scope:
- `@myapp/shared-api`, `@myapp/shared-code`, `@myapp/shared-types`
- `@myapp/mfe-design-system`, `@myapp/mfe-domain-auth`, `@myapp/mfe-domain-cart`

Shell store actions are imported from `@shell/store`.

## Per-Module Specs

Detailed implementation blueprints (folder structure, critical files, code patterns) are in each module's `claude.md`:

- `apps/shell/claude.md`
- `apps/mfe-design-system/claude.md`
- `apps/mfe-domain-auth/claude.md`
- `apps/mfe-domain-cart/claude.md`
- `apps/mfe-checkout/claude.md`
- `libs/shared-api/claude.md`
- `libs/shared-code/claude.md`
- `libs/shared-types/claude.md`

The summary table in `ALL_11_CLAUDE_MD_FILES_FINAL.md` (repo root) shows which modules deploy where and which inject Redux reducers.


# permissions: auto
