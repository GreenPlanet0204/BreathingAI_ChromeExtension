import * as qs from 'qs';
import { ContentFilter } from '../types';

export const queryFilter = (filter?: ContentFilter) => {
  const queryArray: string[] = [];

  if (!filter) {
    return '';
  }
  queryArray.push(qs.stringify(filter.filter));

  queryArray.push(qs.stringify(filter.pagination));

  const queryString = `?${queryArray.join('&')}`;

  return queryString;
};
