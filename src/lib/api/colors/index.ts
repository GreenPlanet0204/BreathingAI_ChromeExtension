import BaseAPI from '../baseApi';

export default class ColorsApi extends BaseAPI {
  public async getColors() {
    const { data } = await this.api.get<{ colors: string[] }>('/colors');

    return data.colors;
  }
  public async updateColors(newColors: string[]) {
    const { data } = await this.api.put<{ colors: string[] }>('/colors', {
      newColors,
    });
    return data.colors;
  }
}
