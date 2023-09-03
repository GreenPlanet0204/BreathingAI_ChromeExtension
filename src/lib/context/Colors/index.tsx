import React, { createContext, useContext, useEffect, useReducer } from 'react';
import services from '../../utils/services';
import { useAuthContext } from '../Auth';

import { BaseContext, SettingsAction } from '../types';
import { ColorsActions } from './actions';
import { ColorsReducer } from './reducer';
import {
  ColorsSettings,
  fallBackColorsArray,
  useColorsSettings,
} from './storage';
import { ColorsState } from './types';

export interface ColorsContext
  extends BaseContext<ColorsState, ReturnType<typeof ColorsActions>> {
  colorsSettings?: ColorsSettings;
  setColorsSettings?: SettingsAction<ColorsSettings>;
}

export const initialState: ColorsState = {
  colors: fallBackColorsArray,
};

export const colorsContext = createContext<ColorsContext>({});

export const ColorsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(ColorsReducer, initialState);
  const actions = ColorsActions(dispatch);
  const { api } = services;
  const { state: authState, authSettings } = useAuthContext();
  const [colorsSettings, setColorsSettings] = useColorsSettings();
  useEffect(() => {
    async function init() {
      if (authSettings?.authenticated && authState?.user?.id) {
        const breaksSettingsFromAPi = await api.Settings.getColorsSettings();

        const colorsFromAPi = await api.Colors.getColors();

        actions.updateColors(colorsFromAPi);

        setColorsSettings(() => breaksSettingsFromAPi);
      }
    }
    init();
  }, [authState?.user?.id, authSettings?.authenticated]);
  return (
    <colorsContext.Provider
      value={{
        state,
        actions,
        colorsSettings,
        setColorsSettings,
      }}
    >
      {children}
    </colorsContext.Provider>
  );
};

export const useColorsContext = () => {
  const { state, actions, colorsSettings, setColorsSettings } =
    useContext(colorsContext);

  return { state, actions, colorsSettings, setColorsSettings };
};
export { fallBackColorsArray };
