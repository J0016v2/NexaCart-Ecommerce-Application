export default function ProductSpecifications({ product }) {
  return (
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
  );
}
