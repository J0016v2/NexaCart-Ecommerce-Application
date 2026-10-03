// components
import Header from "../components/Header";
import { useRef } from "react";

// logo and images
import platform from "../assets/platform.png";
import houseappliances from "../assets/houseappliances.png";
import beautyproducts from "../assets/beautyproducts.png";
import snacks from "../assets/snacks.png";
import bags from "../assets/bags.png";
import star from "../assets/star.png";

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
        <h2 className="category-title">Shop Our categories</h2>
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

      <section className="discover">
        <h2 className="discover-title">Explore More, Find More</h2>

        <div className="product-scroll-wrapper">
          <div className="discover-product-grid">
            <div className="product-card">
              <img
                className="product-image"
                src="/products/paperbag.png"
                alt="paperbag"
              />
              <div className="product-title-wrapper">
                <h3 className="product-title">Base Camp Duffel M</h3>
                <p className="product-price">$200.00</p>
              </div>
              <p className="product-overview-description">
                Table with air purifier, stained veneer/black
              </p>
              <div className="rating-wrapper">
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <span className="rating-count">(123)</span>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>

            <div className="product-card">
              <img
                className="product-image"
                src="/products/paperbag.png"
                alt="paperbag"
              />
              <div className="product-title-wrapper">
                <h3 className="product-title">Base Camp Duffel M</h3>
                <p className="product-price">$200.00</p>
              </div>
              <p className="product-overview-description">
                Table with air purifier, stained veneer/black
              </p>
              <div className="rating-wrapper">
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <span className="rating-count">(123)</span>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>

            <div className="product-card">
              <img
                className="product-image"
                src="/products/paperbag.png"
                alt="paperbag"
              />
              <div className="product-title-wrapper">
                <h3 className="product-title">Base Camp Duffel M</h3>
                <p className="product-price">$200.00</p>
              </div>
              <p className="product-overview-description">
                Table with air purifier, stained veneer/black
              </p>
              <div className="rating-wrapper">
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <span className="rating-count">(123)</span>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>

            <div className="product-card">
              <img
                className="product-image"
                src="/products/paperbag.png"
                alt="paperbag"
              />
              <div className="product-title-wrapper">
                <h3 className="product-title">Base Camp Duffel M</h3>
                <p className="product-price">$200.00</p>
              </div>
              <p className="product-overview-description">
                Table with air purifier, stained veneer/black
              </p>
              <div className="rating-wrapper">
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <img className="rating-image" src={star} alt="star" />
                <span className="rating-count">(123)</span>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
