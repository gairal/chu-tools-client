import Search from '@/data/Search';
import SearchParams from '@/data/SearchParams';

export interface ISearchQuery {
  count: number;
  max_id?: number;
  term: string;
}

export interface ISearchParams {
  end: string;
  start: string;
  term: string;
  max_id?: number;
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
  id_str: string;
  hidden?: boolean;
  lang: string;
  retweet_count: number;
  sentiment?: string;
  text: string;
  url: string;
  category?: string;
  translation?: string;
}

export interface ITranslation {
  translatedText: string;
}

export const enum TweetActionTypes {
  TWEETS_LOAD = '@@tweet/TWEETS_LOAD',
  TWEETS_FLUSH = '@@tweet/TWEETS_FLUSH',

  REQUEST_SEND = '@@tweet/SEND_REQUEST',
  REQUEST_SUCCESS = '@@tweet/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@tweet/REQUEST_ERROR',
  REQUEST_MORE = '@@tweet/REQUEST_MORE',

  TWEET_SET_SENTIMENT = '@@tweet/TWEET_SET_SENTIMENT',
  TWEET_SET_VISIBILITY = '@@tweet/TWEET_SET_VISIBILITY',
  TWEET_SET_CATEGORY = '@@tweet/TWEET_SET_CATEGORY',

  SAVED_GET = '@@tweet/SAVED_GET',
  SAVED_GET_SUCCESS = '@@tweet/SAVED_GET_SUCCESS',
  SAVED_GET_ERROR = '@@tweet/SAVED_GET_ERROR',

  TRANSLATE_GET = '@@tweet/TRANSLATE_GET',
  TRANSLATE_GET_SUCCESS = '@@tweet/TRANSLATE_GET_SUCCESS',
  TRANSLATE_GET_ERROR = '@@tweet/TRANSLATE_GET_ERROR',
}

export interface ITweetState {
  readonly currentSearch: ISearchParams;
  readonly currentSearchData: SearchParams;
  readonly loading: boolean;
  readonly tweets: ITweet[];
  readonly errors?: string;
  readonly saved: string[];
  readonly data: Search;
}
