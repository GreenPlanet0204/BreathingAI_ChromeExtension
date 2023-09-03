import { createChromeStorageStateHookLocal } from 'use-chrome-storage';

// mock array for Tint Colors
export const fallBackColorsArray = [
  '#EBCF6B',
  '#B9AD8C',
  '#F1812E',
  '#E7595B',
  '#90CCE5',
  '#F4BDF0',
];

export const COLORS_SETTINGS_STORAGE_KEY = 'colors';

export enum ColorsStorageKeys {
  ENABLED = 'enabled',
  OPACITY = 'opacity',
  SELECTED_COLOR = 'selectedColor',
}

export interface ColorsSettings {
  [ColorsStorageKeys.ENABLED]: boolean;
  [ColorsStorageKeys.OPACITY]: string;
  [ColorsStorageKeys.SELECTED_COLOR]: string;
}

export const initialColorsSettingsState: ColorsSettings = {
  [ColorsStorageKeys.ENABLED]: false,
  [ColorsStorageKeys.OPACITY]: '0.5',
  [ColorsStorageKeys.SELECTED_COLOR]: fallBackColorsArray[0],
};

export const useColorsSettings =
  createChromeStorageStateHookLocal<ColorsSettings>(
    COLORS_SETTINGS_STORAGE_KEY,
    initialColorsSettingsState
  );
