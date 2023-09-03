import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

// needed to maintain storage state across pages in extension and register state update

// App Settings
export const USER_SETTINGS_STORAGE_KEY = 'user';

export enum UserStorageKeys {
  BOOKMARKS = 'bookmarks',
  SELECTED_VIDEO = 'selected_video',
  SCREEN_TIME_MEASUREMENT = 'screen_time_measurement',
}

export type TimeMeasurmentObject = {
  [key: string]: number;
};

export interface UserSettings {
  [UserStorageKeys.BOOKMARKS]: string[];
  [UserStorageKeys.SELECTED_VIDEO]?: string;
  [UserStorageKeys.SCREEN_TIME_MEASUREMENT]: {
    [key: string]: TimeMeasurmentObject;
  };
}

export const initialAppSettingsState: UserSettings = {
  [UserStorageKeys.BOOKMARKS]: [],
  [UserStorageKeys.SCREEN_TIME_MEASUREMENT]: {},
};
export const useUserSettings = createChromeStorageStateHookLocal<UserSettings>(
  USER_SETTINGS_STORAGE_KEY,
  initialAppSettingsState
);
