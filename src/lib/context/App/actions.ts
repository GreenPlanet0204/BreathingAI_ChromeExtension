import React from 'react';

import { actions, ActionTypes } from './types';

export const AppActions = (dispatch: React.Dispatch<actions>) => ({
  updateIsLoading: (isLoading: boolean) => {
    dispatch({
      type: ActionTypes.SET_IS_LOADING,
      payload: isLoading,
    });
  },
});
