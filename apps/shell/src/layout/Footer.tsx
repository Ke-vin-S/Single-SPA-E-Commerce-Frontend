import React from 'react';

export const Footer: React.FC = () => (
  <footer className="shell-footer">
    <div className="shell-footer__bottom">
      © {new Date().getFullYear()} Sysco Mini Ecommerce. All rights reserved.
    </div>
  </footer>
);
