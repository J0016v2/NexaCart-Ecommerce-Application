// libs
import { useEffect, useState } from "react";

// components
import { Link, useParams } from "react-router";
import PageLayout from "../components/layout/PageLayout";
import ProductOverview from "../components/product/ProductOverview";
import ProductSpecifications from "../components/product/ProductSpecifications";
import ProductReviews from "../components/product/ProductReviews";
import ProductRecommendations from "../components/product/ProductRecommendations";
import useAddToCartFeedback from "../components/common/useAddToCartFeedback";

// css
import "./ProductPage.css";

// api
import axiosInstance from "../api/axiosInstance";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sameStoreProducts, setSameStoreProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addedToCart, handleAddToCart, resetFeedback } = useAddToCartFeedback();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setQuantity(1);
        resetFeedback();

        const response = await axiosInstance.get(`/products/${id}`);

        const fetchedData = response.data;

        setProduct(fetchedData);
        setSelectedImage(
          fetchedData.images?.[0] || fetchedData.thumbnail || "",
        );
      } catch (error) {
        console.log(error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, resetFeedback]);

  useEffect(() => {
    if (!product) return;

    const fetchRecommendations = async () => {
      try {
        setSameStoreProducts([]);
        setRelatedProducts([]);

        const response = await axiosInstance.get("/products?limit=0");

        const fetchedData = response.data.products;

        const sameStore = fetchedData
          .filter((item) => {
            return item.brand === product.brand && item.id !== product.id;
          })
          .slice(0, 8);

        const related = fetchedData
          .filter((item) => {
            return item.category === product.category && item.id !== product.id;
          })
          .slice(0, 11);

        setSameStoreProducts(product.brand ? sameStore : []);
        setRelatedProducts(related);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecommendations();
  }, [product]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error || !product) {
    return <p>{error || "Product not found."}</p>;
  }
  return (
    <>
      <title>Product</title>
      <PageLayout>
        <main className="product-detail-page">
          <nav className="breadcrumbs">
            <Link to="/">Home</Link>
            <Link to={`/listing/category/${product.category}`}>{product.category}</Link>
            <span>{product.title}</span>
          </nav>

          <ProductOverview
            product={product}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            quantity={quantity}
            onQuantityChange={setQuantity}
            addedToCart={addedToCart}
            onAddToCart={handleAddToCart}
          />
          <ProductSpecifications product={product} />
          <ProductReviews product={product} />
          <ProductRecommendations sameStoreProducts={sameStoreProducts} relatedProducts={relatedProducts} />
        </main>
      </PageLayout>
    </>
  );
}
