// libs
import { useState } from "react";
import { useNavigate } from "react-router";

// components
import ProductGrid from "../product/ProductGrid";
import ListingFilterSidebar from "./ListingFilterSidebar";
import ListingSortControls from "./ListingSortControls";
import Pagination from "./Pagination";

// images and logo

// css
import "../../pages/ListingPage/ListingPage.css";

export default function ProductListing({
  products = [],
  categories = [],
  category,
  search = "",
  title = "",
  loading = false,
  error = "",
}) {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  // category navigation
  const handleCategory = (slug) => {
    if (slug === "all") {
      navigate("/listing/category/all");
    } else {
      navigate(`/listing/category/${slug}`);
    }

    setIsFilterOpen(false);
  };

  const handleClearSearch = () => {
    navigate("/listing/category/all");
  };

  // category checkbox filter
  const handleCategoryFilter = (slug) => {
    setSelectedCategories((previousCategories) => {
      if (previousCategories.includes(slug)) {
        return previousCategories.filter((item) => {
          return item !== slug;
        });
      }

      return [...previousCategories, slug];
    });

    setCurrentPage(1);
  };

  // price range
  const handlePriceRange = () => {
    setPriceRange({
      min: minPrice,
      max: maxPrice,
    });

    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  // product filtering
  const filteredProducts = products.filter((product) => {
    const ratingMatch = product.rating >= selectedRating;

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const minPriceMatch =
      priceRange.min === "" || product.price >= Number(priceRange.min);

    const maxPriceMatch =
      priceRange.max === "" || product.price <= Number(priceRange.max);

    return ratingMatch && categoryMatch && minPriceMatch && maxPriceMatch;
  });

  // product sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "high") {
      return b.price - a.price;
    }

    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "latest") {
      return b.id - a.id;
    }

    return b.rating - a.rating;
  });

  // pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );
  return (
    <main className="listing-layout">
      {isFilterOpen && (
        <button
          className="filter-overlay"
          onClick={() => setIsFilterOpen(false)}
          aria-label="Close filters"
        />
      )}

      <ListingFilterSidebar
        category={category}
        search={search}
        categories={categories}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSelectCategory={handleCategory}
        selectedCategories={selectedCategories}
        onToggleCategory={handleCategoryFilter}
        selectedRating={selectedRating}
        onChangeRating={(rating) => { setSelectedRating(rating); setCurrentPage(1); }}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPrice={setMinPrice}
        onMaxPrice={setMaxPrice}
        onApplyPrice={handlePriceRange}
      />

      <section className="listing-content">
        <div className="listing-results-header">
          <h2>
            {title || (category === "all"
              ? "All Products"
              : category
                ? category.replaceAll("-", " ")
                : search
                  ? `Search results for "${search}"`
                  : "All Products")}

            {search && (
              <button
                className="clear-search-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
                type="button"
              >
                &times;
              </button>
            )}
          </h2>

          <p>{sortedProducts.length} products found</p>
        </div>

        <ListingSortControls
          isFilterOpen={isFilterOpen}
          onOpenFilter={() => setIsFilterOpen(true)}
          sort={sort}
          onSortChange={(value) => { setSort(value); setCurrentPage(1); }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <div className="listing-product-container">
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>{error}</p>
          ) : paginatedProducts.length > 0 ? (
            <ProductGrid products={paginatedProducts} variant="list" />
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>
    </main>
  );
}
