import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  Button,
  Badge,
  EmptyState,
  PackageIcon,
} from '@miniecommerce-sysco/mfe-design-system';
import { useAuth, UserRole } from '@miniecommerce-sysco/mfe-domain-auth';
import { formatCurrency, formatNumber } from '@miniecommerce-sysco/shared-code';

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

interface Stat {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down';
}

const stats: Stat[] = [
  { label: 'Total sales', value: formatCurrency(184_320), delta: '+12.4%', trend: 'up' },
  { label: 'Orders today', value: formatNumber(127), delta: '+8.1%', trend: 'up' },
  { label: 'Active users', value: formatNumber(2_413), delta: '+3.2%', trend: 'up' },
  { label: 'Pending returns', value: formatNumber(8), delta: '-2', trend: 'down' },
];

export const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    dispatch(
      updateHeaderFields({
        title: 'Admin',
        subtitle: 'Operational overview',
      })
    );
    return () => {
      dispatch(updateHeaderFields({ title: '', subtitle: '' }));
    };
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <Card className="admin-gate">
        <Card.Content>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Sign in required</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
            You need to sign in to view the admin dashboard.
          </p>
          <Button onClick={() => window.location.assign('/auth/login')}>
            Sign in
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (user?.role !== UserRole.ADMIN) {
    return (
      <Card className="admin-gate">
        <Card.Content>
          <Badge variant="danger">Restricted</Badge>
          <h2 style={{ margin: 'var(--space-4) 0 var(--space-3)' }}>Access denied</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            You don't have permission to view this page.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="admin-greeting">Welcome back, {user?.name}</h2>

      <div className="admin-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat">
            <span className="admin-stat__label">{stat.label}</span>
            <span className="admin-stat__value">{stat.value}</span>
            {stat.delta && (
              <span
                className={`admin-stat__delta${stat.trend === 'down' ? ' admin-stat__delta--down' : ''}`}
              >
                {stat.delta} vs last week
              </span>
            )}
          </div>
        ))}
      </div>

      <Card>
        <Card.Header>
          <Card.Title>Recent activity</Card.Title>
        </Card.Header>
        <Card.Content>
          <EmptyState
            icon={<PackageIcon size={48} />}
            title="No activity yet"
            description="Hook this up to your orders / events feed to see live updates here."
          />
        </Card.Content>
      </Card>
    </div>
  );
};
