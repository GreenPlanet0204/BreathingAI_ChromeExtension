import { UserProfile } from '../../api/user/types';

export interface AuthState {
  user?: UserProfile;
}

export enum ActionTypes {
  UPDATE_USER = 'AUTH/UPDATE_USER',
}

export interface UpdateUserAction {
  type: ActionTypes.UPDATE_USER;
  payload?: UserProfile;
}

export type actions = UpdateUserAction;
