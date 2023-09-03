import { initialAppSettingsState } from '../../context/App/storage';
import { initialBreaksSettingsState } from '../../context/Breaks/storage';
import { initialColorsSettingsState } from '../../context/Colors/storage';
import { initialSoundsSettingsState } from '../../context/Sounds/storage';

import BaseAPI from '../baseApi';

import { UserChromeExtensionSettings, UserProfile } from './types';

export default class UserApi extends BaseAPI {
  public async getProfile(): Promise<UserProfile> {
    const { data } = await this.api.get<UserProfile>('me');
    return data;
  }

  public async getUserExtensionSettings(
    userId: string
  ): Promise<UserChromeExtensionSettings> {
    if (this.mock) {
      return {
        activeTime: initialAppSettingsState.activeTime,
        breaks: initialBreaksSettingsState,
        sounds: initialSoundsSettingsState,
        colors: initialColorsSettingsState,
      };
    }

    const { data } = await this.api.get<UserChromeExtensionSettings>(
      `user/extension-settings/${userId}`
    );
    return data;
  }

  public async updateUserExtensionSettings(
    userId: string,
    settings: UserChromeExtensionSettings
  ): Promise<UserChromeExtensionSettings> {
    if (this.mock) {
      return settings;
    }
    const { data } = await this.api.post<UserChromeExtensionSettings>(
      `user/extension-settings/${userId}`,
      settings
    );
    return data;
  }

  public async getBookmarks(): Promise<{ bookmarks: string[] }> {
    const { data } = await this.api.get<{ bookmarks: string[] }>(
      `user/bookmarks`
    );
    return data;
  }

  public async updateBookmarks({
    bookmarks,
  }: {
    bookmarks: string[];
  }): Promise<{ bookmarks: string[] }> {
    const { data } = await this.api.put<{ bookmarks: string[] }>(
      `user/bookmarks`,
      {
        bookmarks,
      }
    );
    return data;
  }
}
