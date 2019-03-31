import Search from '@/data/Search';
import SearchParams from '@/data/SearchParams';
import { IPost, PostType } from '../types';

export interface ISearchQuery {
  count: number;
  max_id?: number;
  term: string;
}

export interface ISearchParams {
  end: string;
  max_id?: number;
  q: string;
  type: PostType;
  start: string;
}

export interface ISheetQuery {
  negative: string;
  positive: string;
  neutral: string;
}

export interface ITranslateQuery {
  q: string;
  source: number;
}

export interface ITranslation {
  translatedText: string;
}

export interface IPostResult {
  posts?: IPost[];
  error?: Error;
  isAuthError?: boolean;
}

export const enum PostActionTypes {
  REQUEST_SEND = '@@post/SEND_REQUEST',
  REQUEST_SUCCESS = '@@post/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@post/REQUEST_ERROR',
  REQUEST_MORE = '@@post/REQUEST_MORE',

  POSTS_LOAD = '@@post/POSTS_LOAD',
  POSTS_FLUSH = '@@post/POSTS_FLUSH',

  POST_SET_SENTIMENT = '@@post/POST_SET_SENTIMENT',
  POST_SET_VISIBILITY = '@@post/POST_SET_VISIBILITY',
  POST_SET_CATEGORY = '@@post/POST_SET_CATEGORY',

  SAVED_GET = '@@post/SAVED_GET',
  SAVED_GET_SUCCESS = '@@post/SAVED_GET_SUCCESS',
  SAVED_GET_ERROR = '@@post/SAVED_GET_ERROR',

  TRANSLATE_GET = '@@post/TRANSLATE_GET',
  TRANSLATE_GET_SUCCESS = '@@post/TRANSLATE_GET_SUCCESS',
  TRANSLATE_GET_ERROR = '@@post/TRANSLATE_GET_ERROR',
}

export interface IPostState {
  readonly currentSearch: ISearchParams;
  readonly currentSearchData: SearchParams;
  readonly loading: boolean;
  readonly posts: IPost[];
  readonly errors?: string;
  readonly saved: string[];
  readonly data: Search;
}
