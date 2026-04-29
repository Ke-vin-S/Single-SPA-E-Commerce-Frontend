import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  EmptyState,
  PackageIcon,
  Pagination,
} from '@miniecommerce-sysco/mfe-design-system';
import { useDebounce } from '@miniecommerce-sysco/shared-code';
import type { Product } from '@miniecommerce-sysco/shared-types';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { ProductDetailModal } from '../components/ProductDetailModal';

const updateHeaderFields = (payload: { title?: string; subtitle?: string }) => ({
  type: 'header/updateHeaderFields',
  payload,
});

const setHeaderVisibility = (payload: boolean) => ({
  type: 'header/setHeaderVisibility',
  payload,
});

// Local fallback catalogue used until the API is wired up.
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Roma Tomatoes',
    price: 24.99,
    description: 'Vine-ripened Roma tomatoes, ideal for sauces and dicing. 25 lb case.',
    inStock: true,
    category: 'Produce',
    origin: 'Sinaloa, Mexico',
    supplier: 'Pacific Sun Growers',
    sku: 'PRD-RT-25LB',
    packSize: '25 lb case',
    storage: 'Refrigerated 50–55°F',
    shelfLifeDays: 10,
  },
  {
    id: '2',
    name: 'Iceberg Lettuce',
    price: 18.5,
    description: 'Crisp whole heads, hand-trimmed. 24-count case.',
    inStock: true,
    category: 'Produce',
    origin: 'Salinas Valley, California',
    supplier: 'Coastal Fields Co-op',
    sku: 'PRD-IL-24CT',
    packSize: '24-count case',
    storage: 'Refrigerated 34–38°F',
    shelfLifeDays: 14,
  },
  {
    id: '3',
    name: 'Yellow Onions',
    price: 14.75,
    description: 'Medium-size yellow onions, all-purpose. 50 lb sack.',
    inStock: true,
    category: 'Produce',
    origin: 'Walla Walla, Washington',
    supplier: 'Cascadia Farms',
    sku: 'PRD-YO-50LB',
    packSize: '50 lb sack',
    storage: 'Cool dry storage 45–55°F',
    shelfLifeDays: 60,
  },
  {
    id: '4',
    name: 'Boneless Chicken Breast',
    price: 89.0,
    description: 'Grade-A boneless skinless breast, individually quick-frozen. 40 lb case.',
    inStock: true,
    category: 'Meat & Poultry',
    origin: 'Springdale, Arkansas',
    supplier: 'Heritage Poultry Co.',
    sku: 'POU-BCB-40LB',
    packSize: '40 lb case (10 × 4 lb bags)',
    storage: 'Frozen 0°F or below',
    shelfLifeDays: 365,
  },
  {
    id: '5',
    name: 'Ground Beef 80/20',
    price: 112.5,
    description: 'Fresh ground chuck, 80% lean. 10 lb chub, four per case.',
    inStock: true,
    category: 'Meat & Poultry',
    origin: 'Greeley, Colorado',
    supplier: 'High Plains Beef',
    sku: 'BEF-GB80-40LB',
    packSize: '40 lb case (4 × 10 lb chubs)',
    storage: 'Refrigerated 28–32°F',
    shelfLifeDays: 7,
  },
  {
    id: '6',
    name: 'Choice Ribeye Steaks',
    price: 189.0,
    description: 'USDA Choice, 12 oz portion-cut. 10-count tray.',
    inStock: false,
    category: 'Meat & Poultry',
    origin: 'Omaha, Nebraska',
    supplier: 'Prime Cut Meats',
    sku: 'BEF-RB12-10CT',
    packSize: '10-count tray, 12 oz each',
    storage: 'Refrigerated 28–32°F',
    shelfLifeDays: 21,
  },
  {
    id: '7',
    name: 'Atlantic Salmon Fillet',
    price: 145.0,
    description: 'Skin-on, pin-bone-out. Fresh, 10 lb case.',
    inStock: true,
    category: 'Seafood',
    origin: 'Bay of Fundy, Canada',
    supplier: 'North Atlantic Aquaculture',
    sku: 'SEA-AS-10LB',
    packSize: '10 lb case',
    storage: 'Refrigerated 30–34°F on ice',
    shelfLifeDays: 5,
    allergens: ['Fish'],
  },
  {
    id: '8',
    name: 'Jumbo Shrimp 16/20',
    price: 98.5,
    description: 'Peeled and deveined, tail-on. IQF, 5 lb bag.',
    inStock: true,
    category: 'Seafood',
    origin: 'Gulf of Thailand',
    supplier: 'Pacific Catch Co.',
    sku: 'SEA-JS-5LB',
    packSize: '5 lb bag, IQF',
    storage: 'Frozen 0°F or below',
    shelfLifeDays: 540,
    allergens: ['Shellfish'],
  },
  {
    id: '9',
    name: 'Large Grade-A Eggs',
    price: 42.0,
    description: 'Cage-free brown eggs, 15-dozen case.',
    inStock: true,
    category: 'Dairy & Eggs',
    origin: 'Lancaster, Pennsylvania',
    supplier: 'Sunrise Family Farms',
    sku: 'EGG-LA-15DZ',
    packSize: '15-dozen case (180 ct)',
    storage: 'Refrigerated 33–40°F',
    shelfLifeDays: 30,
    allergens: ['Egg'],
  },
  {
    id: '10',
    name: 'Salted Butter',
    price: 68.75,
    description: 'Sweet cream salted butter, 1 lb bricks. 36-count case.',
    inStock: true,
    category: 'Dairy & Eggs',
    origin: 'Wisconsin, USA',
    supplier: 'Lakeside Creameries',
    sku: 'DAI-SB-36CT',
    packSize: '36 × 1 lb bricks',
    storage: 'Refrigerated 33–40°F',
    shelfLifeDays: 90,
    allergens: ['Milk'],
  },
  {
    id: '11',
    name: 'Brioche Burger Buns',
    price: 32.0,
    description: 'Sliced 4-inch brioche buns, par-baked. 48-count case.',
    inStock: true,
    category: 'Bakery',
    origin: 'Brooklyn, New York',
    supplier: 'Borough Bakers',
    sku: 'BAK-BB4-48CT',
    packSize: '48-count case (8 × 6-pack)',
    storage: 'Frozen until use',
    shelfLifeDays: 60,
    allergens: ['Wheat', 'Egg', 'Milk', 'Soy'],
  },
  {
    id: '12',
    name: 'Extra Virgin Olive Oil',
    price: 58.0,
    description: 'First cold-pressed, single-origin Spanish. 3 L tin.',
    inStock: true,
    category: 'Pantry',
    origin: 'Andalusia, Spain',
    supplier: 'Olivar del Sur',
    sku: 'PAN-EVOO-3L',
    packSize: '3 L tin',
    storage: 'Cool dry storage, away from light',
    shelfLifeDays: 540,
  },
];

const PAGE_SIZE = 8;

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 250);

  const openDetails = useCallback((p: Product) => setActiveProduct(p), []);
  const closeDetails = useCallback(() => setActiveProduct(null), []);

  useEffect(() => {
    dispatch(updateHeaderFields({ title: 'Catalog', subtitle: '' }));
    dispatch(setHeaderVisibility(true));
    return () => {
      dispatch(updateHeaderFields({ title: '', subtitle: '' }));
    };
  }, [dispatch]);

  const categories = useMemo(
    () =>
      Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.category ?? ''))).filter(
        Boolean
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return SAMPLE_PRODUCTS.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [debouncedQuery, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, category]);

  const onPageChange = useCallback((next: number) => {
    setPage(next);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <div className="products-toolbar">
        <ProductFilter
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
      </div>

      <div className="products-meta">
        <span>
          {filtered.length === 0
            ? '0 products'
            : `Showing ${pageStart + 1}–${pageStart + pageItems.length} of ${filtered.length}`}
        </span>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="products-grid">
            {pageItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={openDetails}
              />
            ))}
          </div>
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <EmptyState
          icon={<PackageIcon size={48} />}
          title="No products match"
          description="Try clearing the filters or searching for something else."
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery('');
                setCategory('');
              }}
            >
              Clear filters
            </Button>
          }
        />
      )}

      <ProductDetailModal product={activeProduct} onClose={closeDetails} />
    </div>
  );
};
