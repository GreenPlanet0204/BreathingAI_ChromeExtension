import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBreaksContext } from '../../../../lib/context/Breaks';
import {
  BreaksSettings,
  BreaksStorageKeys,
} from '../../../../lib/context/Breaks/storage';

import { useAuthContext } from '../../../../lib/context/Auth';
import {
  CustomFrequencyInput,
  toHoursAndMinutes,
  toSeconds,
} from '../../../../lib/utils/helpers/time';
import { useAppContext } from '../../../../lib/context/App';

const intervals = {
  '30min': 1800,
  '45min': 2700,
  '60min': 3600,
};

export type ReminderProps = {
  setBreaksFrequency: (
    newValue: BreaksSettings[BreaksStorageKeys.FREQUENCY]
  ) => void;
};
const Reminder: React.FC<ReminderProps> = ({ setBreaksFrequency }) => {
  const { t } = useTranslation('breaks');
  const { breaksSettings } = useBreaksContext();
  const { authSettings, setAuthSettings } = useAuthContext();
  const { setRouterSettings } = useAppContext();

  const isPreDefinedInterval =
    (breaksSettings?.frequency &&
      breaksSettings?.frequency === intervals['30min']) ||
    breaksSettings?.frequency === intervals['45min'] ||
    breaksSettings?.frequency === intervals['60min'];

  const [customInterval, setCustomInterval] = useState<
    CustomFrequencyInput | undefined
  >(
    isPreDefinedInterval
      ? undefined
      : toHoursAndMinutes(breaksSettings?.frequency)
  );

  useEffect(() => {
    if (customInterval) {
      const newFrequency = toSeconds(customInterval);
      setBreaksFrequency(newFrequency);
    }
  }, [customInterval]);

  const handleSetCustomFrequency = (
    type: keyof CustomFrequencyInput,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue =
      e.target.value.length === 0
        ? type === 'hours'
          ? 0
          : 1
        : parseInt(e.target.value);

    if (
      customInterval &&
      !(newValue > parseInt(e.target.max) || newValue < parseInt(e.target.min))
    ) {
      setCustomInterval({
        ...customInterval,
        [type]: newValue,
      });
    }
  };

  const handleFrequency = (type: number) => {
    setCustomInterval(undefined);
    setBreaksFrequency(type);
    if (
      setAuthSettings &&
      authSettings?.walkThrough !== 6 &&
      setRouterSettings
    ) {
      setAuthSettings((prevState) => ({
        ...prevState,
        walkThrough: 3,
      }));
    }
  };

  if (!breaksSettings) return null;
  return (
    <div>
      <p className="text-xl font-bold text-rurikon-400 dark:text-white mb-4">
        {t('reminder_interval')}
      </p>

      <div className="grid grid-cols-4 gap-3 mb-1">
        <button
          onClick={() => {
            handleFrequency(intervals['30min']);
          }}
          className={`border border-lavender-800 rounded-xl px-2 py-1 text-sm font-bold leading-4 h-[32px] dark:text-white ${
            isPreDefinedInterval &&
            !customInterval &&
            breaksSettings.frequency === intervals['30min']
              ? 'bg-lavender-800'
              : ''
          }`}
        >
          {t('30min')}
        </button>
        <button
          onClick={() => {
            handleFrequency(intervals['45min']);
          }}
          className={`border border-lavender-800 rounded-xl px-2 py-1 text-sm font-bold leading-4 h-[32px] dark:text-white ${
            isPreDefinedInterval &&
            !customInterval &&
            breaksSettings.frequency === intervals['45min']
              ? 'bg-lavender-800'
              : ''
          }`}
        >
          {t('45min')}
        </button>
        <button
          onClick={() => {
            handleFrequency(intervals['60min']);
          }}
          className={`border border-lavender-800 rounded-xl px-2 py-1 text-sm font-bold leading-4 h-[32px] dark:text-white ${
            isPreDefinedInterval &&
            !customInterval &&
            breaksSettings.frequency === intervals['60min']
              ? 'bg-lavender-800'
              : ''
          }`}
        >
          {t('1hour')}
        </button>
        <button
          onClick={() =>
            setCustomInterval(toHoursAndMinutes(breaksSettings.frequency))
          }
          className={`border border-lavender-800 rounded-xl px-2 py-1 text-sm font-bold leading-4 h-[32px] w-fit dark:text-white ${
            !!customInterval ? 'bg-lavender-800' : ''
          }`}
        >
          {t('custom')}
        </button>
      </div>
      {!!customInterval && (
        <div className="flex justify-center mt-2 items-center gap-2">
          <label
            htmlFor="hours-input"
            className="flex flex-row rounded-md text-sm font-bold 
              h-[29px] w-[102.57px]"
          >
            <input
              className="h-full w-1/3 rounded-l-md appearance-none 
                outline-none text-rurikon-400 focus:outline-none focus:ring-0
                text-center p-0 border-lavender-800 dark:bg-transparent dark:text-white"
              type="number"
              id="hours-input"
              value={customInterval.hours}
              min={0}
              max={12}
              onChange={(e) => handleSetCustomFrequency('hours', e)}
              // onBlur={(e) => handleSetCustomFrequency('hours', e)}
            />
            <div className="flex w-full h-full items-center justify-center bg-lavender-800 rounded-r-md">
              {t('hours')}
            </div>
          </label>
          <label
            htmlFor="minutes-input"
            className="flex flex-row rounded-md text-sm font-bold 
              h-[29px] w-[102.57px]"
          >
            <input
              className="h-full w-1/3 rounded-l-md appearance-none 
                outline-none text-rurikon-400 focus:outline-none focus:ring-0
                text-center p-0 border-lavender-800 dark:bg-transparent dark:text-white"
              type="number"
              id="minutes-input"
              value={customInterval.minutes}
              min={1}
              max={60}
              onChange={(e) => handleSetCustomFrequency('minutes', e)}
              // onBlur={(e) => handleSetCustomFrequency('minutes', e)}
            />
            <div className="flex w-full h-full items-center justify-center bg-lavender-800 rounded-r-md">
              {t('minutes')}
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default Reminder;
