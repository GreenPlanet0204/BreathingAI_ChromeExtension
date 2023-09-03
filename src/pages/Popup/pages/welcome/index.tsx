import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { useAuthContext } from '../../../../lib/context/Auth';
import { RoutingStorageKeys } from '../../../../lib/context/App/storage';

import { AVAILABLE_POPUP_ROUTES } from '../../routing/types';
import { AVAILABLE_OPTIONS_ROUTES } from '../../../Options/routing/types';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const { t } = useTranslation('welcome');

  const { authSettings, setAuthSettings } = useAuthContext();
  const { setRouterSettings } = useAppContext();
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (setRouterSettings) {
      setRouterSettings((prevState) => ({
        ...prevState,
        [RoutingStorageKeys.CURRENT_POPUP_TAB]: AVAILABLE_POPUP_ROUTES.BREAKS,
        [RoutingStorageKeys.CURRENT_OPTIONS_TAB]:
          AVAILABLE_OPTIONS_ROUTES.DASHBOARD,
      }));
    }
    chrome.runtime.openOptionsPage();
    if (setAuthSettings) {
      setAuthSettings((prevState) => ({
        ...prevState,
        introComplete: true,
        walkThrough: 6,
      }));
    }

    if (!authSettings?.introComplete && setRouterSettings) {
      setRouterSettings((prevState) => ({
        ...prevState,
        [RoutingStorageKeys.CURRENT_POPUP_TAB]: AVAILABLE_POPUP_ROUTES.BREAKS,
      }));
      navigate('/breaks');
    }
  };

  return (
    <>
      <h1 className="w-full text-center text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rurikon-400 to-rurikon-400 dark:from-pinky-200 dark:to-tifany_blue-400">
        {t('congratulations')}
      </h1>

      <img
        className="w-[275px] mx-auto my-4"
        src="/src/assets/images/whale-celebrate.png"
        alt="whale"
      />
      <p className="w-[300px] mx-auto text-center text-xl font-medium text-rurikon-400 dark:text-white mt-8">
        {t('you_are_ready_for_a_more')}
      </p>
      <button
        className="mx-auto my-8 block font-bold text-sm text-rurikon-400 dark:text-white bg-lavender-800 focus:ring-0 rounded-2xl px-5 py-2 focus:outline-none "
        onClick={() => handleNavigation()}
      >
        {t('finish')}
      </button>
    </>
  );
};

export default Welcome;
