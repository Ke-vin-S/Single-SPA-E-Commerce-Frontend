import { registerApplication, start, type LifeCycles } from 'single-spa';

const loadModule = (name: string): Promise<LifeCycles> =>
  import(/* webpackIgnore: true */ /* @vite-ignore */ name) as Promise<LifeCycles>;

const pathStartsWith = (...prefixes: string[]) =>
  (location: Location) =>
    prefixes.some((p) => location.pathname.startsWith(p));

export const registerMicroFrontends = (): void => {
  // Domain MFEs always-active so reducers stay registered + hooks work everywhere.
  // Auth is route-scoped because it owns UI on /auth/* and would otherwise collide
  // with feature MFEs on #mfe-content. Its reducer is injected on first activation.
  registerApplication({
    name: '@miniecommerce-sysco/mfe-domain-auth',
    app: () => loadModule('@miniecommerce-sysco/mfe-domain-auth'),
    activeWhen: pathStartsWith('/auth'),
    customProps: { domElement: document.getElementById('mfe-content') },
  });

  registerApplication({
    name: '@miniecommerce-sysco/mfe-domain-cart',
    app: () => loadModule('@miniecommerce-sysco/mfe-domain-cart'),
    activeWhen: () => true,
  });

  registerApplication({
    name: '@miniecommerce-sysco/mfe-domain-user',
    app: () => loadModule('@miniecommerce-sysco/mfe-domain-user'),
    activeWhen: () => true,
  });

  // Feature MFEs route-based.
  // Products owns "/" and "/products*". The "/" must be exact — pathStartsWith("/")
  // would match every path including "/checkout" and cause a mount collision on
  // #mfe-content with the checkout MFE.
  registerApplication({
    name: '@miniecommerce-sysco/mfe-products',
    app: () => loadModule('@miniecommerce-sysco/mfe-products'),
    activeWhen: (location) =>
      location.pathname === '/' || location.pathname.startsWith('/products'),
    customProps: { domElement: document.getElementById('mfe-content') },
  });

  registerApplication({
    name: '@miniecommerce-sysco/mfe-checkout',
    app: () => loadModule('@miniecommerce-sysco/mfe-checkout'),
    activeWhen: pathStartsWith('/checkout', '/cart'),
    customProps: { domElement: document.getElementById('mfe-content') },
  });

  registerApplication({
    name: '@miniecommerce-sysco/mfe-admin',
    app: () => loadModule('@miniecommerce-sysco/mfe-admin'),
    activeWhen: pathStartsWith('/admin'),
    customProps: { domElement: document.getElementById('mfe-content') },
  });

  start({ urlRerouteOnly: true });
};
