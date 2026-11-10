// libs
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";

// logo and images
import star from "../assets/star.png";
import { Check } from "reicon-react";

// css
import "./ProductCard.css";

export default function ProductCard({ className = "", product }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const timerRef = useRef(null);

  const handleAddToCart = () => {
    setAddedToCart(true);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`product-card ${className}`}>
      <Link to={`/product/${product.id}`}>
        <img
          className="product-image"
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
        />

        <div className={`product-title-wrapper ${className}`}>
          <h3 className={`product-title ${className}`}>{product.title}</h3>

          <p className={`product-price ${className}`}>
            ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <p className={`product-overview-description ${className}`}>
          {product.description}
        </p>

        <div className={`rating-wrapper ${className}`}>
          {Array.from({ length: Math.floor(product.rating || 0) }, (_, i) => {
            return (
              <img key={i} className="rating-image" src={star} alt="star" />
            );
          })}

          <span className="rating-count">
            {Number(product.rating || 0).toFixed(1)}
          </span>
        </div>
      </Link>

      <button
        className={`add-to-cart-btn ${className} ${addedToCart ? "added" : ""}`}
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
  );
}
