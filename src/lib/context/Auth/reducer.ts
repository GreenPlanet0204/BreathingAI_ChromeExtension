import { ActionTypes, actions, AuthState } from './types';

export const AuthReducer = (state: AuthState, action: actions): AuthState => {
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
