# Domain MFE: Cart - Claude Code Context

## Same Pattern as Auth

Structure:
```
apps/mfe-domain-cart/src/
├── App.tsx
├── bootstrap.ts         ← Injects cartReducer
├── managers/
│   └── CartManager.ts
├── redux/
│   ├── cartSlice.ts
│   └── cartReducer.ts
├── hooks/
│   └── useCart.ts
├── types/
│   └── cart.types.ts
└── index.ts
```

Key differences:
- CartManager owns cart logic (addItem, removeItem, updateQuantity)
- cartReducer injected: `window.injectReducer('cart', cartReducer)`
- useCart hook provided for feature MFEs

Can dispatch to header:
```typescript
dispatch(updateHeaderFields({ title: 'Shopping Cart' }));
dispatch(toggleHeaderField('showSearch')); // Hide search in cart
```

For complete implementation, see domain-auth claude.md - same pattern.

## Dependencies
- react, react-dom
- redux-toolkit
- @shared/api
- @shared/types
- single-spa
```

---

# 5. apps/mfe-domain-user/claude.md

```markdown
# Domain MFE: User - Claude Code Context

## Same Pattern as Auth

Structure:
```
apps/mfe-domain-user/src/
├── App.tsx
├── bootstrap.ts         ← Injects userReducer
├── managers/
│   └── UserManager.ts
├── redux/
│   ├── userSlice.ts
│   └── userReducer.ts
├── hooks/
│   └── useUser.ts
├── types/
│   └── user.types.ts
└── index.ts
```

Key differences:
- UserManager owns user logic (profile, addresses, preferences)
- userReducer injected: `window.injectReducer('user', userReducer)`
- useUser hook provided for feature MFEs

Can dispatch to header:
```typescript
dispatch(updateHeaderFields({
  title: 'Account Settings',
  subtitle: 'Manage your profile'
}));
dispatch(toggleHeaderField('showCart')); // Hide cart in account
```

For complete implementation, see domain-auth claude.md - same pattern.

## Dependencies
- react, react-dom
- redux-toolkit
- @shared/api
- @shared/types
- single-spa
```

---

# 6. apps/mfe-products/claude.md

```markdown
# Feature MFE: Products - Claude Code Context

## Purpose
Feature MFE that:
- Renders product UI
- Uses domain hooks (useAuth, useCart)
- **Can dispatch to header** to update title/fields
- NO Redux slices
- NO reducer injection
- NO business logic

## Folder Structure
```
apps/mfe-products/src/
├── App.tsx
├── bootstrap.ts              ← NO injection
├── pages/
│   ├── ProductsPage.tsx
│   └── ProductDetailPage.tsx
├── components/
│   ├── ProductCard.tsx       ← Uses design-system Button
│   └── ProductFilter.tsx
└── index.ts
```

## Can Dispatch to Header

```typescript
import { useDispatch } from 'react-redux';
import { updateHeaderFields, setHeaderVisibility } from '@shell/store';
import { Button } from '@myapp/mfe-design-system';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Update header when products page loads
    dispatch(updateHeaderFields({
      title: 'Shop',
      subtitle: 'Browse our products',
    }));

    // Show all header fields
    dispatch(setHeaderVisibility(true));
  }, [dispatch]);

  return <ProductsPage />;
};
```

## Components Use Design System

```typescript
import { Button, Card } from '@myapp/mfe-design-system';
import { useCart } from '@myapp/mfe-domain-cart';

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <Card>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Button
        variant="primary"
        onClick={() => addItem(product)}
      >
        Add to Cart
      </Button>
    </Card>
  );
};
```

## bootstrap.ts (Simple, No Injection)

```typescript
import { createRoot } from 'react-dom/client';
import { App } from './App';

let root;

export async function bootstrap() {
  // Nothing to inject - feature has no reducer
}

export async function mount(props) {
  root = createRoot(props.domElement);
  root.render(<App />);
}

export async function unmount() {
  root?.unmount();
}
```

## Key Rules
- ✅ Use domain hooks (useAuth, useCart, useUser)
- ✅ Use design-system components
- ✅ Can dispatch to header
- ✅ Render UI only
- ✅ Have local state (form inputs, filters)
- ❌ NO Redux slices
- ❌ NO reducer injection
- ❌ NO business logic
- ❌ NO API calls (use managers via hooks)

## Dependencies
- react, react-dom
- react-redux
- @myapp/mfe-design-system
- @myapp/mfe-domain-auth
- @myapp/mfe-domain-cart
- @shared/types
