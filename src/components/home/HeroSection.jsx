// libs
import { Link } from "react-router";

// images
import platform from "../../assets/platform.png";
import houseappliances from "../../assets/houseappliances.png";
import beautyproducts from "../../assets/beautyproducts.png";
import snacks from "../../assets/snacks.png";
import bags from "../../assets/bags.png";

export default function HeroSection() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Shopping And Department Store</h1>
        <p className="hero-description">
          Shopping is a bit of relaxing hobby but sometimes is troubling for
          the bank balance.
        </p>
        <Link to="/listing/category/all" className="hero-button">
          See Products
        </Link>
      </div>

      <div className="hero-product-display-wrapper">
        <img className="display d1" src={bags} alt="hosue appliances" />

        <img
          className="display d2"
          src={houseappliances}
          alt="hosue appliances"
        />
        <img className="display d3" src={snacks} alt="hosue appliances" />
        <img
          className="display d4"
          src={beautyproducts}
          alt="beauty products"
        />

        <img className="platform" src={platform} alt="platform" />
      </div>
    </header>
  );
}
