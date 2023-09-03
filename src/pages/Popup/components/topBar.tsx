import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { useAppContext } from '../../../lib/context/App';
import {
  AppSettings,
  AVAILABLE_LANGUAGES,
} from '../../../lib/context/App/storage';
import { useAuthContext } from '../../../lib/context/Auth';
import services from '../../../lib/utils/services';
import { useTranslation } from 'react-i18next';

export interface TopBarModel {
  togglePauseModal: () => void;
}

export const TopBar = (props: TopBarModel) => {
  const { togglePauseModal } = props;
  const { appSettings, setAppSettings } = useAppContext();

  const { state } = useAuthContext();
  const { api } = services;
  const { i18n, t } = useTranslation('common');
  const [currentLang, setCurrentLang] = useState<string>(i18n.language);

  const toggleAppPause = async () => {
    if (
      setAppSettings &&
      state?.user?.id &&
      appSettings &&
      appSettings?.paused
    ) {
      const newSettings: AppSettings = {
        ...appSettings,
        paused: false,
      };

      const newAppSettings = await api.Settings.updateAppSettings(newSettings);

      setAppSettings(() => {
        return newAppSettings;
      });
    }
    togglePauseModal();
  };

  const chooseLang = async (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    if (appSettings) {
      const newSettings: AppSettings = {
        ...appSettings,
        language: e.target.value as AVAILABLE_LANGUAGES,
      };

      const newAppSettings = await api.Settings.updateAppSettings(newSettings);

      setAppSettings && setAppSettings(() => newAppSettings);

      setCurrentLang(e.target.value);
    }
  };

  return (
    <div className="flex flex-row w-full p-2 justify-between bg-[#1D2B49] z-50 h-12">
      <div className="flex flex-row w-1/2 content-middle align-middle items-center">
        <img
          src="src/assets/icons/logo/logo.svg"
          alt="breathing.ai logo"
          className="w-auto h-6"
        />
      </div>
      <div className="flex">
        <select
          id="localeSelector"
          defaultValue={currentLang}
          className="block w-[100px] h-[28px] text-xs text-white font-bold bg-transparent rounded-xl border border-white focus:border-white focus:outline-none focus:ring-0 dark:bg-grey-800 dark:border-white "
          onChange={chooseLang}
        >
          <option className="text-black" value={AVAILABLE_LANGUAGES.EN}>
            English
          </option>
          <option className="text-black" value={AVAILABLE_LANGUAGES.ES}>
            Española
          </option>
        </select>

        <button
          onClick={() => toggleAppPause()}
          className="flex items-center bg-lavender-400 rounded-xl py-0 px-4 ml-2 h-[28px] cursor-pointer"
        >
          {appSettings?.paused ? (
            <>
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0063 6.32301C14.2679 6.46709 14.4862 6.67875 14.6381 6.93592C14.7901 7.19309 14.8703 7.48634 14.8703 7.78506C14.8703 8.08378 14.7901 8.37702 14.6381 8.63419C14.4862 8.89136 14.2679 9.10303 14.0063 9.24711L2.87958 15.3646C2.62542 15.5041 2.33928 15.5751 2.04936 15.5704C1.75944 15.5657 1.47574 15.4856 1.2262 15.3379C0.976666 15.1903 0.76991 14.9801 0.626302 14.7282C0.482694 14.4763 0.407189 14.1914 0.407227 13.9014V1.66872C0.407276 1.37869 0.4829 1.09369 0.626645 0.841793C0.77039 0.589898 0.977294 0.379808 1.22696 0.23223C1.47663 0.0846523 1.76045 0.00468129 2.05044 0.000199351C2.34043 -0.00428259 2.62658 0.0668792 2.88069 0.206671L14.0074 6.32301H14.0063Z"
                  fill="#1D2B49"
                />
              </svg>

              <div className="font-bold text-xs ml-2">{t('resume')}</div>
            </>
          ) : (
            <>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 0H8.25C7.98478 0 7.73043 0.105357 7.54289 0.292893C7.35536 0.48043 7.25 0.734784 7.25 1V11C7.25 11.2652 7.35536 11.5196 7.54289 11.7071C7.73043 11.8946 7.98478 12 8.25 12H10.5C10.7652 12 11.0196 11.8946 11.2071 11.7071C11.3946 11.5196 11.5 11.2652 11.5 11V1C11.5 0.734784 11.3946 0.48043 11.2071 0.292893C11.0196 0.105357 10.7652 0 10.5 0ZM10.5 11H8.25V1H10.5V11ZM3.75 0H1.5C1.23478 0 0.98043 0.105357 0.792893 0.292893C0.605357 0.48043 0.5 0.734784 0.5 1V11C0.5 11.2652 0.605357 11.5196 0.792893 11.7071C0.98043 11.8946 1.23478 12 1.5 12H3.75C4.01522 12 4.26957 11.8946 4.45711 11.7071C4.64464 11.5196 4.75 11.2652 4.75 11V1C4.75 0.734784 4.64464 0.48043 4.45711 0.292893C4.26957 0.105357 4.01522 0 3.75 0ZM3.75 11H1.5V1H3.75V11Z"
                  fill="#1D2B49"
                />
                <path d="M3.75 11H1.5V1H3.75V11Z" fill="#1D2B49" />
                <path d="M10.5 11H8.25V1H10.5V11Z" fill="#1D2B49" />
              </svg>
              <div className="font-bold text-xs ml-2">{t('pause')}</div>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
