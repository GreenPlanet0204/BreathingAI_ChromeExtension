import React, { useState } from 'react';
import emptyRating from '/src/assets/icons/whale-rating-empty.svg';
import filledRating from '/src/assets/icons/whale-rating.svg';
import celebrateWhale from '/src/assets/icons/whale-celebration.svg';
export interface IRatingsProps {
  completeBreak: (rating: number) => void;
  showRatings: boolean;
}

const Ratings: React.FC<IRatingsProps> = ({ completeBreak, showRatings }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return showRatings ? (
    <>
      <div
        style={{
          margin: '10px auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={celebrateWhale} alt="rating" className="mx-auto my-5" />
      </div>
      <h3 className="text-center text-lg w-[360px]">
        Thanks for taking a break for yourself! <br />
        Please rate your experience!
      </h3>
      <div className="flex justify-center align-middle my-5">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <img
                src={rating >= index ? filledRating : emptyRating}
                alt="rating"
              />
            </button>
          );
        })}
      </div>
      <div className="flex justify-center align-middle my-">
        <button
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#fff',
            background: '#97119C',
            padding: '6px 24px',
            border: 'solid 2px #fff',
            borderRadius: '14px',
            fontFamily: 'Quicksand',
          }}
          onClick={() => completeBreak(rating)}
        >
          Submit
        </button>
      </div>
    </>
  ) : null;
};

export default Ratings;
