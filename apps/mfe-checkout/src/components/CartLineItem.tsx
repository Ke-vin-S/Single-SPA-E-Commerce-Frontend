import React from 'react';
import { PlusIcon, MinusIcon } from '@miniecommerce-sysco/mfe-design-system';
import { formatCurrency } from '@miniecommerce-sysco/shared-code';
import type { CartItem } from '@miniecommerce-sysco/shared-types';

interface CartLineItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const initials = (name: string): string =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const CartLineItem: React.FC<CartLineItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  const dec = () => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1));
  const inc = () => onUpdateQuantity(item.id, item.quantity + 1);

  return (
    <div className="line-item">
      <div className="line-item__media">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" />
        ) : (
          <span aria-hidden="true">{initials(item.name)}</span>
        )}
      </div>

      <div className="line-item__body">
        <h4 className="line-item__name">{item.name}</h4>
        <span className="line-item__unit">{formatCurrency(item.price)} each</span>
        <div className="line-item__qty" role="group" aria-label="Quantity">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={dec}
            disabled={item.quantity <= 1}
          >
            <MinusIcon />
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button type="button" aria-label="Increase quantity" onClick={inc}>
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className="line-item__right">
        <span className="line-item__total">
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          type="button"
          className="line-item__remove"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
