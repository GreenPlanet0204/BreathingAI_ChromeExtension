import React from 'react';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const { t } = useTranslation('analytics');

  return (
    <div className="content-center shadow-input bg-white rounded-lg p-4 mb-4 dark:bg-grey-800 dark:shadow-input2">
      <p className="text-xl font-bold text-rurikon-400 mr-4 dark:text-white">
        {t('analytics')}
      </p>
    </div>
  );
};

export default Title;
