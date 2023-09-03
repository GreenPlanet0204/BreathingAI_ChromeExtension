import {
  TimeMeasurmentObject,
  USER_SETTINGS_STORAGE_KEY,
} from '../../lib/context/User/storage';
import {
  getStorageSettingsKeyValue,
  updateStorageSettingsKeyValue,
} from '../../lib/utils/chrome-storage';

import { getCurrentTab } from '../../lib/utils/tabs';

/**
 * @description returns the current date in the format YYYY-MM-DD
 * @returns {string}
 */
export const getCurrentDate = () => {
  return new Date().toISOString().substr(0, 10);
};

const ScreenTimeMeasuremnt = () => {
  let active: { name?: string; time?: number } = {};

  const update = async (host: string, seconds: number) => {
    const currentDate = getCurrentDate();
    // get the data saved for the current date
    const data = (await getData(currentDate)) as TimeMeasurmentObject;

    if (data[host]) {
      data[host] += seconds;
    } else {
      data[host] = seconds;
    }
    // save the updated value
    save(currentDate, data);
  };

  const save = async (key: string, value: TimeMeasurmentObject) => {
    await getStorageSettingsKeyValue(
      USER_SETTINGS_STORAGE_KEY,
      async (result) => {
        await updateStorageSettingsKeyValue(USER_SETTINGS_STORAGE_KEY, {
          ...result,
          screen_time_measurement: {
            ...result.screen_time_measurement,
            [key]: { ...value },
          },
        });
      }
    );
  };

  const getData = (tiemStamp: string) => {
    return new Promise((resolve) => {
      getStorageSettingsKeyValue(USER_SETTINGS_STORAGE_KEY, (result) => {
        result?.screen_time_measurement[tiemStamp]
          ? resolve(result.screen_time_measurement[tiemStamp])
          : resolve({});
      });
    });
  };

  const end = () => {
    if (active.name && active.time) {
      const timeDiff = Number(((Date.now() - active.time) / 1000).toFixed(1));
      // add it to the number of seconds already saved in chrome.storage.local
      update(active.name, timeDiff);
      active = {};
    }
  };

  const setActive = async () => {
    const activeTab = await getCurrentTab();
    if (activeTab) {
      const { url } = activeTab;
      if (url) {
        // check if the tab's url is among the arrays of url
        let host = new URL(url).hostname;

        active = {
          name: host,
          time: Date.now(),
        };
      }
    }
  };

  chrome.tabs.onUpdated.addListener(() => {
    setActive();
  });

  chrome.tabs.onActivated.addListener(() => {
    if (active.name) {
      end();
    }
    // check to see if the active tab is among the sites being tracked
    setActive();
  });

  chrome.windows.onFocusChanged.addListener((window) => {
    if (window === -1) {
      // browser lost focus
      end();
    } else {
      setActive();
    }
  });
};

export default ScreenTimeMeasuremnt;
