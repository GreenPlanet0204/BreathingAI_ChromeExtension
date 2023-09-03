export interface ColorsState {
  colors: string[];
}

export enum ActionTypes {
  UPDATE_COLORS = 'COLORS/UPDATE_COLORS',
}

export type updateColorsAction = {
  type: ActionTypes.UPDATE_COLORS;
  payload: string[];
};

export type actions = updateColorsAction;
