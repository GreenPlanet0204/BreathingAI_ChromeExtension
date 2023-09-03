import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { RoutingStorageKeys } from '../../../../lib/context/App/storage';

import { AVAILABLE_OPTIONS_ROUTES } from '../../../Options/routing/types';

const Splash: React.FC = () => {
  const { t } = useTranslation('splash');

  const { setRouterSettings } = useAppContext();

  const handleNavigation = (route: AVAILABLE_OPTIONS_ROUTES) => {
    if (setRouterSettings) {
      setRouterSettings((prevState) => ({
        ...prevState,
        [RoutingStorageKeys.CURRENT_OPTIONS_TAB]: route,
      }));
    }
    chrome.runtime.openOptionsPage();
  };

  return (
    <>
      <h1 className="w-full text-center text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-lavender-800 to-tifany_blue-800 dark:from-pinky-200 dark:to-tifany_blue-400">
        {t('splash.headline')}
      </h1>
      <p className="w-full text-center text-[32px] font-semibold -mt-4 text-transparent bg-clip-text bg-gradient-to-r from-lavender-800 to-tifany_blue-800 dark:from-pinky-200 dark:to-tifany_blue-400">
        breathing.ai
      </p>
      <img
        className="w-1/2 mx-auto my-4"
        src="/src/assets/images/whale-default.png"
        alt="whale"
      />
      <button
        className="mx-auto my-10 block text-rurikon-400 dark:text-white bg-lavender-800 hover:bg-blue-800 focus:ring-0 font-bold rounded-2xl text-sm px-5 py-2 focus:outline-none "
        onClick={() => handleNavigation(AVAILABLE_OPTIONS_ROUTES.INTRO)}
      >
        {t('signUp')}
      </button>

      <h3 className="w-full text-center text-lg text-grey-400">
        {t('logInMessage')}
        <button
          className="font-bold text-rurikon-400 dark:text-white"
          onClick={() => handleNavigation(AVAILABLE_OPTIONS_ROUTES.LOGIN)}
        >
          {t('login')}
        </button>
      </h3>
    </>
  );
};

export default Splash;
