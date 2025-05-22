import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starNumber = index + 1;
    if (rating >= starNumber) {
      return <FaStar key={index} color="gold" />;
    } else if (rating >= starNumber - 0.5) {
      return <FaStarHalfAlt key={index} color="gold" />;
    } else {
      return <FaRegStar key={index} color="gold" />;
    }
  });

  return <div style={{ display: "flex", gap: "4px" }}>{stars}</div>;
};

export default StarRating;
