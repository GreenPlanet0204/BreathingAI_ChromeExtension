import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import {
  AppSettings,
  AppStorageKeys,
} from '../../../../lib/context/App/storage';
import { Themes } from '../../../../lib/context/App/types';
import { AmPm, toHours, toSeconds } from '../../../../lib/utils/helpers/time';
import Toggle from '../../components/Toggle';
import services from '../../../../lib/utils/services';

const Setting = () => {
  const { t } = useTranslation('account');
  const { appSettings, setAppSettings } = useAppContext();
  const { api } = services;
  const [darkMode, setDarkMode] = useState<boolean>(
    appSettings?.theme === Themes.DARK
  );

  const [from, setFrom] = useState<keyof typeof AmPm>(
    appSettings && appSettings?.activeTime?.from > 43200 ? 'pm' : 'am' ?? 'am'
  );

  const [to, setTo] = useState<keyof typeof AmPm>(
    appSettings && appSettings?.activeTime?.to > 43200 ? 'pm' : 'am' ?? 'pm'
  );

  const initialTime = {
    from: appSettings?.activeTime.from ?? 0 + (from === 'pm' ? 12 : 0),
    to: appSettings?.activeTime.to ?? 0 + (from === 'pm' ? 12 : 0),
  };
  const [values, setValues] = useState({
    from: toHours(initialTime.from, from),
    to: toHours(initialTime.to, to),
  });

  useEffect(() => {
    async function changeTimeIntervals() {
      if (appSettings && setAppSettings) {
        const newSettings = {
          ...appSettings,
          activeTime: {
            from: toSeconds({
              hours: from === 'pm' ? values.from + 12 : values.from,
              minutes: 0,
            }),
            to: toSeconds({
              hours: to === 'pm' ? values.to + 12 : values.to,
              minutes: 0,
            }),
          },
        };
        const newAppSettings = await api.Settings.updateAppSettings(
          newSettings
        );

        setAppSettings((prevState) => {
          return newAppSettings;
        });
      }
    }
    changeTimeIntervals();
  }, [from, values.from, to, values.to]);

  const handleDarkModeToggle = async () => {
    if (appSettings && setAppSettings) {
      const newSettings = {
        ...appSettings,
        theme: !darkMode ? Themes.DARK : Themes.LIGHT,
      };

      const newAppSettings = await api.Settings.updateAppSettings(newSettings);

      setDarkMode(!darkMode);
      setAppSettings && setAppSettings((prevState) => newAppSettings);
    }
  };

  const handleSaveCustomFrequency = async (
    e: React.FocusEvent<HTMLInputElement, Element>,
    key: keyof AppSettings[AppStorageKeys.TIME]
  ) => {
    let newValue = parseInt(e.target.value);

    if (key === 'to' && to === 'pm') {
      newValue += 12;
    }
    if (key === 'from' && from === 'pm') {
      newValue += 12;
    }

    if (
      setAppSettings &&
      !(
        newValue > parseInt(e.target.max) || newValue < parseInt(e.target.min)
      ) &&
      appSettings
    ) {
      setAppSettings((prevState) => ({
        ...prevState,
        [AppStorageKeys.TIME]: {
          ...prevState.activeTime,
          [key]: toSeconds({
            hours: newValue,
            minutes: 0,
          }),
        },
      }));
    }
  };

  const handleSetCustomFrequency = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof AppSettings[AppStorageKeys.TIME]
  ) => {
    const newValue = parseInt(e.target.value);
    if (
      setAppSettings &&
      !(newValue > parseInt(e.target.max) || newValue < parseInt(e.target.min))
    ) {
      setValues({
        ...values,
        [key]: newValue,
      });
    }
  };

  return (
    <div className="shadow-input bg-white rounded-lg p-4 mb-6 dark:bg-grey-800 dark:shadow-input2">
      <p className="text-xl font-bold text-rurikon-400 mb-2 dark:text-white">
        {t('settings')}
      </p>
      <Toggle
        id="dark_mode_toggle"
        label={t('dark_mode')}
        onChange={handleDarkModeToggle}
        disabled={false}
        checked={darkMode}
        align="between"
        size="small"
      />
      <p className="text-base font-medium text-rurikon-400 mr-4 dark:text-white">
        {t('run')}
      </p>

      <div className="flex justify-center mt-2 items-center">
        <div className="flex">
          <input
            id="setting_hours"
            name="hours"
            type="number"
            min={0}
            max={12}
            value={values.from}
            onChange={(e) => handleSetCustomFrequency(e, 'from')}
            onBlur={(e) => handleSaveCustomFrequency(e, 'from')}
            className="text-sm font-bold appearance-none
             outline-none text-rurikon-400
              border-lavender-800
             focus:outline-none focus:ring-0
             text-center w-8 h-7 p-0 rounded-tl-md rounded-bl-md 
             dark:bg-transparent dark:text-white"
          />
          <select
            id="setting_ampm"
            name="ampm"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value as keyof typeof AmPm);
            }}
            className="
              text-sm font-bold border-none
              focus:outline-none focus:ring-0 appearance-none outline-none
              rounded-tr-md rounded-br-md text-center p-0 w-8 h-7 
              bg-lavender-800 dark:text-rurikon-400"
          >
            <option value={'am'} className="text-sm text-center p-0">
              AM
            </option>
            <option value={'pm'} className="text-sm text-center p-0">
              PM
            </option>
          </select>
        </div>

        <div className="dark:text-white px-4 font-bold text-sm py-0">
          {t('to')}
        </div>

        <div className="flex">
          <input
            id="setting_hours"
            name="hours"
            type="number"
            min={0}
            max={12}
            value={values.to}
            onChange={(e) => handleSetCustomFrequency(e, 'to')}
            onBlur={(e) => handleSaveCustomFrequency(e, 'to')}
            className="
            text-sm font-bold appearance-none
            outline-none text-rurikon-400 border-lavender-800
            focus:outline-none focus:ring-0 text-center
            w-8 h-7 p-0 rounded-tl-md rounded-bl-md 
            dark:bg-transparent dark:text-white"
          />
          <select
            id="setting_ampm"
            name="ampm"
            value={to}
            onChange={(e) => {
              setTo(e.target.value as keyof typeof AmPm);
            }}
            className="
              text-sm font-bold border-none
              focus:outline-none focus:ring-0 appearance-none outline-none
              rounded-tr-md rounded-br-md text-center p-0 w-8 h-7 
             bg-lavender-800 dark:text-rurikon-400"
          >
            <option value={'am'} className="text-sm text-center p-0">
              AM
            </option>
            <option value={'pm'} className="text-sm text-center p-0">
              PM
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Setting;
