import { actions, ActionTypes, UserState } from './types';

export const UserReducer = (state: UserState, action: actions) => {
  switch (action.type) {
    case ActionTypes.SET_BOOKMARKS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
