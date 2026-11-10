// components
import RatingStars from "../common/RatingStars";

export default function RatingFilter({ selectedRating, onChange }) {
  return (
    <div className="listing-rating-filter">
      <h2>Rating</h2>
      <div className="listing-sidebar-rating-container">
        <label>
          <input type="radio" name="rating-filter" checked={selectedRating === 0} onChange={() => onChange(0)} />
          All Ratings
        </label>
        {[5, 4, 3, 2, 1].map((rating) => {
          return (
            <label key={rating}>
              <input type="radio" name="rating-filter" checked={selectedRating === rating} onChange={() => onChange(rating)} />
              <RatingStars rating={rating} count={rating} className="listing-rating-image" emptyStars />
              {rating < 5 && " & Up"}
            </label>
          );
        })}
      </div>
    </div>
  );
}
