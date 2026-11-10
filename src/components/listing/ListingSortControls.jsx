// components
import Pagination from "./Pagination";

// icons
import { Filter3 } from "reicon-react";

export default function ListingSortControls({ isFilterOpen, onOpenFilter, sort, onSortChange, currentPage, totalPages, onPageChange }) {
  return (
    <aside className="listing-content-control">
      <button
        className="filter-tray-btn"
        onClick={onOpenFilter}
        aria-label="Open filters"
        aria-expanded={isFilterOpen}
        aria-controls="listing-sidebar"
      >
        <Filter3 color="#08ac0a" />
      </button>
      <select className="listing-sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="popular">Popular</option>
        <option value="latest">Latest</option>
        <option value="high">High to low Price</option>
        <option value="low">Low to High Price</option>
      </select>
      <Pagination variant="mini" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </aside>
  );
}
