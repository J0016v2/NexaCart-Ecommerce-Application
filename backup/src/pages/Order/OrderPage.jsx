// libs
import { Link } from "react-router";
import { useEffect, useState } from "react";

// components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// logo and images
import { Shop5 } from "reicon-react";

// css
import "./OrderPage.css";

// api
import axiosInstance from "../../api/axiosInstance";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const orderStatuses = [
    "To Pay",
    "To Ship",
    "To Receive",
    "Completed",
    "Cancelled",
    "Returned/Refunded",
  ];

  const orderTabs = ["All", ...orderStatuses];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const cartResponse = await axiosInstance.get("/carts?limit=10");
        const productsResponse = await axiosInstance.get("/products?limit=0");

        const fetchedCarts = cartResponse.data.carts;
        const fetchedProducts = productsResponse.data.products;

        const allOrders = [];

        fetchedCarts.forEach((cart) => {
          const groupedStores = {};

          cart.products.forEach((product) => {
            const productDetails = fetchedProducts.find((item) => {
              return item.id === product.id;
            });

            const brand = productDetails?.brand || "No Brand";

            if (!groupedStores[brand]) {
              groupedStores[brand] = [];
            }

            groupedStores[brand].push(product);
          });

          Object.entries(groupedStores).forEach(
            ([storeName, products], index) => {
              const orderStatus =
                orderStatuses[(cart.id + index - 1) % orderStatuses.length];

              const orderTotal = products.reduce((total, product) => {
                return total + product.price * product.quantity;
              }, 0);

              allOrders.push({
                id: `NC-${cart.id}-${index + 1}`,
                storeName: storeName,
                products: products,
                status: orderStatus,
                total: orderTotal,
              });
            },
          );
        });

        setOrders(allOrders);
      } catch (error) {
        console.log(error);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    return selectedTab === "All" || order.status === selectedTab;
  });

  return (
    <>
      <title>My Orders</title>
      <Header />

      <main className="order-page">
        <div className="order-page-wrapper">
          <section className="order-page-tabs">
            {orderTabs.map((tab) => {
              return (
                <label key={tab}>
                  <input
                    type="radio"
                    name="order-tab"
                    value={tab}
                    checked={selectedTab === tab}
                    onChange={() => setSelectedTab(tab)}
                  />

                  <span>{tab}</span>
                </label>
              );
            })}
          </section>

          <section className="orders-container">
            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p>{error}</p>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                return (
                  <div className="order" key={order.id}>
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
                        return (
                          <div
                            className="ordered-item-product"
                            key={product.id}
                          >
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="ordered-item-product-image"
                            />

                            <div className="order-product-item-info-container">
                              <p className="order-product-item-name">
                                {product.title}
                              </p>

                              <span className="ordered-product-item-count">
                                x{product.quantity}
                              </span>
                            </div>

                            <span className="order-product-item-unit-price">
                              ${(product.price * product.quantity).toFixed(2)}
                            </span>
                          </div>
                        );
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
              })
            ) : (
              <p>No orders found under {selectedTab}.</p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
