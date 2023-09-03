import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AVAILABLE_OPTIONS_ROUTES } from '../../../pages/Options/routing/types';
import { AVAILABLE_POPUP_ROUTES } from '../../../pages/Popup/routing/types';
import { ResetChromeStorage } from '../../utils/chrome-storage';

import services from '../../utils/services';

import { useAppContext } from '../App';
import { RoutingStorageKeys } from '../App/storage';

import { BaseContext, SettingsAction } from '../types';
import { AuthActions } from './actions';
import { AuthReducer } from './reducer';
import { AuthSettings, useAuthSettings } from './storage';
import { AuthState } from './types';

export interface AuthContext
  extends BaseContext<AuthState, ReturnType<typeof AuthActions>> {
  authSettings?: AuthSettings;
  setAuthSettings?: SettingsAction<AuthSettings>;
}

export const initialState: AuthState = {
  user: undefined,
};

export const authContext = createContext<AuthContext>({});

export const AuthContextProvider: React.FC = ({ children }) => {
  const { api } = services;
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const actions = AuthActions(dispatch);
  const { setRouterSettings, setAppSettings } = useAppContext();
  const [authSettings, setAuthSettings] = useAuthSettings();

  useEffect(() => {
    async function init() {
      if (setRouterSettings) {
        const session = await api.Security.getLoginSession();
        if (session) {
          try {
            const userProfile = await api.User.getProfile();
            const appSettingsFromAPi = await api.Settings.getAppSettings();
            setAuthSettings((prevSettings) => ({
              ...prevSettings,
              authenticated: true,
            }));

            setAppSettings &&
              setAppSettings((prevState) => {
                return {
                  ...prevState,
                  ...appSettingsFromAPi,
                };
              });
            actions.updateUserAction(userProfile);

            // set routing
            setRouterSettings((prevState) => ({
              ...prevState,
              [RoutingStorageKeys.CURRENT_OPTIONS_TAB]:
                AVAILABLE_OPTIONS_ROUTES.DASHBOARD,
              [RoutingStorageKeys.CURRENT_POPUP_TAB]:
                AVAILABLE_POPUP_ROUTES.BREAKS,
            }));
          } catch (error) {
            ResetChromeStorage();
          }
        }
      }
    }
    init();
  }, []);

  return (
    <authContext.Provider
      value={{ state, actions, authSettings, setAuthSettings }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  const { state, actions, authSettings, setAuthSettings } =
    useContext(authContext);

  return { state, actions, authSettings, setAuthSettings };
};
