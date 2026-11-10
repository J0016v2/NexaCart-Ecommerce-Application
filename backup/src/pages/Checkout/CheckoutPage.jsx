// libs
import { useEffect, useState } from "react";
import { Link } from "react-router";

// components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VoucherModal from "./VoucherModal";
import ShippingOptionModal from "./ShippingOptionModal";

import OrderCreatedModal from "./OrderCreatedModal";

// logo and images
import { LocationAlt, Shop5, TicketAlt, TruckFast } from "reicon-react";

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
      <Header />

      {/* modals */}
      {voucherModal && <VoucherModal toggleVoucherModal={toggleVoucherModal} />}
      {shippingOptionModal && (
        <ShippingOptionModal
          toggleShippingOptionModal={toggleShippingOptionModal}
        />
      )}
      {orderCreatedModal && (
        <OrderCreatedModal toggleOrderCreatedModal={toggleOrderCreatedModal} />
      )}

      <main className="checkout-page">
        <section className="checkout">
          <ul className="checkouts-container">
            <li className="checkouts-container-header">
              <p>Products to checkout</p>
              <p>Unit Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </li>

            {loading ? (
              <li>Loading checkout products...</li>
            ) : error ? (
              <li>{error}</li>
            ) : (
              stores.map(([storeName, products]) => {
                const storeItems = products.reduce((total, product) => {
                  return total + product.quantity;
                }, 0);

                const storeSubtotal = products.reduce((total, product) => {
                  return total + product.price * product.quantity;
                }, 0);

                const shippingFee = 95;
                const storeTotal = storeSubtotal + shippingFee;

                return (
                  <li className="checkout-wrapper" key={storeName}>
                    <div className="store-details-wrapper">
                      <Shop5 color="#145936" />
                      <span>{storeName}</span>
                    </div>

                    <div className="checkout-products-container">
                      {products.map((product) => {
                        return (
                          <div className="checkout-product" key={product.id}>
                            <div className="checkout-product-details">
                              <img
                                className="checkout-item-image"
                                src={product.thumbnail}
                                alt={product.title}
                              />

                              <div className="checkout-product-info">
                                <h3 className="checkout-product-name">
                                  {product.title}
                                </h3>

                                <span>Variant: </span>
                                <span>Standard</span>
                              </div>
                            </div>

                            <span className="checkout-product-price">
                              ${Number(product.price).toFixed(2)}
                            </span>

                            <div className="count-container">
                              <span className="checkout-product-quantity">
                                {product.quantity}
                              </span>

                              <span className="count">x</span>
                            </div>

                            <span className="checkout-product-subtotal">
                              ${(product.price * product.quantity).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="checkout-options">
                      <div className="voucher-wrapper">
                        <TicketAlt weight="Filled" color="#068043" />

                        <p>Shop Voucher</p>

                        <button
                          className="select-voucher-btn"
                          onClick={toggleVoucherModal}
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
                              onClick={toggleShippingOptionModal}
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
              })
            )}
          </ul>
        </section>

        <div className="checkout-right-section">
          <section className="address">
            <div className="address-header">
              <LocationAlt weight="Filled" color="#145936" />
              <h2>Delivery</h2>
            </div>
            <div className="delivery-details">
              <div className="reciever-details">
                <span className="reciever-name">Justine Leonardo</span>
                <span className="reciever-contact-number">+639320679300</span>
                <button className="change-address-btn">Change</button>
              </div>
              <p className="street-address">0079 M. Roxas Street</p>
              <p className="location-details">
                Taal, Bocaue, North Luzon, Bulacan 3018
              </p>
            </div>
          </section>

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
                onClick={toggleOrderCreatedModal}
              >
                Create Order
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
