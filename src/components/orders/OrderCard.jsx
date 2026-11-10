// libs
import { Link } from "react-router";

// components
import OrderProduct from "./OrderProduct";

// icons
import { Shop5 } from "reicon-react";

export default function OrderCard({ order }) {
  return (
    <div className="order">
      <div className="order-item-header">
        <Shop5 color="#399a69" />

        <p className="order-item-store-name">{order.storeName}</p>

        {order.storeName !== "No Brand" && (
          <Link
            to={`/store/${encodeURIComponent(order.storeName)}`}
          >
            <button>View Shop</button>
          </Link>
        )}

        <span className="order-item-status">{order.status}</span>
      </div>

      <div className="ordered-item-products-container">
        {order.products.map((product) => {
          return <OrderProduct key={product.id} product={product} />;
        })}
      </div>

      <div className="order-store-section-footer">
        <div className="order-store-section-footerowrapper">
          <div className="ordered-item-total-price-container">
            <p>Order Total:</p>

            <span>${order.total.toFixed(2)}</span>
          </div>

          <div className="order-store-section-actions">
            {order.status === "Completed" && (
              <button className="order-rate-btn">Rate</button>
            )}

            <button className="order-btn">Contact Seller</button>

            <button className="order-btn">Buy Again</button>
          </div>
        </div>

        <div className="order-id-wrapper">
          <span>Order ID: </span>
          <span>{order.id}</span>
        </div>
      </div>
    </div>
  );
}
