import { UserChromeExtensionSettings } from '../api/user/types';

export const getAppSettings = (userSettings: UserChromeExtensionSettings) => {
  return userSettings.activeTime;
};

export const getBreaksSettings = (
  userSettings: UserChromeExtensionSettings
) => {
  return userSettings.breaks;
};

export const getColorsSettings = (
  userSettings: UserChromeExtensionSettings
) => {
  return userSettings.colors;
};

export const getSoundsSettings = (
  userSettings: UserChromeExtensionSettings
) => {
  return userSettings.sounds;
};

// export const useMergeSettings = (
//   newSettings: Partial<UserChromeExtensionSettings>
// ): UserChromeExtensionSettings => {
//   const [appSettings] = useAppSettings();
//   const [breaksSettings] = useBreaksSettings();
//   const [colorsSettings] = useColorsSettings();
//   const [soundsSettings] = useSoundsSettings();

//   return {
//     activeTime: appSettings.activeTime,
//     breaks: breaksSettings,
//     colors: colorsSettings,
//     sounds: soundsSettings,
//     ...newSettings,
//   };
// };
