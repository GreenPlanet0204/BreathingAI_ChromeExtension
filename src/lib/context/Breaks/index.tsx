import React, { createContext, useContext, useEffect, useReducer } from 'react';
// import { fetchVideos } from '../../api/content/contentful';

import services from '../../utils/services';
import { useAuthContext } from '../Auth';

import { BaseContext, SettingsAction } from '../types';
import { BreakActions } from './actions';
import { BreaksReducer } from './reducer';
import { BreaksSettings, useBreaksSettings } from './storage';
import { BreaksState } from './types';

export interface BreaksContext
  extends BaseContext<BreaksState, ReturnType<typeof BreakActions>> {
  breaksSettings?: BreaksSettings;
  setBreaksSettings?: SettingsAction<BreaksSettings>;
}

export const initialState: BreaksState = {
  filter: {
    filter: {
      method: [],
      category: [],
    },
    pagination: {
      page: 1,
      offset: 0,
      limit: 20,
    },
  },
};

export const breaksContext = createContext<BreaksContext>({});

export const BreaksContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(BreaksReducer, initialState);
  const { api } = services;
  const { state: authState, authSettings } = useAuthContext();
  const actions = BreakActions(dispatch);
  const [breaksSettings, setBreaksSettings] = useBreaksSettings();

  useEffect(() => {
    async function init() {
      if (authSettings?.authenticated && authState?.user?.id) {
        const breaksSettingsFromAPi = await api.Settings.getBreaksSettings();

        setBreaksSettings(() => breaksSettingsFromAPi);
      }
    }
    init();
  }, [authState?.user?.id, authSettings?.authenticated]);

  return (
    <breaksContext.Provider
      value={{
        state,
        actions,
        breaksSettings,
        setBreaksSettings,
      }}
    >
      {children}
    </breaksContext.Provider>
  );
};

export const useBreaksContext = () => {
  const { state, actions, breaksSettings, setBreaksSettings } =
    useContext(breaksContext);

  return { state, actions, breaksSettings, setBreaksSettings };
};
