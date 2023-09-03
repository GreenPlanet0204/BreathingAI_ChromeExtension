import React from 'react';
import { ContentCollection, ContentFilter } from '../../api/content/types';
import { actions, ActionTypes } from './types';

export const BreakActions = (dispatch: React.Dispatch<actions>) => ({
  setContentCollection: (contentCollection: ContentCollection) => {
    dispatch({
      type: ActionTypes.SET_CONTENT_COLLECTION,
      payload: contentCollection,
    });
  },
  setContentFilter: (filter: ContentFilter) => {
    dispatch({
      type: ActionTypes.SET_CONTENT_FILTER,
      payload: filter,
    });
  },
});
