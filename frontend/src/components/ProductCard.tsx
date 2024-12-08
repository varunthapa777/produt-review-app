import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  rating,
}) => {
  const renderStars = () => {
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

  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden min-h-full"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="mt-5">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {truncateName(name, 40)}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">₹{price}</p>
        {rating > 0 ? (
          <div className="flex items-center mt-2">
            {renderStars()}
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              {rating.toFixed(1)}
            </span>
          </div>
        ) : (
          <span className="text-gray-600 dark:text-gray-400">
            No ratings yet
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
