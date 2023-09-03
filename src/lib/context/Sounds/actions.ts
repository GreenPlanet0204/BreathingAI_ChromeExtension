import React from 'react';
import { SoundFile } from '../../api/content/types';
import { actions, ActionTypes } from './types';

export const SoundActions = (dispatch: React.Dispatch<actions>) => ({
  setFiles: (files: SoundFile[]) => {
    dispatch({
      type: ActionTypes.SET_FILES,
      payload: files,
    });
  },
});
