import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AVAILABLE_OPTIONS_ROUTES } from '../../../pages/Options/routing/types';
import { AVAILABLE_POPUP_ROUTES } from '../../../pages/Popup/routing/types';
import { useAuthSettings } from '../Auth/storage';
import { BaseContext, SettingsAction } from '../types';
import { AppActions } from './actions';
import { AppReducer } from './reducer';
import {
  AppSettings,
  RoutingSettings,
  RoutingStorageKeys,
  useAppSettings,
  useRoutingSettings,
} from './storage';
import { AppState } from './types';

export interface AppContext
  extends BaseContext<AppState, ReturnType<typeof AppActions>> {
  appSettings?: AppSettings;
  setAppSettings?: SettingsAction<AppSettings>;
  routerSettings?: RoutingSettings;
  setRouterSettings?: SettingsAction<RoutingSettings>;
}

export const initialState: AppState = {
  isLoading: false,
};

export const appContext = createContext<AppContext>({});

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const actions = AppActions(dispatch);
  const [routerSettings, setRouterSettings] = useRoutingSettings();
  const [appSettings, setAppSettings] = useAppSettings();
  const [authSettings] = useAuthSettings();

  useEffect(() => {
    const html = document.querySelector('html');
    if (appSettings.theme === 'dark') {
      html?.classList.add('dark');
    } else {
      html?.classList.remove('dark');
    }
  }, [appSettings.theme]);

  useEffect(() => {
    async function init() {
      actions.updateIsLoading(true);
      if (setRouterSettings) {
        if (authSettings.authenticated) {
          setRouterSettings((prevState) => ({
            ...prevState,
            [RoutingStorageKeys.CURRENT_OPTIONS_TAB]: authSettings.introComplete
              ? AVAILABLE_OPTIONS_ROUTES.DASHBOARD
              : AVAILABLE_OPTIONS_ROUTES.SPLASH,
            [RoutingStorageKeys.CURRENT_POPUP_TAB]:
              AVAILABLE_POPUP_ROUTES.BREAKS,
          }));
        }
      }
      actions.updateIsLoading(false);
    }
    init();
  }, [authSettings.introComplete]);

  return (
    <appContext.Provider
      value={{
        state,
        actions,
        appSettings,
        setAppSettings,
        routerSettings,
        setRouterSettings,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  const {
    state,
    actions,
    appSettings,
    setAppSettings,
    routerSettings,
    setRouterSettings,
  } = useContext(appContext);

  return {
    state,
    actions,
    appSettings,
    setAppSettings,
    routerSettings,
    setRouterSettings,
  };
};
