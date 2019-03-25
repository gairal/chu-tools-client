export interface ISentiment {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const enum SentimentActionTypes {
  SENTIMENTS_GET = '@@sentiment/SENTIMENTS_GET',
  SENTIMENTS_GET_SUCCESS = '@@sentiment/SENTIMENTS_GET_SUCCESS',
  SENTIMENTS_GET_ERROR = '@@sentiment/SENTIMENTS_GET_ERROR',
}

export interface ISentimentState {
  readonly loading: boolean;
  readonly sentiments: ISentiment[];
  readonly errors?: string;
}
