export interface UserState {}

export enum ActionTypes {
  SET_BOOKMARKS = 'USER/SET_BOOKMARKS',
}

export interface UserSetBookmarksAction {
  type: ActionTypes.SET_BOOKMARKS;
  payload: string[];
}

export type actions = UserSetBookmarksAction;
