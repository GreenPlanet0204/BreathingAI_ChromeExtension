export class CookiesFacade {
  public _url: string;
  constructor(url: string) {
    this._url = url;
  }

  public async get(key: string) {
    try {
      const cookie = await this.checkCookie(key);
      return cookie as string;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public getAll() {
    let value;
    chrome.cookies.getAll({ url: this._url }, (cookie) => {
      if (cookie) value = cookie;
    });

    return value;
  }

  public set(key: string, value: string) {
    chrome.cookies.set({ url: this._url, name: key, value }, (cookie) => {
      return cookie;
    });
  }

  public async remove(key: string) {
    try {
      return await this.removeCookie(key);
    } catch (error) {
      console.log(error);
    }
  }

  private checkCookie(name: string) {
    return new Promise((resolve, reject) => {
      chrome.cookies.get(
        {
          url: this._url,
          name,
        },
        function (cookie) {
          if (cookie) {
            resolve(cookie.value);
          } else {
            reject("Can't get cookie! Check the name!");
          }
        }
      );
    });
  }

  private removeCookie(name: string) {
    return new Promise((resolve, reject) => {
      chrome.cookies.remove(
        {
          url: this._url,
          name,
        },
        function (details) {
          resolve(details);
        }
      );
    });
  }
}
