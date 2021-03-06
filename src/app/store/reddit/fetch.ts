import qs from 'query-string';

import config from '@/config';

import { IPostResult, ISearchParams, ISearchQuery } from '../post/types';
import { customFetch, RESULT_COUNT } from '../utils';

export function* fetchReddits(params: ISearchParams): IterableIterator<any> {
  const result: IPostResult = {};

  try {
    const { q, max_id } = params;

    const query: ISearchQuery = {
      max_id,
      count: RESULT_COUNT,
      term: `linkedin ${q}`,
    };

    const json = yield customFetch(
      `${config.API_SEARCH_REDDITS_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (json.error) {
      result.error = new Error(json.error);
    } else if (json.status && json.status === 403) {
      result.error = new Error(json.message);
      result.isAuthError = true;
    } else {
      result.posts = json;
    }
  } catch (e) {
    if (e instanceof Error) {
      result.error = e;
    } else {
      result.error = new Error('An unknown error occured.');
    }
  }

  return result;
}
