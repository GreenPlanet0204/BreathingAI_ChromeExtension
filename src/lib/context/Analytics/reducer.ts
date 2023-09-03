import { actions, ActionTypes, AnalyticsState } from './types';

export const AnalyticsReducer = (state: AnalyticsState, action: actions) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        totalBreaks: action.payload.totalBreaks,
        screenTimeNoBreaks: {
          hours: action.payload.screenTimeNoBreaks.hours,
          minutes: action.payload.screenTimeNoBreaks.minute,
        },
      };
    default:
      return state;
  }
};
