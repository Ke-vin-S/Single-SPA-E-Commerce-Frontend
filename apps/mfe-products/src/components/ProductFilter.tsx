import React from 'react';
import { Input, Select } from '@miniecommerce-sysco/mfe-design-system';

interface ProductFilterProps {
  query: string;
  onQueryChange: (q: string) => void;
  category: string;
  onCategoryChange: (c: string) => void;
  categories: string[];
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  categories,
}) => (
  <div className="product-filter">
    <Input
      label="Search"
      placeholder="What are you looking for?"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
    <Select
      label="Category"
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
      options={[
        { value: '', label: 'All categories' },
        ...categories.map((c) => ({ value: c, label: c })),
      ]}
    />
  </div>
);
