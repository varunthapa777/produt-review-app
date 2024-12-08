import { FC } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type RatingStarsProps = {
  rating: number;
};

const RatingStars: FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </>
  );
};

export default RatingStars;
