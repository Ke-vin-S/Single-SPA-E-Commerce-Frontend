import React from 'react';
import { useSelector } from 'react-redux';
import {
  Badge,
  BagIcon,
  UserIcon,
  SearchIcon,
} from '@miniecommerce-sysco/mfe-design-system';
import type { HeaderState } from '@miniecommerce-sysco/shared-types';

interface RootSlice {
  header?: HeaderState;
  auth?: { user?: { name?: string } | null };
  cart?: { itemCount?: number };
}

export const Header: React.FC = () => {
  const header = useSelector((s: RootSlice) => s.header);
  const user = useSelector((s: RootSlice) => s.auth?.user ?? null);
  const itemCount = useSelector((s: RootSlice) => s.cart?.itemCount ?? 0);

  if (!header?.isVisible) return null;

  const pageTitle = header.fields.title?.trim();

  return (
    <header className="shell-header">
      <div className="shell-header__inner">
        <div className="shell-brand-row">
          <a href="/" className="shell-brand" aria-label="Home">
            Shop
          </a>
          {pageTitle && (
            <>
              <span className="shell-divider" aria-hidden="true" />
              <span className="shell-page-title">{pageTitle}</span>
            </>
          )}
        </div>

        {header.showSearch ? (
          <form className="shell-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="shell-search__field">
              <label htmlFor="header-search" className="visually-hidden">
                Search products
              </label>
              <span className="shell-search__icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                id="header-search"
                type="search"
                placeholder="Search products"
                className="shell-search__input"
              />
            </div>
          </form>
        ) : (
          <span />
        )}

        <nav className="shell-nav" aria-label="Primary">
          <a href="/products" className="shell-nav__link">
            Catalog
          </a>
          <a href="/admin" className="shell-nav__link">
            Admin
          </a>

          {header.showUser && (
            <a
              href={user ? '/account' : '/auth/login'}
              aria-label={user?.name ?? 'Sign in'}
              className="ds-icon-button"
            >
              <UserIcon />
            </a>
          )}

          {header.showCart && (
            <a
              href="/checkout"
              aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
              className="ds-icon-button shell-cart"
            >
              <BagIcon />
              {itemCount > 0 && (
                <Badge variant="accent" count>
                  {itemCount}
                </Badge>
              )}
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};
