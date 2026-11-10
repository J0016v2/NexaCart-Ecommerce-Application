// libs
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";

// components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

// images and logo
import { Filter3 } from "reicon-react";
import star from "../../assets/star.png";
import hollowedStar from "../../assets/hollowedstar.png";

// css
import "./ListingPage.css";

// api
import axiosInstance from "../../api/axiosInstance";

export default function ListingPage({ showHeader = true }) {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productsPerPage = 12;

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        setProducts([]);

        let endpoint = "/products?limit=0";

        if (category && category !== "all") {
          endpoint = `/products/category/${encodeURIComponent(category)}?limit=0`;
        } else if (search.trim()) {
          endpoint = `/products/search?q=${encodeURIComponent(search)}&limit=0`;
        }

        const response = await axiosInstance.get(endpoint);

        if (!cancelled) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log(error);

        if (!cancelled) {
          setError("Failed to load products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [category, search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/products/categories");

        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedRating(0);
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setPriceRange({ min: "", max: "" });
    setSort("popular");
    setCurrentPage(1);
    setIsFilterOpen(false);
  }, [category, search]);

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
    <>
      <title>
        {category === "all"
          ? "All Products"
          : category
            ? `${category} Products`
            : "Search Products"}
      </title>

      {showHeader && <Header />}

      <main className="listing-layout">
        {isFilterOpen && (
          <button
            className="filter-overlay"
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filters"
          />
        )}

        <aside
          id="listing-sidebar"
          className={`listing-sidebar ${isFilterOpen ? "open" : ""}`}
        >
          <div className="listing-sidebar-header">
            <h1>{category ? "CATEGORY FILTER" : "SEARCH FILTER"}</h1>

            <button
              className="close-filter-btn"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            >
              &times;
            </button>
          </div>

          {category && (
            <>
              <h2>All Categories</h2>

              <div className="listing-sidebar-category-options-container">
                <label>
                  <input
                    type="radio"
                    name="category"
                    checked={category === "all"}
                    onChange={() => handleCategory("all")}
                  />
                  All
                </label>

                {categories.map((item) => {
                  return (
                    <label key={item.slug}>
                      <input
                        type="radio"
                        name="category"
                        checked={category === item.slug}
                        onChange={() => handleCategory(item.slug)}
                      />
                      {item.name}
                    </label>
                  );
                })}
              </div>
            </>
          )}

          <div className="listing-rating-filter">
            <h2>Rating</h2>

            <div className="listing-sidebar-rating-container">
              <label>
                <input
                  type="radio"
                  name="rating-filter"
                  checked={selectedRating === 0}
                  onChange={() => {
                    setSelectedRating(0);
                    setCurrentPage(1);
                  }}
                />
                All Ratings
              </label>

              {[5, 4, 3, 2, 1].map((rating) => {
                return (
                  <label key={rating}>
                    <input
                      type="radio"
                      name="rating-filter"
                      checked={selectedRating === rating}
                      onChange={() => {
                        setSelectedRating(rating);
                        setCurrentPage(1);
                      }}
                    />

                    {Array.from({ length: 5 }, (_, i) => {
                      return (
                        <img
                          key={i}
                          className="listing-rating-image"
                          src={i < rating ? star : hollowedStar}
                          alt=""
                        />
                      );
                    })}

                    {rating < 5 && " & Up"}
                  </label>
                );
              })}
            </div>
          </div>

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
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <span></span>

              <input
                className="listing-price-range-input"
                type="number"
                id="max-price"
                placeholder="max price"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <button
              className="apply-price-range-btn"
              onClick={handlePriceRange}
            >
              APPLY
            </button>
          </div>

          {!category && search.trim() && (
            <div className="listing-category-container">
              <h2>Filter Categories</h2>

              <div className="listing-sidebar-category-options-container">
                {categories.map((item) => {
                  return (
                    <label key={item.slug}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(item.slug)}
                        onChange={() => handleCategoryFilter(item.slug)}
                      />
                      {item.name}
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        <section className="listing-content">
          <div className="listing-results-header">
            <h2>
              {category === "all"
                ? "All Products"
                : category
                  ? category.replaceAll("-", " ")
                  : search
                    ? `Search results for "${search}"`
                    : "All Products"}

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

          <aside className="listing-content-control">
            <button
              className="filter-tray-btn"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Open filters"
              aria-expanded={isFilterOpen}
              aria-controls="listing-sidebar"
            >
              <Filter3 color="#08ac0a" />
            </button>

            <select
              className="listing-sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
              <option value="high">High to low Price</option>
              <option value="low">Low to High Price</option>
            </select>

            <div className="mini-pagination-control">
              <button
                aria-label="Previous page"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ‹
              </button>

              <span>
                {currentPage} / {Math.max(1, totalPages)}
              </span>

              <button
                aria-label="Next page"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ›
              </button>
            </div>
          </aside>

          <div className="listing-product-container">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => {
                return (
                  <ProductCard
                    className="list"
                    key={product.id}
                    product={product}
                  />
                );
              })
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="listing-bottom-pagination">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
