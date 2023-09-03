import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { Themes } from '../../../../lib/context/App/types';
import UpArrow from '../../../../assets/icons/top_arrow.svg';
import DownArrow from '../../../../assets/icons/down_arrow.svg';
import UpArrowDark from '../../../../assets/icons/top_arrow_dark.svg';
import DownArrowDark from '../../../../assets/icons/down_arrow_dark.svg';

const HowToBreaks = () => {
  const { t } = useTranslation('breaks');
  const [expanded, setExpanded] = useState<boolean>(false);
  const { appSettings } = useAppContext();

  const isDarkMode = appSettings?.theme === Themes.DARK;

  const getArrowIcon = () => {
    if (isDarkMode) {
      return expanded ? UpArrowDark : DownArrowDark;
    } else {
      return expanded ? UpArrow : DownArrow;
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className="shadow-input w-full mb-4 rounded-2xl dark:shadow-input2 dark:bg-grey-800"
    >
      <h2 id="accordion-collapse-heading-1" className="w-full">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-bold text-lg text-left text-rurikon
           border-b-0 border-gray-200 rounded-t-xl focus:ring-0 focus:ring-gray-200 dark:text-white
           dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-grey-800 dark:hover:rounded-2xl"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          onClick={handleExpand}
          aria-controls="accordion-collapse-body-1"
        >
          <span>{t('howTo.title')}</span>
          <img src={getArrowIcon()} alt="arrow" />
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`${expanded ? '' : 'hidden'}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 shadow-input rounded-xl dark:border-gray-700 dark:bg-grey-800 dark:shadow-none">
          <p className="mb-2 text-gray-500 dark:text-white">
            <span>{t('howTo.text')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToBreaks;
