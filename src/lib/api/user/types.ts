import { BreaksSettings } from '../../context/Breaks/storage';
import { ColorsSettings } from '../../context/Colors/storage';
import { SoundsSettings } from '../../context/Sounds/storage';

export enum DeviceTypes {
  WEBSITE = 'website',
  BROWSER_EXTENSION = 'browser_extension',
  FIT_BIT = 'fit_bit',
  WATCH_OS = 'watch_os',
}

export interface UserDevices {
  id: string;
  name: string;
  type: DeviceTypes;
}

export interface User {
  id: string;
  name: string;
  devices: UserDevices[];
}

export interface UserProfile {
  email: string;
  emailVerified: boolean;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  verificationToken: string;
}

export interface UserChromeExtensionSettings {
  activeTime: ActiveTime;
  breaks: BreaksSettings;
  sounds: SoundsSettings;
  colors: ColorsSettings;
}

export type ActiveTime = {
  from: number; //between 0 - 86400 seconds (86400 in a day)
  to: number;
};
