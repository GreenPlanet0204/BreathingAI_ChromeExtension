import { TimeMeasurmentObject } from '../../context/User/storage';

export interface AnalyticsData {
  totalBreaks: number;
  screenTimeNoBreaks: {
    hours: number;
    minute: number;
  };
  screenTimeMeasurement: {
    [key: string]: TimeMeasurmentObject;
  };
}
