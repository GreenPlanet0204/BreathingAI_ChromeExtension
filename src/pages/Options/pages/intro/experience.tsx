import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';

import { AVAILABLE_OPTIONS_ROUTES } from '../../routing/types';

const Experience = () => {
  const { t } = useTranslation('welcome');
  const { setRouterSettings } = useAppContext();

  const handleCompleteIntro = () => {
    if (setRouterSettings) {
      setRouterSettings((prevState) => ({
        ...prevState,
        currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.REGISTER,
      }));
    }
  };

  const experiences = [
    {
      image: '/src/assets/images/lotus.svg',
      title: t('smart_break'),
      description: t('incorporate_break_sentense'),
    },
    {
      image: '/src/assets/images/drop.svg',
      title: t('calming_colors'),
      description: t('discover_your_sentense'),
    },
    {
      image: '/src/assets/images/music.svg',
      title: t('focus_sounds'),
      description: t('keep_yourself_sentense'),
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mt-10">
        <Trans i18nKey={'welcome.title'} n={'welcome'}>
          You're on your way to a <br />
          more relaxing screen experience.
        </Trans>
      </h1>
      <div className="max-w-[1080px] grid grid-cols-3 gap-4 my-10 mx-auto">
        {experiences.map((experience) => (
          <div className="text-center max-w-[320px]" key={experience.title}>
            <div className="bg-tulip-300 rounded-full p-4 h-44 w-44 flex items-center justify-center mx-auto mb-4">
              <img src={experience.image} alt={experience.title} className="" />
            </div>
            <h4 className="font-medium text-3xl text-grey-600 mb-3">
              {experience.title}
            </h4>
            <p className="text-xl text-grey-600">{experience.description}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto my-8 flex">
        <button
          className="bg-pinky-400 text-grey-600 p-2 rounded-xl w-[340px] mx-auto font-bold text-xl"
          onClick={() => handleCompleteIntro()}
        >
          {t('sign_up')}
        </button>
      </div>
      <div className="font-medium text-base text-black text-center">
        {t('your_data_is_safe')} -{' '}
        <a
          href="https://breathing.ai/Privacy-Policy"
          rel="noreferrer"
          target="_blank"
          className="text-pinky-600"
        >
          {t('privacy_policy')}
        </a>
      </div>
    </>
  );
};

export default Experience;
