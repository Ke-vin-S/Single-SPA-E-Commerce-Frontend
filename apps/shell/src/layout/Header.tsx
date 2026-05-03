import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Badge,
  BagIcon,
  UserIcon,
  SearchIcon,
} from '@miniecommerce-sysco/mfe-design-system';
import { authManager } from '@miniecommerce-sysco/mfe-domain-auth';
import type { HeaderState } from '@miniecommerce-sysco/shared-types';

interface RootSlice {
  header?: HeaderState;
  auth?: { user?: { firstName?: string; lastName?: string; name?: string } | null };
  cart?: { itemCount?: number };
}

interface UserInfo {
  firstName?: string;
  lastName?: string;
  name?: string;
}

const displayName = (user: UserInfo | null): string => {
  if (!user) return 'Sign in';
  if (user.name) return user.name;
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Account';
};

export const Header: React.FC = () => {
  const header = useSelector((s: RootSlice) => s.header);
  const user = useSelector((s: RootSlice) => s.auth?.user ?? null);
  const itemCount = useSelector((s: RootSlice) => s.cart?.itemCount ?? 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!header?.isVisible) return null;

  const pageTitle = header.fields.title?.trim();

  const handleLogout = async () => {
    setMenuOpen(false);
    await authManager.logout();
    window.location.assign('/');
  };

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
          <a href="/orders" className="shell-nav__link">
            Orders
          </a>
          <a href="/admin" className="shell-nav__link">
            Admin
          </a>

          {header.showUser && (
            <div ref={menuRef} className="shell-user-menu">
              {user ? (
                <>
                  <button
                    className="shell-nav__link shell-user-toggle"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                  >
                    <UserIcon />
                    {displayName(user)}
                  </button>
                  {menuOpen && (
                    <div className="shell-user-dropdown">
                      <a href="/account" className="shell-user-dropdown__item">
                        Account settings
                      </a>
                      <button
                        className="shell-user-dropdown__item"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <a href="/auth/login" className="shell-nav__link">
                  <UserIcon />
                  Sign in
                </a>
              )}
            </div>
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
