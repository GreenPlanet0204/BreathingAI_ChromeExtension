import BaseAPI from '../baseApi';
import { queryFilter } from './filter/queryFilter';
import { ContentCollection, ContentFilter } from './types';

export default class ContentApi extends BaseAPI {
  public async getContent(filter: ContentFilter) {
    const { data } = await this.api.get<ContentCollection>(
      `content${queryFilter(filter)}`
    );

    return data;
  }

  public async bookmarkContnet(userId: string, contentId: string) {
    const { data } = await this.api.post<ContentCollection>(
      'content/bookmark',
      {
        user: userId,
        content: contentId,
      }
    );
    return data;
  }

  public async getSuggestedResource(userId: string) {
    const { data } = await this.api.post<ContentCollection>(
      `breaks/resource/${userId}`
    );
    return data;
  }
}
