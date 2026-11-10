// libs
import { Link } from "react-router";
import { useEffect, useState } from "react";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

// logo and images
import { Trash9 } from "reicon-react";

// css
import "./CartPage.css";

// api
import axiosInstance from "../api/axiosInstance";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/carts/1");

        setCart(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // update product quantity
  const handleQuantity = (id, amount) => {
    setCart((previousCart) => {
      const updatedProducts = previousCart.products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(1, product.quantity + amount);

          return {
            ...product,
            quantity: newQuantity,
          };
        }

        return product;
      });

      return {
        ...previousCart,
        products: updatedProducts,
      };
    });
  };

  // remove product from cart
  const handleRemove = (id) => {
    setCart((previousCart) => {
      return {
        ...previousCart,
        products: previousCart.products.filter((product) => {
          return product.id !== id;
        }),
      };
    });
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error || !cart) {
    return <p>{error || "Cart not found."}</p>;
  }

  // calculate order summary
  const totalItems = cart.products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  const subtotal = cart.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <>
      <title>Cart</title>
      <Header />

      <main className="cart-page">
        <section className="cart">
          <h2 className="section-title">Shopping Cart</h2>

          <ul className="cart-item-grid">
            <li className="cart-item-grid-header">
              <p>Product</p>
              <p>Quantity</p>
              <p>Price</p>
            </li>

            {cart.products.map((product) => {
              return (
                <li className="cart-item" key={product.id}>
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

                  <div className="cart-item-quantity-action-wrapper">
                    <button
                      className="cart-item-quantity-action-btn"
                      onClick={() => handleQuantity(product.id, -1)}
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>

                    <span className="cart-item-quantity">
                      {product.quantity}
                    </span>

                    <button
                      className="cart-item-quantity-action-btn"
                      onClick={() => handleQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item-price">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>

                  <button
                    className="cart-item-remove-btn"
                    onClick={() => handleRemove(product.id)}
                  >
                    <Trash9 weight="Filled" color="#94a3b8" />
                  </button>
                </li>
              );
            })}

            {cart.products.length === 0 && (
              <li className="cart-empty">Your cart is empty.</li>
            )}
          </ul>
        </section>

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
      </main>

      <Footer />
    </>
  );
}
