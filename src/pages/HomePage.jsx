// components
import Header from "../components/Header";

// logo and images
import platform from "../assets/platform.png";
import houseappliances from "../assets/houseappliances.png";
import beautyproducts from "../assets/beautyproducts.png";
import snacks from "../assets/snacks.png";
import bags from "../assets/bags.png";

// css
import "./Homepage.css";

function HomePage() {
  return (
    <>
      <title>Homepage</title>
      <Header />

      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Shopping And Department Store</h1>
          <p className="hero-description">
            Shopping is a bit of relaxing hobby but sometimes is troubling for
            the bank balance.
          </p>
          <button className="hero-button">See Products</button>
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

      <section className="category">
        <h1 className="category-title">Shop Our categories</h1>
        <div className="category-card-grid">
          <div className="category-card c1">
            <h1 className="category-card-title">Furniture</h1>
          </div>
          <div className="category-card c2 ">
            <h1 className="category-card-title">Books</h1>
          </div>
          <div className="category-card c3">
            <h1 className="category-card-title">Bags</h1>
          </div>
          <div className="category-card c4">
            <h1 className="category-card-title">Appliances</h1>
          </div>
          <div className="category-card c5">
            <h1 className="category-card-title">Beauty</h1>
          </div>
          <div className="category-card c6">
            <h1 className="category-card-title">Snacks</h1>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
