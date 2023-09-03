import React from 'react';
import { UserProfile } from '../../api/user/types';
import { actions, ActionTypes } from './types';

export const AuthActions = (dispatch: React.Dispatch<actions>) => ({
  updateUserAction: (userProfile?: UserProfile) => {
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: userProfile,
    });
  },
});
