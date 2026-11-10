// libs
import { useEffect, useState } from "react";

// components
import PageLayout from "../components/layout/PageLayout";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

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
      <PageLayout>
        <main className="cart-page">
          <section className="cart">
            <h2 className="section-title">Shopping Cart</h2>
            <ul className="cart-item-grid">
              <li className="cart-item-grid-header">
                <p>Product</p><p>Quantity</p><p>Price</p>
              </li>
              {cart.products.map((product) => {
                return <CartItem key={product.id} product={product} onQuantity={handleQuantity} onRemove={handleRemove} />;
              })}
              {cart.products.length === 0 && <li className="cart-empty">Your cart is empty.</li>}
            </ul>
          </section>
          <CartSummary totalItems={totalItems} subtotal={subtotal} />
        </main>
      </PageLayout>
    </>
  );
}
