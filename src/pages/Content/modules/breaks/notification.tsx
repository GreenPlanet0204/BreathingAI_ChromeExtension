import React, { useEffect, useState } from 'react';
import { AVAILABLE_LANGUAGES } from '../../../../lib/context/App/storage';
import translations from './translation';

export type BreaksNotificationProps = {
  lang: AVAILABLE_LANGUAGES;
  notify: boolean;
  acknowledgeBreak: () => void;
  declineBreak: () => void;
};

const BreaksNotification = ({
  lang,
  notify,
  acknowledgeBreak,
  declineBreak,
}: BreaksNotificationProps) => {
  const [display, setDisplay] = useState(notify);

  useEffect(() => {
    setDisplay(notify);
  }, [notify]);

  const handleClose = () => {
    // Break was declined
    declineBreak();
    setDisplay(false);
  };

  const handleAcknowledgeBreak = () => {
    // Break was acknowledged
    acknowledgeBreak();
    setDisplay(false);
  };

  return display ? (
    <div
      style={{
        pointerEvents: 'all',
        position: 'absolute',
        bottom: '30px',
        left: '50px ',
        borderRadius: '8px',
        background: '#F0D1F1',
        padding: '24px',
      }}
      // className="absolute b-[150px] left-[50px] bg-pinky-200 rounded-lg p-2"
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '12px',
          cursor: 'pointer',
        }}
        onClick={handleClose}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 3.5L3.5 12.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5 12.5L3.5 3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ marginRight: '12px' }}>
          <svg
            width="36"
            height="39"
            viewBox="0 0 36 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32ZM20 36C28.8365 36 36 28.8365 36 20C36 11.1635 28.8365 4 20 4C11.1635 4 4 11.1635 4 20C4 28.8365 11.1635 36 20 36ZM12 38.3358V1.66418C4.93638 4.7504 0 11.7987 0 20C0 28.2013 4.93638 35.2496 12 38.3358ZM19.9852 5.3644e-06H20.0148C20.0098 1.78834e-06 20.0049 0 20 0C19.9951 0 19.9902 1.78834e-06 19.9852 5.3644e-06Z"
              fill="url(#paint0_linear_959_11103)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_959_11103"
                x1="-9.72886e-07"
                y1="38.5"
                x2="36"
                y2="5.93492e-07"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CA68CD" />
                <stop offset="1" stopColor="#30D1D1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h2
          style={{
            color: '#97119C',
            fontWeight: 700,
            fontSize: '16px',
            fontFamily: 'Quicksand',
          }}
        >
          {translations[lang].hey_looks_like_you_could_use_breather}
        </h2>
      </div>

      <p></p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#97119C',
            background: '#fff',
            padding: '8px 32px',
            border: 'none',
            marginRight: '24px',
            borderRadius: '14px',
            fontFamily: 'Quicksand',
          }}
          onClick={() => handleAcknowledgeBreak()}
        >
          {translations[lang].take_break}
        </button>
        <button
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#97119C',
            background: 'transparent',
            padding: '6px 24px',
            border: 'solid 2px #fff',
            borderRadius: '14px',
            fontFamily: 'Quicksand',
          }}
          onClick={() => handleClose()}
        >
          {translations[lang].snooze}
        </button>
      </div>
    </div>
  ) : null;
};

export default BreaksNotification;
