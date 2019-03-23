import { action } from 'typesafe-actions';

import { ITweet, SearchActionTypes, Sentiment } from './types';

export const requestSend = (q: string) =>
  action(SearchActionTypes.REQUEST_SEND, q);
export const requestSuccess = (data: ITweet[]) =>
  action(SearchActionTypes.REQUEST_SUCCESS, data);
export const requestError = (message: string) =>
  action(SearchActionTypes.REQUEST_ERROR, message);
export const setSentiment = (id: number, sentiment: Sentiment) =>
  action(SearchActionTypes.TWEET_SET_SENTIMENT, { id, sentiment });
export const setVisibility = (id: number, hidden: boolean) =>
  action(SearchActionTypes.TWEET_SET_VISIBILITY, { id, hidden });
