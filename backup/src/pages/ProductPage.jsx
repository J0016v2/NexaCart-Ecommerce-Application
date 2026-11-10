// libs
import { Link, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// logo and images
import star from "../assets/star.png";
import { Check, Profile } from "reicon-react";

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
  const [addedToCart, setAddedToCart] = useState(false);
  const addedTimerRef = useRef(null);

  const handleAddToCart = () => {
    setAddedToCart(true);

    clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(addedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setQuantity(1);
        setAddedToCart(false);
        clearTimeout(addedTimerRef.current);

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
  }, [id]);

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
      <Header />
      <main className="product-detail-page">
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          <Link to={`/listing/category/${product.category}`}>
            {product.category}
          </Link>
          <span>{product.title}</span>
        </nav>

        <section className="product-overview">
          <div className="product-overview-images">
            <img
              className="product-overview-main-image"
              src={selectedImage}
              alt={product.title}
            />

            <div className="product-overview-details">
              <h1 className="product-overview-title">{product.title}</h1>

              <p className="product-overview-description">
                {product.description}
              </p>

              <div className="product-overview-rating-wrapper">
                {Array.from(
                  { length: Math.floor(product.rating || 0) },
                  (_, i) => {
                    return (
                      <img
                        key={i}
                        className="rating-image"
                        src={star}
                        alt="star"
                      />
                    );
                  },
                )}

                <span className="rating-count">
                  {Number(product.rating || 0).toFixed(1)}
                </span>
              </div>

              <h2 className="product-overview-price">
                ${Number(product.price).toFixed(2)}
              </h2>

              <h2 className="variant-title">Product Variants</h2>

              <div className="product-overview-variant-options">
                <label>
                  <input
                    type="radio"
                    name="product-variant"
                    value="standard"
                    defaultChecked
                  />
                  Standard
                </label>
              </div>

              <div className="product-count-wrapper">
                <button
                  className="item-count-action"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>

                <span className="product-count">{quantity}</span>

                <button
                  className="item-count-action"
                  onClick={() => {
                    if (quantity < product.stock) {
                      setQuantity(quantity + 1);
                    }
                  }}
                >
                  +
                </button>
              </div>

              <div className="product-overview-action-buttons">
                <button className="product-overview-buy-bttn">Buy Now</button>

                <button
                  className={`product-overview-add-to-cart-bttn ${addedToCart ? "added" : ""}`}
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added!
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>

              <div className="floating-product-overiew-btn">
                <button
                  className={`product-overview-add-to-cart-bttn floating ${addedToCart ? "added" : ""}`}
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added!
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button className="product-overview-buy-bttn floating">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="product-overview-image-grid">
            {product.images?.map((image, index) => {
              return (
                <label
                  className="product-image-option"
                  key={index}
                  onClick={() => setSelectedImage(image)}
                >
                  <input
                    type="radio"
                    name="product-image-option"
                    checked={selectedImage === image}
                    onChange={() => setSelectedImage(image)}
                  />

                  <img
                    className="product-overview-variant-image"
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                  />
                </label>
              );
            })}
          </div>
        </section>

        <section className="product-full-specification">
          <h2 className="product-full-specification-title">
            {product.title} Full Specifications
          </h2>

          <div className="product-specification-wrapper">
            <div className="product-general-details">
              <h3>General</h3>

              <ul className="product-detail-list">
                <li>
                  <span>Brand:</span>
                  <span>{product.brand || "No Brand"}</span>
                </li>

                <li>
                  <span>Category:</span>
                  <span>{product.category}</span>
                </li>

                <li>
                  <span>SKU:</span>
                  <span>{product.sku}</span>
                </li>

                <li>
                  <span>Price:</span>
                  <span>${Number(product.price).toFixed(2)}</span>
                </li>

                <li>
                  <span>Stock:</span>
                  <span>{product.stock}</span>
                </li>

                <li>
                  <span>Availability:</span>
                  <span>{product.availabilityStatus}</span>
                </li>
              </ul>
            </div>

            <div className="product-details">
              <h3>Product Details</h3>

              <ul className="product-detail-list">
                <li>
                  <span>Weight:</span>
                  <span>{product.weight ?? "N/A"}</span>
                </li>

                <li>
                  <span>Dimensions:</span>
                  <span>
                    {product.dimensions
                      ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
                      : "N/A"}
                  </span>
                </li>

                <li>
                  <span>Warranty:</span>
                  <span>{product.warrantyInformation || "N/A"}</span>
                </li>

                <li>
                  <span>Shipping:</span>
                  <span>{product.shippingInformation || "N/A"}</span>
                </li>

                <li>
                  <span>Return Policy:</span>
                  <span>{product.returnPolicy || "N/A"}</span>
                </li>

                <li>
                  <span>Minimum Order:</span>
                  <span>{product.minimumOrderQuantity || 1}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="review">
          <h2>Customer Reviews</h2>

          <div className="review-rating-wrapper">
            <div className="review-average-rating-wrapper">
              <h3 className="average-rating-count">
                {Number(product.rating).toFixed(1)}
              </h3>

              <div className="average-star-wrapper">
                {Array.from(
                  { length: Math.round(product.rating || 0) },
                  (_, i) => {
                    return <img key={i} src={star} alt="star" />;
                  },
                )}
              </div>

              <span className="total-reviews-count">
                ({product.reviews?.length || 0}) reviews
              </span>
            </div>

            <ul className="review-rating-breakdown">
              {[5, 4, 3, 2, 1].map((rating) => {
                const ratingCount =
                  product.reviews?.filter((review) => {
                    return review.rating === rating;
                  }).length || 0;

                const totalReviews = product.reviews?.length || 0;

                return (
                  <li key={rating}>
                    <span>{rating}</span>
                    <img src={star} alt="star" />

                    <div className="review-rating-bar">
                      <div
                        className="review-rating-bar-field"
                        style={{
                          width: totalReviews
                            ? `${(ratingCount / totalReviews) * 100}%`
                            : "0%",
                        }}
                      ></div>
                    </div>

                    <span>{ratingCount}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="review-comment-wrapper">
            {product.reviews?.map((review, index) => {
              return (
                <li className="comment" key={index}>
                  <div className="comment-header">
                    <Profile
                      className="user-photo"
                      weight="Filled"
                      color="#94a3b8"
                      size={40}
                    />

                    <p className="username">{review.reviewerName}</p>

                    <span className="comment-time">
                      {new Date(review.date).toLocaleDateString()}
                    </span>

                    <div className="comment-rating-wrapper">
                      <span className="comment-rating-count">
                        {Number(review.rating).toFixed(1)}
                      </span>

                      <div className="comment-rating-star-wrapper">
                        {Array.from({ length: review.rating }, (_, i) => {
                          return <img key={i} src={star} alt="star" />;
                        })}
                      </div>
                    </div>
                  </div>

                  <p className="comment">{review.comment}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="recommendation">
          <div className="same-store">
            <h2 className="recommendation-title">From The Same Store</h2>

            <div className="recommendation-product-grid">
              {sameStoreProducts.length > 0 ? (
                sameStoreProducts.map((item) => {
                  return (
                    <ProductCard
                      className="small"
                      key={item.id}
                      product={item}
                    />
                  );
                })
              ) : (
                <p>No other products from this brand.</p>
              )}
            </div>
          </div>

          <div className="related-products">
            <h2 className="recommendation-title">You may also like</h2>

            <div className="recommendation-product-grid">
              {relatedProducts.length > 0 ? (
                relatedProducts.map((item) => {
                  return (
                    <ProductCard
                      className="small"
                      key={item.id}
                      product={item}
                    />
                  );
                })
              ) : (
                <p>No related products available.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
