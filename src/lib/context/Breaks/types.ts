import { ContentCollection, ContentFilter } from '../../api/content/types';

export interface BreaksState {
  filter: ContentFilter;
  content?: ContentCollection;
}

export enum ActionTypes {
  SET_CONTENT_COLLECTION = 'BREAKS/SET_CONTENT_COLLECTION',
  SET_CONTENT_FILTER = 'BREAKS/SET_CONTENT_FILTER',
}

export interface BreaksSetFilterAction {
  type: ActionTypes.SET_CONTENT_FILTER;
  payload: ContentFilter;
}

export interface BreaksSetContentAction {
  type: ActionTypes.SET_CONTENT_COLLECTION;
  payload: ContentCollection;
}

export type actions = BreaksSetContentAction | BreaksSetFilterAction;
