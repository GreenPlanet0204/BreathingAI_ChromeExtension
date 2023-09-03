import React, { useState } from 'react';
import { CelebrateWhale } from './whales/celebrate';

import { AVAILABLE_LANGUAGES } from '../../../../../../lib/context/App/storage';
import translations from '../../translation';

export interface IRatingsProps {
  completeBreak: (rating: number) => void;
  showRatings: boolean;
  language: AVAILABLE_LANGUAGES;
}

const Ratings: React.FC<IRatingsProps> = ({
  completeBreak,
  showRatings,
  language,
}) => {
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
        <CelebrateWhale />
      </div>
      <h3
        style={{
          textAlign: 'center',
          color: '#000',
          fontFamily: 'Quicksand',
        }}
      >
        {translations[language].ratings_title}
      </h3>
      <div
        style={{
          margin: '10px auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              style={{
                background: 'none',
                border: 'none',
              }}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <img
                src={chrome.runtime.getURL(
                  `/src/assets/icons/whale-rating${
                    index <= (hover || rating) ? '' : '-empty'
                  }.svg`
                )}
                alt=""
              />
            </button>
          );
        })}
      </div>
      <div
        style={{
          margin: '10px auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
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
          {translations[language].submit}
        </button>
      </div>
    </>
  ) : null;
};

export default Ratings;
