// images
import star from "../../assets/star.png";

export default function ReviewRatingBreakdown({ reviews = [] }) {
  return (
    <ul className="review-rating-breakdown">
      {[5, 4, 3, 2, 1].map((rating) => {
        const ratingCount =
          reviews.filter((review) => {
            return review.rating === rating;
          }).length || 0;

        const totalReviews = reviews.length;

        return (
          <li key={rating}>
            <span>{rating}</span>
            <img src={star} alt="star" />

            <div className="review-rating-bar">
              <div
                className="review-rating-bar-field"
                style={{
                  width: totalReviews
                    ? `${(ratingCount / totalReviews) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>

            <span>{ratingCount}</span>
          </li>
        );
      })}
    </ul>
  );
}
