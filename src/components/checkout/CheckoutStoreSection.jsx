// components
import CheckoutProduct from "./CheckoutProduct";

// icons
import { Shop5, TicketAlt, TruckFast } from "reicon-react";

export default function CheckoutStoreSection({ storeName, products, onVoucher, onShipping }) {
  const storeItems = products.reduce((total, product) => total + product.quantity, 0);
  const storeSubtotal = products.reduce((total, product) => total + product.price * product.quantity, 0);
  const shippingFee = 95;
  const storeTotal = storeSubtotal + shippingFee;

  return (
    <li className="checkout-wrapper">
      <div className="store-details-wrapper">
        <Shop5 color="#145936" />
        <span>{storeName}</span>
      </div>

      <div className="checkout-products-container">
        {products.map((product) => {
          return <CheckoutProduct key={product.id} product={product} />;
        })}
      </div>

      <div className="checkout-options">
        <div className="voucher-wrapper">
          <TicketAlt weight="Filled" color="#068043" />

          <p>Shop Voucher</p>

          <button
            className="select-voucher-btn"
            onClick={onVoucher}
          >
            Select Voucher
          </button>
        </div>

        <div className="shipping-option-wrapper">
          <p>Shipping Option:</p>

          <div className="shipping-option">
            <div className="shipping-option-header">
              <TruckFast weight="Filled" color="#068043" />

              <span className="estimated-delivery-arrival">
                Tomorrow
              </span>

              <button
                className="shipping-option-change-btn"
                onClick={onShipping}
              >
                Change
              </button>

              <span className="shipping-fee-display">
                ${shippingFee.toFixed(2)}
              </span>
            </div>

            <p className="checkout-notice">
              Order before Tomorrow 3pm
            </p>

            <p className="delivery-standard-display">
              Next-day Delivery
            </p>

            <p className="voucher-refund-policy">
              Get up to $40 voucher if checkout arrives late
            </p>
          </div>
        </div>
      </div>

      <div className="checkout-footer">
        <p className="checkout-total-label">
          Order Total ({storeItems} Items):
        </p>

        <span className="checkout-subtotal">
          ${storeTotal.toFixed(2)}
        </span>
      </div>
    </li>
  );
}
