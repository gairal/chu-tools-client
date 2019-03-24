import moment from 'moment';
import { action } from 'typesafe-actions';

import { ITweet, Sentiment, TweetActionTypes } from './types';

export const requestSend = (
  q: string,
  start: moment.Moment = moment().subtract(1, 'months'),
  end: moment.Moment = moment(),
  count: number = 50,
) => {
  return action(TweetActionTypes.REQUEST_SEND, { term: q, start, end, count });
};
export const requestSuccess = (data: ITweet[]) =>
  action(TweetActionTypes.REQUEST_SUCCESS, data);
export const requestError = (message: string) =>
  action(TweetActionTypes.REQUEST_ERROR, message);
export const setSentiment = (id: number, sentiment: Sentiment) =>
  action(TweetActionTypes.TWEET_SET_SENTIMENT, { id, sentiment });
export const setVisibility = (id: number, hidden: boolean) =>
  action(TweetActionTypes.TWEET_SET_VISIBILITY, { id, hidden });
