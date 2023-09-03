import { SoundFile } from '../../api/content/types';

export interface SoundsState {
  files: SoundFile[];
}

export enum ActionTypes {
  SET_FILES = 'SOUNDS/SET_FILES',
}

export interface SoundsSetContentAction {
  type: ActionTypes.SET_FILES;
  payload: SoundFile[];
}

export type actions = SoundsSetContentAction;
