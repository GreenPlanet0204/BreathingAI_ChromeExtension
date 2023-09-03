import BaseAPI from '../baseApi';
import { BreakEvent } from './types';

export default class BreaksApi extends BaseAPI {
  public async breakCompletedEvent(event: BreakEvent) {
    await this.api.post<void>(`/browser-extension/event/break`, event);
  }
}
