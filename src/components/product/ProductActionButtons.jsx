// components
import AddToCartButton from "../common/AddToCartButton";

export default function ProductActionButtons({ addedToCart, onAddToCart }) {
  return (
    <>
              <div className="product-overview-action-buttons">
                <button className="product-overview-buy-bttn">Buy Now</button>

                <AddToCartButton className="product-overview-add-to-cart-bttn" addedToCart={addedToCart} onClick={onAddToCart} />
              </div>

              <div className="floating-product-overiew-btn">
                <AddToCartButton className="product-overview-add-to-cart-bttn floating" addedToCart={addedToCart} onClick={onAddToCart} />

                <button className="product-overview-buy-bttn floating">
                  Buy Now
                </button>
              </div>
    </>
  );
}
