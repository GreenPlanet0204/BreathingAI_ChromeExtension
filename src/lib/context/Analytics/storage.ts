import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const ANALYTICS_SETTINGS_STORAGE_KEY = 'analytics';

export enum AnalyticsStorageKeys {
  SCREEN_TIMER_START_TIME = 'screen_start_time',
}

export interface AnalyticsSettings {
  [AnalyticsStorageKeys.SCREEN_TIMER_START_TIME]: Date;
}

export const initialAnalyticsSettingsState: AnalyticsSettings = {
  [AnalyticsStorageKeys.SCREEN_TIMER_START_TIME]: new Date(),
};

export const useAnalyticsSettings =
  createChromeStorageStateHookLocal<AnalyticsSettings>(
    ANALYTICS_SETTINGS_STORAGE_KEY,
    initialAnalyticsSettingsState
  );
