export default function PriceRangeFilter({ minPrice, maxPrice, onMinPrice, onMaxPrice, onApply }) {
  return (
    <div className="listing-sidebar-price-range-filter">
      <h2>Price Range</h2>
      <div className="listing-sidebar-price-range-container">
        <input
          className="listing-price-range-input"
          type="number"
          id="min-price"
          placeholder="min price"
          min="0"
          value={minPrice}
          onChange={(e) => onMinPrice(e.target.value)}
        />
        <span></span>
        <input
          className="listing-price-range-input"
          type="number"
          id="max-price"
          placeholder="max price"
          min="0"
          value={maxPrice}
          onChange={(e) => onMaxPrice(e.target.value)}
        />
      </div>
      <button className="apply-price-range-btn" onClick={onApply}>APPLY</button>
    </div>
  );
}
