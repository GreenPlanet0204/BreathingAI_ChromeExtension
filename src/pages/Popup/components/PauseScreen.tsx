import React from 'react';
import { useAppContext } from '../../../lib/context/App';
import WhaleSleep from '../../../assets/images/whale-sleep.svg';
import UpArrow from '../../../assets/images/arrow_up_large.svg';
import { useTranslation } from 'react-i18next';

export interface PauseScreenModel {
  setPauseTimer: (pauseLength?: number) => void;
}

const PauseScreen = (props: PauseScreenModel) => {
  const { setPauseTimer } = props;
  const { appSettings } = useAppContext();
  const { t } = useTranslation(['pause', 'common']);
  const buttonLabels = [
    {
      pauseLength: 300000,
      label: `${t('5_min')}`,
      id: '5mins',
    },
    {
      pauseLength: 3600000,
      label: `${t('1_hour')}`,
      id: '1hour',
    },
    {
      pauseLength: 21600000,
      label: `${t('8_hours')}`,
      id: '6hours',
    },
    {
      pauseLength: 43200000,
      label: `${t('24_hours')}`,
      id: '12hours',
    },
    {
      pauseLength: undefined,
      label: t('indefinitely'),
      id: 'Indefinitely',
    },
  ];

  return (
    <>
      {!appSettings?.paused ? (
        <div className="fixed w-full h-full z-20 top-[48px] pt-10 bg-white dark:bg-rurikon-400">
          <h1 className="font-bold text-xl mx-auto text-center text-rurikon-400 dark:text-white max-w-[280px] mb-5">
            {t('pause_prompt_line_1')}
          </h1>
          <div className="mx-auto w-[155px]">
            {buttonLabels.map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => setPauseTimer(item.pauseLength)}
                  className="text-sm font-bold text-rurikon-400 dark:text-white w-full px-6 py-3 rounded-xl border border-lavender-800 mb-4"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="fixed w-full h-full z-20 top-12 bg-gradient-to-r from-lavender-800 to-tifany_blue-800">
          <h1 className="mt-20 text-3xl text-rurikon-400 font-semibold text-center mx-auto max-w-[300px]">
            Please resume extension to use
          </h1>
          <img src={WhaleSleep} alt="sleep" className="mx-auto mt-10" />
          <img
            src={UpArrow}
            alt="UpArrow"
            className="absolute top-5 right-4 animate-bounce"
          />
        </div>
      )}
    </>
  );
};

export default PauseScreen;
