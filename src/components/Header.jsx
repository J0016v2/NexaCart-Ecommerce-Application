// images and icons
import { Call, Profile, SearchNormal2, ShoppingCart } from "reicon-react";
// css
import "./Header.css";

export default function Header() {
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
            <img className="logo" src="/logo.jpg" alt="logos" />
          </div>

          <div className="middle-section">
            <input
              className="search-field"
              type="text"
              id="searchField"
              placeholder="Search Product"
            />
            <SearchNormal2 color="#145936" />
          </div>

          <div className="right-section">
            <div className="cart-container">
              <ShoppingCart size={30} weight="filled" color="#145936" />
              <p className="cart-counter">10</p>
            </div>
            <div className="profile-container">
              <Profile color="#145936" />
              <p>Account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
