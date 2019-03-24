import { action } from 'typesafe-actions';

import { ITweet } from '../tweet/types';
import { IOrderedTweetIds, SheetActionTypes } from './types';

export const saveSend = (sheetId: string, q: IOrderedTweetIds) =>
  action(SheetActionTypes.SAVE_SEND, { q, sheetId });
export const saveSuccess = (data: ITweet[]) =>
  action(SheetActionTypes.SAVE_SUCCESS, data);
export const saveError = (message: string) =>
  action(SheetActionTypes.SAVE_ERROR, message);
