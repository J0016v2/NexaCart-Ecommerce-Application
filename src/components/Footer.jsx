// images and logo

// css
import "./Footer.css";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img className="footer-brand-logo" src="/logo.jpg" alt="" />
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/order">Orders</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <p className="footer-copyright">© 2026 NexaCart. All rights reserved.</p>
    </footer>
  );
}
