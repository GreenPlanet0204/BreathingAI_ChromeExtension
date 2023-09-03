import { CookiesFacade } from '../../utils/cookies';
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import SecurityApi, { AUTH_TOKEN } from '../security';
import { ExtendedAxiosInstance } from './types';
import UserApi from '../user';
import BreaksApi from '../breaks';
import ContentApi from '../content';
import ColorsApi from '../colors';
import SettingsApi from '../settings';
import SoundsApi from '../sounds';
import AnalyticsApi from '../anaylitcs';

interface IPlatformOptions {
  cookies: CookiesFacade;
  apiUrl: string;
  mock: boolean;
  //   apiTimeout: number;
}

class Platform {
  public apiUrl: string;
  public cookies: CookiesFacade;
  public mock: boolean;
  public api: ExtendedAxiosInstance;
  // breathing ai api enpoints
  public Security: SecurityApi;
  public User: UserApi;
  public Breaks: BreaksApi;
  public Content: ContentApi;
  public Settings: SettingsApi;
  public Sounds: SoundsApi;
  public Colors: ColorsApi;
  public Analytics: AnalyticsApi;

  /**
   * Creates Platform Instance
   */
  constructor(options: IPlatformOptions) {
    this.apiUrl = options.apiUrl;
    this.cookies = options.cookies;
    this.mock = options.mock;

    this.api = axios.create({
      baseURL: this.apiUrl,
      withCredentials: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // adapter: fetchAdapter,
    });

    // Add authorization header if auth token is present
    this.api.interceptors.request.use(
      addAuthenticationInterceptor(this.cookies)
    );

    // Setup API error mapper
    this.api.interceptors.response.use(undefined, (error) =>
      errorMapperResponseInterceptor(error, this.cookies)
    );

    this.Security = new SecurityApi(this.api, this.cookies, this.mock);
    this.User = new UserApi(this.api, this.cookies, this.mock);
    this.Breaks = new BreaksApi(this.api, this.cookies, this.mock);
    this.Content = new ContentApi(this.api, this.cookies, this.mock);
    this.Settings = new SettingsApi(this.api, this.cookies, this.mock);
    this.Colors = new ColorsApi(this.api, this.cookies, this.mock);
    this.Sounds = new SoundsApi(this.api, this.cookies, this.mock);
    this.Analytics = new AnalyticsApi(this.api, this.cookies, this.mock);
  }
}

const addAuthenticationInterceptor =
  (cookies: CookiesFacade) => async (config: InternalAxiosRequestConfig) => {
    const token = await cookies.get(AUTH_TOKEN);

    if (token && config.headers) {
      config.headers.Authorization = token;
    } else {
      // Since we rerun the same request config in case of 401 errors,
      // we need to remove the auth header if the user was logged out
      if (config.headers) {
        await cookies.remove(AUTH_TOKEN);
        delete config.headers['Authorization'];
      }
    }
    return config;
  };
// const authRefreshHandler = (platform: Platform) => async () =>
//   await platform.user.refreshToken();

const errorMapperResponseInterceptor = (
  error: AxiosError,
  cookies: CookiesFacade
) => {
  if (error.response?.status === 401) {
    cookies.remove(AUTH_TOKEN);
  }
  console.error(error);

  throw new Error(
    //@ts-ignore
    error.response?.data?.error?.message.message ?? error.message
  );
};

export default Platform;
