import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

interface ProductDetailPageProps {
  product: Product;
}

const initials = (name: string): string =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const { addItem } = useCart();
  const toast = useToast();

  useEffect(() => {
    dispatch(
      updateHeaderFields({ title: product.name, subtitle: product.category })
    );
    return () => {
      dispatch(updateHeaderFields({ title: 'Shop', subtitle: 'Browse our products' }));
    };
  }, [dispatch, product]);

  const onAdd = async () => {
    await addItem(product);
    toast.push(`${product.name} added to cart`, 'success');
  };

  return (
    <div className="product-detail">
      <div>
        <div className="product-detail__media">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-subtle)',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-5xl)',
                letterSpacing: 'var(--track-tight)',
              }}
              aria-hidden="true"
            >
              {initials(product.name)}
            </div>
          )}
        </div>
      </div>

      <div>
        {product.category && (
          <div className="product-detail__category">{product.category}</div>
        )}
        <h1 className="product-detail__name">{product.name}</h1>
        <div className="product-detail__price">
          {formatCurrency(product.price)}
        </div>

        <p className="product-detail__description">{product.description}</p>

        <div className="product-detail__actions">
          <Button
            variant="primary"
            size="lg"
            disabled={!product.inStock}
            onClick={onAdd}
          >
            {product.inStock ? 'Add to cart' : 'Out of stock'}
          </Button>
          <IconButton aria-label="Save for later">
            <HeartIcon />
          </IconButton>
        </div>

        <div className="product-detail__meta">
          <div>
            <strong>Availability:</strong>{' '}
            {product.inStock ? (
              <Badge variant="success">In stock</Badge>
            ) : (
              <Badge variant="outline">Sold out</Badge>
            )}
          </div>
          <div>
            <strong>Free delivery</strong> on orders over $250.
          </div>
          <div>
            <strong>Bulk pricing</strong> available for orders over 5 cases.
          </div>
          <div>
            <strong>Cold-chain handled</strong> end to end.
          </div>
        </div>
      </div>
    </div>
  );
};
