// logo and images
import { Check } from "reicon-react";

// All styling remains in the original ProductCard/ProductPage CSS files.
export default function AddToCartButton({ className, addedToCart, onClick }) {
  return (
    <button
      className={`${className} ${addedToCart ? "added" : ""}`.trim()}
      onClick={onClick}
      disabled={addedToCart}
      type="button"
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
  );
}
