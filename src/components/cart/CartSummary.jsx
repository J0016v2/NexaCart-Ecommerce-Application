// libs
import { Link } from "react-router";

export default function CartSummary({ totalItems, subtotal }) {
  return (
    <section className="payment-summary">
      <div className="payment-summary-list-wrapper">
        <h2 className="section-title">Order Summary</h2>

        <ul className="payment-summary-list">
          <li>
            <span>Items:</span>
            <span>{totalItems}</span>
          </li>

          <li>
            <span>Subtotal:</span>
            <span className="totals">${subtotal.toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <Link to={"/checkout"} className="checkout-btn">
        Go to Checkout
      </Link>
    </section>
  );
}
