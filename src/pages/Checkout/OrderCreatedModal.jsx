// libs
import { Link } from "react-router";

// css
import "./OrderCreatedModal.css";

export default function OrderCreatedModal({ toggleOrderCreatedModal }) {
  return (
    <div className="order-created-modal-overlay">
      <div
        className="order-created-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-created-title"
      >
        <div className="order-created-icon">✓</div>

        <h2 id="order-created-title">Order Created!</h2>

        <p>
          Your order has been placed successfully. Thank you for shopping with
          NexaCart!
        </p>

        <div className="order-created-actions">
          <Link to="/order" className="order-created-view-btn">
            View Orders
          </Link>

          <button
            className="order-created-close-btn"
            onClick={toggleOrderCreatedModal}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
