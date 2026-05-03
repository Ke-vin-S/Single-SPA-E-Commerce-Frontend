# Feature MFE: Products - Claude Code Context

## Purpose
Feature MFE that:
- Renders product UI (catalogue, detail, filter)
- Uses domain hooks (`useAuth`, `useCart`)
- Uses design-system components (Button, Card, Input, Select)
- Can dispatch to header to update title/subtitle
- NO Redux slices, NO reducer injection, NO direct API calls

## Folder Structure
```
apps/mfe-products/src/
├── App.tsx
├── bootstrap.tsx              ← NO injection
├── pages/
│   ├── ProductsPage.tsx
│   └── ProductDetailPage.tsx
├── components/
│   ├── ProductCard.tsx        ← Uses design-system Button + useCart
│   └── ProductFilter.tsx
└── index.tsx
```

## Dependencies
- react, react-dom, react-redux
- @myapp/mfe-design-system
- @myapp/mfe-domain-auth
- @myapp/mfe-domain-cart
- @myapp/shared-code
- @myapp/shared-types
