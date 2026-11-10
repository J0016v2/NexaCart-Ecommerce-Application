// components
import ProductGrid from "./ProductGrid";

export default function ProductRecommendations({ sameStoreProducts, relatedProducts }) {
  return (
    <section className="recommendation">
      <div className="same-store">
        <h2 className="recommendation-title">From The Same Store</h2>

        <div className="recommendation-product-grid">
          {sameStoreProducts.length > 0 ? (
            <ProductGrid products={sameStoreProducts} variant="small" />
          ) : (
            <p>No other products from this brand.</p>
          )}
        </div>
      </div>

      <div className="related-products">
        <h2 className="recommendation-title">You may also like</h2>

        <div className="recommendation-product-grid">
          {relatedProducts.length > 0 ? (
            <ProductGrid products={relatedProducts} variant="small" />
          ) : (
            <p>No related products available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
