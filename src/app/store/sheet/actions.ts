import { action } from 'typesafe-actions';

import { ITweet } from '../tweet/types';
import { ISheet, SheetActionTypes } from './types';

export const saveSend = (sheetId: string, tweets: ITweet[]) =>
  action(SheetActionTypes.SAVE_SEND, { sheetId, tweets });
export const saveSuccess = () => action(SheetActionTypes.SAVE_SUCCESS);
export const saveError = (message: string) =>
  action(SheetActionTypes.SAVE_ERROR, message);

export const requestSheets = () => action(SheetActionTypes.SHEETS_GET);
export const requestSheetsError = (message: string) =>
  action(SheetActionTypes.SHEETS_GET_ERROR, message);
export const requestSheetsSuccess = (sheets: ISheet[]) =>
  action(SheetActionTypes.SHEETS_GET_SUCCESS, sheets);
