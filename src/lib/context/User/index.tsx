import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { BaseContext, SettingsAction } from '../types';
import { UserActions } from './actions';
import { UserReducer } from './reducer';
import { UserSettings, useUserSettings } from './storage';
import { UserState } from './types';
import services from '../../utils/services';
import { useAuthContext } from '../Auth';

export interface SoundsContext
  extends BaseContext<UserState, ReturnType<typeof UserActions>> {
  userSettings?: UserSettings;
  setUserSettings?: SettingsAction<UserSettings>;
}

export const initialState: UserState = {
  // make static
};

export const userContext = createContext<SoundsContext>({});

export const UserContextProvider: React.FC = ({ children }) => {
  const [userSettings, setUserSettings] = useUserSettings();
  const [state, dispatch] = useReducer(UserReducer, {
    bookmarks: userSettings.bookmarks,
  });
  const actions = UserActions(dispatch);

  const { state: authState, authSettings } = useAuthContext();

  const { api } = services;

  useEffect(() => {
    async function fetchBookmarks() {
      const bookmarksFromAPi = await api.User.getBookmarks();
      setUserSettings &&
        setUserSettings((prevState) => {
          return {
            ...prevState,
            bookmarks: bookmarksFromAPi.bookmarks,
          };
        });
    }

    fetchBookmarks();
  }, [authState?.user?.id, authSettings?.authenticated]);

  return (
    <userContext.Provider
      value={{
        state,
        actions,
        userSettings,
        setUserSettings,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  const { state, actions, userSettings, setUserSettings } =
    useContext(userContext);

  return { state, actions, userSettings, setUserSettings };
};
