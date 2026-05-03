# Feature MFE: Admin - Claude Code Context

Restricted admin dashboard. Same shape as `mfe-products`:
- Pulls `useAuth()` from `@myapp/mfe-domain-auth` and gates rendering on `user.role === UserRole.ADMIN`.
- Dispatches header fields (`Admin Dashboard`).
- No Redux slice, no API client usage, no reducer injection.

```
apps/mfe-admin/src/
├── App.tsx
├── bootstrap.tsx
├── pages/
│   └── AdminDashboard.tsx
└── index.tsx
```

## Dependencies
- react, react-dom, react-redux
- @myapp/mfe-design-system
- @myapp/mfe-domain-auth
- @myapp/shared-code
- @myapp/shared-types
