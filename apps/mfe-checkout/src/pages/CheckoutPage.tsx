import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  Input,
  Form,
  EmptyState,
  CheckIcon,
  PackageIcon,
} from '@miniecommerce-sysco/mfe-design-system';
import { useAuth } from '@miniecommerce-sysco/mfe-domain-auth';
import { useCart } from '@miniecommerce-sysco/mfe-domain-cart';
import { useUser } from '@miniecommerce-sysco/mfe-domain-user';
import { formatCurrency, validateEmail } from '@miniecommerce-sysco/shared-code';
import { CartLineItem } from '../components/CartLineItem';

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

const SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 8;

export const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { items, total, removeItem, updateQuantity, clear } = useCart();
  const { addresses } = useUser();

  const [email, setEmail] = useState(user?.email ?? '');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    dispatch(
      updateHeaderFields({ title: 'Checkout', subtitle: 'Review your order' })
    );
    return () => {
      dispatch(updateHeaderFields({ title: '', subtitle: '' }));
    };
  }, [dispatch]);

  const shipping = total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = total + shipping;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError(undefined);
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await clear();
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Card className="checkout-confirm">
        <Card.Content>
          <div className="checkout-confirm__icon" aria-hidden="true">
            <CheckIcon size={28} />
          </div>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Thank you for your order</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            We've sent a confirmation to <strong>{email}</strong>. Your order
            should arrive within 3–5 business days.
          </p>
          <Button onClick={() => window.location.assign('/products')}>
            Continue shopping
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<PackageIcon size={48} />}
        title="Your cart is empty"
        description="Looks like you haven't added anything yet."
        action={
          <Button onClick={() => window.location.assign('/products')}>
            Browse the catalog
          </Button>
        }
      />
    );
  }

  return (
    <div className="checkout-grid">
      <Card>
        <Card.Header>
          <Card.Title>Your cart</Card.Title>
        </Card.Header>
        <Card.Content>
          {items.map((item) => (
            <CartLineItem
              key={item.id}
              item={item}
              onRemove={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </Card.Content>
      </Card>

      <div className="checkout-summary">
        <Card>
          <Card.Header>
            <Card.Title>Order summary</Card.Title>
          </Card.Header>
          <Card.Content>
            <Form onSubmit={onSubmit}>
              <Input
                label="Email"
                type="email"
                required
                value={email}
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
                helperText="We'll send your receipt here"
              />
              {isAuthenticated && addresses.length > 0 && (
                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Shipping to: {addresses[0].line1}, {addresses[0].city}
                </div>
              )}

              <div className="checkout-totals">
                <div className="checkout-totals__row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="checkout-totals__row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="checkout-totals__total">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={submitting}
              >
                Place order
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};
