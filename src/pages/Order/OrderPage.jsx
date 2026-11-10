// libs
import { useEffect, useState } from "react";

// components
import PageLayout from "../../components/layout/PageLayout";
import OrderTabs from "../../components/orders/OrderTabs";
import OrderCard from "../../components/orders/OrderCard";

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
      <PageLayout>
        <main className="order-page">
          <div className="order-page-wrapper">
            <OrderTabs orderTabs={orderTabs} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
            <section className="orders-container">
              {loading ? (
                <p>Loading orders...</p>
              ) : error ? (
                <p>{error}</p>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  return <OrderCard key={order.id} order={order} />;
                })
              ) : (
                <p>No orders found under {selectedTab}.</p>
              )}
            </section>
          </div>
        </main>
      </PageLayout>
    </>
  );
}
