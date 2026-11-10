// components
import RatingStars from "../common/RatingStars";
import ReviewRatingBreakdown from "./ReviewRatingBreakdown";
import ReviewCard from "./ReviewCard";

export default function ProductReviews({ product }) {
  return (
    <section className="review">
      <h2>Customer Reviews</h2>

      <div className="review-rating-wrapper">
        <div className="review-average-rating-wrapper">
          <h3 className="average-rating-count">
            {Number(product.rating).toFixed(1)}
          </h3>

          <div className="average-star-wrapper">
            <RatingStars rating={product.rating} count={Math.round(product.rating || 0)} className="" />
          </div>

          <span className="total-reviews-count">
            ({product.reviews?.length || 0}) reviews
          </span>
        </div>

        <ReviewRatingBreakdown reviews={product.reviews || []} />
      </div>

      <ul className="review-comment-wrapper">
        {product.reviews?.map((review, index) => {
          return <ReviewCard key={index} review={review} />;
        })}
      </ul>
    </section>
  );
}
