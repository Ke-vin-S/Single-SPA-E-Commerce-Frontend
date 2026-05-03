import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from '@miniecommerce-sysco/mfe-design-system';
import { useAuth } from '../hooks/useAuth';

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const { register, isLoading, error } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(
      updateHeaderFields({ title: 'Create account', subtitle: 'Join us today' })
    );
    return () => {
      dispatch(updateHeaderFields({ title: '', subtitle: '' }));
    };
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, firstName, lastName);
      window.location.assign('/products');
    } catch {
      /* error in state */
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__subtitle">
          A few details and you're in.
        </p>

        <Form onSubmit={onSubmit}>
          <Input
            label="First name"
            placeholder="Jane"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
          <Input
            label="Last name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="family-name"
          />
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
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
            helperText="Use at least 8 characters."
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
            Create account
          </Button>
        </Form>

        <div className="auth-card__footer">
          Already have an account? <a href="/auth/login">Sign in</a>
        </div>
      </div>
    </div>
  );
};
