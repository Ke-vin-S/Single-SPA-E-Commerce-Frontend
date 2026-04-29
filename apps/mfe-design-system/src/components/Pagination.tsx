import React from 'react';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages to show on each side of the current page. Default 1. */
  siblings?: number;
}

type PageItem = number | 'ellipsis-left' | 'ellipsis-right';

const buildPages = (
  page: number,
  total: number,
  siblings: number
): PageItem[] => {
  // If small enough, show every page.
  const totalNumbers = siblings * 2 + 5; // first + last + current + 2 ellipses + 2 siblings
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, total - 1);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  const items: PageItem[] = [1];
  if (showLeftEllipsis) items.push('ellipsis-left');
  for (let i = left; i <= right; i++) items.push(i);
  if (showRightEllipsis) items.push('ellipsis-right');
  items.push(total);
  return items;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
}) => {
  if (pageCount <= 1) return null;

  const items = buildPages(page, pageCount, siblings);
  const goto = (n: number) => {
    if (n < 1 || n > pageCount || n === page) return;
    onPageChange(n);
  };

  return (
    <nav className="ds-pagination" role="navigation" aria-label="Pagination">
      <button
        type="button"
        className="ds-pagination__page ds-pagination__page--nav"
        onClick={() => goto(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>

      {items.map((item, idx) =>
        typeof item === 'number' ? (
          <button
            key={item}
            type="button"
            className="ds-pagination__page"
            aria-current={item === page ? 'page' : undefined}
            aria-label={`Page ${item}`}
            onClick={() => goto(item)}
          >
            {item}
          </button>
        ) : (
          <span key={`${item}-${idx}`} className="ds-pagination__ellipsis" aria-hidden="true">
            …
          </span>
        )
      )}

      <button
        type="button"
        className="ds-pagination__page ds-pagination__page--nav"
        onClick={() => goto(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        Next ›
      </button>
    </nav>
  );
};
