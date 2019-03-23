export interface IQuery {
  term: string;
  count: number;
}

export enum Sentiment {
  Unorder,
  Positive,
  Negative,
  Neutral,
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
  hidden?: boolean;
  sentiment?: Sentiment;
  text: string;
  url: string;
}

export type ApiResponse = Record<string, any>;

export const enum SearchActionTypes {
  REQUEST_SEND = '@@search/SEND_REQUEST',
  REQUEST_SUCCESS = '@@search/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@search/REQUEST_ERROR',
  TWEET_SET_SENTIMENT = '@@search/TWEET_SET_SENTIMENT',
  TWEET_SET_VISIBILITY = '@@search/TWEET_SET_VISIBILITY',
}

export interface ISearchState {
  readonly loading: boolean;
  readonly tweets: ITweet[];
  readonly errors?: string;
}
