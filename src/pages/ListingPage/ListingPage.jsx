// libs
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";

// components
import PageLayout from "../../components/layout/PageLayout";
import ProductListing from "../../components/listing/ProductListing";

// api
import axiosInstance from "../../api/axiosInstance";

export default function ListingPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  return (
    <>
      <title>{category === "all" ? "All Products" : category ? `${category} Products` : "Search Products"}</title>
      <PageLayout>
        <ProductListing
          key={`${category || "search"}:${search}`}
          products={products}
          categories={categories}
          category={category}
          search={search}
          loading={loading}
          error={error}
        />
      </PageLayout>
    </>
  );
}
