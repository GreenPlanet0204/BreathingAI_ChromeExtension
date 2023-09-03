import { actions, ActionTypes, SoundsState } from './types';

export const SoundsReducer = (state: SoundsState, action: actions) => {
  switch (action.type) {
    case ActionTypes.SET_FILES:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
