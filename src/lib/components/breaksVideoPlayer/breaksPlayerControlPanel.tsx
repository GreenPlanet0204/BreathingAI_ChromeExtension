import React, { useState } from 'react';

import './breakPlayerControlPanel.css';
import { toMinutesAndSeconds } from '../../utils/helpers/time';

export interface BreaksVideoPlayerControlPanelModel {
  playing: boolean;
  handlePause: () => void;
  handlePlay: () => void;
  volume: number;
  handleVolumeChange: (e: any) => void;
  totalDurationOfVideo: number;
  handleSeekChange: (e: any) => void;
  currentSeek: number;
}

const BreaksVideoPlayerControlPanel = (
  props: BreaksVideoPlayerControlPanelModel
) => {
  const { totalDurationOfVideo, currentSeek } = props;
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  const handleInputChange = (e: any) => {
    let target = e.target;
    if (e.target.type !== 'range') {
      target = document.getElementById('playrange');
    }
    const min = target.min;
    const max = target.max;
    const val = currentSeek;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
  };

  const updateRange = (newVal: number) => {
    let target: any = document.getElementById('playrange');
    const min = target?.min || 0;
    const max = target?.max || 0;
    const val = newVal;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
  };

  let target = document.getElementById('playrange');
  target?.addEventListener('input', handleInputChange);

  React.useEffect(() => {
    updateRange(currentSeek);
  }, [currentSeek]);

  // This function will be triggered when the mouse pointer is over the button
  const boxMouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowVolumeBar(true);
  };

  // This function will be triggered when the mouse pointer is moving out the box
  const boxMouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowVolumeBar(false);
  };

  return (
    <div style={{ marginTop: '4px' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          textAlign: 'center',
          width: '100%',
          height: 'calc(100% - 70px)',
        }}
      >
        {props.playing && (
          <p
            onClick={props.handlePause}
            // className='m-0 flex items-center justify-center w-full h-full cursor-pointer'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            {' '}
          </p>
        )}
        {!props.playing && (
          <div
            onClick={props.handlePlay}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.9"
                cx="40"
                cy="40"
                r="40"
                fill="url(#paint0_linear_1400_5058)"
              />
              <path
                d="M55.5168 37.3237C56.045 37.6145 56.4855 38.0418 56.7922 38.5608C57.099 39.0799 57.2608 39.6718 57.2608 40.2747C57.2608 40.8777 57.099 41.4696 56.7922 41.9886C56.4855 42.5077 56.045 42.9349 55.5168 43.2257L33.0588 55.5732C32.5458 55.8549 31.9683 55.9981 31.3831 55.9886C30.7979 55.9792 30.2253 55.8175 29.7216 55.5194C29.218 55.2214 28.8006 54.7972 28.5108 54.2888C28.2209 53.7804 28.0685 53.2052 28.0686 52.6199V27.9295C28.0687 27.3442 28.2213 26.7689 28.5115 26.2605C28.8016 25.752 29.2192 25.328 29.7232 25.0301C30.2271 24.7323 30.7999 24.5709 31.3853 24.5618C31.9706 24.5528 32.5481 24.6964 33.061 24.9785L55.5191 37.3237H55.5168Z"
                fill="#4D5A6C"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1400_5058"
                  x1="40"
                  y1="0"
                  x2="40"
                  y2="80"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFFBFF" />
                  <stop offset="0.505208" stopColor="#F9D7FA" />
                  <stop offset="1" stopColor="#F0D1F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>

      <div
        className="custom-player-controller-video-progress row m-0 justify-content-center align-self-center"
        style={{
          margin: 0,
        }}
      >
        <input
          id="playrange"
          type="range"
          min={0}
          max={props.totalDurationOfVideo}
          onInput={(e) => props.handleSeekChange(e)}
          value={props.currentSeek}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            color: '#092447',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          {toMinutesAndSeconds(props.currentSeek)} /{' '}
          {toMinutesAndSeconds(totalDurationOfVideo)}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseOver={boxMouseOverHandler}
          onMouseOut={boxMouseOutHandler}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {props.volume > 50 && (
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="16"
                  height="16"
                  transform="translate(0 0.49585)"
                  fill="white"
                />
                <path
                  d="M9.71875 2.04589C9.63471 2.00534 9.541 1.98912 9.44822 1.99906C9.35544 2.009 9.26729 2.04471 9.19375 2.10214L4.83125 5.49589H2C1.73478 5.49589 1.48043 5.60124 1.29289 5.78878C1.10536 5.97632 1 6.23067 1 6.49589V10.4959C1 10.7611 1.10536 11.0155 1.29289 11.203C1.48043 11.3905 1.73478 11.4959 2 11.4959H4.83125L9.19375 14.8896C9.28143 14.9577 9.38903 14.995 9.5 14.9959C9.57565 14.995 9.65022 14.9779 9.71875 14.9459C9.80313 14.9048 9.87426 14.8409 9.924 14.7613C9.97374 14.6817 10.0001 14.5897 10 14.4959V2.49589C10.0001 2.40204 9.97374 2.31008 9.924 2.2305C9.87426 2.15092 9.80313 2.08694 9.71875 2.04589ZM2 6.49589H4.5V10.4959H2V6.49589ZM13 8.49589C13.0003 8.82429 12.9358 9.14952 12.8103 9.45301C12.6849 9.7565 12.5008 10.0323 12.2688 10.2646C12.1728 10.3564 12.0453 10.4078 11.9125 10.4084C11.7815 10.4082 11.6558 10.3566 11.5625 10.2646C11.5154 10.2187 11.4781 10.1637 11.4525 10.1031C11.427 10.0424 11.4138 9.97731 11.4138 9.91151C11.4138 9.84572 11.427 9.78058 11.4525 9.71994C11.4781 9.6593 11.5154 9.60437 11.5625 9.55839C11.8434 9.27612 12.0011 8.89411 12.0011 8.49589C12.0011 8.09767 11.8434 7.71565 11.5625 7.43339C11.5154 7.3874 11.4781 7.33247 11.4525 7.27183C11.427 7.21119 11.4138 7.14606 11.4138 7.08026C11.4138 7.01447 11.427 6.94933 11.4525 6.88869C11.4781 6.82805 11.5154 6.77312 11.5625 6.72714C11.6562 6.63363 11.7832 6.58112 11.9156 6.58112C12.048 6.58112 12.175 6.63363 12.2688 6.72714C12.5008 6.95948 12.6849 7.23527 12.8103 7.53876C12.9358 7.84225 13.0003 8.16749 13 8.49589Z"
                  fill="#1D2B49"
                />
              </svg>
            )}
            {props.volume == 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16px"
                height="16px"
                viewBox="0 0 20 20"
                version="1.1"
              >
                <g id="surface1">
                  <path
                    style={{
                      stroke: 'none',
                      fillRule: 'nonzero',
                      fill: '#1D2B49',
                      fillOpacity: 1,
                    }}
                    d="M 15.710938 0.71875 C 15.710938 0.445312 15.554688 0.1875 15.3125 0.0742188 C 15.054688 -0.0546875 14.769531 -0.0117188 14.554688 0.160156 L 8.226562 5.203125 L 15.710938 12.6875 Z M 15.710938 0.71875 "
                  />
                  <path
                    style={{
                      stroke: 'none',
                      fillRule: 'nonzero',
                      fill: '#1D2B49',
                      fillOpacity: 1,
                    }}
                    d="M 19.789062 18.78125 L 1.222656 0.210938 C 0.941406 -0.0664062 0.488281 -0.0664062 0.210938 0.210938 C -0.0664062 0.492188 -0.0664062 0.941406 0.210938 1.222656 L 4.703125 5.714844 L 4.285156 5.714844 C 3.84375 5.714844 3.457031 5.917969 3.199219 6.230469 C 2.984375 6.472656 2.859375 6.800781 2.859375 7.144531 L 2.859375 12.859375 C 2.859375 13.644531 3.5 14.285156 4.285156 14.285156 L 7.601562 14.285156 L 14.554688 19.84375 C 14.683594 19.941406 14.839844 20 15 20 C 15.097656 20 15.210938 19.972656 15.3125 19.929688 C 15.554688 19.8125 15.710938 19.558594 15.710938 19.285156 L 15.710938 16.726562 L 18.777344 19.789062 C 18.917969 19.929688 19.101562 20 19.285156 20 C 19.464844 20 19.648438 19.929688 19.789062 19.792969 C 20.066406 19.511719 20.066406 19.058594 19.789062 18.78125 Z M 19.789062 18.78125 "
                  />
                </g>
              </svg>
            )}
            {props.volume <= 50 && props.volume > 0 && (
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="16"
                  height="16"
                  transform="translate(0 0.49585)"
                  fill="white"
                />
                <path
                  d="M9.71875 2.04589C9.63471 2.00534 9.541 1.98912 9.44822 1.99906C9.35544 2.009 9.26729 2.04471 9.19375 2.10214L4.83125 5.49589H2C1.73478 5.49589 1.48043 5.60124 1.29289 5.78878C1.10536 5.97632 1 6.23067 1 6.49589V10.4959C1 10.7611 1.10536 11.0155 1.29289 11.203C1.48043 11.3905 1.73478 11.4959 2 11.4959H4.83125L9.19375 14.8896C9.28143 14.9577 9.38903 14.995 9.5 14.9959C9.57565 14.995 9.65022 14.9779 9.71875 14.9459C9.80313 14.9048 9.87426 14.8409 9.924 14.7613C9.97374 14.6817 10.0001 14.5897 10 14.4959V2.49589C10.0001 2.40204 9.97374 2.31008 9.924 2.2305C9.87426 2.15092 9.80313 2.08694 9.71875 2.04589ZM2 6.49589H4.5V10.4959H2V6.49589ZM13 8.49589C13.0003 8.82429 12.9358 9.14952 12.8103 9.45301C12.6849 9.7565 12.5008 10.0323 12.2688 10.2646C12.1728 10.3564 12.0453 10.4078 11.9125 10.4084C11.7815 10.4082 11.6558 10.3566 11.5625 10.2646C11.5154 10.2187 11.4781 10.1637 11.4525 10.1031C11.427 10.0424 11.4138 9.97731 11.4138 9.91151C11.4138 9.84572 11.427 9.78058 11.4525 9.71994C11.4781 9.6593 11.5154 9.60437 11.5625 9.55839C11.8434 9.27612 12.0011 8.89411 12.0011 8.49589C12.0011 8.09767 11.8434 7.71565 11.5625 7.43339C11.5154 7.3874 11.4781 7.33247 11.4525 7.27183C11.427 7.21119 11.4138 7.14606 11.4138 7.08026C11.4138 7.01447 11.427 6.94933 11.4525 6.88869C11.4781 6.82805 11.5154 6.77312 11.5625 6.72714C11.6562 6.63363 11.7832 6.58112 11.9156 6.58112C12.048 6.58112 12.175 6.63363 12.2688 6.72714C12.5008 6.95948 12.6849 7.23527 12.8103 7.53876C12.9358 7.84225 13.0003 8.16749 13 8.49589Z"
                  fill="#1D2B49"
                />
              </svg>
            )}
          </div>
          <input
            id="volume-range"
            className={`volum-range w-14 ${showVolumeBar ? '' : 'hidden'}`}
            style={{ width: '56px' }}
            type="range"
            min={0}
            max={100}
            value={props.volume}
            onInput={(e) => props.handleVolumeChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default BreaksVideoPlayerControlPanel;
