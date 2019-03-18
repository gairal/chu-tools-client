import { action } from 'typesafe-actions';

import { ITweet, SearchActionTypes } from './types';

export const requestSend = (q: string) =>
  action(SearchActionTypes.REQUEST_SEND, q);
export const requestSuccess = (data: ITweet[]) =>
  action(SearchActionTypes.REQUEST_SUCCESS, data);
export const requestError = (message: string) =>
  action(SearchActionTypes.REQUEST_ERROR, message);
