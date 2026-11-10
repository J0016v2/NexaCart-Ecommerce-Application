// libs
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// components
import PageLayout from "../../components/layout/PageLayout";
import ProductListing from "../../components/listing/ProductListing";
import StoreProfile from "../../components/store/StoreProfile";

// css
import "./StorePage.css";

// api
import axiosInstance from "../../api/axiosInstance";

export default function StorePage() {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchStoreProducts = async () => {
      try {
        setLoading(true);
        setError("");
        setProducts([]);
        const response = await axiosInstance.get("/products?limit=0");
        const storeProducts = response.data.products.filter((product) => {
          return product.brand === brand;
        });
        if (!cancelled) setProducts(storeProducts);
      } catch (error) {
        console.log(error);
        if (!cancelled) setError("Failed to load store products.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchStoreProducts();
    return () => { cancelled = true; };
  }, [brand]);

  const averageRating = products.length
    ? products.reduce((sum, product) => sum + Number(product.rating || 0), 0) / products.length
    : 0;

  return (
    <>
      <title>{brand || "Store"}</title>
      <PageLayout>
        <main className="store-page">
          <StoreProfile
            brand={brand}
            products={products}
            averageRating={averageRating}
            following={following}
            onFollow={() => setFollowing((previous) => !previous)}
          />
          <section className="store-products">
            <ProductListing
              key={brand}
              products={products}
              loading={loading}
              error={error}
              title={`${brand || "Store"} Products`}
            />
          </section>
        </main>
      </PageLayout>
    </>
  );
}
