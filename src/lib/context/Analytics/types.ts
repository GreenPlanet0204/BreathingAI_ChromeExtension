import { AnalyticsData } from '../../api/anaylitcs/types';

export interface AnalyticsState {
  totalBreaks: number;
  screenTimeNoBreaks: {
    hours: number;
    minutes: number;
  };
  currentStreak: number;
  recordStreak: number;
}

export enum ActionTypes {
  SET_DATA = 'ANALYTICS/SET_DATA',
}

export interface AnalytisSetContentAction {
  type: ActionTypes.SET_DATA;
  payload: AnalyticsData;
}

export type actions = AnalytisSetContentAction;
