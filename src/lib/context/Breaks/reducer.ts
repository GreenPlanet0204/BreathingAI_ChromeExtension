import { actions, ActionTypes, BreaksState } from './types';

export const BreaksReducer = (state: BreaksState, action: actions) => {
  switch (action.type) {
    case ActionTypes.SET_CONTENT_COLLECTION:
      return {
        ...state,
        content: action.payload,
      };
    case ActionTypes.SET_CONTENT_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};
