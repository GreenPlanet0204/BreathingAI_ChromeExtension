import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AVAILABLE_POPUP_ROUTES } from '../routing/types';
import { useAppContext } from '../../../lib/context/App';
import { Themes } from '../../../lib/context/App/types';
import { useTranslation } from 'react-i18next';

export const NavigationBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('/breaks');
  const { appSettings, routerSettings } = useAppContext();

  const { t } = useTranslation('common');
  const isDarkMode = appSettings?.theme === Themes.DARK;

  React.useEffect(() => {
    if (routerSettings?.currentPopupTab) {
      setActiveTab(routerSettings?.currentPopupTab);
    }
  }, [routerSettings?.currentPopupTab]);

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ul className="fixed top-[48px] left-0 z-10 text-xs font-bold text-center text-gray-500 flex dark:text-gray-400 w-full">
        <li className="w-1/5">
          <Link
            to={AVAILABLE_POPUP_ROUTES.BREAKS}
            onClick={() => onClickTab(AVAILABLE_POPUP_ROUTES.BREAKS)}
            className={`relative inline-block pt-2.5 h-14 w-full text-xs font-bold text-rurikon-400 bg-lavender-800 focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none dark:bg-lavender-800 `}
          >
            <div className="h-6">
              <img
                src={
                  isDarkMode && activeTab === AVAILABLE_POPUP_ROUTES.BREAKS
                    ? 'src/assets/icons/flower_dark.svg'
                    : 'src/assets/icons/flower.svg'
                }
                alt="breathing.ai logo"
                className="w-auto mx-auto"
              />
              <div
                className={`absolute left-0 bottom-1 ${
                  activeTab === AVAILABLE_POPUP_ROUTES.BREAKS
                    ? 'underline decoration-2 underline-offset-4 dark:text-white'
                    : ''
                }  w-full`}
              >
                {t('breaks')}
              </div>
            </div>
          </Link>
        </li>
        <li className="w-1/5">
          <Link
            to={AVAILABLE_POPUP_ROUTES.COLORS}
            onClick={() => onClickTab(AVAILABLE_POPUP_ROUTES.COLORS)}
            className={`relative inline-block pt-2.5 h-14 w-full text-xs font-bold text-rurikon-400 bg-lavender-800 focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none dark:bg-lavender-800 `}
          >
            <div className="h-6">
              <img
                src={
                  isDarkMode && activeTab === AVAILABLE_POPUP_ROUTES.COLORS
                    ? 'src/assets/icons/drop_dark.svg'
                    : 'src/assets/icons/drop.svg'
                }
                alt="breathing.ai logo"
                className="w-auto mx-auto"
              />
              <div
                className={`absolute left-0 bottom-1 ${
                  activeTab === AVAILABLE_POPUP_ROUTES.COLORS
                    ? 'underline decoration-2 underline-offset-4 dark:text-white'
                    : ''
                }  w-full`}
              >
                {t('colors')}
              </div>
            </div>
          </Link>
        </li>
        <li className="w-1/5">
          <Link
            to={AVAILABLE_POPUP_ROUTES.SOUNDS}
            onClick={() => onClickTab(AVAILABLE_POPUP_ROUTES.SOUNDS)}
            className={`relative inline-block pt-2.5 h-14 w-full text-xs font-bold text-rurikon-400 bg-lavender-800 focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none dark:bg-lavender-800 `}
          >
            <div className="h-6">
              <img
                src={
                  isDarkMode && activeTab === AVAILABLE_POPUP_ROUTES.SOUNDS
                    ? 'src/assets/icons/sound_dark.svg'
                    : 'src/assets/icons/sound.svg'
                }
                alt="drop"
                className="w-auto h-6 mx-auto"
              />
              <div
                className={`absolute left-0 bottom-1 ${
                  activeTab === AVAILABLE_POPUP_ROUTES.SOUNDS
                    ? 'underline decoration-2 underline-offset-4 dark:text-white'
                    : ''
                }  w-full`}
              >
                {t('sounds')}
              </div>
            </div>
          </Link>
        </li>
        <li className="w-1/5">
          <Link
            to={AVAILABLE_POPUP_ROUTES.ANALYTICS}
            onClick={() => onClickTab(AVAILABLE_POPUP_ROUTES.ANALYTICS)}
            className={`relative inline-block pt-2.5 h-14 w-full text-xs font-bold text-rurikon-400 bg-lavender-800 focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none dark:bg-lavender-800 `}
          >
            <div className="h-6">
              <img
                src={
                  isDarkMode && activeTab === AVAILABLE_POPUP_ROUTES.ANALYTICS
                    ? 'src/assets/icons/analytics_dark.svg'
                    : 'src/assets/icons/analytics.svg'
                }
                alt="drop"
                className="w-auto h-6 mx-auto"
              />
              <div
                className={`absolute left-0 bottom-1 ${
                  activeTab === AVAILABLE_POPUP_ROUTES.ANALYTICS
                    ? 'underline decoration-2 underline-offset-4 dark:text-white'
                    : ''
                }  w-full`}
              >
                {t('analytics')}
              </div>
            </div>
          </Link>
        </li>
        <li className="w-1/5">
          <Link
            to={AVAILABLE_POPUP_ROUTES.ACCOUNT}
            onClick={() => onClickTab(AVAILABLE_POPUP_ROUTES.ACCOUNT)}
            className={`relative inline-block pt-2.5 h-14 w-full text-xs font-bold text-rurikon-400 bg-lavender-800 focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none dark:bg-lavender-800 `}
          >
            <div className="h-6">
              <img
                src={
                  isDarkMode && activeTab === AVAILABLE_POPUP_ROUTES.ACCOUNT
                    ? 'src/assets/icons/account_dark.svg'
                    : 'src/assets/icons/account.svg'
                }
                alt="drop"
                className="w-auto h-6 mx-auto"
              />
              <div
                className={`absolute left-0 bottom-1 ${
                  activeTab === AVAILABLE_POPUP_ROUTES.ACCOUNT
                    ? 'underline decoration-2 underline-offset-4 dark:text-white'
                    : ''
                }  w-full`}
              >
                {t('account')}
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};
