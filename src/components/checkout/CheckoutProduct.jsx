export default function CheckoutProduct({ product }) {
  return (
    <div className="checkout-product">
      <div className="checkout-product-details">
        <img className="checkout-item-image" src={product.thumbnail} alt={product.title} />
        <div className="checkout-product-info">
          <h3 className="checkout-product-name">{product.title}</h3>
          <span>Variant: </span>
          <span>Standard</span>
        </div>
      </div>
      <span className="checkout-product-price">
        ${Number(product.price).toFixed(2)}
      </span>
      <div className="count-container">
        <span className="checkout-product-quantity">{product.quantity}</span>
        <span className="count">x</span>
      </div>
      <span className="checkout-product-subtotal">
        ${(product.price * product.quantity).toFixed(2)}
      </span>
    </div>
  );
}
