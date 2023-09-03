import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

export const BREAKS_VIDEO_FILE = 'videoFile';
export const BREAK_ACTIVE = 'breakActive';

export interface BreaksVideoSetting {
  url: string;
  name: string;
  description: string;
}

export const BREAKS_SETTINGS_STORAGE_KEY = 'breaks';

export enum BreaksStorageKeys {
  ENABLED = 'enabled',
  ALERT = 'alert',
  FREQUENCY = 'frequency',
}

export interface BreaksSettings {
  [BreaksStorageKeys.ENABLED]: boolean;
  [BreaksStorageKeys.ALERT]: boolean;
  [BreaksStorageKeys.FREQUENCY]: number;
}

export const initialBreaksSettingsState: BreaksSettings = {
  [BreaksStorageKeys.ENABLED]: false,
  [BreaksStorageKeys.ALERT]: false,
  [BreaksStorageKeys.FREQUENCY]: 3600,
};

export const useBreaksSettings =
  createChromeStorageStateHookLocal<BreaksSettings>(
    BREAKS_SETTINGS_STORAGE_KEY,
    initialBreaksSettingsState
  );
