import { actions, ActionTypes, ColorsState } from './types';

export const ColorsReducer = (state: ColorsState, action: actions) => {
  switch (action.type) {
    case ActionTypes.UPDATE_COLORS:
      return {
        ...state,
        colors: action.payload,
      };

    default:
      return state;
  }
};
