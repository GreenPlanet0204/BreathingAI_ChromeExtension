import { ResetChromeStorage } from '../../utils/chrome-storage';
import BaseAPI from '../baseApi';
// import { getTokenCookie, MAX_AGE } from "@utils/authentication/cookies";
import { User } from '../user/types';
export const AUTH_TOKEN = 'session';

export enum LOGIN_METHODS {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  TWITTER = 'twitter',
}

export default class SecurityApi extends BaseAPI {
  public async login(credentials: { email: string; password: string }) {
    if (this.mock) {
      return;
    }
    const { data } = await this.api.post<{ token: string }>(
      'login',
      credentials
    );
    await this.setLoginSession(data.token);
  }

  public async loginWithProvider(provider: LOGIN_METHODS) {
    try {
      const { data } = await this.api.get<{ redirectUrl?: string }>(
        `/auth/thirdparty/${provider}`
      );
      if (data.redirectUrl) {
        const loginWindow = await chrome.windows.create({
          url: data.redirectUrl,
          type: 'popup',
          focused: true,
          height: 500,
          width: 300,
        });

        await setTimeout(async () => {
          if (loginWindow && loginWindow.id) {
            // check if necessarys
            await chrome.windows.remove(loginWindow.id);
          }
        }, 6000);
      }
    } catch (error) {
      throw new Error();
    }
  }

  public async register(credentials: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.api.post<User>('signup', credentials);
  }

  public async changePassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    if (this.mock) {
      return;
    }
    await this.api.put('password', {
      oldPassword,
      newPassword,
    });
  }

  public async logout() {
    await this.cookies.remove(AUTH_TOKEN);
    ResetChromeStorage();
  }

  public async setLoginSession(token: string) {
    await this.cookies.set(AUTH_TOKEN, token);
  }

  public async getLoginSession() {
    const token = await this.cookies.get(AUTH_TOKEN);

    return token;
  }
}
