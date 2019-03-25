import { action } from 'typesafe-actions';

import { ISentiment, SentimentActionTypes } from './types';

export const requestSentiments = () =>
  action(SentimentActionTypes.SENTIMENTS_GET);
export const requestSentimentsError = (message: string) =>
  action(SentimentActionTypes.SENTIMENTS_GET_ERROR, message);
export const requestSentimentsSuccess = (sentiments: ISentiment[]) =>
  action(SentimentActionTypes.SENTIMENTS_GET_SUCCESS, sentiments);
