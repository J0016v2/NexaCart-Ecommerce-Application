// components
import QuantitySelector from "../product/QuantitySelector";

// icons
import { Trash9 } from "reicon-react";

export default function CartItem({ product, onQuantity, onRemove }) {
  return (
    <li className="cart-item">
      <div className="cart-item-product">
        <img
          className="cart-item-image"
          src={product.thumbnail}
          alt={product.title}
        />

        <div className="cart-item-details">
          <h3 className="cart-item-product-name">
            {product.title}
          </h3>

          <span>Variant: </span>
          <span>Standard</span>
        </div>
      </div>

      <QuantitySelector
        variant="cart"
        quantity={product.quantity}
        onChange={(newQuantity) => onQuantity(product.id, newQuantity - product.quantity)}
      />

      <span className="cart-item-price">
        ${(product.price * product.quantity).toFixed(2)}
      </span>

      <button
        className="cart-item-remove-btn"
        onClick={() => onRemove(product.id)}
      >
        <Trash9 weight="Filled" color="#94a3b8" />
      </button>
    </li>
  );
}
