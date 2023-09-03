export const THEME = 'theme';
export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface AppState {
  isLoading: boolean;
}

export enum ActionTypes {
  SET_IS_LOADING = 'APP/SET_IS_LOADING',
}

export interface SetIsLoadingAction {
  type: ActionTypes.SET_IS_LOADING;
  payload: boolean;
}

export interface SetIsLoadingAction {
  type: ActionTypes.SET_IS_LOADING;
  payload: boolean;
}
export type actions = SetIsLoadingAction;
