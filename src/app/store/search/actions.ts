import { action } from 'typesafe-actions';

import { ITweet, SearchActionTypes, sentiment } from './types';

export const requestSend = (q: string) =>
  action(SearchActionTypes.REQUEST_SEND, q);
export const requestSuccess = (data: ITweet[]) =>
  action(SearchActionTypes.REQUEST_SUCCESS, data);
export const requestError = (message: string) =>
  action(SearchActionTypes.REQUEST_ERROR, message);
export const setSentiment = (id: number, s: sentiment) =>
  action(SearchActionTypes.TWEET_SET_SENTIMENT, { id, sentiment: s });
