import { useState } from "react";
import '../Star.css';

interface RatingP {
    gameId: string;
    saveRating: (gameId: string, rating: number) => void;
}

const Rating = ( {gameId, saveRating}: RatingP ) => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (ratingNew: number) => {
        setRating(ratingNew);
        saveRating(gameId, ratingNew);
    };

    return (
        <div className="rating">
           {[5, 4, 3, 2, 1].map((value) => (
        <>
        <input
            key={`input-${value}`}
            id={`star-${value}-${gameId}`}
            type="radio"
            name={`rating-${gameId}`}
            value={value}
            checked={rating === value}
            onChange={() => handleRatingChange(value)}
        />
        <label
            key={`label-${value}`}
            htmlFor={`star-${value}-${gameId}`}
        >
            ★
        </label>
    </>
))}

          
        </div>
    );
}

export default Rating;