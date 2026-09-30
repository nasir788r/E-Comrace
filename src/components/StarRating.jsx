import React from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < Math.floor(rating) ? "currentColor" : "none"}
          className={
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }
          strokeWidth={0}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating}/5</span>
    </div>
  );
};

export default StarRating;
