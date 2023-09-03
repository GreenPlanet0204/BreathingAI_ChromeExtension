import React, { createContext, useContext, useReducer } from 'react';

import { BaseContext, SettingsAction } from '../types';
import { SoundActions } from './actions';
import { SoundsReducer } from './reducer';
import { SoundsSettings, useSoundsSettings } from './storage';
import { SoundsState } from './types';

export interface SoundsContext
  extends BaseContext<SoundsState, ReturnType<typeof SoundActions>> {
  soundsSettings?: SoundsSettings;
  setSoundsSettings?: SettingsAction<SoundsSettings>;
}

export const initialState: SoundsState = {
  // make static
  files: [],
};

export const soundsContext = createContext<SoundsContext>({});

export const SoundsContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(SoundsReducer, initialState);
  const actions = SoundActions(dispatch);
  const [soundsSettings, setSoundsSettings] = useSoundsSettings();

  //@todo: When API is ready enable this
  // useEffect(() => {
  //   async function init() {
  //     if (authSettings?.authenticated && authState?.user?.id) {
  //       // const files = await api.Sounds.getSounds(authState?.user?.id);
  //       // actions.setFiles(files);
  //     }
  //   }
  //   init();
  // }, [authState?.user?.id, authSettings?.authenticated]);

  return (
    <soundsContext.Provider
      value={{
        state,
        actions,
        soundsSettings,
        setSoundsSettings,
      }}
    >
      {children}
    </soundsContext.Provider>
  );
};

export const useSoundsContext = () => {
  const { state, actions, soundsSettings, setSoundsSettings } =
    useContext(soundsContext);

  return { state, actions, soundsSettings, setSoundsSettings };
};
