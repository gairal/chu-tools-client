import Chat from '@/data/Chat';

export interface IMessageContent {
  text: string;
  link?: string;
  imgs?: string[];
}

export interface IMessage {
  content: IMessageContent;
  user: string;
  id: number;
  isBot: boolean;
}

export type ApiResponse = Record<string, any>;

export const enum ChatActionTypes {
  CHAT_LOAD = '@@chat/CHAT_LOAD',
  CHAT_FLUSH = '@@chat/CHAT_FLUSH',
  REQUEST_SEND = '@@chat/SEND_REQUEST',
  REQUEST_SUCCESS = '@@chat/REQUEST_SUCCESS',
  REQUEST_ERROR = '@@chat/REQUEST_ERROR',
}

export interface IChatState {
  readonly loading: boolean;
  readonly dialog: IMessage[];
  readonly errors?: string;
  readonly data: Chat;
}
