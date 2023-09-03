import React from 'react';
import { useTranslation } from 'react-i18next';
import ImageTextBox from '../../components/ImageTextBox';

import Sparkles from '../../../../assets/icons/sparkles.png';
import Leaves from '../../../../assets/icons/leaves.png';
import Union from '../../../../assets/icons/Union.png';
import { useSoundsContext } from '../../../../lib/context/Sounds';
import {
  RADIO_ACTIONS,
  RadioMessage,
  STATIONS,
} from '../../../Offscreen/Radio/types';
import { radio_stations } from './stations';
const BackgroundSound = () => {
  const { t } = useTranslation('sounds');
  const { soundsSettings, setSoundsSettings } = useSoundsContext();

  const handleSetStation = async (type: STATIONS) => {
    if (soundsSettings) {
      const message: RadioMessage = {
        type: RADIO_ACTIONS.TOGGLE,
        payload: {
          play: soundsSettings.play,
          track: radio_stations[type][0],
          volume: soundsSettings.volume,
          station: type,
        },
      };
      setSoundsSettings &&
        setSoundsSettings((prevSettings) => ({
          ...prevSettings,
          track: 0,
          station: type,
        }));
      await chrome.runtime.sendMessage(message);
    }
  };

  return (
    <div className="content-center shadow-input bg-white rounded-lg p-4 mb-4 dark:shadow-input2 dark:bg-grey-800">
      <p className="text-lg font-bold text-rurikon-400 mb-4 dark:text-white">
        {t('choose_your_sounds')}
      </p>

      <ImageTextBox
        id={STATIONS.ZEN}
        title={t('zen_flow')}
        copy={t('zen_description_line_1') + t('zen_description_line_2')}
        image={Sparkles}
        selected={soundsSettings?.station}
        onClick={() => handleSetStation(STATIONS.ZEN)}
      />

      <ImageTextBox
        id={STATIONS.NATURE}
        title={t('relax_in_nature')}
        copy={
          t('relax_in_nature_description_line_1') +
          t('relax_in_nature_description_line_2')
        }
        image={Leaves}
        selected={soundsSettings?.station}
        onClick={() => handleSetStation(STATIONS.NATURE)}
      />

      <ImageTextBox
        id={STATIONS.WATER}
        title={t('calming_water')}
        copy={
          t('calming_water_description_line_1') +
          t('calming_water_description_line_2')
        }
        image={Union}
        selected={soundsSettings?.station}
        onClick={() => handleSetStation(STATIONS.WATER)}
      />
    </div>
  );
};

export default BackgroundSound;
