import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { BaseContext, SettingsAction } from '../types';
import { AnalyticsReducer } from './reducer';
import { AnalyticsSettings, useAnalyticsSettings } from './storage';
import { AnalyticsState } from './types';
import { AnalyticsActions } from './actions';
import { useAuthContext } from '../Auth';
import services from '../../utils/services';
import {
  addListenerChromeStorageSettingsValue,
  getStorageSettingsKeyValue,
  updateStorageSettingsKeyValue,
} from '../../utils/chrome-storage';
import { USER_SETTINGS_STORAGE_KEY } from '../User/storage';
import { getCurrentDate } from '../../../pages/Background/screenTimeMeasurment';
import { toHoursAndMinutes } from '../../utils/helpers/time';

export interface AnalyticsContext
  extends BaseContext<AnalyticsState, ReturnType<typeof AnalyticsActions>> {
  analyticsSettings?: AnalyticsSettings;
  setAnalyticsSettings?: SettingsAction<AnalyticsSettings>;
}

export const initialState: AnalyticsState = {
  screenTimeNoBreaks: {
    hours: 0,
    minutes: 0,
  },
  totalBreaks: 0,
  currentStreak: 0,
  recordStreak: 0,
};

export const analyticsContext = createContext<AnalyticsContext>({});

export const AnalyticsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AnalyticsReducer, initialState);
  const actions = AnalyticsActions(dispatch);
  const [analyticsSettings, setAnalyticsSettings] = useAnalyticsSettings();
  const { state: authState, authSettings } = useAuthContext();
  const { api } = services;
  //@todo: When API is ready enable this

  addListenerChromeStorageSettingsValue(
    USER_SETTINGS_STORAGE_KEY,
    async (settings) => {
      const currentDate = getCurrentDate();
      if (settings?.screen_time_measurement[currentDate]) {
        await api.Analytics.updateUserScreenTime(
          settings?.screen_time_measurement[currentDate],
          currentDate
        );
      }
    }
  );

  useEffect(() => {
    async function init() {
      if (authSettings?.authenticated && authState?.user?.id) {
        const analyticsFromApi = await api.Analytics.getUserAnalytics();
        const screenTimeFromApi = await api.Analytics.getUserScreenTime();

        getStorageSettingsKeyValue(USER_SETTINGS_STORAGE_KEY, (data) => {
          const currentDate = getCurrentDate();

          // Break Streaks
          let screenTime = 0;
          Object.keys(data?.screen_time_measurement[currentDate]).forEach(
            (hostTimeObj) => {
              screenTime +=
                data?.screen_time_measurement[currentDate][hostTimeObj];
            }
          );
          const timeObj = toHoursAndMinutes(screenTime);
          actions.setData({
            totalBreaks: analyticsFromApi.totalBreaks,
            screenTimeNoBreaks: {
              hours: timeObj.hours,
              minute: timeObj.minutes,
            },
            screenTimeMeasurement: screenTimeFromApi,
          });
        });
      }
    }
    init();
  }, [authState?.user?.id, authSettings?.authenticated]);

  return (
    <analyticsContext.Provider
      value={{
        state,
        actions,
        analyticsSettings,
        setAnalyticsSettings,
      }}
    >
      {children}
    </analyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const { state, actions, analyticsSettings, setAnalyticsSettings } =
    useContext(analyticsContext);

  return { state, actions, analyticsSettings, setAnalyticsSettings };
};
