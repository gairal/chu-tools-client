import moment from 'moment';
import { action } from 'typesafe-actions';

import { IPost } from '@/store/types';
import { ISearchParams, ITranslation, TweetActionTypes } from './types';

export const tweetsLoad = () => action(TweetActionTypes.TWEETS_LOAD);
export const tweetsFlush = () => action(TweetActionTypes.TWEETS_FLUSH);

export const loadTweets = (
  q: string = '',
  start: string = moment()
    .subtract(1, 'months')
    .format('YYYY-MM-DD'),
  end: string = moment().format('YYYY-MM-DD'),
) => {
  return action(TweetActionTypes.REQUEST_SEND, { term: q, start, end });
};

export const loadMoreTweets = () => {
  return action(TweetActionTypes.REQUEST_MORE);
};

export const loadTweetsSuccess = (params: ISearchParams, tweets: IPost[]) =>
  action(TweetActionTypes.REQUEST_SUCCESS, { params, tweets });
export const loadTweetsError = (message: string) =>
  action(TweetActionTypes.REQUEST_ERROR, message);

export const setSentiment = (id: string, sentiment: string) =>
  action(TweetActionTypes.TWEET_SET_SENTIMENT, { id, sentiment });
export const setVisibility = (id: string, hidden: boolean) =>
  action(TweetActionTypes.TWEET_SET_VISIBILITY, { id, hidden });
export const setCategory = (id: string, category: string) =>
  action(TweetActionTypes.TWEET_SET_CATEGORY, { id, category });

export const requestSaved = () => {
  return action(TweetActionTypes.SAVED_GET);
};
export const requestSavedSuccess = (data: string[]) =>
  action(TweetActionTypes.SAVED_GET_SUCCESS, data);
export const requestSavedError = (message: string) =>
  action(TweetActionTypes.SAVED_GET_ERROR, message);

export const requestTranslate = (id: string, source: string, q: string) => {
  return action(TweetActionTypes.TRANSLATE_GET, { id, source, q });
};
export const requestTranslateSuccess = (
  id: string,
  translation: ITranslation,
) => action(TweetActionTypes.TRANSLATE_GET_SUCCESS, { id, translation });
export const requestTranslateError = (message: string) =>
  action(TweetActionTypes.TRANSLATE_GET_ERROR, message);
