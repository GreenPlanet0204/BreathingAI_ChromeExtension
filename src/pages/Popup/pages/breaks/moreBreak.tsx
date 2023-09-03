import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_MORE_BREAK_ROUTES } from '../../routing/types';
import { useAppContext } from '../../../../lib/context/App';
import { Themes } from '../../../../lib/context/App/types';
import { Wind } from '@phosphor-icons/react';
export const MoreBreak: React.FC = () => {
  const { t } = useTranslation('breaks');
  const { appSettings } = useAppContext();

  const isDarkMode = appSettings?.theme === Themes.DARK;

  return (
    <div className="shadow-input rounded-b-xl mt-8 mb-4 py-4 px-2 dark:shadow-input2 dark:bg-grey-800 rounded-2xl">
      <p className="font-bold text-xl mb-4 dark:text-white">{t('explore')}</p>
      <div className="grid grid-cols-3 gap-3 mb-1">
        <Link
          to={AVAILABLE_MORE_BREAK_ROUTES.MOVEMENT}
          target="_blank"
          className={`relative border-2 border-lavender-800 rounded-xl py-1 text-sm font-bold leading-4 h-[108px] w-[108px]`}
        >
          <img
            src={
              isDarkMode
                ? '/src/assets/icons/movement_dark.png'
                : '/src/assets/icons/movement.png'
            }
            alt={t('movement') || 'movement'}
            className="mx-auto mt-2 w-[40px]"
          />
          <div className="absolute bottom-3 w-full text-center dark:text-white">
            {t('movement')}
          </div>
        </Link>
        <Link
          to={AVAILABLE_MORE_BREAK_ROUTES.MEDITATION}
          target="_blank"
          className={`relative border-2 border-lavender-800 rounded-xl py-1 text-sm font-bold leading-4 h-[108px] w-[108px]`}
        >
          <img
            src={
              isDarkMode
                ? '/src/assets/icons/smiley_dark.png'
                : '/src/assets/icons/smiley.png'
            }
            alt={t('meditation') || 'meditation'}
            className="mx-auto mt-2 w-[50px]"
          />
          <div className="absolute bottom-3 w-full text-center dark:text-white">
            {t('meditation')}
          </div>
        </Link>
        <Link
          to={AVAILABLE_MORE_BREAK_ROUTES.BREATHWORK}
          target="_blank"
          className={`relative border-2 border-lavender-800 rounded-xl py-1 text-sm font-bold leading-4 h-[108px] w-[108px]`}
        >
          <Wind
            size={65}
            color={isDarkMode ? '#fff' : '#000'}
            className="mx-auto"
          />
          <div className="absolute bottom-3 w-full text-center dark:text-white">
            {t('breathwork')}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MoreBreak;
