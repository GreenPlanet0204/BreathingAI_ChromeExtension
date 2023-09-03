import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_CONTACT_ROUTES } from '../../routing/types';

const Contact = () => {
  const { t } = useTranslation('account');

  return (
    <div className="shadow-input bg-white rounded-lg p-4 mb-4 dark:bg-grey-800 dark:shadow-input2">
      <ul className="list-none">
        <li className="mb-4">
          <a
            href="https://breathing.ai/Contact-Us"
            rel="noreferrer"
            target="_blank"
            className="text-base font-medium text-rurikon-400 mb-2 dark:text-white"
          >
            {t('contact_us')}
          </a>
        </li>
        <li className="mb-4">
          <a
            href={'https://breathing.ai/FAQ'}
            rel="noreferrer"
            target="_blank"
            className="text-base font-medium text-rurikon-400 mb-2 dark:text-white"
          >
            {t('faq')}
          </a>
        </li>
        <li className="mb-4">
          <a
            href="https://breathing.ai/Terms-Of-Service"
            rel="noreferrer"
            target="_blank"
            className="text-base font-medium text-rurikon-400 mb-2 dark:text-white"
          >
            {t('terms_condition')}
          </a>
        </li>
        <li className="mb-4">
          <a
            href="https://breathing.ai/Privacy-Policy"
            rel="noreferrer"
            target="_blank"
            className="text-base font-medium text-rurikon-400 mb-2 dark:text-white"
          >
            {t('privacy_policy')}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
