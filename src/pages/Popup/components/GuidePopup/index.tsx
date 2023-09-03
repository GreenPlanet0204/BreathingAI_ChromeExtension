import React, { useState } from 'react';

import { useAuthContext } from '../../../../lib/context/Auth';
import { useTranslation } from 'react-i18next';
import { RoutingStorageKeys } from '../../../../lib/context/App/storage';
import { AVAILABLE_POPUP_ROUTES } from '../../routing/types';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../../lib/context/App';
export interface GuidePopupModel {
  openModal: boolean;
  handleClose: () => void;
}

const GuidePopup = (props: GuidePopupModel) => {
  const { openModal, handleClose } = props;
  const [step, setStep] = useState(0);
  const { authSettings, setAuthSettings } = useAuthContext();

  const { t } = useTranslation('tutorialPopup');
  const navigate = useNavigate();
  const { setRouterSettings } = useAppContext();

  const handleLastStep = () => {
    setStep(5);

    navigate(AVAILABLE_POPUP_ROUTES.WELCOME);
  };

  return (
    <>
      {step === 0 && (
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
            openModal ? '' : 'hidden'
          }`}
          id="defaultModal"
        >
          <div className="relative top-72 mx-auto p-3 w-[290px] rounded-lg bg-white dark:bg-grey-800">
            <h2 className="text-rurikon-400 dark:text-white font-bold text-xl mb-3">
              {t('welcome_to_breathing')}
            </h2>
            <p className="text-rurikon-400 dark:text-white font-medium text-base leading-5 mb-5 max-w-[250px]">
              {t('to_help_you_get_started')}
            </p>
            <div className="flex justify-end">
              <button
                className="bg-transparent text-grey-400 dark:text-grey-200 py-1 text-sm font-bold px-4 mr-4"
                onClick={handleClose}
              >
                {t('skip')}
              </button>
              <button
                className="bg-honey-400 font-medium text-base rounded text-rurikon-400 py-1 px-4"
                onClick={() => setStep(1)}
              >
                {t('ok_lets_go')}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <>
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-[210px] w-full ${
              openModal ? '' : 'hidden'
            }`}
            id="defaultModal"
          ></div>
          <div
            className={`fixed top-[270px] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
              openModal ? '' : 'hidden'
            }`}
            id="defaultModal"
          >
            <div className="relative top-10 mx-auto p-3 w-[290px] rounded-lg bg-white dark:bg-grey-800">
              <div>
                <h2 className="text-rurikon-400 dark:text-white font-bold text-xl mb-3">
                  {t('break_reminders')}
                </h2>
                <p className="text-rurikon-400 dark:text-white font-medium text-base mb-2 leading-5 max-w-[250px]">
                  {t('when_enabled_we_will_send')}
                </p>
                <p className="text-rurikon-400 dark:text-white font-medium text-base mb-5 max-w-[250px]">
                  {t('try_turning_it')}
                </p>
                {authSettings?.walkThrough === 2 && (
                  <div className="flex justify-end">
                    <button
                      className="bg-honey-400 font-medium text-base rounded text-rurikon-400 py-1 px-4"
                      onClick={() => setStep(2)}
                    >
                      {t('ok_lets_go')}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-rurikon-300 dark:text-grey-200 text-sm mr-4">
                  {step} of 4
                </div>
                <div className="relative">
                  <div className="bg-grey-200 dark:bg-grey-400 h-2 w-28 rounded"></div>
                  <div
                    className={`absolute top-0 bg-rurikon-300 dark:bg-grey-200 h-2 w-1/4 rounded`}
                  ></div>
                </div>
                <div>
                  <button
                    className="bg-transparent text-grey-400 dark:text-grey-200 py-1 text-sm font-bold px-4 ml-4"
                    onClick={handleClose}
                  >
                    {t('skip')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-[260px] w-full ${
              openModal ? '' : 'hidden'
            }`}
            id="defaultModal"
          ></div>
          <div
            className={`fixed top-[400px] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
              openModal ? '' : 'hidden'
            }`}
            id="defaultModal"
          >
            <div className="relative top-3 mx-auto p-3 w-[290px] rounded-lg bg-white dark:bg-grey-800">
              <div>
                <h2 className="text-rurikon-400 dark:text-white font-bold text-xl mb-3">
                  {t('break_reminders')}
                </h2>
                <p className="text-rurikon-400 dark:text-white font-medium text-base mb-2 leading-5 max-w-[250px]">
                  {t('customize_the_frequency')}
                </p>

                {authSettings?.walkThrough === 3 && (
                  <div className="flex justify-end">
                    <button
                      className="bg-honey-400 font-medium text-base rounded text-rurikon-400 py-1 px-4"
                      onClick={() => {
                        setStep(3);
                        if (setRouterSettings) {
                          setRouterSettings((prevState) => ({
                            ...prevState,
                            [RoutingStorageKeys.CURRENT_POPUP_TAB]:
                              AVAILABLE_POPUP_ROUTES.COLORS,
                          }));
                        }
                      }}
                    >
                      {t('next')}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-rurikon-300 dark:text-grey-200 text-sm mr-4">
                  {step} of 4
                </div>
                <div className="relative">
                  <div className="bg-grey-200 dark:bg-grey-400 h-2 w-28 rounded"></div>
                  <div
                    className={`absolute top-0 bg-rurikon-300 dark:bg-grey-200 h-2 w-1/2  rounded`}
                  ></div>
                </div>
                <div>
                  <button
                    className="bg-transparent text-grey-400 dark:text-grey-200 py-1 text-sm font-bold px-4 ml-4"
                    onClick={handleClose}
                  >
                    {t('skip')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {authSettings?.walkThrough === 3 && (
            <>
              <div
                className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-[130px] w-full ${
                  openModal ? '' : 'hidden'
                }`}
                id="defaultModal"
              ></div>
              <div
                className={`fixed top-[200px] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
                  openModal ? '' : 'hidden'
                }`}
                id="defaultModal"
              >
                <div className="relative top-3 mx-auto p-3 w-[290px] rounded-lg bg-white dark:bg-grey-800">
                  <div>
                    <h2 className="text-rurikon-400 dark:text-white font-bold text-xl mb-3">
                      {t('color_tinting')}
                    </h2>
                    <p className="text-rurikon-400 dark:text-white font-medium text-base mb-2 leading-5 max-w-[250px]">
                      {t('if_spend_a_lot_of_time')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-rurikon-300 dark:text-grey-200 text-sm mr-4">
                      {step} of 4
                    </div>
                    <div className="relative">
                      <div className="bg-grey-200 dark:bg-grey-400 h-2 w-28 rounded"></div>
                      <div
                        className={`absolute top-0 bg-rurikon-300 dark:bg-grey-200 h-2 w-3/4  rounded`}
                      ></div>
                    </div>
                    <div>
                      <button
                        className="bg-transparent text-grey-400 dark:text-grey-200 py-1 text-sm font-bold px-4 ml-4"
                        onClick={handleClose}
                      >
                        {t('skip')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {authSettings && authSettings.walkThrough >= 4 && (
            <>
              <div
                className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-[315px] w-full ${
                  openModal ? '' : 'hidden'
                }`}
                id="defaultModal"
              >
                <div className="relative top-[115px] mx-auto p-3 w-[290px] rounded-lg bg-white dark:bg-grey-800">
                  <div>
                    <h2 className="text-rurikon-400 dark:text-white font-bold text-xl mb-3">
                      {t('customize_your_tint')}
                    </h2>
                    <p className="text-rurikon-400 dark:text-white font-medium text-base mb-2 leading-5 max-w-[250px]">
                      {t('hey_your_screen_turned_blue')}
                    </p>

                    {authSettings?.walkThrough === 5 && (
                      <div className="flex justify-end">
                        <button
                          className="bg-honey-400 font-medium text-base rounded text-rurikon-400 py-1 px-4"
                          onClick={() => handleLastStep()}
                        >
                          {t('next')}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-rurikon-300 dark:text-grey-200 text-sm mr-4">
                      {authSettings?.walkThrough === 4 ? '3' : '4'} of 4
                    </div>
                    <div className="relative">
                      <div className="bg-grey-200 dark:bg-grey-400 h-2 w-28 rounded"></div>
                      {authSettings?.walkThrough === 4 && (
                        <div
                          className={`absolute top-0 bg-rurikon-300 dark:bg-grey-200 h-2 w-3/4 rounded`}
                        ></div>
                      )}
                      {authSettings?.walkThrough === 5 && (
                        <div
                          className={`absolute top-0 bg-rurikon-300 dark:bg-grey-200 h-2 w-full rounded`}
                        ></div>
                      )}
                    </div>
                    <div>
                      <button
                        className="bg-transparent text-grey-400 dark:text-grey-200 py-1 text-sm font-bold px-4 ml-4"
                        onClick={handleClose}
                      >
                        {t('skip')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`fixed top-[440px] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
                  openModal ? '' : 'hidden'
                }`}
                id="defaultModal"
              ></div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default GuidePopup;
