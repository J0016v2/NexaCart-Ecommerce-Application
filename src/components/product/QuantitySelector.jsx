export default function QuantitySelector({ quantity, onChange, minimum = 1, maximum = Infinity, variant = "product" }) {
  if (variant === "cart") {
    return (
        <div className="cart-item-quantity-action-wrapper">
          <button className="cart-item-quantity-action-btn" onClick={() => onChange(quantity - 1)} disabled={quantity <= minimum}>-</button>
          <span className="cart-item-quantity">{quantity}</span>
          <button className="cart-item-quantity-action-btn" onClick={() => onChange(quantity + 1)} disabled={quantity >= maximum}>+</button>
        </div>
      );
    }
    return (
      <div className="product-count-wrapper">
        <button className="item-count-action" onClick={() => { if (quantity > minimum) onChange(quantity - 1); }}>-</button>
        <span className="product-count">{quantity}</span>
        <button className="item-count-action" onClick={() => { if (quantity < maximum) onChange(quantity + 1); }}>+</button>
      </div>
  );
}
