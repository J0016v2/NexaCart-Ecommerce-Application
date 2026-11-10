// components
import Header from "./../../components/Header";
import ListingPage from "../ListingPage/ListingPage";

// images
import star from "../../assets/star.png";

// css
import "./StorePage.css";

export default function StorePage() {
  return (
    <>
      <Header />
      <main className="store-page">
        {/* store info */}
        <section className="store-info">
          <div className="store-profile-wrapper">
            <div className="store-profile-container">
              <div>
                <img
                  className="store-profile-photo"
                  src="https://dynamic.brandcrowd.com/asset/logo/b9177736-9891-493b-bf7f-efb11f823d83/logo-search-grid-2x?logoTemplateVersion=5&v=639173880535900000&layout=auto-1-1"
                  alt=""
                />
                <div className="store-details-container">
                  <p className="store-profile-name">J-Tech</p>
                  <ul>
                    <li>
                      <img
                        className="store-profile-rating-image"
                        src={star}
                        alt=""
                      />
                      <span>4.6</span>
                    </li>
                    <li>
                      <span>52K</span>
                      <span>Followers</span>
                    </li>
                    <li>
                      <span>2354</span>
                      <span>products</span>
                    </li>
                  </ul>
                </div>
              </div>
              <button className="store-profile-follow-btn">+ Follow</button>
            </div>
          </div>

          <div className="store-statistics">
            <ul>
              <li>
                <img className="stat-logo" src="" alt="" />
                <span>Products:</span>
                <span>352</span>
              </li>
              <li>
                <img className="stat-logo" src="" alt="" />
                <span>Followers:</span>
                <span>1951</span>
              </li>
              <li>
                <img className="stat-logo" src="" alt="" />
                <span>Ratings</span>
                <span>4.9(2134 Rating)</span>
              </li>
              <li>
                <img className="stat-logo" src="" alt="" />
                <span>Joined:</span>
                <span>7 Years Ago</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="store-products">
          <ListingPage showHeader={false} />
        </section>
      </main>
    </>
  );
}
