// libs
import { Link } from "react-router";

// logo and images
import RatingStars from "./common/RatingStars";
import AddToCartButton from "./common/AddToCartButton";
import useAddToCartFeedback from "./common/useAddToCartFeedback";

// css
import "./ProductCard.css";

export default function ProductCard({ className = "", product }) {
  const { addedToCart, handleAddToCart } = useAddToCartFeedback();

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
          <RatingStars rating={product.rating} />

          <span className="rating-count">
            {Number(product.rating || 0).toFixed(1)}
          </span>
        </div>
      </Link>

      <AddToCartButton
        className={`add-to-cart-btn ${className}`}
        addedToCart={addedToCart}
        onClick={handleAddToCart}
      />
    </div>
  );
}
