export default function CheckoutSummary({ totalItems, subtotal, totalShipping, orderTotal, onCreateOrder }) {
  return (
    <section className="payment-summarys">
      <div className="payment-summary-list-wrapper">
        <h2 className="section-title">Order Summary</h2>

        <ul className="payment-summary-list">
          <li>
            <span>Items ({totalItems}):</span>
            <span>${subtotal.toFixed(2)}</span>
          </li>

          <li>
            <span>Shipping & Handling:</span>
            <span>${totalShipping.toFixed(2)}</span>
          </li>

          <li>
            <span>Total before tax:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </li>

          <li>
            <span>Order Total:</span>
            <span className="total">${orderTotal.toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="checkout-btn-container">
        <button
          className="checkout-btn"
          onClick={onCreateOrder}
        >
          Create Order
        </button>
      </div>
    </section>
  );
}
