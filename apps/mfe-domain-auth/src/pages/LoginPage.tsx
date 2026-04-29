import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from '@miniecommerce-sysco/mfe-design-system';
import { useAuth } from '../hooks/useAuth';

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(
      updateHeaderFields({ title: 'Sign in', subtitle: 'Welcome back' })
    );
    return () => {
      dispatch(updateHeaderFields({ title: '', subtitle: '' }));
    };
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.assign('/products');
    } catch {
      /* error stays in state */
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Sign in</h1>
        <p className="auth-card__subtitle">
          Enter your details to access your account.
        </p>

        <Form onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && (
            <div className="auth-card__error" role="alert">
              {error}
            </div>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Sign in
          </Button>
        </Form>

        <div className="auth-card__footer">
          New here? <a href="/auth/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};
