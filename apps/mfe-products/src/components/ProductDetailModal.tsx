import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Modal,
  QuantityStepper,
  useToast,
} from '@miniecommerce-sysco/mfe-design-system';
import { useCart } from '@miniecommerce-sysco/mfe-domain-cart';
import { formatCurrency } from '@miniecommerce-sysco/shared-code';
import type { Product } from '@miniecommerce-sysco/shared-types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const initials = (name: string): string =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

interface SpecRowProps {
  label: string;
  children: React.ReactNode;
}

const SpecRow: React.FC<SpecRowProps> = ({ label, children }) => (
  <>
    <div className="pd-specs__label">{label}</div>
    <div className="pd-specs__value">{children}</div>
  </>
);

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addItem } = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  // Reset quantity each time a different product is opened
  useEffect(() => {
    if (product) setQty(1);
  }, [product?.id]);

  if (!product) return null;

  const onAdd = async () => {
    setAdding(true);
    try {
      await addItem(product, qty);
      toast.push(
        `${qty} × ${product.name} added to cart`,
        'success'
      );
      onClose();
    } finally {
      setAdding(false);
    }
  };

  const hasSpecs =
    product.origin ||
    product.supplier ||
    product.sku ||
    product.packSize ||
    product.storage ||
    product.shelfLifeDays != null ||
    (product.allergens && product.allergens.length > 0);

  return (
    <Modal isOpen={!!product} onClose={onClose} title={product.name} size="lg">
      <div className="pd-modal">
        <div className="pd-modal__media">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <span aria-hidden="true">{initials(product.name)}</span>
          )}
        </div>

        <div>
          <div className="pd-modal__head">
            {product.category && (
              <span className="pd-modal__category">{product.category}</span>
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                flexWrap: 'wrap',
              }}
            >
              <span className="pd-modal__price">
                {formatCurrency(product.price)}
              </span>
              {product.inStock ? (
                <Badge variant="success">In stock</Badge>
              ) : (
                <Badge variant="outline">Sold out</Badge>
              )}
            </div>
          </div>

          <p className="pd-modal__description">{product.description}</p>

          {hasSpecs && (
            <div className="pd-specs">
              {product.origin && <SpecRow label="Origin">{product.origin}</SpecRow>}
              {product.supplier && (
                <SpecRow label="Supplier">{product.supplier}</SpecRow>
              )}
              {product.sku && <SpecRow label="SKU">{product.sku}</SpecRow>}
              {product.packSize && (
                <SpecRow label="Pack">{product.packSize}</SpecRow>
              )}
              {product.storage && (
                <SpecRow label="Storage">{product.storage}</SpecRow>
              )}
              {product.shelfLifeDays != null && (
                <SpecRow label="Shelf life">
                  {product.shelfLifeDays} days
                </SpecRow>
              )}
              {product.allergens && product.allergens.length > 0 && (
                <SpecRow label="Allergens">
                  <div className="pd-specs__chips">
                    {product.allergens.map((a) => (
                      <Badge key={a} variant="warning">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </SpecRow>
              )}
            </div>
          )}

          <div className="pd-cta">
            <div className="pd-cta__qty">
              <span className="pd-cta__qty-label">Quantity</span>
              <QuantityStepper
                value={qty}
                onChange={setQty}
                min={1}
                max={99}
                size="lg"
                aria-label="Product quantity"
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={onAdd}
              disabled={!product.inStock}
              isLoading={adding}
            >
              {product.inStock
                ? `Add ${qty > 1 ? `${qty} ` : ''}to cart`
                : 'Out of stock'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
