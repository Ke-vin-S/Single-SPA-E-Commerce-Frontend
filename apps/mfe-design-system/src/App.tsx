import React, { useState } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Input } from './components/Input';
import { Modal } from './components/Modal';
import { Select } from './components/Select';
import { Form } from './components/Form';
import { SYSCO_COLORS } from './theme/colors';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ padding: 48, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
        Design System
      </h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Buttons</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isLoading>Loading</Button>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Card</h2>
        <Card style={{ maxWidth: 360 }}>
          <Card.Header>
            <Card.Title>Card Title</Card.Title>
          </Card.Header>
          <Card.Content>This is card content.</Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>
      </section>

      <section style={{ marginBottom: 32, maxWidth: 360 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Form</h2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            helperText="At least 8 characters"
          />
          <Select
            label="Role"
            options={[
              { value: 'user', label: 'User' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <Button type="submit" variant="primary" fullWidth>
            Submit
          </Button>
        </Form>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Modal</h2>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Hello"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p>This is the modal body.</p>
        </Modal>
      </section>

      <section>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Palette</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          {(['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const).map(
            (key) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 8,
                    backgroundColor: SYSCO_COLORS[key],
                  }}
                />
                <span style={{ fontSize: 12 }}>{key}</span>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};
