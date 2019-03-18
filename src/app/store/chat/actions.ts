import { action } from 'typesafe-actions';

import { ChatActionTypes, IMessage } from './types';

export const loadChat = () => action(ChatActionTypes.CHAT_LOAD);
export const flushChat = () => action(ChatActionTypes.CHAT_FLUSH);
export const requestSend = (q: string) =>
  action(ChatActionTypes.REQUEST_SEND, q);
export const requestSuccess = (data: IMessage[]) =>
  action(ChatActionTypes.REQUEST_SUCCESS, data);
export const requestError = (message: string) =>
  action(ChatActionTypes.REQUEST_ERROR, message);
