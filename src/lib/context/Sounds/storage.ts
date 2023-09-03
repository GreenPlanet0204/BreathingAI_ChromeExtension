import { createChromeStorageStateHookLocal } from 'use-chrome-storage';
import { STATIONS } from '../../../pages/Offscreen/Radio/types';

export const SOUNDS_SETTINGS_STORAGE_KEY = 'sounds';

export enum SoundsStorageKeys {
  PLAY = 'play',
  STATION = 'station',
  VOLUME = 'volume',
  TRACK = 'track',
}

export interface SoundsSettings {
  [SoundsStorageKeys.PLAY]: boolean;
  [SoundsStorageKeys.STATION]: STATIONS;
  [SoundsStorageKeys.VOLUME]: number;
  [SoundsStorageKeys.TRACK]: number;
}

export const initialSoundsSettingsState: SoundsSettings = {
  [SoundsStorageKeys.PLAY]: false,
  [SoundsStorageKeys.STATION]: STATIONS.ZEN,
  [SoundsStorageKeys.VOLUME]: 0.5,
  [SoundsStorageKeys.TRACK]: 0,
};

export const useSoundsSettings =
  createChromeStorageStateHookLocal<SoundsSettings>(
    SOUNDS_SETTINGS_STORAGE_KEY,
    initialSoundsSettingsState
  );
