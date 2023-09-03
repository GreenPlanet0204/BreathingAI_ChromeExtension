import React from 'react';
import { useTranslation } from 'react-i18next';
import AnalyticsIconBox from '../../components/AnalyticsIconBox';

import RocketIcon from '../../../../assets/icons/bx_bx-rocket.png';
import FireIcon from '../../../../assets/icons/fire.png';
import FlowerIcon from '../../../../assets/icons/flower-2.svg';
import EyeIcon from '../../../../assets/icons/single_eye.png';
import { useAnalyticsContext } from '../../../../lib/context/Analytics';

const DashboardGrid = () => {
  const { t } = useTranslation('analytics');
  const { state } = useAnalyticsContext();
  return (
    <div className="content-center bg-white mb-4 grid grid-cols-2 gap-3 dark:bg-transparent">
      <AnalyticsIconBox
        value={state?.totalBreaks.toString() ?? '0'}
        title={t('breaks')}
        copy={t('total_breaks_taken_today_line_1')}
        image={FlowerIcon}
      />
      <AnalyticsIconBox
        value={state?.screenTimeNoBreaks.hours.toString() ?? '0'}
        title={t('hours')}
        copy={t('screen_time_line_1') + t('screen_time_line_2')}
        image={EyeIcon}
      />

      <AnalyticsIconBox
        value={
          state?.totalBreaks
            ? Math.ceil(state?.totalBreaks / 10).toString()
            : '0'
        }
        title={t('days')}
        copy={t('streak')}
        image={FireIcon}
      />
      <AnalyticsIconBox
        value={
          state?.totalBreaks
            ? Math.ceil(state?.totalBreaks / 10).toString()
            : '0'
        }
        title={t('days')}
        copy={t('longest_streak_line_1')}
        image={RocketIcon}
      />
      <AnalyticsIconBox
        value={`${state?.screenTimeNoBreaks.hours.toString() ?? '0'}:${
          state?.screenTimeNoBreaks?.minutes &&
          state?.screenTimeNoBreaks?.minutes < 10
            ? '0'
            : ''
        }${state?.screenTimeNoBreaks.minutes.toString() ?? '0'}`}
        title={`hrs:min`}
        copy={t('screen_time_online')}
        image={EyeIcon}
      />
    </div>
  );
};

export default DashboardGrid;
