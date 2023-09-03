import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const AUTH_SETTINGS_STORAGE_KEY = 'auth';

export enum AuthStorageKeys {
  WALK_TRHOUGH = 'walkThrough',
  INTRO_COMPLETE = 'introComplete',
  AUTHENTICATED = 'authenticated',
  USER_ID = 'userId',
}

export interface AuthSettings {
  [AuthStorageKeys.WALK_TRHOUGH]: number;
  [AuthStorageKeys.INTRO_COMPLETE]: boolean;
  [AuthStorageKeys.AUTHENTICATED]: boolean;
  [AuthStorageKeys.USER_ID]?: string;
}

export const initialAuthSettingsState: AuthSettings = {
  [AuthStorageKeys.WALK_TRHOUGH]: 1,
  [AuthStorageKeys.INTRO_COMPLETE]: false,
  [AuthStorageKeys.AUTHENTICATED]: false,
};

export const useAuthSettings = createChromeStorageStateHookLocal<AuthSettings>(
  AUTH_SETTINGS_STORAGE_KEY,
  initialAuthSettingsState
);
