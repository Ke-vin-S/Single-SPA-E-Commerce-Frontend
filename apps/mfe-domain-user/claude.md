# Domain MFE: User - Claude Code Context

## Same Pattern as Auth

Owns user-profile state (profile, addresses, preferences), exports `userReducer`,
provides `useUser` hook, exposes `UserManager` for business logic.

```
apps/mfe-domain-user/src/
├── App.tsx
├── bootstrap.tsx          ← Injects userReducer
├── managers/
│   └── UserManager.ts
├── redux/
│   ├── userSlice.ts
│   └── userReducer.ts
├── hooks/
│   └── useUser.ts
├── types/
│   └── user.types.ts
└── index.tsx
```

Key points:
- `window.injectReducer('user', userReducer)` runs in `bootstrap()`
- `useUser` returns `{ profile, addresses, preferences, ... }`
- `UserManager` handles profile / address / preference API calls
- May dispatch to header to set page titles (e.g. "Account Settings")

## Dependencies
- react, react-dom
- @reduxjs/toolkit, react-redux
- @myapp/shared-api
- @myapp/shared-types
- single-spa-react
