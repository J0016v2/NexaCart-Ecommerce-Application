// components
import RatingStars from "../common/RatingStars";
import QuantitySelector from "./QuantitySelector";
import ProductActionButtons from "./ProductActionButtons";
import ProductImageGallery from "./ProductImageGallery";

export default function ProductOverview({
  product, selectedImage, onSelectImage, quantity, onQuantityChange, addedToCart, onAddToCart,
}) {
  return (
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
            <RatingStars rating={product.rating} />

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

          <QuantitySelector quantity={quantity} onChange={onQuantityChange} maximum={product.stock} />

          <ProductActionButtons addedToCart={addedToCart} onAddToCart={onAddToCart} />
        </div>
      </div>

      <ProductImageGallery product={product} selectedImage={selectedImage} onSelectImage={onSelectImage} />
    </section>
  );
}
