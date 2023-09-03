import React from 'react';

import { actions, ActionTypes } from './types';

export const UserActions = (dispatch: React.Dispatch<actions>) => ({
  setBookmarks: (bookmarks: string[]) => {
    dispatch({
      type: ActionTypes.SET_BOOKMARKS,
      payload: bookmarks,
    });
  },
});
