import React from 'react';
import { actions, ActionTypes } from './types';

export const ColorsActions = (dispatch: React.Dispatch<actions>) => ({
  updateColors: (newColors: string[]) => {
    dispatch({
      type: ActionTypes.UPDATE_COLORS,
      payload: newColors,
    });
  },
});
