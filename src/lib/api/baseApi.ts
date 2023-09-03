import { CookiesFacade } from '../utils/cookies';

import { ExtendedAxiosInstance } from './platform/types';

export default class BaseAPI {
  public api: ExtendedAxiosInstance;
  public cookies: CookiesFacade;
  public mock: boolean;

  constructor(
    api: ExtendedAxiosInstance,
    cookies: CookiesFacade,
    mock: boolean
  ) {
    this.api = api;
    this.cookies = cookies;
    this.mock = mock;
  }
}
