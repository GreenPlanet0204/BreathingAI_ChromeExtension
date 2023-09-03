import { createChromeStorageStateHookLocal } from 'use-chrome-storage';
import { AVAILABLE_OPTIONS_ROUTES } from '../../../pages/Options/routing/types';
import { AVAILABLE_POPUP_ROUTES } from '../../../pages/Popup/routing/types';
import { ActiveTime } from '../../api/user/types';
import { THEME, Themes } from './types';

// needed to maintain storage state across pages in extension and register state update

// App Settings
export const APP_SETTINGS_STORAGE_KEY = 'app';

export enum AppStorageKeys {
  PAUSED = 'paused',
  LANGUAGE = 'language',
  TIME = 'activeTime',
  PAUSE_DURATION = 'pauseDuration',
  THEME = 'theme',
}
export enum AVAILABLE_LANGUAGES {
  EN = 'en',
  ES = 'es',
}

export interface AppSettings {
  [AppStorageKeys.PAUSED]: boolean;
  [AppStorageKeys.LANGUAGE]: AVAILABLE_LANGUAGES;
  [AppStorageKeys.TIME]: ActiveTime;
  [AppStorageKeys.PAUSE_DURATION]?: number;
  [AppStorageKeys.THEME]?: Themes;
}

export const initialAppSettingsState: AppSettings = {
  [AppStorageKeys.PAUSED]: false,
  [AppStorageKeys.LANGUAGE]: AVAILABLE_LANGUAGES.EN,
  [AppStorageKeys.TIME]: {
    from: 3600, // 1 am
    to: 82800, // 11 pm
  },
  //Themes.LIGHT
  [AppStorageKeys.THEME]: Themes.LIGHT,
};
export const useAppSettings = createChromeStorageStateHookLocal<AppSettings>(
  APP_SETTINGS_STORAGE_KEY,
  initialAppSettingsState
);

// App Routing
export const ROUTING_SETTINGS_STORAGE_KEY = 'routing';

export enum RoutingStorageKeys {
  CURRENT_POPUP_TAB = 'currentPopupTab',
  CURRENT_OPTIONS_TAB = 'currentOptionsTab',
}

export interface RoutingSettings {
  [RoutingStorageKeys.CURRENT_OPTIONS_TAB]: AVAILABLE_OPTIONS_ROUTES;
  [RoutingStorageKeys.CURRENT_POPUP_TAB]: AVAILABLE_POPUP_ROUTES;
}

export const initialRoutingSettingsState: RoutingSettings = {
  [RoutingStorageKeys.CURRENT_OPTIONS_TAB]: AVAILABLE_OPTIONS_ROUTES.INTRO,
  [RoutingStorageKeys.CURRENT_POPUP_TAB]: AVAILABLE_POPUP_ROUTES.SPLASH,
};

export const useRoutingSettings =
  createChromeStorageStateHookLocal<RoutingSettings>(
    ROUTING_SETTINGS_STORAGE_KEY,
    initialRoutingSettingsState
  );
