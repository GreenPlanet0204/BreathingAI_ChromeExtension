import React from 'react';
import { useTranslation } from 'react-i18next';
import WhaleImage from '../../../../assets/images/whale.png';
import { useAppContext } from '../../../../lib/context/App';
import { useAuthContext } from '../../../../lib/context/Auth';
import { AVAILABLE_OPTIONS_ROUTES } from '../../../Options/routing/types';

const Title = () => {
  const { t } = useTranslation('account');
  const { setRouterSettings } = useAppContext();
  const { state } = useAuthContext();
  const handleViewAccount = () => {
    setRouterSettings &&
      setRouterSettings((prevState) => ({
        ...prevState,
        currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.ACCOUNT,
      }));
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="flex justify-between items-center shadow-input bg-white rounded-lg p-4 mb-4 dark:bg-grey-800 dark:shadow-input2">
      <div className="flex items-center">
        <div className="relative w-[68px] h-[68px] p-1 bg-gradient-to-r from-lavender-800 to-tifany_blue-800 rounded-full  mr-3">
          <div className="bg-grey-100 w-[60px] h-[60px] rounded-full"></div>
          <img
            src={WhaleImage}
            alt="user"
            className="absolute top-5 left-2 w-[52px]"
          />
        </div>
        <p className="text-xl font-bold text-rurikon-400 mr-4  dark:text-white">
          {state?.user?.firstName}
        </p>{' '}
      </div>
      <button
        onClick={() => handleViewAccount()}
        className="text-sm text-rurikon-400 mr-4 cursor-pointer underline  dark:text-white"
      >
        {t('view_account')}
      </button>
    </div>
  );
};

export default Title;
