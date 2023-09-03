import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../../lib/context/Auth';
import { useBreaksContext } from '../../../../lib/context/Breaks';
import {
  BreaksStorageKeys,
  BreaksSettings,
} from '../../../../lib/context/Breaks/storage';
import services from '../../../../lib/utils/services';
import Reminder from './reminder';
import Toggle from '../../components/Toggle';

import { useAppContext } from '../../../../lib/context/App';

const Toggles = () => {
  const { t } = useTranslation('breaks');
  const { breaksSettings, setBreaksSettings } = useBreaksContext();
  const { appSettings } = useAppContext();
  const { authSettings, state, setAuthSettings } = useAuthContext();
  const { api } = services;

  const handleToggle = async <T extends BreaksStorageKeys>(
    storageKey: T,
    value: BreaksSettings[T]
  ) => {
    if (setBreaksSettings && state?.user?.id && breaksSettings) {
      const newSettings: BreaksSettings = {
        ...breaksSettings,
        [storageKey]: value,
      };
      const newBreakSettings = await api.Settings.updateBreaksSettings(
        newSettings
      );
      setBreaksSettings(() => {
        return newBreakSettings;
      });
    }

    if (
      setAuthSettings &&
      authSettings?.walkThrough !== 6 &&
      storageKey === 'enabled' &&
      value === true
    ) {
      setAuthSettings((prevState) => ({
        ...prevState,
        walkThrough: 2,
      }));
    }
  };

  return (
    <div>
      <div className="content-center shadow-input bg-white rounded-lg p-4 dark:shadow-input2 dark:bg-grey-800">
        <Toggle
          id="toggle_1"
          label={t('break_reminders')}
          checked={breaksSettings?.enabled || false}
          disabled={appSettings?.paused || false}
          onChange={() =>
            handleToggle(BreaksStorageKeys.ENABLED, !breaksSettings?.enabled)
          }
        />
        <Toggle
          id="toggle_2"
          label={t('alert_sound')}
          checked={breaksSettings?.alert || false}
          disabled={appSettings?.paused || false}
          onChange={() =>
            handleToggle(BreaksStorageKeys.ALERT, !breaksSettings?.alert)
          }
        />
        <Reminder
          setBreaksFrequency={(value) =>
            handleToggle(BreaksStorageKeys.FREQUENCY, value)
          }
        />
      </div>
    </div>
  );
};

export default Toggles;
