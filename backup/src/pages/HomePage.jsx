// libs

import { Link } from "react-router";
import { useEffect, useState } from "react";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

// logo and images
import platform from "../assets/platform.png";
import houseappliances from "../assets/houseappliances.png";
import beautyproducts from "../assets/beautyproducts.png";
import snacks from "../assets/snacks.png";
import bags from "../assets/bags.png";

// css
import "./Homepage.css";

// api
import axiosInstance from "../api/axiosInstance";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get("/products?limit=0");

        const fetchedData = response.data.products;

        const shuffledData = [...fetchedData].sort(() => Math.random() - 0.5);

        setProducts(shuffledData);

        const stores = [
          ...new Set(shuffledData.map((product) => product.brand)),
        ];
        setAllStores(stores);

        const allCategory = [
          ...new Set(shuffledData.map((product) => product.category)),
        ];

        setCategory(allCategory);

        console.log(allCategory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

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
          <Link to="/products" className="hero-button">
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

      <section className="category">
        <div className="category-heading">
          <h2 className="category-title">Shop Our categories</h2>

          <Link to="/listing/category/all" className="view-all-categories">
            View All Categories →
          </Link>
        </div>

        <div className="category-card-grid">
          {categories.slice(0, 6).map((cat, index) => {
            return (
              <Link
                to={`/listing/category/${cat}`}
                className={`category-card c${index + 1}`}
                key={cat}
              >
                <h1 className="category-card-title">{cat}</h1>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="discover">
        <div className="discover-heading">
          <h2 className="discover-title">Explore More, Find More</h2>

          <Link to="/listing/category/all">View All Products</Link>
        </div>

        <div className="product-scroll-wrapper">
          <div className="discover-product-grid">
            {products.slice(0, 10).map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </section>

      <section className="store">
        <h2 className="store-title">Stores You’ll Love</h2>
        <div className="store-grid">
          {allStores.slice(1, 9).map((store) => {
            return (
              <Link
                to={`/store/${encodeURIComponent(store)}`}
                className="store-card"
                key={store}
              >
                <img
                  className="store-profile"
                  src="/brand/coke.png"
                  alt="seller"
                />
                <h3 className="store-name">{store}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
