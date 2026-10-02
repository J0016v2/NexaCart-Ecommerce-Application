// libs
import { Routes, Route } from "react-router";

// components
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
// css
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/Category" element={<CategoryPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/Order" element={<OrderPage />} />
        <Route path="/Product" element={<ProductPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
