// libs
import { useEffect, useState } from "react";

// components
import PageLayout from "../../components/layout/PageLayout";
import CheckoutStoreSection from "../../components/checkout/CheckoutStoreSection";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import DeliveryAddress from "../../components/checkout/DeliveryAddress";
import VoucherModal from "./VoucherModal";
import ShippingOptionModal from "./ShippingOptionModal";
import OrderCreatedModal from "./OrderCreatedModal";

// css
import "./CheckoutPage.css";

// api
import axiosInstance from "../../api/axiosInstance";

export default function OrderPage() {
  const [cart, setCart] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [voucherModal, setVoucherModal] = useState(false);
  const [shippingOptionModal, setShippingOptionModal] = useState(false);
  const [orderCreatedModal, setOrderCreatedModal] = useState(false);

  const toggleVoucherModal = () => {
    setVoucherModal((prev) => !prev);
  };

  const toggleShippingOptionModal = () => {
    setShippingOptionModal((prev) => !prev);
  };

  const toggleOrderCreatedModal = () => {
    setOrderCreatedModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const cartResponse = await axiosInstance.get("/carts/1");
        const productsResponse = await axiosInstance.get("/products?limit=0");

        const fetchedCart = cartResponse.data;
        const fetchedProducts = productsResponse.data.products;

        setCart(fetchedCart);

        const groupedStores = {};

        fetchedCart.products.forEach((product) => {
          const productDetails = fetchedProducts.find((item) => {
            return item.id === product.id;
          });

          const brand = productDetails?.brand || "No Brand";

          if (!groupedStores[brand]) {
            groupedStores[brand] = [];
          }

          groupedStores[brand].push(product);
        });

        setStores(Object.entries(groupedStores));
      } catch (error) {
        console.log(error);
        setError("Failed to load checkout products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
  }, []);

  // calculate overall order summary
  const totalItems =
    cart?.products.reduce((total, product) => {
      return total + product.quantity;
    }, 0) || 0;

  const subtotal =
    cart?.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0) || 0;

  const totalShipping = stores.length * 95;
  const orderTotal = subtotal + totalShipping;

  return (
    <>
      <title>Cart</title>
      <PageLayout>
        {voucherModal && <VoucherModal toggleVoucherModal={toggleVoucherModal} />}
        {shippingOptionModal && <ShippingOptionModal toggleShippingOptionModal={toggleShippingOptionModal} />}
        {orderCreatedModal && <OrderCreatedModal toggleOrderCreatedModal={toggleOrderCreatedModal} />}
        <main className="checkout-page">
          <section className="checkout">
            <ul className="checkouts-container">
              <li className="checkouts-container-header">
                <p>Products to checkout</p><p>Unit Price</p><p>Quantity</p><p>Subtotal</p>
              </li>
              {loading ? (
                <li>Loading checkout products...</li>
              ) : error ? (
                <li>{error}</li>
              ) : (
                stores.map(([storeName, products]) => {
                  return (
                    <CheckoutStoreSection
                      key={storeName}
                      storeName={storeName}
                      products={products}
                      onVoucher={toggleVoucherModal}
                      onShipping={toggleShippingOptionModal}
                    />
                  );
                })
              )}
            </ul>
          </section>
          <div className="checkout-right-section">
            <DeliveryAddress />
            <CheckoutSummary
              totalItems={totalItems}
              subtotal={subtotal}
              totalShipping={totalShipping}
              orderTotal={orderTotal}
              onCreateOrder={toggleOrderCreatedModal}
            />
          </div>
        </main>
      </PageLayout>
    </>
  );
}
