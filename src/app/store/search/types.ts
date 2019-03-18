import Search from '@/data/Search';

export interface IQuery {
  q: string;
}

interface ITweeturls {
  url: string;
  expanded_url: string;
  indices: number[];
}

interface ITweetHashtag {
  text: string;
  indices: number[];
}

interface ITweetEntities {
  hashtags: ITweetHashtag[];
  urls: ITweeturls[];
}

export interface ITweet {
  created_at: Date;
  entities: ITweetEntities;
  id: number;
  text: string;
  url: string;
}

export type ApiResponse = Record<string, any>;

export const enum SearchActionTypes {
  SEARCH_LOAD = '@@search/SEARCH_LOAD',
  SEARCH_FLUSH = '@@search/SEARCH_FLUSH',
  REQUEST_SEND = '@@search/SEND_REQUEST',
  REQUEST_SUCCESS = '@@search/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@search/REQUEST_ERROR',
}

export interface ISearchState {
  readonly loading: boolean;
  readonly tweets: ITweet[];
  readonly errors?: string;
  readonly data: Search;
}
