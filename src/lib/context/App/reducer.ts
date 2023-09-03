import { ActionTypes, actions, AppState } from './types';

export const AppReducer = (state: AppState, action: actions): AppState => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
