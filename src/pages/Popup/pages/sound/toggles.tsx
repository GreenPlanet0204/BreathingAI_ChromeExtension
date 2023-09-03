import React, { useState } from 'react';
import { useAuthContext } from '../../../../lib/context/Auth';
import { useSoundsContext } from '../../../../lib/context/Sounds';

import { radio_stations } from './stations';

import { useAppContext } from '../../../../lib/context/App';
import { Themes } from '../../../../lib/context/App/types';
import {
  RADIO_ACTIONS,
  RadioMessage,
  STATIONS,
} from '../../../Offscreen/Radio/types';
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerHigh,
} from '@phosphor-icons/react';

const Toggles = () => {
  const { soundsSettings, setSoundsSettings } = useSoundsContext();
  const { appSettings } = useAppContext();
  const { state } = useAuthContext();
  const [volume, setNewVolume] = useState(soundsSettings?.volume ?? 0);
  const isDarkMode = appSettings?.theme === Themes.DARK;

  const handlePlay = async (play: boolean) => {
    if (soundsSettings) {
      const message: RadioMessage = {
        type: RADIO_ACTIONS.TOGGLE,
        payload: {
          play: play,
          track: radio_stations[soundsSettings.station][soundsSettings.track],
          volume: soundsSettings.volume,
          station: soundsSettings.station,
        },
      };
      if (setSoundsSettings && state?.user?.id && soundsSettings) {
        setSoundsSettings((prevState) => {
          return { ...prevState, play };
        });
      }
      await chrome.runtime.sendMessage(message);
    }
  };

  const handleNextTrack = async () => {
    if (soundsSettings) {
      const numberOfTracksOnStation =
        radio_stations[soundsSettings.station].length;
      const nextStation = numberOfTracksOnStation - 1 === soundsSettings.track;

      let track =
        numberOfTracksOnStation - 1 > soundsSettings.track
          ? soundsSettings.track + 1
          : 0;

      const stations = Object.values(STATIONS);
      if (nextStation) {
        const index = stations.indexOf(soundsSettings.station);
        if (index > -1) {
          stations.splice(index, 1);
        }
        stations.sort(() => Math.random() - 0.5);
      }

      const station = nextStation ? stations[0] : soundsSettings.station;
      const message: RadioMessage = {
        type: RADIO_ACTIONS.TOGGLE,
        payload: {
          play: true,
          track: radio_stations[station][track],
          volume: soundsSettings.volume,
          station: station,
        },
      };
      if (setSoundsSettings && state?.user?.id && soundsSettings) {
        setSoundsSettings((prevState) => {
          return { ...prevState, track, station };
        });
      }
      await chrome.runtime.sendMessage(message);
    }
  };

  const handleVolume = async () => {
    if (soundsSettings) {
      const message: RadioMessage = {
        type: RADIO_ACTIONS.VOLUME,
        payload: {
          volume: volume,
        },
      };
      if (setSoundsSettings && soundsSettings) {
        setSoundsSettings((prevState) => {
          return { ...prevState, volume };
        });
      }
      await chrome.runtime.sendMessage(message);
    }
  };

  return (
    <div className="shadow-input w-full mb-4 rounded-2xl dark:shadow-input2 dark:bg-grey-800">
      <div className="flex justify-around">
        <div className="flex space-x-3 p-2">
          <button className="focus:outline-none">
            {' '}
            <SkipBack size={18} color={isDarkMode ? '#fff' : '#000'} />
          </button>
          <button
            className="rounded-full w-8 h-8 flex items-center justify-center pl-0.5 focus:outline-none"
            disabled={!soundsSettings?.station}
            onClick={() => handlePlay(!soundsSettings?.play)}
          >
            {soundsSettings?.play ? (
              <Pause size={32} color={isDarkMode ? '#fff' : '#000'} />
            ) : (
              <Play size={32} color={isDarkMode ? '#fff' : '#000'} />
            )}
          </button>
          <button
            className="focus:outline-none"
            onClick={() => handleNextTrack()}
          >
            <SkipForward size={18} color={isDarkMode ? '#fff' : '#000'} />
          </button>
        </div>
        <div className="flex items-center">
          <label
            htmlFor={isDarkMode ? 'dark-opacity-range' : 'opacity-range'}
            className=" block mr-4 text-sm font-bold text-rurikon-400 dark:text-white"
          >
            <SpeakerHigh size={24} color={isDarkMode ? '#fff' : '#000'} />
          </label>
          <input
            id={isDarkMode ? 'dark-opacity-range' : 'opacity-range'}
            type="range"
            min={0}
            max={1}
            value={volume}
            step={0.1}
            onChange={(e) => setNewVolume(parseFloat(e.target.value))}
            onMouseUp={() => handleVolume()}
            className="w-full h-[2px] bg-rurikon-400 rounded-lg appearance-none cursor-pointer range-sm dark:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Toggles;
