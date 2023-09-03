import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../../lib/context/Auth';
import ChangePasswordModal from './changePassword';

const Account = () => {
  const { t } = useTranslation('account');
  const { state } = useAuthContext();
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  return (
    <div className="mx-4 lg:mx-28 mt-8 lg:mt-16">
      <h1 className="text-grey-600 font-bold text-3xl mb-10">
        {t('account_settings')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-grey-300">
        <div>
          <p className="text-grey-600 font-bold text-2xl mb-4">
            {t('account')}
          </p>

          <p className="text-grey-600 font-bold text-base mb-4">
            {t('name')}:{' '}
            <span className="font-normal">
              {state?.user?.firstName ?? ''} {state?.user?.lastName ?? ''}
            </span>
          </p>

          <p className="text-grey-600 font-bold text-base mb-4">
            Email: <span className="font-normal"> {state?.user?.email}</span>
          </p>
          <p className="text-grey-600 font-bold text-base mb-4">
            {t('password')}: <span className="font-normal">**********</span>
          </p>
        </div>
        <div className="flex items-center mb-4 justify-center lg:justify-end">
          <button
            onClick={() => setOpenPasswordChangeModal(!openPasswordChangeModal)}
            className="bg-pinky-200 text-base font-bold text-grey-600 rounded-xl px-6 py-3"
          >
            {t('change_password')}
          </button>
        </div>
        {openPasswordChangeModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#00000040]">
            <ChangePasswordModal
              onClose={() => setOpenPasswordChangeModal(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
