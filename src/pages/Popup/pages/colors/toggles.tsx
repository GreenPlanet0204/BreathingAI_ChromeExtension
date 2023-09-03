import React from 'react';
import { useAuthContext } from '../../../../lib/context/Auth';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { useColorsContext } from '../../../../lib/context/Colors';
import Toggle from '../../components/Toggle';
import {
  ColorsSettings,
  ColorsStorageKeys,
} from '../../../../lib/context/Colors/storage';
import services from '../../../../lib/utils/services';

const Toggles = () => {
  const { t } = useTranslation('colors');
  const { colorsSettings, setColorsSettings } = useColorsContext();
  const { appSettings } = useAppContext();
  const { authSettings, setAuthSettings, state } = useAuthContext();
  const { api } = services;
  const handleToggle = async <T extends ColorsStorageKeys>(
    storageKey: T,
    value: ColorsSettings[T]
  ) => {
    if (setColorsSettings && state?.user?.id && colorsSettings) {
      const newSettings: ColorsSettings = {
        ...colorsSettings,
        [storageKey]: value,
      };
      const newColorSettings = await api.Settings.updateColorsSettings(
        newSettings
      );
      setColorsSettings(() => {
        return newColorSettings;
      });
    }

    if (
      setAuthSettings &&
      !colorsSettings?.enabled &&
      authSettings?.walkThrough !== 6
    ) {
      setAuthSettings((prevState) => ({
        ...prevState,
        walkThrough: 4,
      }));
    }
  };

  return (
    <div className="mb-4">
      <div className="content-center shadow-input bg-white rounded-lg p-4 dark:shadow-input2 dark:bg-grey-800">
        <Toggle
          id="tint_colors_toggle"
          label={t('screen_tint_colors')}
          onChange={() =>
            handleToggle(ColorsStorageKeys.ENABLED, !colorsSettings?.enabled)
          }
          disabled={appSettings?.paused || false}
          checked={colorsSettings?.enabled ?? false}
          align="between"
        />
      </div>
    </div>
  );
};

export default Toggles;
