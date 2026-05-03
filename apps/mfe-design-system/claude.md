# Design System MFE - Claude Code Context

## Purpose
Shared UI component library deployed as **separate MFE**:
- Button, Card, Input, Modal, Select, Form
- Sysco brand colors
- Tailwind CSS utility classes
- No business logic
- **Independently versioned and deployed**

## Why Separate MFE?

- ✅ Updated independently (no rebuild other MFEs)
- ✅ Versioned separately
- ✅ Can have dedicated design team
- ✅ Live showcase/Storybook demo
- ✅ All MFEs always use latest version
- ✅ No duplication in bundles

## Folder Structure
```
apps/mfe-design-system/src/
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Select.tsx
│   ├── Form.tsx
│   └── index.ts              ← Export all
├── theme/
│   ├── colors.ts             ← Sysco brand colors
│   ├── tailwind.config.js
│   └── index.ts
├── App.tsx                   ← Storybook/Showcase
├── bootstrap.ts              ← single-spa lifecycle
├── index.ts                  ← Main export
└── types.ts                  ← Component prop types
```

## Sysco Colors (colors.ts)

```typescript
export const SYSCO_COLORS = {
  primary: '#1e40af',       // Sysco blue
  primaryLight: '#3b82f6',
  primaryDark: '#1e3a8a',

  secondary: '#7c3aed',     // Sysco purple
  accent: '#dc2626',        // Sysco red

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};
```

## Exports (index.ts)

```typescript
// Components
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Input } from './components/Input';
export { Modal } from './components/Modal';
export { Select } from './components/Select';
export { Form } from './components/Form';

// Theme
export { SYSCO_COLORS } from './theme/colors';

// Types
export type { ButtonProps } from './types';
export type { CardProps } from './types';
export type { InputProps } from './types';
```

## Usage by Other MFEs

```typescript
import { Button, Card, SYSCO_COLORS } from '@myapp/mfe-design-system';
import type { ButtonProps } from '@myapp/mfe-design-system';

export const ProductCard = ({ product }) => (
  <Card style={{ borderColor: SYSCO_COLORS.primary }}>
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <Button variant="primary" size="md">
      Add to Cart
    </Button>
  </Card>
);
```

## bootstrap.ts (Minimal)

```typescript
import { createRoot } from 'react-dom/client';
import { App } from './App';

let root;

export async function bootstrap() {
  // Nothing to inject
}

export async function mount(props) {
  root = createRoot(props.domElement);
  root.render(<App />);
}

export async function unmount() {
  root?.unmount();
}
```

## App.tsx (Showcase/Storybook)

```typescript
// Live component showcase
// Serves as documentation and testing ground

export const App = () => (
  <div className="p-12">
    <h1 className="text-4xl font-bold mb-8">Design System</h1>

    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Buttons</h2>
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Cards</h2>
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Content>This is card content</Card.Content>
        <Card.Footer>
          <Button>Action</Button>
        </Card.Footer>
      </Card>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Inputs</h2>
      <Input placeholder="Type something..." />
      <Input type="email" placeholder="your@email.com" />
    </section>
  </div>
);
```

## Webpack Config

```javascript
// webpack.config.js
module.exports = {
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    // Don't bundle React, use shell's
  },
  // Rest of config...
};
```

## Deployment Options

### Option A: Deploy to CDN
```bash
npm run build -w mfe-design-system
# Deploy dist/ to cdn.myapp.com/design-system@1.0.0/
```

### Option B: Deploy as npm Package
```bash
npm run build -w mfe-design-system
npm publish -w mfe-design-system
# Use: npm install @myapp/design-system@1.0.0
```

### Option C: Storybook Showcase
```bash
npm run storybook -w mfe-design-system
# Deploy to design.myapp.com/
# Other teams browse and learn components
```

## Key Rules
- ✅ Presentation only
- ✅ No business logic
- ✅ No Redux
- ✅ No API calls
- ✅ Independently versioned
- ✅ Used by ALL MFEs
- ❌ No domain code
- ❌ No state management

## Update Flow

```
Designer updates Button.tsx in design-system
  ↓
Deploy new version to CDN
  ↓
All MFEs automatically get new Button
  ↓
No rebuilds needed
```

## Dependencies
- react, react-dom
- tailwindcss
- (optional) storybook

