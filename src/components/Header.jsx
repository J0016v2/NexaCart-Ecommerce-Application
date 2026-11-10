// libs
import { Link, useNavigate } from "react-router";
import { useState } from "react";

// images and icons
import {
  Call,
  Profile,
  SearchNormal2,
  ShoppingCart,
  Menu4,
} from "reicon-react";
// css
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      <div className="header">
        <div className="top-section">
          <div className="left-section">
            <Call color="#ffffff" size={15} />
            <p>+00000000000</p>
          </div>

          <div className="middle-section">
            <p>Get 100% off on Selected Items | Shop now</p>
          </div>
          <div className="right-section">
            <select name="language" id="language">
              <option value="eng">English</option>
              <option value="fil">Filipino</option>
            </select>
          </div>
        </div>

        <div className="lower-section">
          <div className="left-section">
            <Link to={"/"}>
              <img className="logo" src="/logo.jpg" alt="logos" />
            </Link>
          </div>

          <div className="right-section">
            <form className="search-container" onSubmit={handleSearch}>
              <input
                className="search-field"
                type="text"
                id="searchField"
                placeholder="Search Product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="submit"
                className="search-submit-btn"
                aria-label="Search products"
              >
                <SearchNormal2 className="search-logo" color="#145936" />
              </button>
            </form>

            <Link to={"/cart"}>
              <div className="cart-container">
                <ShoppingCart
                  className="cart-logo"
                  size={30}
                  weight="filled"
                  color="#145936"
                />
                <p className="cart-counter">10</p>
              </div>
            </Link>
            <div className="profile-container">
              <Profile className="profile-logo" color="#145936" />
              <p className="profile-text">Account</p>
            </div>

            <Menu4 className="burger-menu" size={30} color="#145936" />
          </div>
        </div>
      </div>
    </>
  );
}
