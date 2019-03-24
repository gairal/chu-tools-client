import moment from 'moment';
import { action } from 'typesafe-actions';

import {
  IOrderedTweetIds,
  ITweet,
  SearchActionTypes,
  Sentiment,
} from './types';

export const requestSend = (
  q: string,
  start: moment.Moment = moment().subtract(1, 'months'),
  end: moment.Moment = moment(),
  count: number = 50,
) => {
  return action(SearchActionTypes.REQUEST_SEND, { term: q, start, end, count });
};
export const requestSuccess = (data: ITweet[]) =>
  action(SearchActionTypes.REQUEST_SUCCESS, data);
export const requestError = (message: string) =>
  action(SearchActionTypes.REQUEST_ERROR, message);
export const setSentiment = (id: number, sentiment: Sentiment) =>
  action(SearchActionTypes.TWEET_SET_SENTIMENT, { id, sentiment });
export const setVisibility = (id: number, hidden: boolean) =>
  action(SearchActionTypes.TWEET_SET_VISIBILITY, { id, hidden });
export const saveSend = (sheetId: string, q: IOrderedTweetIds) =>
  action(SearchActionTypes.SAVE_SEND, { q, sheetId });
export const saveSuccess = (data: ITweet[]) =>
  action(SearchActionTypes.SAVE_SUCCESS, data);
export const saveError = (message: string) =>
  action(SearchActionTypes.SAVE_ERROR, message);
