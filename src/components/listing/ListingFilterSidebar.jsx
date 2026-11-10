// components
import CategoryOptions from "./CategoryOptions";
import RatingFilter from "./RatingFilter";
import PriceRangeFilter from "./PriceRangeFilter";

export default function ListingFilterSidebar({
  category,
  search,
  categories,
  isOpen,
  onClose,
  onSelectCategory,
  selectedCategories,
  onToggleCategory,
  selectedRating,
  onChangeRating,
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
  onApplyPrice,
}) {
  return (
    <aside id="listing-sidebar" className={`listing-sidebar ${isOpen ? "open" : ""}`}>
      <div className="listing-sidebar-header">
        <h1>{category ? "CATEGORY FILTER" : "SEARCH FILTER"}</h1>
        <button className="close-filter-btn" onClick={onClose} aria-label="Close filters">&times;</button>
      </div>

      {category && (
        <>
          <h2>All Categories</h2>
          <CategoryOptions
            mode="radio"
            category={category}
            categories={categories}
            onSelectCategory={onSelectCategory}
          />
        </>
      )}

      <RatingFilter selectedRating={selectedRating} onChange={onChangeRating} />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPrice={onMinPrice}
        onMaxPrice={onMaxPrice}
        onApply={onApplyPrice}
      />

      {!category && search.trim() && (
        <div className="listing-category-container">
          <h2>Filter Categories</h2>
          <CategoryOptions
            mode="checkbox"
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={onToggleCategory}
          />
        </div>
      )}
    </aside>
  );
}
