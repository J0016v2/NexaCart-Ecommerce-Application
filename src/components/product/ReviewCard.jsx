// components
import RatingStars from "../common/RatingStars";

// images
import { Profile } from "reicon-react";

export default function ReviewCard({ review }) {
  return (
    <li className="comment" >
      <div className="comment-header">
        <Profile
          className="user-photo"
          weight="Filled"
          color="#94a3b8"
          size={40}
        />

        <p className="username">{review.reviewerName}</p>

        <span className="comment-time">
          {new Date(review.date).toLocaleDateString()}
        </span>

        <div className="comment-rating-wrapper">
          <span className="comment-rating-count">
            {Number(review.rating).toFixed(1)}
          </span>

          <div className="comment-rating-star-wrapper">
            <RatingStars rating={review.rating} count={review.rating} />
          </div>
        </div>
      </div>

      <p className="comment">{review.comment}</p>
    </li>
  );
}
