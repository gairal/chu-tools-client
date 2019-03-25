export interface ISearchQuery {
  term: string;
  count: number;
}

export interface ISheetQuery {
  negative: string;
  positive: string;
  neutral: string;
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
  id: string;
  hidden?: boolean;
  lang: string;
  retweet_count: number;
  sentiment?: string;
  text: string;
  url: string;
  category?: string;
}

export const enum TweetActionTypes {
  REQUEST_SEND = '@@tweet/SEND_REQUEST',
  REQUEST_SUCCESS = '@@tweet/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@tweet/REQUEST_ERROR',
  TWEET_SET_SENTIMENT = '@@tweet/TWEET_SET_SENTIMENT',
  TWEET_SET_VISIBILITY = '@@tweet/TWEET_SET_VISIBILITY',
  TWEET_SET_CATEGORY = '@@tweet/TWEET_SET_CATEGORY',
  SAVED_GET = '@@tweet/SAVED_GET',
  SAVED_GET_SUCCESS = '@@tweet/SAVED_GET_SUCCESS',
  SAVED_GET_ERROR = '@@tweet/SAVED_GET_ERROR',
}

export interface ITweetState {
  readonly loading: boolean;
  readonly tweets: ITweet[];
  readonly errors?: string;
  readonly saved: string[];
}
