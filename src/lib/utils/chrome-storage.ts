/* global chrome */

import {
  AppSettings,
  APP_SETTINGS_STORAGE_KEY,
  initialAppSettingsState,
  initialRoutingSettingsState,
  RoutingSettings,
  ROUTING_SETTINGS_STORAGE_KEY,
} from '../context/App/storage';
import {
  AuthSettings,
  AUTH_SETTINGS_STORAGE_KEY,
  initialAuthSettingsState,
} from '../context/Auth/storage';
import {
  BreaksSettings,
  BREAKS_SETTINGS_STORAGE_KEY,
  initialBreaksSettingsState,
  BREAKS_VIDEO_FILE,
  BreaksVideoSetting,
  BREAK_ACTIVE,
} from '../context/Breaks/storage';
import {
  ColorsSettings,
  COLORS_SETTINGS_STORAGE_KEY,
  initialColorsSettingsState,
} from '../context/Colors/storage';
import {
  initialSoundsSettingsState,
  SoundsSettings,
  SOUNDS_SETTINGS_STORAGE_KEY,
} from '../context/Sounds/storage';
import {
  USER_SETTINGS_STORAGE_KEY,
  UserSettings,
} from '../context/User/storage';

export type AVAILABLE_STORAGEKEYS =
  | typeof APP_SETTINGS_STORAGE_KEY
  | typeof ROUTING_SETTINGS_STORAGE_KEY
  | typeof AUTH_SETTINGS_STORAGE_KEY
  | typeof BREAKS_SETTINGS_STORAGE_KEY
  | typeof SOUNDS_SETTINGS_STORAGE_KEY
  | typeof COLORS_SETTINGS_STORAGE_KEY
  | typeof BREAKS_VIDEO_FILE
  | typeof USER_SETTINGS_STORAGE_KEY
  | typeof BREAK_ACTIVE;

export type ValuSettingseMap = {
  [APP_SETTINGS_STORAGE_KEY]: AppSettings;
  [ROUTING_SETTINGS_STORAGE_KEY]: RoutingSettings;
  [AUTH_SETTINGS_STORAGE_KEY]: AuthSettings;
  [BREAKS_SETTINGS_STORAGE_KEY]: BreaksSettings;
  [SOUNDS_SETTINGS_STORAGE_KEY]: SoundsSettings;
  [COLORS_SETTINGS_STORAGE_KEY]: ColorsSettings;
  [BREAKS_VIDEO_FILE]: BreaksVideoSetting;
  [USER_SETTINGS_STORAGE_KEY]: UserSettings;
  [BREAK_ACTIVE]: boolean;
};

export async function ResetChromeStorage() {
  // Set to initial state
  await updateStorageSettingsKeyValue(
    APP_SETTINGS_STORAGE_KEY,
    initialAppSettingsState
  );
  await updateStorageSettingsKeyValue(
    ROUTING_SETTINGS_STORAGE_KEY,
    initialRoutingSettingsState
  );
  await updateStorageSettingsKeyValue(
    AUTH_SETTINGS_STORAGE_KEY,
    initialAuthSettingsState
  );
  await updateStorageSettingsKeyValue(
    BREAKS_SETTINGS_STORAGE_KEY,
    initialBreaksSettingsState
  );
  await updateStorageSettingsKeyValue(
    SOUNDS_SETTINGS_STORAGE_KEY,
    initialSoundsSettingsState
  );
  await updateStorageSettingsKeyValue(
    COLORS_SETTINGS_STORAGE_KEY,
    initialColorsSettingsState
  );
  await updateStorageSettingsKeyValue(BREAK_ACTIVE, false);
}

// Function to update storage key without hook
export async function updateStorageSettingsKeyValue<
  T extends AVAILABLE_STORAGEKEYS
>(setting: T, value: ValuSettingseMap[T]) {
  await chrome.storage.local.set({
    [setting]: value,
  });
}
// Function to get storage key without hook
export async function getStorageSettingsKeyValue<
  T extends AVAILABLE_STORAGEKEYS
>(key: T, cb: (settings: ValuSettingseMap[T]) => void) {
  await chrome.storage.local.get(key, (value) => {
    cb(value[key] as ValuSettingseMap[T]);
  });
}

export async function getStorageSettingsKeysValue<
  T extends AVAILABLE_STORAGEKEYS
>(keys: T[], cb: (settings: { [k in T]: ValuSettingseMap[k] }) => void) {
  await chrome.storage.local.get(keys, (value) => {
    cb(value as { [k in T]: ValuSettingseMap[k] });
  });
}

// Function to add listener on settings change in storage
export async function addListenerChromeStorageSettingsValue<
  T extends AVAILABLE_STORAGEKEYS
>(key: T, cb: (settings: ValuSettingseMap[T]) => void) {
  await chrome.storage.local.onChanged.addListener((ChromeChangeObject) => {
    if (key in ChromeChangeObject) {
      cb(ChromeChangeObject[key].newValue);
    }
  });
}

// Function to add listener on settings change in storage
export async function addListenerChromeStorageSettingsValues<
  T extends AVAILABLE_STORAGEKEYS
>(
  keys: T[],
  cb: (settings: {
    [k in T]?: ValuSettingseMap[k] | undefined;
  }) => void
) {
  await chrome.storage.local.onChanged.addListener((ChromeChangeObject) => {
    const newStorage: { [k in T]?: ValuSettingseMap[k] } = keys.reduce(
      (acc, val) => ({ ...acc, [val]: ChromeChangeObject[val]?.newValue }),
      {}
    );
    cb(newStorage);
  });
}
