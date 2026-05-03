## Summary Table

| File | Type | Deploys | Injects | Dispatch Header |
|------|------|---------|---------|-----------------|
| **shell** | Host | ✅ myapp.com | N/A | Reads state |
| **design-system** | Library MFE | ✅ cdn.com | ❌ No | N/A |
| **domain-auth** | Domain | ✅ auth.com | ✅ authReducer | ✅ Can |
| **domain-cart** | Domain | ✅ cart.com | ✅ cartReducer | ✅ Can |
| **domain-user** | Domain | ✅ user.com | ✅ userReducer | ✅ Can |
| **mfe-products** | Feature | ✅ products.com | ❌ No | ✅ Can |
| **mfe-checkout** | Feature | ✅ checkout.com | ❌ No | ✅ Can |
| **mfe-admin** | Feature | ✅ admin.com | ❌ No | ✅ Can |
| **shared-code** | npm | ✅ npm registry | N/A | N/A |
| **shared-types** | npm | ✅ npm registry | N/A | N/A |
| **shared-api** | npm | ✅ npm registry | N/A | N/A |

---

## How to Use These Files

### Step 1: Copy Each File
Copy content of each claude.md above to corresponding folder:
- Shell: `apps/shell/claude.md`
- Design System: `apps/mfe-design-system/claude.md`
- Domains: `apps/mfe-domain-*/claude.md`
- Features: `apps/mfe-*/claude.md`
- Shared: `libs/shared-*/claude.md`

### Step 2: When Building with Claude Code
1. Open the corresponding claude.md
2. Share content with Claude Code
3. Ask Claude to create the file

### Step 3: Order of Implementation
1. **Shell first** - Creates Redux store with headerSlice
2. **Shared libraries second** - Types, Code, API (publish to npm)
3. **Design System third** - Deploy independently
4. **Domains fourth** - Auth, Cart, User (inject reducers)
5. **Features last** - Products, Checkout, Admin (dispatch to header)
