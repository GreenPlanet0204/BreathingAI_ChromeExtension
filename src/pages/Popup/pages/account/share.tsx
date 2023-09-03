import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { Themes } from '../../../../lib/context/App/types';

import TwitterIcon from '../../../../assets/icons/social/twitter.svg';
import LinkedInIcon from '../../../../assets/icons/social/linkedin.svg';
import FacebookIcon from '../../../../assets/icons/social/facebook.svg';
import CoolLinkIcon from '../../../../assets/icons/social/coolicon.svg';

import TwitterDarkIcon from '../../../../assets/icons/social/twitter_dark.svg';
import LinkedInDarkIcon from '../../../../assets/icons/social/linkedin_dark.svg';
import FacebookDarkIcon from '../../../../assets/icons/social/facebook_dark.svg';
import CoolLinkDarkIcon from '../../../../assets/icons/social/coolicon_dark.svg';

const ShareSection = () => {
  const { t } = useTranslation('account');
  const { appSettings } = useAppContext();

  const isDarkMode = appSettings?.theme === Themes.DARK;
  return (
    <div className="shadow-input flex items-center bg-white rounded-lg p-4 mb-4 dark:bg-grey-800 dark:shadow-input2">
      <p className="text-base font-medium text-rurikon-400 mb-2 mr-12 dark:text-white">
        {t('share')}
      </p>
      <div className="flex items-center">
        <a
          href={'https://twitter.com/breathing_ai'}
          target="_blank"
          className="text-base font-medium text-rurikon-400 mr-4 dark:text-white"
          rel="noreferrer"
        >
          <img src={isDarkMode ? TwitterDarkIcon : TwitterIcon} alt="twitter" />
        </a>
        <a
          href={'https://www.facebook.com/breathingai/'}
          target="_blank"
          className="text-base font-medium text-rurikon-400 mr-4 dark:text-white"
          rel="noreferrer"
        >
          <img
            src={isDarkMode ? FacebookDarkIcon : FacebookIcon}
            alt="facebook"
          />
        </a>
        <a
          href={'https://www.linkedin.com/company/breathingai/'}
          target="_blank"
          className="text-base font-medium text-rurikon-400 mr-4 dark:text-white"
          rel="noreferrer"
        >
          <img
            src={isDarkMode ? LinkedInDarkIcon : LinkedInIcon}
            alt="Linkedin"
          />
        </a>
        <a
          href={
            'https://chrome.google.com/webstore/detail/breathingai-productivity/egiocjnbjddanaamoeaikpmddlngpjcm'
          }
          target="_blank"
          className="text-base font-medium text-rurikon-400 mr-4 dark:text-white"
          rel="noreferrer"
        >
          <img
            src={isDarkMode ? CoolLinkDarkIcon : CoolLinkIcon}
            alt="cool link"
          />
        </a>
      </div>
    </div>
  );
};

export default ShareSection;
