// components
import ProductCard from "../ProductCard";

// The parent owns the layout class; this only reuses card rendering.
export default function ProductGrid({ products, variant = "" }) {
  return products.map((product) => {
    return <ProductCard key={product.id} className={variant} product={product} />;
  });
}
