export interface ISearchQuery {
  term: string;
  count: number;
}

export interface ISheetQuery {
  negative: string;
  positive: string;
  neutral: string;
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
  retweet_count: number;
  sentiment?: Sentiment;
  text: string;
  url: string;
}

export const enum TweetActionTypes {
  REQUEST_SEND = '@@tweet/SEND_REQUEST',
  REQUEST_SUCCESS = '@@tweet/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@tweet/REQUEST_ERROR',
  TWEET_SET_SENTIMENT = '@@tweet/TWEET_SET_SENTIMENT',
  TWEET_SET_VISIBILITY = '@@tweet/TWEET_SET_VISIBILITY',
}

export interface ITweetState {
  readonly loading: boolean;
  readonly tweets: ITweet[];
  readonly errors?: string;
}
