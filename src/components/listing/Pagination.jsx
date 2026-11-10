export default function Pagination({ currentPage, totalPages, onPageChange, variant = "bottom" }) {
  if (variant === "mini") {
    return (
      <div className="mini-pagination-control">
        <button aria-label="Previous page" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>‹</button>
        <span>{currentPage} / {Math.max(1, totalPages)}</span>
        <button aria-label="Next page" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>›</button>
      </div>
    );
  }

  if (totalPages <= 1) return null;

  return (
    <div className="listing-bottom-pagination">
      <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  );
}
