import React from "react";
import "../Star.css";

interface ReadOnlyRatingProps {
  rating: number; 
}

const ReadOnlyRating: React.FC<ReadOnlyRatingProps> = ({ rating }) => {
  return (
    <div className="rating read-only">
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} className={value <= rating ? "star filled" : "star"}>★</span>
      ))}
    </div>
  );
};

export default ReadOnlyRating;
