import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { AVAILABLE_OPTIONS_ROUTES } from '../../routing/types';

const Intro = () => {
  const { t } = useTranslation('welcome');
  const { setRouterSettings } = useAppContext();

  return (
    <>
      <h1 className='text-center font-semibold text-[40px]'>
        <Trans i18nKey={'welcome.title'} n={'welcome'}>
          {t('success')}
          <br /> {t('first_hardest')}
        </Trans>
      </h1>
      <img
        src="/src/assets/images/whale-celebrate.png"
        className='mx-auto max-w-[300px] mt-4 mb-10'
        alt="whale celebrate"
      />
      <p className='text-2xl font-medium text-grey-600 max-w-[620px] text-center mx-auto'>
        {t('second_sentense')}
      </p>
      <div className='w-full flex justify-center mt-10 mb-4'>
        <button
          onClick={() =>
            setRouterSettings &&
            setRouterSettings((prevState) => ({
              ...prevState,
              currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.EXPERIENCE,
            }))
          }
          className="bg-pinky-400 text-grey-600 p-2 rounded-xl w-[340px] mx-auto font-bold text-xl"
        >
          {t('get_started')}
        </button>
      </div>
    </>
  );
};

export default Intro;
