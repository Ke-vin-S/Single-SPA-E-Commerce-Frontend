import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  EmptyState,
  PackageIcon,
} from '@miniecommerce-sysco/mfe-design-system';
import { useAuth } from '@miniecommerce-sysco/mfe-domain-auth';
import { useCart } from '@miniecommerce-sysco/mfe-domain-cart';
import { formatCurrency } from '@miniecommerce-sysco/shared-code';
import { OrderStatus } from '@miniecommerce-sysco/shared-types';

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

const statusLabel = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Pending';
    case OrderStatus.PROCESSING:
      return 'Processing';
    case OrderStatus.SHIPPED:
      return 'Shipped';
    case OrderStatus.DELIVERED:
      return 'Delivered';
    case OrderStatus.CANCELLED:
      return 'Cancelled';
    default:
      return status;
  }
};

export const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { orders, ordersLoading, ordersError, fetchOrders } = useCart();

  useEffect(() => {
    dispatch(
      updateHeaderFields({ title: 'Orders', subtitle: 'Your order history' })
    );
    return () => {
      dispatch(updateHeaderFields({ title: '', subtitle: '' }));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  if (!isAuthenticated) {
    return (
      <Card className="orders-signin">
        <Card.Content>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Sign in to view orders</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            You need to be signed in to see your order history.
          </p>
          <Button onClick={() => window.location.assign('/auth/login')}>
            Sign in
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (ordersLoading) {
    return (
      <div className="orders-loading">
        <p>Loading orders…</p>
      </div>
    );
  }

  if (ordersError) {
    return (
      <Card className="orders-error">
        <Card.Content>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Something went wrong</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            {ordersError}
          </p>
          <Button onClick={() => fetchOrders()}>Try again</Button>
        </Card.Content>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={<PackageIcon size={48} />}
        title="No orders yet"
        description="When you place orders, they will appear here."
        action={
          <Button onClick={() => window.location.assign('/products')}>
            Browse the catalog
          </Button>
        }
      />
    );
  }

  return (
    <div className="orders-page">
      <h1 className="orders-page__title">Your orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <Card key={order.id} className="order-card">
            <Card.Header>
              <div className="order-card__header">
                <span className="order-card__id">Order #{order.id}</span>
                <span
                  className={`order-card__status order-card__status--${order.status}`}
                >
                  {statusLabel(order.status)}
                </span>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="order-card__meta">
                <span>
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>{order.items.length} item{order.items.length === 1 ? '' : 's'}</span>
              </div>
              <ul className="order-card__items">
                {order.items.map((item) => (
                  <li key={item.id} className="order-card__item">
                    <span className="order-card__item-name">{item.name}</span>
                    <span className="order-card__item-qty">x{item.quantity}</span>
                    <span className="order-card__item-price">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="order-card__total">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};
