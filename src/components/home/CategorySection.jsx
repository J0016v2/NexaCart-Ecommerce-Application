import { Link } from "react-router";

export default function CategorySection({ categories }) {
  return (
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
  );
}
