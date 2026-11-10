// images and logo

// css
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img className="footer-brand-logo" src="/logo.jpg" alt="" />
      </div>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/orders">Orders</a>
        <a href="/cart">Cart</a>
        <a href="/profile">Profile</a>
      </div>

      <p className="footer-copyright">© 2026 NexaCart. All rights reserved.</p>
    </footer>
  );
}
