import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../../lib/context/Auth';
import { ResetChromeStorage } from '../../../../lib/utils/chrome-storage';
import services from '../../../../lib/utils/services';

const Logout = () => {
  const { t } = useTranslation('account');
  const { api } = services;
  const { actions, authSettings } = useAuthContext();

  const handleLogout = async () => {
    await api.Security.logout();
    actions?.updateUserAction(undefined);
    ResetChromeStorage();
  };

  return (
    <div>
      {authSettings?.authenticated && (
        <div className="w-full text-center my-6">
          <button
            onClick={() => handleLogout()}
            className="text-lg text-rurikon-400 font-bold dark:text-white"
          >
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
