export default function CategoryOptions({ categories, category = undefined, selectedCategories = [], onSelectCategory = () => {}, onToggleCategory = () => {}, mode }) {
  return (
    <div className="listing-sidebar-category-options-container">
      {mode === "radio" && (
        <label>
          <input
            type="radio"
            name="category"
            checked={category === "all"}
            onChange={() => onSelectCategory("all")}
          />
          All
        </label>
      )}
      {categories.map((item) => {
        return (
          <label key={item.slug}>
            <input
              type={mode}
              name={mode === "radio" ? "category" : undefined}
              checked={mode === "radio" ? category === item.slug : selectedCategories.includes(item.slug)}
              onChange={() => mode === "radio" ? onSelectCategory(item.slug) : onToggleCategory(item.slug)}
            />
            {item.name}
          </label>
        );
      })}
    </div>
  );
}
