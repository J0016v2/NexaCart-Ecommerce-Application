export default function OrderProduct({ product }) {
  return (
    <div className="ordered-item-product">
      <img src={product.thumbnail} alt={product.title} className="ordered-item-product-image" />
      <div className="order-product-item-info-container">
        <p className="order-product-item-name">{product.title}</p>
        <span className="ordered-product-item-count">x{product.quantity}</span>
      </div>
      <span className="order-product-item-unit-price">
        ${(product.price * product.quantity).toFixed(2)}
      </span>
    </div>
  );
}
