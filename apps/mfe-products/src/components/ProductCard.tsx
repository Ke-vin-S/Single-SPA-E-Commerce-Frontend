import React from 'react';
import {
  Button,
  Badge,
  IconButton,
  HeartIcon,
  useToast,
} from '@miniecommerce-sysco/mfe-design-system';
import { useCart } from '@miniecommerce-sysco/mfe-domain-cart';
import { formatCurrency } from '@miniecommerce-sysco/shared-code';
import type { Product } from '@miniecommerce-sysco/shared-types';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

const initials = (name: string): string =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const stop = (e: React.MouseEvent) => e.stopPropagation();

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addItem } = useCart();
  const toast = useToast();

  const onAdd = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addItem(product);
    toast.push(`${product.name} added to cart`, 'success');
  };

  const open = () => onSelect?.(product);

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-card__body"
        onClick={open}
        aria-label={`View ${product.name} details`}
      >
        <div className="product-card__media">
          {product.image ? (
            <img src={product.image} alt={product.name} loading="lazy" />
          ) : (
            <span className="product-card__placeholder" aria-hidden="true">
              {initials(product.name)}
            </span>
          )}
          {!product.inStock && (
            <span className="product-card__badge">
              <Badge variant="outline">Sold out</Badge>
            </span>
          )}
          <IconButton
            aria-label={`Save ${product.name}`}
            className="product-card__wishlist"
            onClick={stop}
          >
            <HeartIcon />
          </IconButton>
        </div>

        {product.category && (
          <div className="product-card__category">{product.category}</div>
        )}
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__price">{formatCurrency(product.price)}</div>
      </button>

      <div className="product-card__cta">
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          disabled={!product.inStock}
          onClick={onAdd}
        >
          {product.inStock ? 'Add to cart' : 'Out of stock'}
        </Button>
      </div>
    </article>
  );
};
