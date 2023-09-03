import { AppSettings } from '../../context/App/storage';
import { BreaksSettings } from '../../context/Breaks/storage';
import { ColorsSettings } from '../../context/Colors/storage';
import { SoundsSettings } from '../../context/Sounds/storage';
import BaseAPI from '../baseApi';

export default class SettingsApi extends BaseAPI {
  public async updateColorsSettings(
    settings: ColorsSettings
  ): Promise<ColorsSettings> {
    if (this.mock) {
      return settings;
    }
    const { data } = await this.api.put<ColorsSettings>(
      `/browser-extension/colors-settings`,
      settings
    );
    return data;
  }

  public async getColorsSettings(): Promise<ColorsSettings> {
    const { data } = await this.api.get<ColorsSettings>(
      `/browser-extension/colors-settings`
    );
    return data;
  }

  public async updateBreaksSettings(
    settings: BreaksSettings
  ): Promise<BreaksSettings> {
    if (this.mock) {
      return settings;
    }
    const { data } = await this.api.put<BreaksSettings>(
      `/browser-extension/breaks-settings`,
      settings
    );

    return data;
  }

  public async getBreaksSettings(): Promise<BreaksSettings> {
    const { data } = await this.api.get<BreaksSettings>(
      `/browser-extension/breaks-settings`
    );

    return data;
  }

  public async updateAppSettings(settings: AppSettings): Promise<AppSettings> {
    if (this.mock) {
      return settings;
    }
    const { data } = await this.api.put<AppSettings>(
      `/browser-extension/app-settings`,
      settings
    );
    return data;
  }

  public async getAppSettings(): Promise<AppSettings> {
    const { data } = await this.api.get<AppSettings>(
      `/browser-extension/app-settings`
    );
    return data;
  }

  public async updateSoundsSettings(
    settings: SoundsSettings
  ): Promise<SoundsSettings> {
    if (this.mock) {
      return settings;
    }
    const { data } = await this.api.put<SoundsSettings>(
      `/browser-extension/sounds-settings`,
      settings
    );
    return data;
  }

  public async getSoundsSettings(userId: string): Promise<SoundsSettings> {
    const { data } = await this.api.get<SoundsSettings>(
      `/browser-extension/sounds-settings`
    );
    return data;
  }
}
