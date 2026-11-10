// libs
import { Routes, Route } from "react-router";

// components
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ListingPage from "./pages/ListingPage/ListingPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrderPage from "./pages/Order/OrderPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import StorePage from "./pages/Store/StorePage";
// css
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category" element={<ListingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/listing/category/:category" element={<ListingPage />} />
        <Route path="/search" element={<ListingPage />} />

        <Route path="/store/:brand" element={<StorePage />} />
      </Routes>
    </>
  );
}

export default App;
