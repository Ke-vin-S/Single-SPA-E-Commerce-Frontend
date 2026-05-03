# Feature MFE: Checkout - Claude Code Context

## Same Pattern as Products

Key differences:
- Hides certain header fields during checkout
- Uses ALL domain hooks (auth, cart, user)

```typescript
useEffect(() => {
  // Update header
  dispatch(updateHeaderFields({
    title: 'Checkout',
    subtitle: 'Complete your purchase',
  }));

  // Hide cart (don't confuse during checkout)
  dispatch(toggleHeaderField('showCart'));

  // Hide search (not needed during checkout)
  dispatch(toggleHeaderField('showSearch'));
}, [dispatch]);
```

For complete implementation, see mfe-products claude.md - same pattern.

## Uses All Domain Hooks

```typescript
const { user, isAuthenticated } = useAuth();
const { items, total } = useCart();
const { addresses } = useUser();
```

## Dependencies
- react, react-dom
- react-redux
- @myapp/mfe-design-system
- @myapp/mfe-domain-auth
- @myapp/mfe-domain-cart
- @myapp/mfe-domain-user
- @shared/types
```

---

# 8. apps/mfe-admin/claude.md

```markdown
# Feature MFE: Admin - Claude Code Context

## Same Pattern as Products

Key differences:
- Admin-only restricted UI
- Uses necessary domain hooks

```typescript
useEffect(() => {
  dispatch(updateHeaderFields({
    title: 'Admin Dashboard',
    subtitle: 'Manage your business',
  }));
}, [dispatch]);
```

For complete implementation, see mfe-products claude.md - same pattern.

## Dependencies
- react, react-dom
- react-redux
- @myapp/mfe-design-system
- @myapp/mfe-domain-auth
- @shared/types
