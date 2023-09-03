import React from 'react';
import { actions, ActionTypes } from './types';
import { AnalyticsData } from '../../api/anaylitcs/types';

export const AnalyticsActions = (dispatch: React.Dispatch<actions>) => ({
  setData: (data: AnalyticsData) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      payload: data,
    });
  },
});
