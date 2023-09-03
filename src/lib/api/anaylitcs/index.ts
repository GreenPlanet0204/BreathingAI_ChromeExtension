import { TimeMeasurmentObject } from '../../context/User/storage';
import BaseAPI from '../baseApi';

export default class AnalyticsApi extends BaseAPI {
  public async getUserAnalytics() {
    const { data } = await this.api.get<{ totalBreaks: number }>(
      `/browser-extension/analytics`
    );
    return data;
  }

  public async getUserScreenTime() {
    const { data } = await this.api.get<{
      [key: string]: TimeMeasurmentObject;
    }>(`/screentime/today`);
    return data;
  }
  public async updateUserScreenTime(
    screenTime: TimeMeasurmentObject,
    date: string
  ) {
    const { data } = await this.api.put<{
      [key: string]: TimeMeasurmentObject;
    }>(`/screentime`, {
      screenTime,
      date,
    });
    return data;
  }
}
