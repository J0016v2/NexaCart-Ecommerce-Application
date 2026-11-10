import { Link } from "react-router";
import ProductGrid from "../product/ProductGrid";

export default function DiscoverSection({ products }) {
  return (
    <section className="discover">
      <div className="discover-heading">
        <h2 className="discover-title">Explore More, Find More</h2>

        <Link to="/listing/category/all">View All Products</Link>
      </div>

      <div className="product-scroll-wrapper">
        <div className="discover-product-grid">
          <ProductGrid products={products.slice(0, 10)} />
        </div>
      </div>
    </section>
  );
}
