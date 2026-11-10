// logo and images
import star from "../../assets/star.png";
import hollowedStar from "../../assets/hollowedstar.png";

export default function RatingStars({ rating = 0, count = undefined, className = "rating-image", emptyStars = false }) {
  const filledCount = Math.max(0, Math.min(5, count ?? Math.floor(rating || 0)));
  const total = emptyStars ? 5 : filledCount;

  return (
    <>
      {Array.from({ length: total }, (_, i) => {
        return (
          <img
            key={i}
            className={className}
            src={i < filledCount ? star : hollowedStar}
            alt="star"
          />
        );
      })}
    </>
  );
}
