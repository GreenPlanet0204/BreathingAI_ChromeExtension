import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../lib/context/Auth';
import { ResetChromeStorage } from '../../../lib/utils/chrome-storage';
import services from '../../../lib/utils/services';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { t } = useTranslation('common');
  const { api } = services;
  const { actions } = useAuthContext();
  const [activeLink, setActiveLink] = useState('dashboard');
  const { state } = useAuthContext();

  const handleLogout = async () => {
    await api.Security.logout();
    actions?.updateUserAction(undefined);
    ResetChromeStorage();
  };

  const handleLink = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div className="fixed w-[244px] min-h-screen bg-tifany_blue-100">
      <img
        src={'src/assets/images/whale-default.svg'}
        className="mt-20 mx-auto"
        alt="whale"
      />
      <div className="font-medium text-2xl text-center text-grey-600 mt-3">
        {state?.user?.firstName}
      </div>
      <div className="mt-10 px-10 ">
        <ul className="list-none border-grey-300 border-b">
          <li className="mb-9">
            <Link
              to={'/dashboard'}
              onClick={() => handleLink('dashboard')}
              className={`text-base font-medium ${
                activeLink === 'dashboard'
                  ? 'text-pinky-300 dark:text-pinky-300'
                  : 'text-grey-600 dark:text-grey-600'
              } `}
            >
              {t('breaksLibrary')}
            </Link>
          </li>
          <li className="mb-9">
            <Link
              to={'/account'}
              onClick={() => handleLink('account')}
              className={`text-base font-medium ${
                activeLink === 'account'
                  ? 'text-pinky-300 dark:text-pinky-300'
                  : 'text-grey-600 dark:text-grey-600'
              } `}
            >
              {t('account')}
            </Link>
          </li>
          <li className="mb-9 ">
            <Link
              to={'/help'}
              onClick={() => handleLink('help')}
              className={`text-base font-medium ${
                activeLink === 'help'
                  ? 'text-pinky-300 dark:text-pinky-300'
                  : 'text-grey-600 dark:text-grey-600'
              } `}
            >
              {t('help')}
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full text-center my-6">
        <button
          onClick={() => handleLogout()}
          className="text-base text-grey-600"
        >
          {t('logout')}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
