// images
import star from "../../assets/star.png";

export default function StoreProfile({ brand, products, averageRating, following, onFollow }) {
  return (
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
              <p className="store-profile-name">{brand || "No Brand"}</p>
              <ul>
                <li>
                  <img
                    className="store-profile-rating-image"
                    src={star}
                    alt=""
                  />
                  <span>{averageRating.toFixed(1)}</span>
                </li>
                <li>
                  <span>52K</span>
                  <span>Followers</span>
                </li>
                <li>
                  <span>{products.length}</span>
                  <span>products</span>
                </li>
              </ul>
            </div>
          </div>
          <button className="store-profile-follow-btn" onClick={onFollow}>{following ? "✓ Following" : "+ Follow"}</button>
        </div>
      </div>

      <div className="store-statistics">
        <ul>
          <li>
            <img className="stat-logo" src="" alt="" />
            <span>Products:</span>
            <span>{products.length}</span>
          </li>
          <li>
            <img className="stat-logo" src="" alt="" />
            <span>Followers:</span>
            <span>1951</span>
          </li>
          <li>
            <img className="stat-logo" src="" alt="" />
            <span>Ratings</span>
            <span>{averageRating.toFixed(1)} ({products.length} products)</span>
          </li>
          <li>
            <img className="stat-logo" src="" alt="" />
            <span>Joined:</span>
            <span>7 Years Ago</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
