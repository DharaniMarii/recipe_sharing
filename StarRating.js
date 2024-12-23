import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { rateRecipe } from '../utils/api';

export default function StarRating({ initialRating = 0, recipeId }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRating = async (ratingValue) => {
    setRating(ratingValue);
    try {
      await rateRecipe(recipeId, ratingValue);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <FaStar
            key={index}
            className="cursor-pointer"
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size={24}
            onClick={() => handleRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
}
