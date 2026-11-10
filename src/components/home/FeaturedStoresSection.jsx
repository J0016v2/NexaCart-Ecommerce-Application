import { Link } from "react-router";

export default function FeaturedStoresSection({ allStores }) {
  return (
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
  );
}
